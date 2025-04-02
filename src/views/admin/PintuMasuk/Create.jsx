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

export default function PintuMasukCreate() {
  //name page
  document.name = "Create Pintu Masuk";

  //navigata
  const navigate = useNavigate();

  //define state for form
  const [name, setName] = useState("");
  const [active, setActive] = useState("");

  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //useEffect
  useEffect(() => {
    //call function "fetchDataCategories"
    // fetchDataCategories();
  }, []);

  //function "storeLayanan"
  const storeLayanan = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("name", name);
    formData.append("active", active);


    //sending data
    await Api.post("/api/admin/pintu-masuk", formData, {
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
                    <i className="fa fa-pencil-alt"></i> Create Pintu Masuk
                  </h6>
                  <hr />
                  <form onSubmit={storeLayanan}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Nama Pintu"
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
