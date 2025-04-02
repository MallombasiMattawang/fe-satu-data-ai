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

//import toast
import toast from "react-hot-toast";

//import react Quill
import ReactQuill from "react-quill";

// quill CSS
import "react-quill/dist/quill.snow.css";

//format number input
import FormattedNumberInput from "../../../components/admin/FormattedNumberInput";

export default function ConfigDayEdit() {
  //title page
  document.title = "Edit Config Day - ETiketing";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form  
  const [status, setStatus] = useState("");

  //define day
  const [time, setTime] = useState(new Date());
  
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataLayanan"
  const fetchDataLayanan = async () => {
    await Api.get(`/api/admin/config-day/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {

      //set response data to state      
      setStatus(response.data.data.status);
      
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataLayanan"
    fetchDataLayanan();
  }, []);

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const months = [
    "January",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[time.getDay()];
  const monthName = months[time.getMonth()];
  const day = time.getDate();
  const year = time.getFullYear();

  //function "updateLayanan"
  const updateLayanan = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"    
    formData.append("status", status);    
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/config-day/${id}`, formData, {
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
        navigate("/admin/tiket");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
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
                    <i className="fa fa-pencil-alt"></i> Ubah Status Hari {dayName}, {day} {monthName} {year}
                  </h6>
                  <hr />
                  <form onSubmit={updateLayanan}>                   

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Status Hari
                      </label>
                      <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">-- Select Status --</option>
                        <option value="BIASA"> BIASA</option>
                        <option value="LIBUR"> LIBUR</option>
                      </select>
                    </div>
                    {errors.status && (
                      <div className="alert alert-danger">
                        {errors.status[0]}
                      </div>
                    )}

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
