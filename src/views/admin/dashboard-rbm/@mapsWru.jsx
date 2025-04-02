import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import Api from "../../../services/Api";
import Cookies from "js-cookie";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ikon untuk marker
const animalIcon = new L.Icon({
  iconUrl: "/images/icon-satwa.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const plantIcon = new L.Icon({
  iconUrl: "/images/icon-pohon.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const defaultIcon = new L.Icon({
  iconUrl: "/images/icon-marker.png",
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const getIconByCondition = (data) => {
  if (data.jenis_satwa) {
    return animalIcon;
  } else if (data.jenis_tumbuhan) {
    return plantIcon;
  }
  return defaultIcon;
};

export default function MapsWru() {
  document.title = "Peta Titik Patroli - RBM";
  const [patroliData, setPatroliData] = useState([]);
  const [kmlFiles, setKmlFiles] = useState([]); // State untuk menyimpan multiple KML
  // State untuk menyimpan parameter filter dari URL
  const [filterParams, setFilterParams] = useState([]);

  // State untuk menyimpan nilai filter dari setiap input
  const [filters, setFilters] = useState({
    year: "",
    patrol_id: "",
    station: "",
    observation_category_0: "",
    observation_category_1: "",
    jenis_tumbuhan: "",
    jenis_satwa: "",
  });

  const [observationCategoryOptions, setObservationCategoryOptions] = useState([]);
  const [subObservationCategoryOptions, setSubObservationCategoryOptions] = useState([]);
  const [jenisTumbuhanOptions, setJenisTumbuhanOptions] = useState([]);
  const [jenisSatwaOptions, setJenisSatwaOptions] = useState([]);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter hanya nilai yang tidak kosong
    const filteredParams = Object.entries(filters)
      .filter(([key, value]) => value.trim() !== "") // Hanya ambil yang tidak kosong
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    // Buat query string
    const queryString = new URLSearchParams(filteredParams).toString();

    // Redirect ke halaman Maps dengan query string
    window.location.href = `/admin/maps-rbm?${queryString}`;
  };

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
        // Simpan parameter dalam bentuk array of objects [{ key, value }]
        const filters = [];
        params.forEach((value, key) => {
          filters.push({ key, value });
        });
        setFilterParams(filters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const fetchFilterData = async () => {
      try {
        const url = "/api/admin/filter-rbm";
        const response = await Api.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const data = response.data.data;
          setObservationCategoryOptions(data.listObservationCategory_0 || []);
          setSubObservationCategoryOptions(data.listObservationCategory_1 || []);
          setJenisTumbuhanOptions(data.listTumbuhan || []);
          setJenisSatwaOptions(data.listSatwa || []);
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    fetchFilterData();

    // Daftar file KML
    const kmlUrls = ["/maps/kawasan-all.kml", "/maps/grid-tngd.kml"];

    // Memuat semua file KML secara paralel
    const loadKmlFiles = async () => {
      try {
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
                {patroliData.map((data, index) => {
                  const [latitude, longitude] = (data.geometry || "")
                    .split(",")
                    .map((coord) => parseFloat(coord.trim()));
                  return (
                    <Marker
                      key={index}
                      position={[latitude, longitude]}
                      icon={getIconByCondition(data)}
                    >
                      <Popup>
                        <strong>Waypoint:</strong> {new Date(data.waypoint_date).toLocaleDateString("id-ID")} | {new Date(data.waypoint_time).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} <br />
                        {/* {data.year && <div><strong>Year:</strong> {data.year}</div>} */}
                        {data.patrol_id && <div><strong>Patrol ID:</strong> {data.patrol_id}</div>}
                        {data.type && <div><strong>Type:</strong> {data.type}</div>}
                        {/* {data.patrol_start_date && <div><strong>Patrol Start Date:</strong> {data.patrol_start_date}</div>} */}
                        {/* {data.patrol_end_date && <div><strong>Patrol End Date:</strong> {data.patrol_end_date}</div>} */}
                        {data.station && <div><strong>Station:</strong> {data.station}</div>}
                        {data.team && <div><strong>Team:</strong> {data.team}</div>}
                        {data.objective && <div><strong>Objective:</strong> {data.objective}</div>}
                        {data.mandate && <div><strong>Mandate:</strong> {data.mandate}</div>}
                        {/* {data.patrol_leg_id && <div><strong>Patrol Leg ID:</strong> {data.patrol_leg_id}</div>} */}
                        {data.leader && <div><strong>Leader:</strong> {data.leader}</div>}
                        {data.patrol_transport_type && <div><strong>Patrol Transport Type:</strong> {data.patrol_transport_type}</div>}
                        {/* {data.waypoint_id && <div><strong>Waypoint ID:</strong> {data.waypoint_id}</div>} */}
                        {/* {data.waypoint_date && <div><strong>Waypoint Date:</strong> {data.waypoint_date}</div>} */}
                        {/* {data.waypoint_time && <div><strong>Waypoint Time:</strong> {data.waypoint_time}</div>} */}
                        {/* {data.last_modified && <div><strong>Last Modified:</strong> {data.last_modified}</div>} */}
                        {/* {data.last_modified_by && <div><strong>Last Modified By:</strong> {data.last_modified_by}</div>} */}
                        {data.observation_category_0 && <div><strong>Observation Category:</strong> {data.observation_category_0}</div>}
                        {data.observation_category_1 && <div><strong>Observation Sub Category:</strong> {data.observation_category_1}</div>}
                        {data.jenis_tumbuhan && <div><strong>Jenis Tumbuhan:</strong> {data.jenis_tumbuhan}</div>}
                        {data.kesesuaian_regulasi && <div><strong>Kesesuaian Regulasi:</strong> {data.kesesuaian_regulasi}</div>}

                        {data.kondisi_tumbuhan && <div><strong>Kondisi Tumbuhan:</strong> {data.kondisi_tumbuhan}</div>}
                        {data.perlu_tindak_lanjut && <div><strong>Perlu Tindak Lanjut:</strong> {data.perlu_tindak_lanjut}</div>}
                        {data.status_tindak_lanjut && <div><strong>Status Tindak Lanjut:</strong> {data.status_tindak_lanjut}</div>}
                        {data.tanggal_tindak_lanjut && <div><strong>Tanggal Tindak Lanjut:</strong> {data.tanggal_tindak_lanjut}</div>}
                        {data.tindakan && <div><strong>Tindakan:</strong> {data.tindakan}</div>}
                        {data.tipe_temuan && <div><strong>Tipe Temuan:</strong> {data.tipe_temuan}</div>}
                        {data.umur_satwa && <div><strong>Umur Satwa:</strong> {data.umur_satwa}</div>}
                        {data.usia_temuan && <div><strong>Usia Temuan:</strong> {data.usia_temuan}</div>}
                        {data.geometry && <div><strong>Koordinat:</strong> {data.geometry}</div>}
                        {data.date && <div><strong>Date:</strong> {data.date}</div>}
                        {data.patrol_start_date_2 && <div><strong>Patrol Start Date 2:</strong> {data.patrol_start_date_2}</div>}
                        {data.patrol_end_date_2 && <div><strong>Patrol End Date 2:</strong> {data.patrol_end_date_2}</div>}
                        {data.patrol_duration && <div><strong>Patrol Duration:</strong> {data.patrol_duration}</div>}
                        {data.jenis_satwa && <div><strong>Jenis Satwa:</strong> {data.jenis_satwa}</div>}
                        {data.keterangan && <div><strong>Keterangan:</strong> {data.keterangan}</div>}
                      </Popup>
                    </Marker>
                  );
                })}
                {/* Menambahkan semua layer KML */}
                {kmlFiles.map((kml, index) => (
                  <ReactLeafletKml key={index} kml={kml} />
                ))}
              </MapContainer>
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "650px" }}>
                <div className="card-body p-2 table-wrapper">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Waypoint Date</th>
                        <th>Waypoint Time</th>
                        <th>Mandate</th>
                        <th>Transport</th>
                        <th>Koordinat</th>
                        <th>Kategori Observasi</th>
                        <th>Kategori Sub Observasi</th>
                        <th>Jenis Tumbuhan</th>
                        <th>Jenis Satwa</th>
                        <th>Keterangan</th>
                        <th>Tipe Temuan</th>
                        <th>Perlu Tindak Lanjut</th>
                        <th>Status Tindak Lanjut</th>
                        <th>Tindakan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patroliData.map((detail, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{new Date(detail.waypoint_date).toLocaleDateString("id-ID")}</td>
                          <td>{new Date(detail.waypoint_time).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</td>
                          <td>{detail.mandate}</td>
                          <td>{detail.patrol_transport_type}</td>
                          <td>{detail.geometry}</td>
                          <td>{detail.observation_category_0}</td>
                          <td>{detail.observation_category_1}</td>
                          <td>{detail.jenis_tumbuhan}</td>
                          <td>{detail.jenis_satwa}</td>
                          <td>{detail.keterangan}</td>
                          <td>{detail.tipe_temuan}</td>
                          <td>{detail.perlu_tindak_lanjut}</td>
                          <td>{detail.status_tindak_lanjut}</td>
                          <td>{detail.tindakan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-3">
              <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img src={"/images/logo-smart.png"} width={"80"} height={"80"} className="mb-3" />
                  <p>Filter Query berdasarkan:</p>
                  <div className="table-responsive">
                    <table className="table table-bordered bg-dark text-white">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterParams.map((param, index) => (
                          <tr key={index}>
                            <td>{param.key}</td>
                            <td>{param.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

              <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <p>Lakukan Pencarian Data:</p>
                  <form onSubmit={handleSubmit}>
                    <table className="table table-bordered bg-dark text-white">
                      <tbody>
                        <tr>
                          <td>Year</td>
                          <td>
                            <select
                              name="year"
                              value={filters.year}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">All Year</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Observation Category</td>
                          <td>
                            <select
                              name="observation_category_0"
                              value={filters.observation_category_0}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Category</option>
                              {observationCategoryOptions.map((item) => (
                                <option key={item.observation_category_0} value={item.observation_category_0}>
                                  {item.observation_category_0}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Sub Observation Category</td>
                          <td>
                            <select
                              name="observation_category_1"
                              value={filters.observation_category_1}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Sub Category</option>
                              {subObservationCategoryOptions.map((item) => (
                                <option key={item.observation_category_1} value={item.observation_category_1}>
                                  {item.observation_category_1}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Jenis Tumbuhan</td>
                          <td>
                            <select
                              name="jenis_tumbuhan"
                              value={filters.jenis_tumbuhan}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Jenis Tumbuhan</option>
                              {jenisTumbuhanOptions.map((item) => (
                                <option key={item.jenis_tumbuhan} value={item.jenis_tumbuhan}>
                                  {item.jenis_tumbuhan}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td>Jenis Satwa</td>
                          <td>
                            <select
                              name="jenis_satwa"
                              value={filters.jenis_satwa}
                              onChange={handleInputChange}
                              className="form-control border-0 shadow-sm"
                            >
                              <option value="">Select Jenis Satwa</option>
                              {jenisSatwaOptions.map((item) => (
                                <option key={item.jenis_satwa} value={item.jenis_satwa}>
                                  {item.jenis_satwa}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <button
                              type="submit"
                              className="btn btn-md btn-primary border-0 shadow-sm w-100"
                            >
                              Filter
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}