import React from "react";

const DataTable = ({ patroliData }) => {
  return (
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
                <td>
                  {new Date(detail.waypoint_time).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </td>
                <td>{detail.mandate}</td>
                <td>{detail.transport}</td>
                <td>{detail.geometry}</td>
                <td>{detail.observation_category_0}</td>
                <td>{detail.observation_category_1}</td>
                <td>{detail.jenis_tumbuhan}</td>
                <td>{detail.jenis_satwa}</td>
                <td>{detail.keterangan}</td>
                <td>{detail.tipe_temuan}</td>
                <td>{detail.perlu_tindak_lanjut ? "Ya" : "Tidak"}</td>
                <td>{detail.status_tindak_lanjut}</td>
                <td>
                  <button className="btn btn-sm btn-primary">Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
