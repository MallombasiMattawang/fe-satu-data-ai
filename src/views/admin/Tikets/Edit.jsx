//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css";

//import toast
import toast from "react-hot-toast";
import PrintComponent from "../../../utils/PrintComponent";

//import MoneyFormat
import moneyFormat from "../../../utils/MoneyFormat";

//import DateFormat
import dateTimeFormat from "../../../utils/dateTimeFormat";

//import qrcode
// import QRCode from "qrcode.react";

//css print
import "../../../assets/admin/css/print.css";
import { dateFormat } from "../../../utils/DateFormat";

export default function TiketEdit() {
  //title page
  document.title = "Bayar Tiket";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form
  const [layanan, setLayanan] = useState("");
  const [tgl_booking, setTgl_booking] = useState("");
  const [status, setStatus] = useState("");
  const [tarif_pnbp_hr_kerja, setTarif_pnbp_hr_kerja] = useState("");
  const [tarif_pemda_hr_kerja, setTarif_pemda_hr_kerja] = useState("");
  const [tarif_pnbp_hr_libur, setTarif_pnbp_hr_libur] = useState("");
  const [tarif_pemda_hr_libur, setTarif_pemda_hr_libur] = useState("");
  const [tarif_asuransi_layanan, setTarif_asuransi_layanan] = useState("");

  const [barcode, setbarcode] = useState("");
  const [kode_booking, setKode_booking] = useState("");
  const [tarif_pnbp, setTarif_pnbp] = useState("");
  const [tarif_pemda, setTarif_pemda] = useState("");
  const [tarif_asuransi, setTarif_asuransi] = useState("");
  const [tarif_total, setTarif_Total] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [image, setImage] = useState("");
  const [bukti_tf, setBukti_tf] = useState("");
  const [is_active, setIs_active] = useState("");

  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataTiket"
  const fetchDataTiket = async () => {
    await Api.get(`/api/admin/tiket/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setLayanan(response.data.data.layanan.name);
      setTarif_pemda_hr_kerja(response.data.data.layanan.tarif_pemda_hr_kerja);
      setTarif_pemda_hr_libur(response.data.data.layanan.tarif_pemda_hr_libur);
      setTarif_pnbp_hr_kerja(response.data.data.layanan.tarif_pnbp_hr_kerja);
      setTarif_pnbp_hr_libur(response.data.data.layanan.tarif_pnbp_hr_libur);
      setTarif_asuransi_layanan(response.data.data.layanan.tarif_asuransi);

      setTgl_booking(response.data.data.tgl_booking);
      setStatus(response.data.data.status);

      setKode_booking(response.data.data.kode_booking);
      setbarcode(response.data.data.barcode);
      setTarif_pnbp(response.data.data.tarif_pnbp);
      setTarif_pemda(response.data.data.tarif_pemda);
      setTarif_asuransi(response.data.data.tarif_asuransi);
      setTarif_Total(response.data.data.tarif_total);
      setJumlah(response.data.data.jumlah);
      setCreated_at(response.data.data.created_at);
      setBukti_tf(response.data.data.bukti_tf);
      setIs_active(response.data.data.is_active);
    });
  };

  //function "updateLayanan"
  const updateLayanan = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("id", id);
    formData.append("is_active", is_active);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/tiket/${id}`, formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/tiket-booking");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataTiket"
    fetchDataTiket();
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/tiket-booking"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-ticket"></i> Kode Booking:{" "}
                    {kode_booking}
                  </h6>
                  <hr />
                  <table className="table table-bordered">
                    <thead>
                      <tr className="text-center">
                        <th>Rincian Harga Tiket</th>
                        <th>Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Tarif PERUSDA <br />
                          {status === "BIASA" ? (
                            <small className="text-end">
                              {moneyFormat(tarif_pemda_hr_kerja)} x {jumlah}
                            </small>
                          ) : (
                            <small className="text-end">
                              {moneyFormat(tarif_pemda_hr_libur)} x {jumlah}
                            </small>
                          )}
                        </td>
                        <td className="text-end">{moneyFormat(tarif_pemda)}</td>
                      </tr>
                      <tr>
                        <td>
                          Tarif PNBP <br />
                          {status === "BIASA" ? (
                            <small className="text-end">
                              {moneyFormat(tarif_pnbp_hr_kerja)} x {jumlah}
                            </small>
                          ) : (
                            <small className="text-end">
                              {moneyFormat(tarif_pnbp_hr_libur)} x {jumlah}
                            </small>
                          )}
                        </td>
                        <td className="text-end">{moneyFormat(tarif_pnbp)}</td>
                      </tr>
                      <tr>
                        <td>
                          Tarif Asuransi <br />
                          {status === "BIASA" ? (
                            <small className="text-end">
                              {moneyFormat(tarif_asuransi_layanan)} x {jumlah}
                            </small>
                          ) : (
                            <small className="text-end">
                              {moneyFormat(tarif_asuransi_layanan)} x {jumlah}
                            </small>
                          )}
                        </td>
                        <td className="text-end">
                          {moneyFormat(tarif_asuransi)}
                        </td>
                      </tr>
                      {/* <tr>
                        <td>
                          <strong>Jumlah Tiket</strong>
                        </td>
                        <td className="text-end">
                          <strong>{jumlah}</strong>
                        </td>
                      </tr> */}
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td className="text-end">
                          <strong>{moneyFormat(tarif_total)}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tanggal Tiket</strong>
                        </td>
                        <td className="text-end">
                          <strong>
                            {dateFormat(tgl_booking)} / HARI {status}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Waktu Pemesanan</strong>
                        </td>
                        <td className="text-end">
                          <strong>{dateTimeFormat(created_at)}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <PrintComponent data={dataToPrint} /> */}
                  <div className="alert alert-info text-center">
                    <p>
                      Bukti Transfer: <br />
                      <img src={bukti_tf} alt="" className="img-fluid"/>
                    </p>
                  </div>
                  <form onSubmit={updateLayanan}>
                  <div className="mb-3">
                      <label className="form-label fw-bold">
                        Aktifasi Tiket ?
                      </label>
                      <select
                        className="form-select"
                        value={is_active}
                        onChange={(e) => setIs_active(e.target.value)}
                      >
                        <option value="">-- Select Status --</option>
                        <option value="1"> YES</option>
                        <option value="0"> NO</option>
                        <option value="2"> PENDING</option>
                      </select>
                    </div>
                    {errors.is_active && (
                      <div className="alert alert-danger">
                        {errors.is_active[0]}
                      </div>
                    )}
                    <input
                          type="hidden"
                          value={id}
                          name="id"
                        />
                    <div>
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                      >
                        <i className="fa fa-save"></i> Save
                      </button>
                      <button type="reset" className="btn btn-md btn-warning">
                        <i className="fa fa-redo"></i> Reset
                      </button>
                    </div>
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
