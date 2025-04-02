//import useState and useEffect
import { useState, useEffect } from "react";

//import Link from react router dom
import { Link } from "react-router-dom";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import permissions
import hasAnyPermission from "../../../utils/Permissions";

//import pagination component
import Pagination from "../../../components/general/Pagination";

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert";

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css";

//import MoneyFormat
import moneyFormat from "../../../utils/MoneyFormat";

//import toast
import toast from "react-hot-toast";

//import qrcode
// import QRCode from "qrcode.react";
import { QRCodeSVG } from "qrcode.react";

export default function TiketAll() {
  //title page
  document.title = "Tiket Keluar";

  //define state "layanans"
  const [layanans, setLayanans] = useState([]);

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //token from cookies
  const token = Cookies.get("token");

  // Mengambil tanggal hari ini
  const today = new Date();
  
  // Memformat tanggal menjadi YYYY-MM-DD
  const formattedDate = today.toISOString().slice(0, 10);

  //function fetchData
  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(`/api/admin/tiket?search=${keywords}&page=${page}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setLayanans"
      setLayanans(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
  }, []);

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  //function "deletePost"
  const deletePost = (id) => {
    //show confirm alert
    confirmAlert({
      title: "Are You Sure ?",
      message: "want to delete this data ?",
      buttons: [
        {
          label: "YES",
          onClick: async () => {
            await Api.delete(`/api/admin/tiket/${id}`, {
              //header
              headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              //show toast
              toast.success(response.data.message, {
                position: "top-right",
                duration: 4000,
              });

              //call function "fetchData"
              fetchData();
            });
          },
        },
        {
          label: "NO",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="search here..."
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0 text-center">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Date</th>
                          <th className="border-0">Layanan</th>
                          <th className="border-0">Barcode</th>
                          <th className="border-0">PNBP</th>
                          <th className="border-0">PEMDA</th>
                          <th className="border-0">Asuransi</th>
                          <th className="border-0">Total</th>
                          <th className="border-0">
                            Is Active ?
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          //cek apakah data ada
                          layanans.length > 0 ? (
                            //looping data "categories" dengan "map"
                            layanans.map((layanan, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>
                                    {new Date(layanan.created_at).toLocaleDateString('id-ID')}
                                </td>
                                <td>{layanan.layanan.name}</td>
                                <td className="text-center">
                                    <QRCodeSVG value={layanan.barcode} size={50}/><br />
                                    <small>{layanan.barcode}</small>
                                
                                </td>
                                <td className="text-end">
                                  {moneyFormat(layanan.tarif_pnbp)}
                                </td>
                                <td className="text-end">
                                  {moneyFormat(layanan.tarif_pemda)}
                                </td>
                                <td className="text-end">
                                  {moneyFormat(layanan.tarif_asuransi)}
                                </td>
                                <td className="text-end">
                                  {moneyFormat(layanan.tarif_total)}
                                </td>
                                <td className="text-center">
                                  {layanan.is_active == 1 ? <span className="badge bg-success">Active</span> : <span className="badge bg-secondary">Non Active</span>}
                                </td>
                              </tr>
                            ))
                          ) : (
                            //tampilkan pesan data belum tersedia
                            <tr>
                              <td colSpan={9}>
                                <div
                                  className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  Data Belum Tersedia!.
                                </div>
                              </td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
