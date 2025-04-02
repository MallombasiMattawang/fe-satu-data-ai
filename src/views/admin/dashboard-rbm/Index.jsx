//import hook
import { useState, useEffect } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import service api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import MoneyFormat
import numberFormat from "../../../utils/NumberFormat";

import { useLocation } from "react-router-dom";

//import Link
import { Link } from "react-router-dom";

import AIAnalysis from "../../../components/admin/AIAnalysis";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from "recharts";

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


export default function DashboardRbm() {
  //title page
  document.title = "Dashboard - RBM";

  //init state
  const [totalPatroli, setTotalPatroli] = useState(0);
  const [totalTitik, setTotalTitik] = useState(0);
  const [totalStation, setTotalStation] = useState(0);
  const [totalType, setTotalType] = useState(0);
  const [totalTeam, setTotalTeam] = useState(0);
  const [totalMandate, setTotalMandate] = useState(0);
  const [totalLeader, setTotalLeader] = useState(0);
  const [totalTransportType, setTotalTransportType] = useState(0);
  const [totalObservationCategory_0, setTotalObservationCategory_0] = useState(0);
  const [totalObservationCategory_1, setTotalObservationCategory_1] = useState(0);
  const [totalTipeTemuan, setTotalTipeTemuan] = useState(0);
  const [totalPerluTindakLanjut, setTotalPerluTindakLanjut] = useState(0);
  const [totalStatusTindakLanjut, setTotalStatusTindakLanjut] = useState(0);
  const [totalTindakan, setTotalTindakan] = useState(0);
  const [totalTumbuhan, setTotalTumbuhan] = useState(0);
  const [totalSatwa, setTotalSatwa] = useState(0);

  const [listMandates, setListMandates] = useState([]);
  const [listStations, setListStations] = useState([]);
  const [listTypes, setListTypes] = useState([]);
  const [listTeams, setListTeams] = useState([]);
  const [listLeaders, setListLeaders] = useState([]);
  const [listTransportTypes, setListTransportTypes] = useState([]);
  const [listObservationCategory_0s, setListObservationCategory_0s] = useState([]);
  const [listObservationCategory_1s, setListObservationCategory_1s] = useState([]);
  const [listTipeTemuans, setListTipeTemuans] = useState([]);
  const [listPerluTindakLanjuts, setListPerluTindakLanjuts] = useState([]);
  const [listStatusTindakLanjuts, setListStatusTindakLanjuts] = useState([]);
  const [listTindakans, setListTindakans] = useState([]);
  const [listTumbuhans, setListTumbuhans] = useState([]);
  const [listSatwas, setListSatwas] = useState([]);
  const [listBencanas, setListBencanas] = useState([]);

  //API kirim ke AI
  const [apiData, setApiData] = useState([]);

  // State untuk menyimpan nilai filter dari setiap input
  const [filters, setFilters] = useState({
    year: "",
  });

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
    window.location.href = `/admin/dashboard-rbm?${queryString}`;
  };

  //token from cookies
  const token = Cookies.get("token");
  // Ambil parameter "year" dari URL
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get("year");

  //hook useEffect
  useEffect(() => {
    //fetch api
    Api.get("/api/admin/dashboard-rbm", {
      params: {
        year: year, // Tambahkan parameter year
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setTotalPatroli(response.data.data.totalPatroli)
      setTotalTitik(response.data.data.totalTitik)
      setTotalStation(response.data.data.totalStation)
      setTotalType(response.data.data.totalType)
      setTotalTeam(response.data.data.totalTeam)
      setTotalMandate(response.data.data.totalMandate)
      setTotalLeader(response.data.data.totalLeader)
      setTotalTransportType(response.data.data.totalTransportType)
      setTotalObservationCategory_0(response.data.data.totalObservationCategory_0)
      setTotalObservationCategory_1(response.data.data.totalObservationCategory_1)
      setTotalTipeTemuan(response.data.data.totalTipeTemuan)
      setTotalPerluTindakLanjut(response.data.data.totalPerluTindakLanjut)
      setTotalStatusTindakLanjut(response.data.data.totalStatusTindakLanjut)
      setTotalTindakan(response.data.data.totalTindakan)
      setTotalTumbuhan(response.data.data.totalTumbuhan)
      setTotalSatwa(response.data.data.totalSatwa)

      setListMandates(response.data.data.listMandate)
      setListStations(response.data.data.listStation)
      setListTypes(response.data.data.listType)
      setListTeams(response.data.data.listTeam)
      setListLeaders(response.data.data.listLeader)
      setListTransportTypes(response.data.data.listTransportType)
      setListObservationCategory_0s(response.data.data.listObservationCategory_0)
      setListObservationCategory_1s(response.data.data.listObservationCategory_1)
      setListTipeTemuans(response.data.data.listTipeTemuan)

      setListPerluTindakLanjuts(response.data.data.listPerluTindakLanjut)
      setListStatusTindakLanjuts(response.data.data.listStatusTindakLanjut)
      setListTindakans(response.data.data.listTindakan)
      setListTumbuhans(response.data.data.listTumbuhan)
      setListSatwas(response.data.data.listSatwa)
      setListBencanas(response.data.data.listBencana)

      setApiData(response.data.data);


    });
  }, []);
  const filterAktifitasManusia = listObservationCategory_1s.filter(
    (item) => item.observation_category_0 === "Aktivitas Manusia"
  );
  const filterTumbuhan = listObservationCategory_1s.filter(
    (item) => item.observation_category_0 === "Tumbuhan"
  );
  const filterSatwa = listObservationCategory_1s.filter(
    (item) => item.observation_category_0 === "SATWA LIAR"
  );
  const filterFitur = listObservationCategory_1s.filter(
    (item) => item.observation_category_0 === "Fitur"
  );
  const filterPosisi = listObservationCategory_1s.filter(
    (item) => item.observation_category_0 === "Posisi"
  );
  const filterBencana = listBencanas.filter(
    (item) => item.observation_category_0 === "BENCANA ALAM"
  );
  const filterPemanfaatan = listObservationCategory_1s.filter(
    (item) => item.observation_category_0 === "Pemanfaatan"
  );
  const filterPengelolaan = listObservationCategory_1s.filter(
    (item) => item.observation_category_0 === "Pengelolaan"
  );
  const filterInvasif = listObservationCategory_1s.filter(
    (item) => item.observation_category_0 === "Spesies Invasif"
  );

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <h2 className="mb-4"><i className="fa fa-dashboard"></i> Dashboard Resort Base Management</h2>
          <div className="row">
            <div className="card text-white mb-4 border-0 shadow-sm">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="bg-dark p-3 text-white">
                    <div className="d-flex align-items-center">
                      <label htmlFor="year" className="mr-4">Tahun Aktif</label>
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
                      &nbsp;
                      <button
                        type="submit"
                        className="btn btn-md btn-primary border-0 shadow-sm ml-3"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </form>
                            {/* Kirim data ke AIAnalysis */}
            <AIAnalysis apiData={apiData} />
              </div>
            </div>
            <div className="col-xl-6 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Total Patroli</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{numberFormat(totalPatroli)}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Total Titik Temuan</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{numberFormat(totalTitik)}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-marker fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Daftar Resor (Station) */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Daftar Resor (Station){year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                </div>

                {/* Pie Chart */}
                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart width={250} height={200}>
                    <Pie
                      data={listStations}
                      dataKey="total"
                      nameKey="station"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {listStations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>

                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table table-striped">
                    {listStations.map((listStation, index) => (
                      <tr key={listStation.station}>
                        <td>{index + 1}</td>

                        <td>
                          <a
                            href={`/admin/patroli-rbm-station/${encodeURIComponent(listStation.station)}`}
                            className="text-warning "
                          >
                            {listStation.station}
                          </a>
                        </td>
                        <td className="text-end">{listStation.total}</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Resor : <strong className="text-warning">{numberFormat(totalStation)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>

            {/* Kategori Kepentingan (Mandate) */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Kategori Kepentingan (Mandate){year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                </div>

                {/* Pie Chart */}
                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart width={250} height={200}>
                    <Pie
                      data={listMandates}
                      dataKey="total"
                      nameKey="mandate"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {listMandates.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>

                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table table-striped">
                    {listMandates.map((listMandate, index) => (
                      <tr key={listMandate.mandate}>
                        <td>{index + 1}</td>

                        <td>
                          <a
                            href={`/admin/maps-rbm?mandate=${encodeURIComponent(listMandate.mandate)}`}
                            className="text-warning "
                          >
                            {listMandate.mandate}
                          </a>
                        </td>
                        <td className="text-end">{listMandate.total}</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Mandate : <strong className="text-warning">{numberFormat(totalMandate)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Summary Types */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Types{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                </div>

                {/* Pie Chart */}
                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart width={250} height={200}>
                    <Pie
                      data={listTypes}
                      dataKey="total"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {listTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>

                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table table-striped">
                    {listTypes.map((listType, index) => (
                      <tr key={listType.type}>
                        <td>{index + 1}</td>

                        <td>
                          <a
                            href={`/admin/maps-rbm?team=${encodeURIComponent(listType.type)}`}
                            className="text-warning "
                          >
                            {listType.type}
                          </a>
                        </td>
                        <td className="text-end">{listType.total}</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Team */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Team{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                </div>

                {/* Pie Chart */}
                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart width={250} height={200}>
                    <Pie
                      data={listTeams}
                      dataKey="total"
                      nameKey="team"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {listTeams.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>

                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table table-striped">
                    {listTeams.map((listTeam, index) => (
                      <tr key={listTeam.team}>
                        <td>{index + 1}</td>

                        <td>
                          <a
                            href={`/admin/maps-rbm?team=${encodeURIComponent(listTeam.team)}`}
                            className="text-warning "
                          >
                            {listTeam.team}
                          </a>
                        </td>
                        <td className="text-end">{listTeam.total}</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Team : <strong className="text-warning">{numberFormat(totalTeam)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Summary Leaders */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Leaders{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                </div>

                {/* Pie Chart */}
                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart width={250} height={200}>
                    <Pie
                      data={listLeaders}
                      dataKey="total"
                      nameKey="leader"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {listLeaders.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>

                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table table-striped">
                    {listLeaders.map((listLeader, index) => (
                      <tr key={listLeader.leader}>
                        <td>{index + 1}</td>

                        <td>
                          <a
                            href={`/admin/maps-rbm?leader=${encodeURIComponent(listLeader.leader)}`}
                            className="text-warning "
                          >
                            {listLeader.leader}
                          </a>
                        </td>
                        <td className="text-end">{listLeader.total}</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Leaders : <strong className="text-warning">{numberFormat(totalLeader)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Transport Types */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Transport Types{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                </div>

                {/* Pie Chart */}
                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart width={250} height={200}>
                    <Pie
                      data={listTransportTypes}
                      dataKey="total"
                      nameKey="patrol_transport_type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {listTransportTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>

                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table table-striped">
                    {listTransportTypes.map((listTransportType, index) => (
                      <tr key={listTransportType.patrol_transport_type}>
                        <td>{index + 1}</td>

                        <td>
                          <a
                            href={`/admin/maps-rbm?patrol_transport_type=${encodeURIComponent(listTransportType.patrol_transport_type)}`}
                            className="text-warning "
                          >
                            {listTransportType.patrol_transport_type}
                          </a>
                        </td>
                        <td className="text-end">{listTransportType.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Transport Types : <strong className="text-warning">{numberFormat(totalTransportType)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Summary Observation Categories */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Observation Categories{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
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

                        <td>
                          <a
                            href={`/admin/maps-rbm?observation_category_0=${encodeURIComponent(listObservationCategory_0.observation_category_0)}`}
                            className="text-warning "
                          >
                            {listObservationCategory_0.observation_category_0}
                          </a>
                        </td>
                        <td className="text-end">{listObservationCategory_0.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Observation Categories : <strong className="text-warning">{numberFormat(totalObservationCategory_0)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Aktifitas Manusia */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Aktifitas Manusia {year ? ` Tahun ${year}` : " Semua Tahun"}</h6>
                </div>
                {/* Bar Chart */}
                <div className="p-1" style={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <BarChart width={450} height={100} data={filterAktifitasManusia}>
                    {/* Menampilkan label kategori di bawah bar */}
                    <XAxis
                      dataKey="observation_category_1"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <Tooltip />
                    <Tooltip />
                    <Bar dataKey="total">
                      {listObservationCategory_1s.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>


                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table">
                    {filterAktifitasManusia.map((item, index) => (
                      <tr key={item.observation_category_1}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`/admin/maps-rbm?observation_category_1=${encodeURIComponent(item.observation_category_1)}`}
                            className="text-warning"
                          >
                            {item.observation_category_1}
                          </a>
                        </td>
                        <td className="text-end">{item.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

              </div>
            </div>

            {/* Summary Tumbuhan */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Tumbuhan {year ? ` Tahun ${year}` : " Semua Tahun"}</h6>
                </div>
                {/* Bar Chart */}
                <div className="p-1" style={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <BarChart width={450} height={100} data={filterTumbuhan}>
                    {/* Menampilkan label kategori di bawah bar */}
                    <XAxis
                      dataKey="observation_category_1"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <Tooltip />
                    <Tooltip />
                    <Bar dataKey="total">
                      {listObservationCategory_1s.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>


                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table">
                    {filterTumbuhan.map((item, index) => (
                      <tr key={item.observation_category_1}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`/admin/maps-rbm?observation_category_1=${encodeURIComponent(item.observation_category_1)}`}
                            className="text-warning"
                          >
                            {item.observation_category_1}
                          </a>
                        </td>
                        <td className="text-end">{item.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>


              </div>
            </div>

            {/* Summary Satwa */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Satwa {year ? ` Tahun ${year}` : " Semua Tahun"}</h6>
                </div>
                {/* Bar Chart */}
                <div className="p-1" style={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <BarChart width={450} height={100} data={filterSatwa}>
                    {/* Menampilkan label kategori di bawah bar */}
                    <XAxis
                      dataKey="observation_category_1"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <Tooltip />
                    <Tooltip />
                    <Bar dataKey="total">
                      {listObservationCategory_1s.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>


                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table">
                    {filterSatwa.map((item, index) => (
                      <tr key={item.observation_category_1}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`/admin/maps-rbm?observation_category_1=${encodeURIComponent(item.observation_category_1)}`}
                            className="text-warning"
                          >
                            {item.observation_category_1}
                          </a>
                        </td>
                        <td className="text-end">{item.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>


              </div>
            </div>

            {/* Summary Fitur */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Fitur {year ? ` Tahun ${year}` : " Semua Tahun"}</h6>
                </div>
                {/* Bar Chart */}
                <div className="p-1" style={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <BarChart width={450} height={200} data={filterFitur}>
                    {/* Menampilkan label kategori di bawah bar */}
                    <XAxis
                      dataKey="observation_category_1"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <Tooltip />
                    <Tooltip />
                    <Bar dataKey="total">
                      {listObservationCategory_1s.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>


                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table">
                    {filterFitur.map((item, index) => (
                      <tr key={item.observation_category_1}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`/admin/maps-rbm?observation_category_1=${encodeURIComponent(item.observation_category_1)}`}
                            className="text-warning"
                          >
                            {item.observation_category_1}
                          </a>
                        </td>
                        <td className="text-end">{item.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

              </div>
            </div>

            {/* Summary Bencana Alam  */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Bencana Alam {year ? ` Tahun ${year}` : " Semua Tahun"}</h6>
                </div>
                {/* Bar Chart */}
                <div className="p-1" style={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <BarChart width={450} height={200} data={filterBencana}>
                    {/* Menampilkan label kategori di bawah bar */}
                    <XAxis
                      dataKey="keterangan"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <Tooltip />
                    <Tooltip />
                    <Bar dataKey="total">
                      {listObservationCategory_1s.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>


                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table">
                    {filterBencana.map((item, index) => (
                      <tr key={item.keterangan}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`/admin/maps-rbm?observation_category_1=${encodeURIComponent(item.observation_category_1)}`}
                            className="text-warning"
                          >
                            {item.keterangan}
                          </a>
                        </td>
                        <td className="text-end">{item.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>

            {/* Summary Pemanfaatan */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Pemanfaatan {year ? ` Tahun ${year}` : " Semua Tahun"}</h6>
                </div>
                {/* Bar Chart */}
                <div className="p-1" style={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <BarChart width={450} height={200} data={filterPemanfaatan}>
                    {/* Menampilkan label kategori di bawah bar */}
                    <XAxis
                      dataKey="observation_category_1"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <Tooltip />
                    <Tooltip />
                    <Bar dataKey="total">
                      {listObservationCategory_1s.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>


                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table">
                    {filterPemanfaatan.map((item, index) => (
                      <tr key={item.observation_category_1}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`/admin/maps-rbm?observation_category_1=${encodeURIComponent(item.observation_category_1)}`}
                            className="text-warning"
                          >
                            {item.observation_category_1}
                          </a>
                        </td>
                        <td className="text-end">{item.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>

            {/* Summary Pengelolaan */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Pengelolaan {year ? ` Tahun ${year}` : " Semua Tahun"}</h6>
                </div>
                {/* Bar Chart */}
                <div className="p-1" style={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <BarChart width={450} height={200} data={filterPengelolaan}>
                    {/* Menampilkan label kategori di bawah bar */}
                    <XAxis
                      dataKey="observation_category_1"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      interval={0}
                    />
                    <Tooltip />
                    <Tooltip />
                    <Bar dataKey="total">
                      {listObservationCategory_1s.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </div>


                {/* Table */}
                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                  <table className="table">
                    {filterPengelolaan.map((item, index) => (
                      <tr key={item.observation_category_1}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`/admin/maps-rbm?observation_category_1=${encodeURIComponent(item.observation_category_1)}`}
                            className="text-warning"
                          >
                            {item.observation_category_1}
                          </a>
                        </td>
                        <td className="text-end">{item.total} Titik</td>
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
                  <h6>Summary Temuan{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
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

                        <td>
                          <a
                            href={`/admin/maps-rbm?tipe_temuan=${encodeURIComponent(listTipeTemuan.tipe_temuan)}`}
                            className="text-warning "
                          >
                            {listTipeTemuan.tipe_temuan}
                          </a>
                        </td>
                        <td className="text-end">{listTipeTemuan.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Temuan: <strong className="text-warning">{numberFormat(totalTipeTemuan)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Perlu Tindak Lanjut */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Perlu Tindak Lanjut{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
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

                        <td>
                          <a
                            href={`/admin/maps-rbm?perlu_tindak_lanjut=${encodeURIComponent(listPerluTindakLanjut.perlu_tindak_lanjut)}`}
                            className="text-warning "
                          >
                            {listPerluTindakLanjut.perlu_tindak_lanjut}
                          </a>
                        </td>
                        <td className="text-end">{listPerluTindakLanjut.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Perlu Tindak Lanjut: <strong className="text-warning">{numberFormat(totalPerluTindakLanjut)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Summary Status Tindak Lanjut */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Status Tindak Lanjut{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
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

                        <td>
                          <a
                            href={`/admin/maps-rbm?status_tindak_lanjut=${encodeURIComponent(listStatusTindakLanjut.status_tindak_lanjut)}`}
                            className="text-warning "
                          >
                            {listStatusTindakLanjut.status_tindak_lanjut}
                          </a>
                        </td>
                        <td className="text-end">{listStatusTindakLanjut.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Status Tindak Lanjut: <strong className="text-warning">{numberFormat(totalStatusTindakLanjut)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Tindakan */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Tindakan{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
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

                        <td>
                          <a
                            href={`/admin/maps-rbm?tindakan=${encodeURIComponent(listTindakan.tindakan)}`}
                            className="text-warning "
                          >
                            {listTindakan.tindakan}
                          </a>
                        </td>
                        <td className="text-end">{listTindakan.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Tindakan: <strong className="text-warning">{numberFormat(totalTindakan)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Summary Tumbuhan */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Jenis Tumbuhan{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
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
                          <a
                            href={`/admin/maps-rbm?jenis_tumbuhan=${encodeURIComponent(listTumbuhan.jenis_tumbuhan)}`}
                            className="text-warning "
                          >
                            {listTumbuhan.jenis_tumbuhan}
                          </a>
                        </td>
                        <td className="text-end">{listTumbuhan.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Jenis Tumbuhan: <strong className="text-warning">{numberFormat(totalTumbuhan)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Tindakan */}
            <div className="col-xl-6 col-md-6">
              <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                <div className="card-header">
                  <h6>Summary Jenis Satwa{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
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
                          <a
                            href={`/admin/maps-rbm?jenis_satwa=${encodeURIComponent(listSatwa.jenis_satwa)}`}
                            className="text-warning "
                          >
                            {listSatwa.jenis_satwa}
                          </a>
                        </td>
                        <td className="text-end">{listSatwa.total} Titik</td>
                      </tr>
                    ))}
                  </table>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <p>
                    Total Jenis Satwa: <strong className="text-warning">{numberFormat(totalSatwa)}</strong> dengan{" "}
                    <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </LayoutAdmin>
  );
}
