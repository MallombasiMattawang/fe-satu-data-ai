import { useEffect } from "react";
import L from "leaflet";
import "leaflet-kml";

const KmlLoader = ({ map, kmlUrls = [] }) => {
  useEffect(() => {
    // Pastikan `map` sudah tersedia sebelum memproses KML
    if (!map) {
      console.error("Error: Map is undefined");
      return;
    }

    const loadKmlFiles = async () => {
      try {
        if (!Array.isArray(kmlUrls)) {
          console.error("Error: kmlUrls harus berupa array.");
          return;
        }

        kmlUrls.forEach(async (url) => {
          try {
            const response = await fetch(url);
            const kmlText = await response.text();
            const parser = new DOMParser();
            const kml = parser.parseFromString(kmlText, "text/xml");
            const kmlLayer = new L.KML(kml);

            map.addLayer(kmlLayer);
          } catch (error) {
            console.error("Error loading KML file:", error);
          }
        });
      } catch (error) {
        console.error("Error loading KML files:", error);
      }
    };

    loadKmlFiles();
  }, [map, kmlUrls]);

  return null;
};

export default KmlLoader;