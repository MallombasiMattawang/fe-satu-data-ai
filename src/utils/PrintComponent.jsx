import React, { useRef } from "react";
// import QRCode from "qrcode.react";
import { QRCodeSVG } from "qrcode.react";
// import { QRCodeCanvas } from "qrcode.react";
import moneyFormat from "./MoneyFormat";
import dateTimeFormat from "./dateTimeFormat";

import { dateFormat } from "./DateFormat";

const PrintComponent = ({ data }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

    // Mengembalikan fungsi event listener untuk menyegarkan halaman setelah print
    window.location.reload();
  };

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={handlePrint}><i className="fas fa-print"></i> Print</button>
      <div ref={printRef} id="print-area" className="print-area">
        <table className="table table-bordered">
          <thead>
            <tr>
              <td colSpan={2} className="text-center">
                <strong>SCAN ME</strong> <br />
                <QRCodeSVG value={data.barcode} size={100} />
                <br />
                <small>{data.barcode}</small>
              </td>
            </tr>
            <tr className="text-center">
              <th>Rincian</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>
                Tarif PNBP <br />
                {data.status === "BIASA" ? (
                  <small className="text-end">
                    {moneyFormat(data.tarif_pnbp_hr_kerja)} x {data.jumlah}
                  </small>
                ) : (
                  <small className="text-end">
                    {moneyFormat(data.tarif_pnbp_hr_libur)} x {data.jumlah}
                  </small>
                )}
              </td>
              <td className="text-end">{moneyFormat(data.tarif_pnbp)}</td>
            </tr>
            <tr>
              <td>
                Tarif PAD <br />
                {data.status === "BIASA" ? (
                  <small className="text-end">
                    {moneyFormat(data.tarif_pemda_hr_kerja)} x {data.jumlah}
                  </small>
                ) : (
                  <small className="text-end">
                    {moneyFormat(data.tarif_pemda_hr_libur)} x {data.jumlah}
                  </small>
                )}
              </td>
              <td className="text-end">{moneyFormat(data.tarif_pemda)}</td>
            </tr>
            <tr>
              <td>
                Tarif Asuransi <br />
                {data.status === "BIASA" ? (
                  <small className="text-end">
                    {moneyFormat(data.tarif_asuransi_layanan)} x {data.jumlah}
                  </small>
                ) : (
                  <small className="text-end">
                    {moneyFormat(data.tarif_asuransi_layanan)} x {data.jumlah}
                  </small>
                )}
              </td>
              <td className="text-end">{moneyFormat(data.tarif_asuransi)}</td>
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
                <strong>{moneyFormat(data.tarif_total)}</strong>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-center bg-black text-white">
                <strong>
                  Tanggal Tiket {dateFormat(data.tgl_booking)} / HARI{" "}
                  {data.status}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-center">
                <small>Waktu : {dateTimeFormat(data.created_at)}</small> <br />
                <strong>TWA MALINO - KAB. GOWA - BBKSDA SULSEL</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrintComponent;
