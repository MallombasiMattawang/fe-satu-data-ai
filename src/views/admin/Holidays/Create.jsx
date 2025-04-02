//import react
import { useState, useEffect } from "react";

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

//import react Quill
import ReactQuill from "react-quill";

// quill CSS
import "react-quill/dist/quill.snow.css";

//format number input
import FormattedNumberInput from "../../../components/admin/FormattedNumberInput";

export default function HolidaysCreate() {
  //name page
  document.name = "Create Holiday";

  //navigata
  const navigate = useNavigate();

  //define state for form
  const [tgl_libur, setTgl_libur] = useState("");
  const [ket, setKet] = useState("");
  
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //useEffect
  useEffect(() => {
    
  }, []);

  //function "storeHoliday"
  const storeHoliday = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("tgl_libur", tgl_libur);
    formData.append("ket", ket);

    //sending data
    await Api.post("/api/admin/holidays", formData, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
        "description-type": "multipart/form-data",
      },
    })
      .then((response) => {
        //show toast
        toast.success(response.data.message, {
          position: "top-right",
          duration: 4000,
        });

        //redirect
        navigate("/admin/holidays");
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
                to="/admin/holidays"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Create Holiday
                  </h6>
                  <hr />
                  <form onSubmit={storeHoliday}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Tanggal Libur</label>
                      <input
                        type="date"
                        className="form-control"
                        value={tgl_libur}
                        onChange={(e) => setTgl_libur(e.target.value)}
                        placeholder="Enter Date Holiday"
                      />
                    </div>
                    {errors.tgl_libur && (
                      <div className="alert alert-danger">{errors.tgl_libur[0]}</div>
                    )}                    
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Keterangan</label>
                      <input
                        type="text"
                        className="form-control"
                        value={ket}                        
                        onChange={(e) => setKet(e.target.value)}
                      />
                    </div>
                    {errors.ket && (
                      <div className="alert alert-danger">
                        {errors.ket[0]}
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
