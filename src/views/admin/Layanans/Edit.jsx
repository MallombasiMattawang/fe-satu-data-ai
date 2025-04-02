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

export default function LayanansEdit() {
  //title page
  document.title = "Edit Layanan - ETiketing";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //define state for form
  const [name, setName] = useState("");
  const [active, setActive] = useState("");
  const [tarif_pnbp_hr_kerja, setTarif_pnbp_hr_kerja] = useState("");
  const [tarif_pemda_hr_kerja, setTarif_pemda_hr_kerja] = useState("");
  const [tarif_pnbp_hr_libur, setTarif_pnbp_hr_libur] = useState("");
  const [tarif_pemda_hr_libur, setTarif_pemda_hr_libur] = useState("");
  const [tarif_asuransi, setTarif_asuransi] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErros] = useState([]);

  //token from cookies
  const token = Cookies.get("token");

  //function "fetchDataLayanan"
  const fetchDataLayanan = async () => {
    await Api.get(`/api/admin/layanans/${id}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setName(response.data.data.name);
      setActive(response.data.data.active);
      setDescription(response.data.data.description);
      setTarif_asuransi(response.data.data.tarif_asuransi);
      setTarif_pemda_hr_kerja(response.data.data.tarif_pemda_hr_kerja);
      setTarif_pemda_hr_libur(response.data.data.tarif_pemda_hr_libur);
      setTarif_pnbp_hr_kerja(response.data.data.tarif_pnbp_hr_kerja);
      setTarif_pnbp_hr_libur(response.data.data.tarif_pnbp_hr_libur);
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
    formData.append("image", image);
    formData.append("active", active);
    formData.append("tarif_pnbp_hr_kerja", tarif_pnbp_hr_kerja);
    formData.append("tarif_pemda_hr_kerja", tarif_pemda_hr_kerja);
    formData.append("tarif_pnbp_hr_libur", tarif_pnbp_hr_libur);
    formData.append("tarif_pemda_hr_libur", tarif_pemda_hr_libur);
    formData.append("tarif_asuransi", tarif_asuransi);
    formData.append("description", description);
    formData.append("_method", "PUT");

    //sending data
    await Api.post(`/api/admin/layanans/${id}`, formData, {
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
        navigate("/admin/layanans");
      })
      .catch((error) => {
        //set error message to state "errors"
        setErros(error.response.data);
      });
  };

   // Universal handler for all input changes
   const handleInputChange = (name, value) => {
    switch (name) {
      case "tarif_pnbp_hr_kerja":
        setTarif_pnbp_hr_kerja(value);
        break;
      case "tarif_pemda_hr_kerja":
        setTarif_pemda_hr_kerja(value);
        break;
      case "tarif_pnbp_hr_libur":
        setTarif_pnbp_hr_libur(value);
        break;
      case "tarif_pemda_hr_libur":
        setTarif_pemda_hr_libur(value);
        break;
      case "tarif_asuransi":
        setTarif_asuransi(value);
        break;
      default:
        break;
    }
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/layanans"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <h6>
                    <i className="fa fa-pencil-alt"></i> Edit Layanan
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
                        Tarif PNBP Hari Kerja/Biasa
                      </label>
                      <FormattedNumberInput
                        value={tarif_pnbp_hr_kerja}
                        onChange={handleInputChange}
                        placeholder="Tarif PNBP Hari Kerja/Biasa"
                        name="tarif_pnbp_hr_kerja"
                      />
                    </div>
                    {errors.tarif_pnbp_hr_kerja && (
                      <div className="alert alert-danger">
                        {errors.tarif_pnbp_hr_kerja[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Tarif PEMDA Hari Kerja/Biasa
                      </label>
                      <FormattedNumberInput
                        value={tarif_pemda_hr_kerja}
                        onChange={handleInputChange}
                        placeholder="Tarif PEMDA Hari Kerja/Biasa"
                        name="tarif_pemda_hr_kerja"
                      />
                    </div>
                    {errors.tarif_pemda_hr_kerja && (
                      <div className="alert alert-danger">
                        {errors.tarif_pemda_hr_kerja[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Tarif PNBP Hari Libur
                      </label>
                      <FormattedNumberInput
                        value={tarif_pnbp_hr_libur}
                        onChange={handleInputChange}
                        placeholder="Tarif PNBP Hari Libur"
                        name="tarif_pnbp_hr_libur"
                      />
                    </div>
                    {errors.tarif_pnbp_hr_libur && (
                      <div className="alert alert-danger">
                        {errors.tarif_pnbp_hr_libur[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Tarif PEMDA Hari Libur
                      </label>
                      <FormattedNumberInput
                        value={tarif_pemda_hr_libur}
                        onChange={handleInputChange}
                        placeholder="Tarif PEMDA Hari Libur"
                        name="tarif_pemda_hr_libur"
                      />
                    </div>
                    {errors.tarif_pemda_hr_libur && (
                      <div className="alert alert-danger">
                        {errors.tarif_pemda_hr_libur[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">
                        Tarif Asuransi
                      </label>
                      <FormattedNumberInput
                        value={tarif_asuransi}
                        onChange={handleInputChange}
                        placeholder="Tarif Asuransi"
                        name="tarif_asuransi"
                      />
                    </div>
                    {errors.tarif_asuransi && (
                      <div className="alert alert-danger">
                        {errors.tarif_asuransi[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">Image</label>
                      <input
                        type="file"
                        id="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                    {errors.image && (
                      <div className="alert alert-danger">
                        {errors.image[0]}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label fw-bold">Description</label>
                      <ReactQuill
                        theme="snow"
                        rows="5"
                        value={description}
                        onChange={(description) => setDescription(description)}
                      />
                    </div>
                    {errors.description && (
                      <div className="alert alert-danger">
                        {errors.description[0]}
                      </div>
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
