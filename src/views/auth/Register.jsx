//import state
import { useState } from "react";

//import service
import Api from "../../services/Api";

//import layoutAuth
import LayoutAuth from "../../layouts/Auth";

//import Cookie
import Cookies from "js-cookie";

//import Navigate
import { Link, Navigate, useNavigate } from "react-router-dom";

//import toast
import toast from "react-hot-toast";

export default function Register() {
  //title page
  document.title = "Register - E-Tiketing";

  //navigate
  const navigate = useNavigate();

  //define state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false); // state untuk loading

  //define state errors
  const [errors, setErrors] = useState([]);

  //method register
  const register = async (e) => {
    e.preventDefault();
    setLoading(true); // set loading true saat tombol diklik

    await Api.post("/api/register", {
      //data
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    })
      .then((response) => {
        //show toast
        toast.success("Registration Successfully!", {
          position: "top-right",
          duration: 4000,
        });

        //redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        //set response error to state
        setErrors(error.response.data);
      })
      .finally(() => {
        setLoading(false); // set loading false setelah proses selesai
      });
  };

  //check if cookie already exists
  if (Cookies.get("token")) {
    //redirect dashboard page
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <LayoutAuth>
      <div className="d-md-flex half">
        <div className="bg" style={{ backgroundImage: "url('/images/bg-malino.jpg')" }}></div>
        <div className="contents">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-12">
                <div className="form-block mx-auto">
                  <div className="text-center mb-4">
                    <img src={"/images/ksda.png"} width={"80"} className="mb-3" />
                    <h3>Daftar Akun <strong>E-Tiketing</strong></h3>
                  </div>
                  {errors.message && (
                    <div className="alert alert-danger">{errors.message}</div>
                  )}
                  <form onSubmit={register}>
                    <div className="form-group first mb-3">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <div className="alert alert-danger mt-2">
                          {errors.name[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group first mb-3">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="your-email@gmail.com"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <div className="alert alert-danger mt-2">
                          {errors.email[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group last mb-3">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Your Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="alert alert-danger mt-2">
                          {errors.password[0]}
                        </div>
                      )}
                    </div>

                    <div className="form-group last mb-3">
                      <label htmlFor="password_confirmation">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                      />
                      {errors.password_confirmation && (
                        <div className="alert alert-danger mt-2">
                          {errors.password_confirmation[0]}
                        </div>
                      )}
                    </div>

                    <input
                      type="submit"
                      value={loading ? "Loading..." : "Daftar"}
                      className="btn btn-block btn-primary"
                      disabled={loading} // menonaktifkan tombol saat loading
                    />
                    <hr />

                    <Link
                      to="/login"
                      className="forgot-pass float-end"
                      type="button"
                    >
                      <i className="fa fa-arrow-left"></i> Kembali ke Halaman Masuk
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAuth>
  );
}