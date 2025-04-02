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


export default function PintuMasukEdit() {
  //title page
  document.title = "Edit Pintu Masuk - ETiketing";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form
  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataLayanan"
  const fetchDataLayanan = async () => {
    await Api.get(`/api/admin/pintu-masuk/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setName(response.data.data.name);
      setActive(response.data.data.active);
      
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataLayanan"
    fetchDataLayanan();
  }, []);

  //function "updateLayanan"
  const updateLayanan = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("name", name);
    formData.append("active", active);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/pintu-masuk/${id}`, formData, {
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
        navigate("/admin/pintu-masuk");
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
                to="/admin/pintu-masuk"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Edit Pintu Masuk
                  </h6>
                  <hr />
                  <form onSubmit={updateLayanan}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name Layanan"
                      />
                    </div>
                    {errors.name && (
                      <div className="alert alert-danger">{errors.name[0]}</div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Status Active ?
                      </label>
                      <select
                        className="form-select"
                        value={active}
                        onChange={(e) => setActive(e.target.value)}
                      >
                        <option value="">-- Select Status --</option>
                        <option value="YES"> YES</option>
                        <option value="NO"> NO</option>
                      </select>
                    </div>
                    {errors.active && (
                      <div className="alert alert-danger">
                        {errors.active[0]}
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
