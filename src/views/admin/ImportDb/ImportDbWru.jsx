//import react
import { useState } from "react";

//import react router dom
import { Link, useNavigate } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

//import xlsx
// import * as XLSX from "xlsx";

export default function ImportDbWru() {
  //name page
  document.name = "Import DB WRU";

  //navigata
  const navigate = useNavigate();

  //state for file
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("2022"); // Default tahun


  //state for loading
  const [loading, setLoading] = useState(false);

  //token from cookies
  const token = Cookies.get("token");

  //function to handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  //function "storeDb"
  const storeDb = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload a file before submitting!", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    // Set loading to true to show animation and disable button
    setLoading(true);

    //define formData
    const formData = new FormData();

    //append file to formData
    formData.append("file", file);
    formData.append("year", year); 

    //sending data
    await Api.post("/api/admin/import-db-wru", formData, {
      //header
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/dashboard-rbm");
      })
      .catch((error) => {
        toast.error(
          error.response && error.response.data
            ? error.response.data.message
            : "Upload failed",
          {
            position: "top-right",
            duration: 4000,
          }
        );
      })
      .finally(() => {
        // Set loading to false to re-enable button
        setLoading(false);
      });
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/dashboard-rbm"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Create Database WRU
                  </h6>
                  <hr />
                  <form onSubmit={storeDb}>
                  {/* Select Tahun */}
                  <div className="form-group mb-3">
                      <label htmlFor="year">Select Year</label>
                      <select
                        id="year"
                        className="form-control"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      >
                      <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="file" className="form-label">
                        Upload Excel File
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-md btn-primary me-2"
                        disabled={loading}
                      >
                        {loading ? (
                          <span>
                            <i className="fa fa-spinner fa-spin"></i> Uploading...
                          </span>
                        ) : (
                          <span>
                            <i className="fa fa-save"></i> Save
                          </span>
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn btn-md btn-warning"
                        disabled={loading}
                      >
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