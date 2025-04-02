//import hook
import { useState, useEffect } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import service api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import Link from react router dom
import { Link } from "react-router-dom";

//import MoneyFormat
import moneyFormat from "../../../utils/MoneyFormat";


export default function Dashboard() {
  //title page
  document.title = "Dashboard - Satu Data";

  //init state
  const [today, setToday] = useState(0);
  const [moon, setMoon] = useState(0);
  const [perusdaToday, setPerusdaToday] = useState(0);
  const [pnbpToday, setPnbpToday] = useState(0);
  const [asuransiToday, setAsuransiToday] = useState(0);

  const [perusdaMoon, setPerusdaMoon] = useState(0);
  const [pnbpMoon, setPnbpMoon] = useState(0);
  const [asuransiMoon, setAsuransiMoon] = useState(0);

  const [perusdaTotal, setPerusdaTotal] = useState(0);
  const [pnbpTotal, setPnbpTotal] = useState(0);
  const [asuransiTotal, setAsuransiTotal] = useState(0);

  const [totalToday, setTotalToday] = useState(0);
  const [totalMoon, setTotalMoon] = useState(0);
  const [totalAll, setTotalAll] = useState(0);

  const [countCategories, setCountCategories] = useState(0);
  const [countPosts, setCountPosts] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  const [countAparaturs, setCountAparaturs] = useState(0);

  //token from cookies
  const token = Cookies.get("token");

  //hook useEffect
  useEffect(() => {
    //fetch api
    Api.get("/api/admin/dashboard", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setToday(response.data.data.today);
      setMoon(response.data.data.moon);
      setPerusdaToday(response.data.data.perusdaToday);
      setPnbpToday(response.data.data.pnbpToday);
      setAsuransiToday(response.data.data.asuransiToday);
      setPerusdaMoon(response.data.data.perusdaMoon);
      setPnbpMoon(response.data.data.pnbpMoon);
      setAsuransiMoon(response.data.data.asuransiMoon);
      setPerusdaTotal(response.data.data.perusdaTotal);
      setPnbpTotal(response.data.data.pnbpTotal);
      setAsuransiTotal(response.data.data.asuransiTotal);
      setTotalToday(response.data.data.totalToday);
      setTotalMoon(response.data.data.totalMoon);
      setTotalAll(response.data.data.totalAll);

      setCountCategories(response.data.data.categories);
      setCountPosts(response.data.data.posts);
      setCountProducts(response.data.data.products);
      setCountAparaturs(response.data.data.aparaturs);
    });
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <h3 className="mb-4"><i className="fa fa-info"></i> Tentang Satu-Data BBKSDA Sulawesi Selatan</h3>
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <div className="card bg-default mb-4 border-0 shadow-sm">
                <div className="card-body">
                  <p>
                    Satu-Data BBKSDA Sulawesi Selatan adalah aplikasi pusat data atau datacenter resmi yang dikelola oleh Balai Besar Konservasi Sumber Daya Alam (BBKSDA) Sulawesi Selatan. Aplikasi ini dirancang untuk mendukung fungsi dan layanan BBKSDA dalam mengelola dan menyediakan informasi yang terintegrasi, akurat, serta dapat diakses dengan mudah oleh seluruh pihak terkait.
                  </p>
                </div>

              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="card bg-primary text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img src={"/images/logo-smart.png"} width={"130"} height={"130"} className="mb-3" />
                  <p>
                    Data ini mencakup informasi terkait pengelolaan kawasan konservasi di tingkat resort. Setiap resort mengelola dan memantau kondisi sumber daya alam dan satwa liar yang berada dalam pengawasan BBKSDA Sulawesi Selatan.
                  </p>
                </div>
                <div className="card-footer text-center">
                  <Link
                    to="/admin/dashboard-rbm"
                    className="btn btn-md btn-primary border-0 shadow-sm w-100"
                    type="button"
                  >
                    <i className="fa fa-eye"></i> DATA RBM
                  </Link>


                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6">
              <div className="card bg-success text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img src={"/images/logo-wru.png"} width={"140"} height={"130"} className="mb-3" />
                  <p>
                    Data WRU memuat laporan penyelamatan dan rehabilitasi satwa liar yang dilindungi. Unit ini berperan penting dalam penanganan konflik manusia-satwa, penyelamatan satwa, serta pelepasliaran satwa ke habitat alaminya.
                  </p>
                </div>
                <div className="card-footer text-center">
                  <Link
                    to="/admin/dashboard-wru"
                    className="btn btn-md btn-primary border-0 shadow-sm w-100"
                    type="button"
                  >
                    <i className="fa fa-eye"></i> DATA WRU
                  </Link>

                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img src={"/images/logo-bmn.png"} width={"150"} height={"130"} className="mb-3" />
                  <p>
                    Barang Milik Negara adalah aset yang diperoleh atas (APBN) atau berasal dari perolehan lain yang sah. BMN mencakup aset tanah, bangunan, kendaraan dinas, peralatan kantor, serta aset tidak berwujud seperti hak paten dan perangkat lunak.
                  </p>
                </div>
                <div className="card-footer text-center">
                  <Link
                    to="/admin/dashboard-bmn"
                    className="btn btn-md btn-primary border-0 shadow-sm w-100"
                    type="button"
                  >
                    <i className="fa fa-eye"></i> DATA BMN
                  </Link>

                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-warning text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img src={"/images/logo-kemenhut.png"} width={"130"} height={"130"} className="mb-3" />
                  <p>
                    Data informasi laporan Callcenter, perizinan penangkaran satwa liar, pengangkutan tumbuhan dan satwa liar (SATS-DN), hingga kegiatan wisata alam atau penelitian dalam kawasan konservasi (SIMAKSI).
                  </p>
                </div>
                <div className="card-footer text-center">
                  DATA LAYANAN

                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-danger text-white mb-4 border-0 shadow-sm">
                <div className="card-body text-center">
                  <img src={"/images/ksda.png"} width={"130"} height={"130"} className="mb-3" />
                  <p>
                    Data Informasi yang memuat perjanjian kerja sama yang telah dilakukan BBKSDA dengan pihak ketiga dalam rangka penguatan fungsi atau pembangunan strategis di Kawasan Konservasi BBKSDA Sulawesi Selatan.
                  </p>
                </div>
                <div className="card-footer text-center">
                  DATA PKS

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
