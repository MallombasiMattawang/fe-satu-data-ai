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

import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Cell, Tooltip, Legend } from "recharts";

//import AI
import AIAnalysis from "../../../components/admin/AIAnalysis";

const COLORS = [
    "#0088FE", "#D72638", "#FFBB28", "#FF8042", "#00C49F", "#4ECDC4", "#C7F464", "#7D3C98", "#76D7C4", "#F5B041",
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


export default function DashboardWru() {
    //title page
    document.title = "Dashboard - WRU";

    //init state
    const [totalKejadian, setTotalKejadian] = useState(0);
    const [totalTsl, setTotalTsl] = useState(0);
    const [totalJenisTsl, setTotaJenisTsl] = useState(0);
    const [listKejadian, setListKejadian] = useState([]);
    const [listTsl, setListTsl] = useState([]);
    const [listTslSerahan, setListTslSerahan] = useState([]);
    const [listTslKandang, setListTslKandang] = useState([]);
    const [listTslKematian, setListTslKematian] = useState([]);
    const [listTslKonflik, setListTslKonflik] = useState([]);
    const [listTslPelepasliaran, setListTslPelepasliaran] = useState([]);
    const [listTslTranslokasi, setListTslTranslokasi] = useState([]);
    const [listTslTitipan, setListTslTitipan] = useState([]);
    const [listTslPatroli, setListTslPatroli] = useState([]);
    const [listTslLainnya, setListTslLainnya] = useState([]);
    const [listPihakMenyerahkan, setListPihakMenyerahkan] = useState([]);
    const [listPenyebabKematian, setListPenyebabKematian] = useState([]);
    const [listKejadianKonflik, setListKejadianKonflik] = useState([]);

    //API kirim ke AI
    const [apiData, setApiData] = useState([]);

    // State untuk menyimpan nilai filter dari setiap input
    const [filters, setFilters] = useState({
        year: "",
        patrol_id: "",
        station: "",
        observation_category: "",
        sub_observation_category: "",
        jenis_tumbuhan: "",
        jenis_satwa: "",
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
        window.location.href = `/admin/dashboard-wru?${queryString}`;
    };

    //token from cookies
    const token = Cookies.get("token");
    // Ambil parameter "year" dari URL
    const queryParams = new URLSearchParams(location.search);
    const year = queryParams.get("year");

    //hook useEffect
    useEffect(() => {
        //fetch api
        Api.get("/api/admin/dashboard-wru", {
            params: {
                tgl: year, // Tambahkan parameter year
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            //set data
            setTotalKejadian(response.data.data.totalKejadian)
            setTotalTsl(response.data.data.totalTsl)
            setTotaJenisTsl(response.data.data.totalJenisTsl)
            setListKejadian(response.data.data.listKejadian)
            setListTsl(response.data.data.listTsl)
            setListTslSerahan(response.data.data.listTslSerahan)
            setListTslKandang(response.data.data.listTslKandang)
            setListTslKematian(response.data.data.listTslKematian)
            setListTslKonflik(response.data.data.listTslKonflik)
            setListTslPelepasliaran(response.data.data.listTslPelepasliaran)
            setListTslTranslokasi(response.data.data.listTslTranslokasi)
            setListTslTitipan(response.data.data.listTslTitipan)
            setListTslPatroli(response.data.data.listTslPatroli)
            setListTslLainnya(response.data.data.listTslLainnya)
            setListPihakMenyerahkan(response.data.data.listPihakMenyerahkan)
            setListPenyebabKematian(response.data.data.listPenyebabKematian)
            setListKejadianKonflik(response.data.data.listKejadianKonflik)

            setApiData(response.data.data);
        });
    }, []);

    return (
        <LayoutAdmin>
            <main>
                <div className="container-fluid px-4 mt-5">
                    <h2 className="mb-4"><i className="fa fa-dashboard"></i> Dashboard WRU (Wildlife Rescue Unit)</h2>
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
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
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
                        <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Kejadian</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{numberFormat(totalKejadian)}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total TSL</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{numberFormat(totalTsl)}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-marker fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Jenis TSL</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{numberFormat(totalJenisTsl)}</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-marker fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {/* Summary kejadian */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Kejadian{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listKejadian}
                                            dataKey="total"
                                            nameKey="jenis_kejadian"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listKejadian.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listKejadian.map((listData, index) => (
                                            <tr key={listData.jenis_kejadian}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_kejadian=${encodeURIComponent(listData.jenis_kejadian)}`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_kejadian}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Summary TSL */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Jenis TSL{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTsl}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTsl.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTsl.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Summary serahan */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Serahan{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTslSerahan}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTslSerahan.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslSerahan.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=SERAHAN`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Summary Pihak penyerahan TSL */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Pihak yang menyerahkan{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listPihakMenyerahkan}
                                            dataKey="total"
                                            nameKey="serahan"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listPihakMenyerahkan.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listPihakMenyerahkan.map((listData, index) => (
                                            <tr key={listData.serahan}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?serahan=${encodeURIComponent(listData.serahan)}`}
                                                        className="text-warning "
                                                    >
                                                        {listData.serahan}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Summary Kematian TSL */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Jenis TSL Mati{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <BarChart width={450} height={100} data={listTslKematian}>
                                        {/* Menampilkan label kategori di bawah bar */}
                                        <XAxis
                                            dataKey="jenis_tsl"
                                            tick={{ fontSize: 12 }}
                                            angle={-45}
                                            textAnchor="end"
                                            interval={0}
                                        />
                                        <Tooltip />
                                        <Tooltip />
                                        <Bar dataKey="total">
                                            {listTslKematian.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslKematian.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=KEMATIAN TSL`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Summary penyebab kematian TSL */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary penyebab kematian {year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listPenyebabKematian}
                                            dataKey="total"
                                            nameKey="penyebab_kematian"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listPenyebabKematian.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listPenyebabKematian.map((listData, index) => (
                                            <tr key={listData.penyebab_kematian}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?penyebab_kematian=${encodeURIComponent(listData.penyebab_kematian)}`}
                                                        className="text-warning "
                                                    >
                                                        {listData.penyebab_kematian}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Summary kandang transit */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Kandang Transit{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTslKandang}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTslKandang.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslKandang.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=KANDANG TRANSIT`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Summary Konflik TSL */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Konflik TSL{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTslKonflik}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTslKonflik.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslKonflik.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=KONFLIK TSL`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-md-12">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Daftar Konflik TSL{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>
                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "550px" }}>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Tanggal</th>
                                                <th>Lokasi</th>
                                                <th>Koordinat</th>
                                                <th>Kode TSL</th>
                                                <th>Jenis TSL</th>
                                                <th>Jumlah</th>
                                                <th>Deskripsi Konflik</th>
                                                <th>Penanganan Konflik</th>
                                                <th>Keterangan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listKejadianKonflik.map((detail, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{new Date(detail.tgl).toLocaleDateString("id-ID")}</td>
                                                    <td>{detail.lokasi}</td>
                                                    <td>{detail.koordinat}</td>
                                                    <td>{detail.kode_tsl}</td>
                                                    <td>{detail.jenis_tsl}</td>
                                                    <td>{detail.jml_tsl}</td>
                                                    <td>{detail.deskripsi_konflik}</td>
                                                    <td>{detail.penanganan_konflik}</td>
                                                    <td>{detail.keterangan}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Summary pelepasliaran */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Pelepasliaran TSL {year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTslPelepasliaran}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTslPelepasliaran.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslPelepasliaran.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=PELEPASLIARAN`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Summary Translokasi TSL */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Translokasi TSL{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTslTranslokasi}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTslTranslokasi.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslTranslokasi.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=TRANSLOKASI`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Summary Penitipan */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Titipan TSL {year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTslTitipan}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTslTitipan.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslTitipan.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=TITIPAN`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Summary Patroli TSL */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Patroli TSL{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTslPatroli}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTslPatroli.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslPatroli.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=PATROLI`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Summary Patroli TSL */}
                        <div className="col-xl-6 col-md-6">
                            <div className="card mb-4 border-0 shadow-sm" style={{ height: "550px" }}>
                                <div className="card-header">
                                    <h6>Summary Lainnya{year ? `Tahun ${year}` : " Semua Tahun"}</h6>
                                </div>

                                {/* Pie Chart */}
                                <div className="p-2" style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <PieChart width={250} height={200}>
                                        <Pie
                                            data={listTslLainnya}
                                            dataKey="total"
                                            nameKey="jenis_tsl"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label
                                        >
                                            {listTslLainnya.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </div>

                                {/* Table */}
                                <div className="card-body p-2" style={{ overflowY: "auto", maxHeight: "250px" }}>
                                    <table className="table table-striped">
                                        {listTslLainnya.map((listData, index) => (
                                            <tr key={listData.jenis_tsl}>
                                                <td>{index + 1}</td>

                                                <td>
                                                    <a
                                                        href={`/admin/maps-wru?jenis_tsl=${encodeURIComponent(listData.jenis_tsl)}&jenis_kejadian=LAINNYA`}
                                                        className="text-warning "
                                                    >
                                                        {listData.jenis_tsl}
                                                    </a>
                                                </td>
                                                <td className="text-end">{listData.total}</td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>

                                <div className="card-footer d-flex justify-content-between">
                                    <p>
                                        {/* Total Type : <strong className="text-warning">{numberFormat(totalType)}</strong> dengan{" "}
                                        <strong className="text-warning">{numberFormat(totalPatroli)}</strong> kali Patroli */}
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