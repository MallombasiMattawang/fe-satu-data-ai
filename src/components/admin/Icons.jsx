import L from "leaflet";

const Icons = {
  animalIcon: new L.Icon({
    iconUrl: "/images/icon-satwa.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  plantIcon: new L.Icon({
    iconUrl: "/images/icon-pohon.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  kandangIcon: new L.Icon({
    iconUrl: "/images/icon-tsl-kandang.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  konflikIcon: new L.Icon({
    iconUrl: "/images/icon-tsl-konflik.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  matiIcon: new L.Icon({
    iconUrl: "/images/icon-tsl-mati.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  patroliIcon: new L.Icon({
    iconUrl: "/images/icon-tsl-patroli.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  lepasIcon: new L.Icon({
    iconUrl: "/images/icon-tsl-pelepasliaran.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  serahanIcon: new L.Icon({
    iconUrl: "/images/icon-tsl-serahan.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  titipanIcon: new L.Icon({
    iconUrl: "/images/icon-tsl-titipan.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  translokasiIcon: new L.Icon({
    iconUrl: "/images/icon-tsl-translokasi.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  defaultIcon: new L.Icon({
    iconUrl: "/images/icon-marker.png",
    iconSize: [40, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [1, 1],
  }),

  getIconByCondition: (data) => {
    if (data.jenis_satwa) return Icons.animalIcon;
    if (data.jenis_tumbuhan) return Icons.plantIcon;
    if (data.jenis_kejadian === 'SERAHAN') return Icons.serahanIcon;
    if (data.jenis_kejadian === 'KEMATIAN TSL') return Icons.matiIcon;
    if (data.jenis_kejadian === 'KANDANG TRANSIT') return Icons.kandangIcon;
    if (data.jenis_kejadian === 'KONFLIK TSL') return Icons.konflikIcon;
    if (data.jenis_kejadian === 'PELEPASLIARAN') return Icons.lepasIcon;
    if (data.jenis_kejadian === 'TRANSLOKASI') return Icons.translokasiIcon
    if (data.jenis_kejadian === 'TITIPAN') return Icons.titipanIcon;
    if (data.jenis_kejadian === 'PATROLI') return Icons.patroliIcon
    return Icons.defaultIcon;
  },
};

export default Icons;