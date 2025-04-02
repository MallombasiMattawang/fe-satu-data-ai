import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

function HeatmapLayer({ data }) {
    const map = useMap();

    useEffect(() => {
        if (data.length === 0) return;

        // Fungsi untuk mengubah data patroli menjadi format heatmap
        const formatHeatmapData = (filterCondition, colorGradient) => {
            const filteredData = data
                .filter(filterCondition)
                .map((item) => {
                    const [latitude, longitude] = (item.geometry || "")
                        .split(",")
                        .map((coord) => parseFloat(coord.trim()));
                    return latitude && longitude ? [latitude, longitude, 1.0] : null;
                })
                .filter(Boolean);

            return window.L.heatLayer(filteredData, {
                radius: 50,
                blur: 15,
                maxZoom: 17,
                gradient: colorGradient,
            });
        };

        // Layer heatmap berdasarkan kategori
        const plantHeatLayer = formatHeatmapData(
            (item) => item.jenis_tumbuhan,
            { 0.4: "green", 0.65: "lime", 1: "darkgreen" }
        );

        const animalHeatLayer = formatHeatmapData(
            (item) => item.jenis_satwa,
            { 0.4: "brown", 0.65: "peru", 1: "saddlebrown" }
        );

        const defaultHeatLayer = formatHeatmapData(
            (item) => !item.jenis_tumbuhan && !item.jenis_satwa,
            { 0.4: "yellow", 0.65: "gold", 1: "orange" }
        );

        // Tambahkan ke peta
        plantHeatLayer.addTo(map);
        animalHeatLayer.addTo(map);
        defaultHeatLayer.addTo(map);
    }, [map, data]);

    return null;
}

export default function HeatMapComponent({ patroliData = [] }) {
    const [kmlFiles, setKmlFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadKmlFiles = async () => {
            try {
                const kmlUrls = ["/maps/kawasan-all.kml", "/maps/grid-tngd.kml"];
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
            } catch (error) {
                console.error("Error memuat KML:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadKmlFiles();
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

            {!isLoading && (
                <MapContainer center={[-2.620, 119.220]} zoom={8} style={{ height: "600px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <HeatmapLayer data={patroliData} />

                    {/* Menambahkan KML Layer */}
                    {kmlFiles.map((kml, index) => (
                        <ReactLeafletKml key={index} kml={kml} />
                    ))}
                </MapContainer>
            )}
        </div>
    );
}