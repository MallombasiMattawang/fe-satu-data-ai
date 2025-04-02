// Import dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Api from "../../../services/Api";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ReactLeafletKml from "react-leaflet-kml";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//import js cookie
import Cookies from "js-cookie";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

//import AI components
import AIAnalysis from "../../../components/admin/AIAnalysis";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Fungsi untuk mengekspor halaman sebagai PDF
const exportToPDF = () => {
  const element = document.getElementById("patroli-detail-page");

  html2canvas(element, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // Lebar A4 dalam mm
    const pageHeight = 297; // Tinggi A4 dalam mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Tambahkan halaman pertama
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Tambahkan halaman baru jika konten lebih panjang dari satu halaman
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("PatroliDetail.pdf");
  });
};

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D72638", "#4ECDC4", "#C7F464", "#7D3C98", "#76D7C4", "#F5B041",
  "#2980B9", "#F39C12", "#F1948A", "#1ABC9C", "#AF7AC5", "#DC7633", "#5499C7", "#5D6D7E", "#F8C471", "#82E0AA",
  "#E74C3C", "#2471A3", "#5DADE2", "#58D68D", "#F4D03F", "#B03A2E", "#34495E", "#D4AC0D", "#EB984E", "#85929E",
  "#C39BD3", "#52BE80", "#2874A6", "#D98880", "#8E44AD", "#45B39D", "#CA6F1E", "#B9770E", "#2E4053", "#F5CBA7",
  "#7FB3D5", "#AED6F1", "#F5B7B1", "#BB8FCE", "#82E0AA", "#F9E79F", "#D5F5E3", "#E6B0AA", "#D2B4DE", "#7DCEA0",
  "#A569BD", "#1ABC9C", "#EC7063", "#FAD7A0", "#AAB7B8", "#2980B9", "#F1C40F", "#F4F6F7", "#E74C3C", "#1F618D",
  "#27AE60", "#E67E22", "#ECF0F1", "#E5E8E8", "#7D6608", "#1B4F72", "#C0392B", "#7B241C", "#1D8348", "#922B21",
  "#7E5109", "#196F3D", "#6C3483", "#4A235A", "#E59866", "#ABB2B9", "#5B2C6F", "#154360", "#F7DC6F", "#F1948A",
  "#BDC3C7", "#52BE80", "#1ABC9C", "#AF601A", "#884EA0", "#943126", "#5D6D7E", "#2980B9", "#2874A6", "#E74C3C",
  "#73C6B6", "#3498DB", "#A04000", "#566573", "#F1C40F", "#48C9B0", "#D68910", "#BB8FCE", "#1C2833", "#5DADE2"
];

export default function PatroliDetail() {
  // Title page
  document.title = "Detail Patroli RBM";

  // State untuk menyimpan data patroli
  const [patroliData, setPatroliData] = useState(null);
  const [listObservationCategory_0s, setListObservationCategory_0s] = useState([]);
  const [listObservationCategory_1s, setListObservationCategory_1s] = useState([]);
  const [listTipeTemuans, setListTipeTemuans] = useState([]);
  const [listPerluTindakLanjuts, setListPerluTindakLanjuts] = useState([]);
  const [listStatusTindakLanjuts, setListStatusTindakLanjuts] = useState([]);
  const [listTindakans, setListTindakans] = useState([]);
  const [listTumbuhans, setListTumbuhans] = useState([]);
  const [listSatwas, setListSatwas] = useState([]);
  const [loading, setLoading] = useState(true);

  //API kirim ke AI
  const [apiData, setApiData] = useState([]);

  // Dapatkan patrol_id dan year dari URL
  const { patrol_id, year } = useParams();
  const [kmlFiles, setKmlFiles] = useState([]); // State untuk menyimpan multiple KML

  // Mendapatkan token dari cookies
  const token = Cookies.get("token");

  // Fungsi untuk memuat data patroli
  useEffect(() => {
    const fetchPatroliDetail = async () => {
      try {
        const response = await Api.get(`/api/admin/patroli-rbm/${patrol_id}/${year}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setPatroliData(response.data.data); // Simpan data dari API

        } else {
          toast.error("Gagal memuat data patroli.");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat memuat data.");
      } finally {
        setLoading(false); // Matikan loading
      }

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
    };

    const fetchPatroliSummary = async () => {
      try {
        const response = await Api.get(`/api/admin/summary-rbm/${patrol_id}/${year}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setListObservationCategory_0s(response.data.data.listObservationCategory_0)
          setListObservationCategory_1s(response.data.data.listObservationCategory_1)
          setListTipeTemuans(response.data.data.listTipeTemuan)

          setListPerluTindakLanjuts(response.data.data.listPerluTindakLanjut)
          setListStatusTindakLanjuts(response.data.data.listStatusTindakLanjut)
          setListTindakans(response.data.data.listTindakan)
          setListTumbuhans(response.data.data.listTumbuhan)
          setListSatwas(response.data.data.listSatwa)
          setApiData(response.data.data);
        } else {
          toast.error("Gagal memuat data summary.");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat memuat data.");
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchPatroliDetail();
    fetchPatroliSummary();
  }, [patrol_id, year, token]);

  // Tampilkan loading jika data belum selesai dimuat
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika tidak ada data
  if (!patroliData) {
    return <div>Tidak ada data yang tersedia.</div>;
  }
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

  // Mengatur icon marker default karena Leaflet kadang tidak memuat gambar marker secara otomatis
  const defaultIcon = new L.Icon({
    // iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconUrl: "/images/icon-marker.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  // Menentukan ikon berdasarkan data
  const getIconByCondition = (detail) => {
    if (detail.jenis_satwa) {
      return animalIcon; // Gunakan ikon hewan jika ada jenis satwa
    } else if (detail.jenis_tumbuhan) {
      return plantIcon; // Gunakan ikon tumbuhan jika ada jenis tumbuhan
    }
    return defaultIcon; // Gunakan ikon default jika tidak memenuhi kondisi
  };


  // Render detail patroli
  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <h2 className="mb-4"><i className="fa fa-dashboard"></i> Detail Patroli RBM</h2>
          <div className="d-flex justify-content-between mb-3">
            <Link
              to="/admin/patroli-rbm"
              className="btn btn-md btn-info border-0 shadow-sm"
              type="button"
            >
              <i className="fa fa-long-arrow-alt-left me-2"></i> Back
            </Link>
            <button onClick={exportToPDF} className="btn btn-md btn-danger border-0 shadow-sm">
              Export to PDF
            </button>
          </div>
          <hr />
          <div id="patroli-detail-page">
            <div className="row">
              <div className="col-xl-8 col-md-8">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <MapContainer
                      center={[-2.8993227, 119.37366737]} // Koordinat tengah Pulau Sulawesi
                      zoom={12}
                      style={{ height: "600px", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />

                      {patroliData.detail_patrol.map((detail, index) => {
                        const coordinates = detail.geometry?.split(",").map(coord => parseFloat(coord.trim()));
                        if (coordinates && coordinates.length === 2) {
                          return (

                            <Marker key={index} position={coordinates} icon={getIconByCondition(detail)}>
                              <Popup>
                                <strong>Waypoint:</strong> {new Date(detail.waypoint_date).toLocaleDateString("id-ID")} | {new Date(detail.waypoint_time).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} <br />
                                {/* {detail.year && <div><strong>Year:</strong> {detail.year}</div>} */}
                                {detail.patrol_id && <div><strong>Patrol ID:</strong> {detail.patrol_id}</div>}
                                {detail.type && <div><strong>Type:</strong> {detail.type}</div>}
                                {/* {detail.patrol_start_date && <div><strong>Patrol Start Date:</strong> {detail.patrol_start_date}</div>} */}
                                {/* {detail.patrol_end_date && <div><strong>Patrol End Date:</strong> {detail.patrol_end_date}</div>} */}
                                {detail.station && <div><strong>Station:</strong> {detail.station}</div>}
                                {detail.team && <div><strong>Team:</strong> {detail.team}</div>}
                                {detail.objective && <div><strong>Objective:</strong> {detail.objective}</div>}
                                {detail.mandate && <div><strong>Mandate:</strong> {detail.mandate}</div>}
                                {/* {detail.patrol_leg_id && <div><strong>Patrol Leg ID:</strong> {detail.patrol_leg_id}</div>} */}
                                {detail.leader && <div><strong>Leader:</strong> {detail.leader}</div>}
                                {detail.patrol_transport_type && <div><strong>Patrol Transport Type:</strong> {detail.patrol_transport_type}</div>}
                                {/* {detail.waypoint_id && <div><strong>Waypoint ID:</strong> {detail.waypoint_id}</div>} */}
                                {/* {detail.waypoint_date && <div><strong>Waypoint Date:</strong> {detail.waypoint_date}</div>} */}
                                {/* {detail.waypoint_time && <div><strong>Waypoint Time:</strong> {detail.waypoint_time}</div>} */}
                                {/* {detail.last_modified && <div><strong>Last Modified:</strong> {detail.last_modified}</div>} */}
                                {/* {detail.last_modified_by && <div><strong>Last Modified By:</strong> {detail.last_modified_by}</div>} */}
                                {detail.observation_category_0 && <div><strong>Observation Category:</strong> {detail.observation_category_0}</div>}
                                {detail.observation_category_1 && <div><strong>Observation Sub Category:</strong> {detail.observation_category_1}</div>}
                                {detail.jenis_tumbuhan && <div><strong>Jenis Tumbuhan:</strong> {detail.jenis_tumbuhan}</div>}
                                {detail.kesesuaian_regulasi && <div><strong>Kesesuaian Regulasi:</strong> {detail.kesesuaian_regulasi}</div>}

                                {detail.kondisi_tumbuhan && <div><strong>Kondisi Tumbuhan:</strong> {detail.kondisi_tumbuhan}</div>}
                                {detail.perlu_tindak_lanjut && <div><strong>Perlu Tindak Lanjut:</strong> {detail.perlu_tindak_lanjut}</div>}
                                {detail.status_tindak_lanjut && <div><strong>Status Tindak Lanjut:</strong> {detail.status_tindak_lanjut}</div>}
                                {detail.tanggal_tindak_lanjut && <div><strong>Tanggal Tindak Lanjut:</strong> {detail.tanggal_tindak_lanjut}</div>}
                                {detail.tindakan && <div><strong>Tindakan:</strong> {detail.tindakan}</div>}
                                {detail.tipe_temuan && <div><strong>Tipe Temuan:</strong> {detail.tipe_temuan}</div>}
                                {detail.umur_satwa && <div><strong>Umur Satwa:</strong> {detail.umur_satwa}</div>}
                                {detail.usia_temuan && <div><strong>Usia Temuan:</strong> {detail.usia_temuan}</div>}
                                {detail.geometry && <div><strong>Koordinat:</strong> {detail.geometry}</div>}
                                {detail.date && <div><strong>Date:</strong> {detail.date}</div>}
                                {detail.patrol_start_date_2 && <div><strong>Patrol Start Date 2:</strong> {detail.patrol_start_date_2}</div>}
                                {detail.patrol_end_date_2 && <div><strong>Patrol End Date 2:</strong> {detail.patrol_end_date_2}</div>}
                                {detail.patrol_duration && <div><strong>Patrol Duration:</strong> {detail.patrol_duration}</div>}
                                {detail.jenis_satwa && <div><strong>Jenis Satwa:</strong> {detail.jenis_satwa}</div>}
                                {detail.keterangan && <div><strong>Keterangan:</strong> {detail.keterangan}</div>}
                              </Popup>
                            </Marker>
                          );
                        }
                        return null;
                      })}
                      {/* Menambahkan semua layer KML */}
                      {kmlFiles.map((kml, index) => (
                        <ReactLeafletKml key={index} kml={kml} />
                      ))}
                    </MapContainer>
                    {/* Kirim data ke AIAnalysis */}
                    <AIAnalysis apiData={apiData} />
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">

                    <table className="table">
                      <tr>
                        <td>Patrol ID:</td>
                        <td className="text-end">{patroliData.patrol_id}</td>
                      </tr>

                      <tr>
                        <td>Tahun:</td>
                        <td className="text-end">{patroliData.year}</td>
                      </tr>
                      <tr>
                        <td>Stasiun:</td>
                        <td className="text-end">{patroliData.station}</td>
                      </tr>
                      <tr>
                        <td>Leader:</td>
                        <td className="text-end">{patroliData.leader}</td>
                      </tr>
                      <tr>
                        <td>Patroli Mulai:</td>
                        <td className="text-end">{new Date(patroliData.patroli_start).toLocaleDateString("id-ID")}</td>
                      </tr>
                      <tr>
                        <td>Patroli Selesai:</td>
                        <td className="text-end">{new Date(patroliData.patroli_end).toLocaleDateString("id-ID")}</td>
                      </tr>
                      <tr>
                        <td>Durasi Patroli (hari):</td>
                        <td className="text-end">{patroliData.durasi_patroli}</td>
                      </tr>
                      <tr>
                        <td>Jumlah Titik:</td>
                        <td className="text-end">{patroliData.jumlah_patrol}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {/* Summary Observation Categories */}
              <div className="col-xl-6 col-md-6">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                  <div className="card-header">
                    <h6>Summary Observation Categories</h6>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PieChart width={250} height={200}>
                      <Pie
                        data={listObservationCategory_0s}
                        dataKey="total"
                        nameKey="observation_category_0"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {listObservationCategory_0s.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>

                  {/* Table */}
                  <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                    <table className="table">
                      {listObservationCategory_0s.map((listObservationCategory_0, index) => (
                        <tr key={listObservationCategory_0.observation_category_0}>
                          <td>{index + 1}</td>
                          <td>{listObservationCategory_0.observation_category_0}</td>
                          <td className="text-end">{listObservationCategory_0.total} Titik </td>
                        </tr>
                      ))}
                    </table>
                  </div>


                </div>
              </div>

              {/* Summary Sub Observation Categories */}
              <div className="col-xl-6 col-md-6">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                  <div className="card-header">
                    <h6>Summary Sub Observation Categories</h6>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PieChart width={250} height={200}>
                      <Pie
                        data={listObservationCategory_1s}
                        dataKey="total"
                        nameKey="observation_category_1"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {listObservationCategory_1s.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>

                  {/* Table */}
                  <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                    <table className="table">
                      {listObservationCategory_1s.map((listObservationCategory_1, index) => (
                        <tr key={listObservationCategory_1.observation_category_1}>
                          <td>{index + 1}</td>
                          <td>{listObservationCategory_1.observation_category_1}</td>
                          <td className="text-end">{listObservationCategory_1.total} Titik </td>
                        </tr>
                      ))}
                    </table>
                  </div>


                </div>
              </div>
            </div>
            <div className="row">
              {/* Summary Temuan */}
              <div className="col-xl-6 col-md-6">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                  <div className="card-header">
                    <h6>Summary Temuan</h6>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PieChart width={250} height={200}>
                      <Pie
                        data={listTipeTemuans}
                        dataKey="total"
                        nameKey="tipe_temuan"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {listTipeTemuans.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>

                  {/* Table */}
                  <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                    <table className="table">
                      {listTipeTemuans.map((listTipeTemuan, index) => (
                        <tr key={listTipeTemuan.tipe_temuan}>
                          <td>{index + 1}</td>
                          <td>{listTipeTemuan.tipe_temuan}</td>
                          <td className="text-end">{listTipeTemuan.total} Titik </td>
                        </tr>
                      ))}
                    </table>
                  </div>

                </div>
              </div>

              {/* Summary Perlu Tindak Lanjut */}
              <div className="col-xl-6 col-md-6">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                  <div className="card-header">
                    <h6>Summary Perlu Tindak Lanjut</h6>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PieChart width={250} height={200}>
                      <Pie
                        data={listPerluTindakLanjuts}
                        dataKey="total"
                        nameKey="perlu_tindak_lanjut"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {listPerluTindakLanjuts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>

                  {/* Table */}
                  <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                    <table className="table">
                      {listPerluTindakLanjuts.map((listPerluTindakLanjut, index) => (
                        <tr key={listPerluTindakLanjut.perlu_tindak_lanjut}>
                          <td>{index + 1}</td>
                          <td>{listPerluTindakLanjut.perlu_tindak_lanjut}</td>
                          <td className="text-end">{listPerluTindakLanjut.total} Titik </td>
                        </tr>
                      ))}
                    </table>
                  </div>

                </div>
              </div>
            </div>

            <div className="row">
              {/* Summary Status Tindak Lanjut */}
              <div className="col-xl-6 col-md-6">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                  <div className="card-header">
                    <h6>Summary Status Tindak Lanjut</h6>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PieChart width={250} height={200}>
                      <Pie
                        data={listStatusTindakLanjuts}
                        dataKey="total"
                        nameKey="status_tindak_lanjut"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {listStatusTindakLanjuts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>

                  {/* Table */}
                  <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                    <table className="table">
                      {listStatusTindakLanjuts.map((listStatusTindakLanjut, index) => (
                        <tr key={listStatusTindakLanjut.status_tindak_lanjut}>
                          <td>{index + 1}</td>
                          <td>{listStatusTindakLanjut.status_tindak_lanjut}</td>
                          <td className="text-end">{listStatusTindakLanjut.total} Titik </td>
                        </tr>
                      ))}
                    </table>
                  </div>


                </div>
              </div>

              {/* Summary Tindakan */}
              <div className="col-xl-6 col-md-6">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                  <div className="card-header">
                    <h6>Summary Tindakan</h6>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PieChart width={250} height={200}>
                      <Pie
                        data={listTindakans}
                        dataKey="total"
                        nameKey="tindakan"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {listTindakans.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>

                  {/* Table */}
                  <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                    <table className="table">
                      {listTindakans.map((listTindakan, index) => (
                        <tr key={listTindakan.tindakan}>
                          <td>{index + 1}</td>
                          <td>{listTindakan.tindakan}</td>
                          <td className="text-end">{listTindakan.total} Titik </td>
                        </tr>
                      ))}
                    </table>
                  </div>

                </div>
              </div>
            </div>

            <div className="row">
              {/* Summary Tumbuhan */}
              <div className="col-xl-6 col-md-6">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                  <div className="card-header">
                    <h6>Summary Jenis Tumbuhan</h6>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PieChart width={250} height={200}>
                      <Pie
                        data={listTumbuhans}
                        dataKey="total"
                        nameKey="jenis_tumbuhan"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {listTumbuhans.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>

                  {/* Table */}
                  <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                    <table className="table">
                      {listTumbuhans.map((listTumbuhan, index) => (
                        <tr key={listTumbuhan.jenis_tumbuhan}>
                          <td>{index + 1}</td>
                          <td>
                            {listTumbuhan.jenis_tumbuhan}
                          </td>
                          <td className="text-end">{listTumbuhan.total} Titik</td>
                        </tr>
                      ))}
                    </table>
                  </div>

                </div>
              </div>

              {/* Summary Tindakan */}
              <div className="col-xl-6 col-md-6">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                  <div className="card-header">
                    <h6>Summary Jenis Satwa</h6>
                  </div>

                  {/* Pie Chart */}
                  <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <PieChart width={250} height={200}>
                      <Pie
                        data={listSatwas}
                        dataKey="total"
                        nameKey="jenis_satwa"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {listSatwas.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>

                  {/* Table */}
                  <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                    <table className="table">
                      {listSatwas.map((listSatwa, index) => (
                        <tr key={listSatwa.jenis_satwa}>
                          <td>{index + 1}</td>
                          <td>
                            {listSatwa.jenis_satwa}
                          </td>
                          <td className="text-end">{listSatwa.total} Titik</td>
                        </tr>
                      ))}
                    </table>
                  </div>

                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12 col-md-12">
                <div className="card mb-4 border-0 shadow-sm" style={{ height: "650px" }}>
                  <div className="card-body p-2 table-wrapper">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Waypoint Date</th>
                          <th>Waypoint Time</th>
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
                        {patroliData.detail_patrol.map((detail, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{new Date(detail.waypoint_date).toLocaleDateString("id-ID")}</td>
                            <td>{new Date(detail.waypoint_time).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</td>
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
            </div>
          </div>





        </div>
      </main>

    </LayoutAdmin>
  );
}