import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ReactLeafletKml from "react-leaflet-kml"; // Pastikan package sudah diinstall
import MarkerClusterGroup from "react-leaflet-cluster"; // Tambahkan cluster
import Icons from "./Icons"; // Pastikan path benar

const MapWruComponent = ({ patroliData = [] }) => {
    const [kmlFiles, setKmlFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const kmlUrls = ["/maps/kawasan-all.kml"];

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
            setIsLoading(false);
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

            <MapContainer center={[-3.7, 120.0]} zoom={6} style={{ height: "500px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Tambahkan Marker Cluster */}
                <MarkerClusterGroup chunkedLoading>
                    {patroliData.map((data, index) => {
                        const [latitude, longitude] = (data.koordinat || "")
                            .split(",")
                            .map((coord) => parseFloat(coord.trim()));

                        if (isNaN(latitude) || isNaN(longitude)) return null;

                        return (
                            <Marker
                                key={index}
                                position={[latitude, longitude]}
                                icon={Icons.getIconByCondition(data)}
                            >
                                <Popup>
                                    <strong>Tanggal:</strong> {new Date(data.tgl).toLocaleDateString("id-ID")} |{" "}
                                    <br />
                                    {data.kejadian && <div><strong>Kejadian ID:</strong> {data.kejadian}</div>}
                                    {data.jenis_kejadian && <div><strong>Jenis:</strong> {data.jenis_kejadian}</div>}
                                    {data.lokasi && <div><strong>Lokasi:</strong> {data.lokasi}</div>}
                                    {data.jenis_tsl && <div><strong>Jenis TSL:</strong> {data.jenis_tsl}</div>}
                                    {data.kode_tsl && <div><strong>Kode TSL:</strong> {data.kode_tsl}</div>}
                                    {data.jml_tsl && <div><strong>Jumlah TSL:</strong> {data.jml_tsl}</div>}
                                    {data.berita_acara && <div><strong>Berita Acara:</strong> {data.berita_acara}</div>}
                                    {data.keterangan && <div><strong>Keterangan:</strong> {data.keterangan}</div>}
                                    {data.koordinat && <div><strong>Koordinat:</strong> {data.koordinat}</div>}

                                    {/* Menampilkan gambar jika ada */}
                                    {data.kejadian && (
                                        <div style={{ marginTop: "10px", textAlign: "center" }}>
                                            <img
                                                src={"https://ksdasulsel.menlhk.go.id/uploads/images/WhatsApp%20Image%202025-02-13%20at%2016.30.44.jpeg"}
                                                alt="Gambar Kejadian"
                                                style={{ width: "250px", height: "auto", borderRadius: "8px" }}
                                            />
                                        </div>
                                    )}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MarkerClusterGroup>

                {/* Menambahkan KML Layer */}
                {kmlFiles.map((kml, index) => (
                    <ReactLeafletKml key={index} kml={kml} />
                ))}
            </MapContainer>
        </div>
    );
};

export default MapWruComponent;