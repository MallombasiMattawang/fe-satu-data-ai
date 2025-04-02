//import hook
import { useState, useEffect } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import service api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import Link
import { Link } from "react-router-dom";

import moneyFormat from "../../../utils/MoneyFormat";

//import react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TiketIndex() {
  //title page
  document.title = "Loket Tiket";

  const [layanans, setLayanans] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };


  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataLayanans"
  const fetchDataLayanans = async () => {
    try {
      const response = await Api.get("/api/admin/layanans/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLayanans(response.data.data);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error('Terlalu banyak permintaan. Silakan coba lagi setelah beberapa saat.');
      } else {
        console.error(error);
      }
    }
  };

  //hook useEffect
  useEffect(() => {
    //call function "fetchDataLayanans"
    fetchDataLayanans();

  }, [token]);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mt-5">
          <div className="row">
            {layanans.map((layanan) => (
              <div className="col-xl-4 col-md-6 mb-4" key={layanan.id}>
                <div className="card border-0 shadow-sm">
                  <div className="d-flex align-items-center p-3">
                    <img
                      src={layanan.image}
                      alt={layanan.name}
                      width={100}
                      height={100}
                      className="rounded-circle me-3"
                    />
                    <div>
                      <h5 className="card-title mb-2">
                        <Link
                          className="text-decoration-none text-dark"
                          to={`/admin/tiket/create/${layanan.id}/${getCurrentDate()}`}
                        >
                          <strong>{layanan.name}</strong>
                        </Link>
                      </h5>
                      <div className="small text-muted">
                        <i className="fas fa-ticket"></i> Tarif {moneyFormat(layanan.tarif_pnbp_hr_kerja)} / Org
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </LayoutAdmin>
  );
}
