import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ReactLeafletKml from "react-leaflet-kml"; // Pastikan package sudah diinstall
import Icons from "./Icons"; // Pastikan path benar

const MapComponent = ({ patroliData = [] }) => {
    const [kmlFiles, setKmlFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State untuk loading

    useEffect(() => {
        const kmlUrls = ["/maps/kawasan-all.kml", "/maps/grid-tngd.kml"];

        const loadKmlFiles = async () => {
            const loadedKmls = await Promise.all(
                kmlUrls.map(async (url) => {
                    try {
                        const response = await fetch(url);
                        if (!response.ok) throw new Error(`Gagal memuat KML: ${url}`);
                        const text = await response.text();
                        return new DOMParser().parseFromString(text, "text/xml");
                    } catch (error) {
                        console.error(error);
                        return null;
                    }
                })
            );

            setKmlFiles(loadedKmls.filter((kml) => kml !== null));
        };

        const loadData = async () => {
            await Promise.all([loadKmlFiles()]);
            setIsLoading(false); // Matikan loading setelah semua selesai
        };

        loadData();
    }, []);

    return (
        <div style={{ position: "relative" }}>
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}

            <MapContainer center={[-3.7, 120.0]} zoom={8} style={{ height: "500px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Menampilkan marker patroli */}
                {patroliData.map((data, index) => {
                    const [latitude, longitude] = (data.geometry || "")
                        .split(",")
                        .map((coord) => parseFloat(coord.trim()));

                    if (isNaN(latitude) || isNaN(longitude)) return null;

                    return (
                        <Marker key={index} position={[latitude, longitude]} icon={Icons.getIconByCondition(data)}>
                            <Popup>
                                <strong>Waypoint:</strong> {new Date(data.waypoint_date).toLocaleDateString("id-ID")} |{" "}
                                {new Date(data.waypoint_time).toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}{" "}
                                <br />
                                {data.patrol_id && <div><strong>Patrol ID:</strong> {data.patrol_id}</div>}
                                {data.type && <div><strong>Type:</strong> {data.type}</div>}
                                {data.station && <div><strong>Station:</strong> {data.station}</div>}
                                {data.team && <div><strong>Team:</strong> {data.team}</div>}
                                {data.objective && <div><strong>Objective:</strong> {data.objective}</div>}
                                {data.mandate && <div><strong>Mandate:</strong> {data.mandate}</div>}
                                {data.leader && <div><strong>Leader:</strong> {data.leader}</div>}
                                {data.patrol_transport_type && <div><strong>Patrol Transport Type:</strong> {data.patrol_transport_type}</div>}
                                {data.observation_category_0 && <div><strong>Observation Category:</strong> {data.observation_category_0}</div>}
                                {data.jenis_tumbuhan && <div><strong>Jenis Tumbuhan:</strong> {data.jenis_tumbuhan}</div>}
                                {data.kesesuaian_regulasi && <div><strong>Kesesuaian Regulasi:</strong> {data.kesesuaian_regulasi}</div>}
                                {data.keterangan && <div><strong>Keterangan:</strong> {data.keterangan}</div>}
                                {data.geometry && <div><strong>Koordinat:</strong> {data.geometry}</div>}
                            </Popup>
                        </Marker>
                    );
                })}

                {/* Menambahkan KML Layer */}
                {kmlFiles.map((kml, index) => (
                    <ReactLeafletKml key={index} kml={kml} />
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;