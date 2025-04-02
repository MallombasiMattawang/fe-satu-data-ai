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

export default function Login() {
  //title page
  document.title = "Login";

  //navigate
  const navigate = useNavigate();

  //define state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // state untuk loading

  //define state errors
  const [errors, setErrors] = useState([]);

  //method login
  const login = async (e) => {
    e.preventDefault();
    setLoading(true); // set loading true saat tombol diklik

    await Api.post("/api/login", {
      //data
      email: email,
      password: password,
    })
      .then((response) => {
        //set token to cookies
        Cookies.set("token", response.data.token);

        //set user to cookies
        Cookies.set("user", JSON.stringify(response.data.user));

        //set permissions to cookies
        Cookies.set("permissions", JSON.stringify(response.data.permissions));

        //show toast
        toast.success("Login Successfully!", {
          position: "top-right",
          duration: 4000,
        });

        //redirect dashboard page
        navigate("/admin/dashboard");
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
                  <div className="text-center mb-1 text-black">
                    <img src={"/images/logo-onedata.png"} width={"260"} className="mb-0" />
                
                  </div>
                  {errors.message && (
                    <div className="alert alert-danger">{errors.message}</div>
                  )}
                  <form onSubmit={login}>
                    <div className="form-group first mb-3">
                      <label htmlFor="username">Email Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="your-email@gmail.com"
                        id="username"
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

                    <input
                      type="submit"
                      value={loading ? "Loading..." : "Masuk"}
                      className="btn btn-block btn-primary"
                      disabled={loading} // menonaktifkan tombol saat loading
                    />

                    <hr />

                    {/* <Link
                      to="/register"
                      className="forgot-pass float-end"
                      type="button"
                    >
                      Lakukan Pendaftaran akun
                    </Link> */}
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