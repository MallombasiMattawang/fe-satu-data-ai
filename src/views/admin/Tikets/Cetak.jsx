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

export default function Cetak() {
  //title page
  document.title = "Cetak Tiket";

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

  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataLayanan"
  const fetchDataLayanan = async () => {
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
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataLayanan"
    fetchDataLayanan();
  }, []);

  // data object to be passed to PrintComponent
  const dataToPrint = {
    layanan,
    barcode,
    tarif_pnbp,
    tarif_pemda,
    tarif_asuransi,
    tarif_total,
    jumlah,
    created_at,
    tgl_booking,
    status,
    tarif_pnbp_hr_kerja,
    tarif_pemda_hr_kerja,
    tarif_pnbp_hr_libur,
    tarif_pemda_hr_libur,
    tarif_asuransi_layanan,
    kode_booking,
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/tiket"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> CETAK {layanan}
                  </h6>
                  <hr />
                  {/* <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Rincian Harga Tiket</th>
                        <th>Harga</th>
                        <th>Barcode</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tarif PERUSDA</td>
                        <td className="text-end">
                          {moneyFormat(tarif_pemda)}
                        </td>
                        <td rowSpan={6} className="text-center">
                          <QRCode value={barcode} size={120} /><br />
                          <small>{barcode}</small>
                        </td>
                      </tr>
                      <tr>
                        <td>Tarif PNBP</td>
                        <td className="text-end">
                          {moneyFormat(tarif_pnbp)}
                        </td>
                      </tr>
                      <tr>
                        <td>Tarif Asuransi</td>
                        <td className="text-end">
                          {moneyFormat(tarif_asuransi)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Jumlah Tiket</strong>
                        </td>
                        <td className="text-end">
                          <strong>
                            {jumlah}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td className="text-end">
                          <strong>
                            {moneyFormat(tarif_total)}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tanggal</strong>
                        </td>
                        <td className="text-end">
                          <strong>
                            {dateTimeFormat(created_at)}
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table> */}
                  <PrintComponent data={dataToPrint} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
