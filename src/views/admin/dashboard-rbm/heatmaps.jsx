import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import { MapContainer, TileLayer, useMap } from "react-leaflet"; // Tambahkan useMap di sini
import ReactLeafletKml from "react-leaflet-kml";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

function HeatmapLayer({ data }) {
    const map = useMap();
  
    useEffect(() => {
      if (data.length === 0) return;
  
      // Filter data berdasarkan kategori
      const plantData = data
        .filter((item) => item.jenis_tumbuhan)
        .map((item) => {
          const [latitude, longitude] = (item.geometry || "")
            .split(",")
            .map((coord) => parseFloat(coord.trim()));
          if (latitude && longitude) return [latitude, longitude, 1.0];
          return null;
        })
        .filter(Boolean);
  
      const animalData = data
        .filter((item) => item.jenis_satwa)
        .map((item) => {
          const [latitude, longitude] = (item.geometry || "")
            .split(",")
            .map((coord) => parseFloat(coord.trim()));
          if (latitude && longitude) return [latitude, longitude, 1.0];
          return null;
        })
        .filter(Boolean);
  
      const defaultData = data
        .filter((item) => !item.jenis_tumbuhan && !item.jenis_satwa)
        .map((item) => {
          const [latitude, longitude] = (item.geometry || "")
            .split(",")
            .map((coord) => parseFloat(coord.trim()));
          if (latitude && longitude) return [latitude, longitude, 1.0];
          return null;
        })
        .filter(Boolean);
  
      // Layer heatmap untuk masing-masing kategori
      const plantHeatLayer = window.L.heatLayer(plantData, {
        radius: 55,
        blur: 15,
        maxZoom: 17,
        gradient: { 0.4: "green", 0.65: "lime", 1: "darkgreen" }, // Warna untuk jenis tumbuhan
      });
  
      const animalHeatLayer = window.L.heatLayer(animalData, {
        radius: 55,
        blur: 15,
        maxZoom: 17,
        gradient: { 0.4: "brown", 0.65: "peru", 1: "saddlebrown" }, // Warna untuk jenis satwa
      });
  
      const defaultHeatLayer = window.L.heatLayer(defaultData, {
        radius: 55,
        blur: 15,
        maxZoom: 17,
        gradient: { 0.4: "yellow", 0.65: "gold", 1: "orange" }, // Warna untuk kategori lainnya
      });
  
      // Tambahkan ke peta
      plantHeatLayer.addTo(map);
      animalHeatLayer.addTo(map);
      defaultHeatLayer.addTo(map);
    }, [map, data]);
  
    return null;
  }


export default function HeatMapsRbm() {
  document.title = "Peta Titik Patroli - RBM";
  const [patroliData, setPatroliData] = useState([]);
  const [kmlFiles, setKmlFiles] = useState([]);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const queryString = params.toString();
        let url = "/api/admin/maps-rbm";
        if (queryString) url += `?${queryString}`;
        const response = await Api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) setPatroliData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const loadKmlFiles = async () => {
      try {
        const kmlUrls = ["/maps/kawasan-all.kml", "/maps/grid-tngd.kml"];
        const loadedKmls = await Promise.all(
          kmlUrls.map(async (url) => {
            const response = await fetch(url);
            const kmlText = await response.text();
            const parser = new DOMParser();
            return parser.parseFromString(kmlText, "text/xml");
          })
        );
        setKmlFiles(loadedKmls);
      } catch (error) {
        console.error("Error loading KML files:", error);
      }
    };

    loadKmlFiles();
  }, [token]);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <h2 className="mb-4">
            <i className="fa fa-map"></i> Peta Titik Patroli RBM
          </h2>
          <div className="row">
            <div className="col-xl-9 col-md-9">
              <MapContainer
                center={[-2.620, 119.220]}
                zoom={8}
                style={{ height: "600px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <HeatmapLayer data={patroliData} />
                {kmlFiles.map((kml, index) => (
                  <ReactLeafletKml key={index} kml={kml} />
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}