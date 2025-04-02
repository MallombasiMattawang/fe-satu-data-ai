/* eslint-disable react-hooks/rules-of-hooks */
//import Link
import { Link, useLocation } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import permissions
import hasAnyPermission from "../../utils/Permissions";

export default function sidebar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const activeRoute = pathname.split("/");

  //get data user from cookies
  const user = JSON.parse(Cookies.get("user"));

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading"></div>
          <Link
            className={
              activeRoute[2] === "dashboard"
                ? "nav-link active-sidebar"
                : "nav-link"
            }
            to="/admin/dashboard"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-info"></i>
            </div>
            Tentang One Data
          </Link>

          {(hasAnyPermission(["users.index"])) && (
            <>
              {/* <div className="sb-sidenav-menu-heading">SATU DATA RBM</div> */}
              <a
                className={
                  "nav-link collapsed " +
                  (activeRoute[2] === "dashboard-rbm"
                    ? " active-sidebar"
                    : activeRoute[2] === "patroli-rbm"
                      ? " active-sidebar"
                      : activeRoute[2] === "maps-rbm"
                        ? " active-sidebar"
                        : activeRoute[2] === "import-db-rbm"
                          ? " active-sidebar"
                          : "")
                }
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseRbm"
                aria-expanded="false"
                aria-controls="collapseRbm"
              >
                <div className="sb-nav-link-icon">
                  <i className="fa fa-marker"></i>
                </div>
                Dashboard RBM
                <div className="sb-sidenav-collapse-arrow">
                  <i
                    className="fas fa-angle-down"
                    style={{ color: "color: rgb(65 60 60)" }}
                  ></i>
                </div>
              </a>
            </>
          )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "dashboard-rbm"
                ? " show"
                : activeRoute[2] === "patroli-rbm"
                  ? " show"
                  : activeRoute[2] === "maps-rbm"
                    ? " show"
                    : activeRoute[2] === "import-db-rbm"
                      ? " show"
                      : "")
            }
            id="collapseRbm"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "dashboard-rbm"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/dashboard-rbm"
                >
                  Summary Report
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "patroli-rbm"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/patroli-rbm"
                >
                  Data Patroli
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "maps-rbm"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/maps-rbm"
                >
                  Peta Patroli
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "users"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/import-db-rbm"
                >
                  Import Database
                </Link>
              )}
            </nav>
          </div>

          {/* menu WRU */}

          {(hasAnyPermission(["users.index"])) && (
            <>
              {/* <div className="sb-sidenav-menu-heading">SATU DATA WRU</div> */}
              <a
                className={
                  "nav-link collapsed " +
                  (activeRoute[2] === "dashboard-wru"
                    ? " active-sidebar"
                    : activeRoute[2] === "maps-wru"
                      ? " active-sidebar"
                      : activeRoute[2] === "import-db-wru"
                        ? " active-sidebar"
                        : activeRoute[2] === "peta-pelepasliaran"
                          ? " active-sidebar"
                          : "")
                }
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseWru"
                aria-expanded="false"
                aria-controls="collapseWru"
              >
                <div className="sb-nav-link-icon">
                  <i className="fab fa-github"></i>
                </div>
                Dashboard WRU
                <div className="sb-sidenav-collapse-arrow">
                  <i
                    className="fas fa-angle-down"
                    style={{ color: "color: rgb(65 60 60)" }}
                  ></i>
                </div>
              </a>
            </>
          )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "dashboard-wru"
                ? " show"
                : activeRoute[2] === "maps-wru"
                  ? " show"
                  // : activeRoute[2] === "traking-wru"
                  //   ? " show"
                  : activeRoute[2] === "peta-pelepasliaran"
                    ? " show"
                    : activeRoute[2] === "import-db-wru"
                      ? " show"
                      : "")
            }
            id="collapseWru"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "dashboard-wru"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/dashboard-wru"
                >
                  Summary Report
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "maps-wru"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/maps-wru"
                >
                  Peta Sebaran
                </Link>
              )}


              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "import-db-wru"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/import-db-wru"
                >
                  Import Database
                </Link>
              )}
            </nav>
          </div>

          {/* menu BMN */}

          {(hasAnyPermission(["users.index"])) && (
            <>
              {/* <div className="sb-sidenav-menu-heading">SATU DATA WRU</div> */}
              <a
                className={
                  "nav-link collapsed " +
                  (activeRoute[2] === "dashboard-bmn"
                    ? " active-sidebar"
                    : activeRoute[2] === "asets"
                      ? " active-sidebar"
                      : activeRoute[2] === "asets-expired"
                        ? " active-sidebar"
                        : activeRoute[2] === "lokasi-asets"
                          ? " active-sidebar"
                          : activeRoute[2] === "inspeksi-asets"
                            ? " active-sidebar"
                            : "")
                }
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseBmn"
                aria-expanded="false"
                aria-controls="collapseBmn"
              >
                <div className="sb-nav-link-icon">
                  <i className="fa fa-car"></i>
                </div>
                Dashboard BMN
                <div className="sb-sidenav-collapse-arrow">
                  <i
                    className="fas fa-angle-down"
                    style={{ color: "color: rgb(65 60 60)" }}
                  ></i>
                </div>
              </a>
            </>
          )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "dashboard-bmn"
                ? " show"
                : activeRoute[2] === "asets"
                  ? " show"
                  : activeRoute[2] === "asets-expired"
                    ? " show"
                    : activeRoute[2] === "lokasi-asets"
                      ? " show"
                      : activeRoute[2] === "inspeksi-asets"
                        ? " show"
                        : "")
            }
            id="collapseBmn"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "dashboard-bmn"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/dashboard-bmn"
                >
                  Summary Report
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "asets"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/asets"
                >
                  Data BMN
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "asets-expired"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/asets-expired"
                >
                  BMN Habis Masa Manfaat
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "lokasi-asets"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/lokasi-asets"
                >
                  Lokasi Aset
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "inspeksi-asets"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/inspeksi-asets"
                >
                  Inspeksi Aset
                </Link>
              )}

            </nav>
          </div>

          {(hasAnyPermission(["roles.index"]) ||
            hasAnyPermission(["permissions.index"]) ||
            hasAnyPermission(["users.index"])) && (
              <>
                <div className="sb-sidenav-menu-heading">USERS MANAGEMENT</div>
                <a
                  className={
                    "nav-link collapsed " +
                    (activeRoute[2] === "roles"
                      ? " active-sidebar"
                      : activeRoute[2] === "permissions"
                        ? " active-sidebar"
                        : activeRoute[2] === "users"
                          ? " active-sidebar"
                          : "")
                  }
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseUsers"
                  aria-expanded="false"
                  aria-controls="collapseUsers"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  Users
                  <div className="sb-sidenav-collapse-arrow">
                    <i
                      className="fas fa-angle-down"
                      style={{ color: "color: rgb(65 60 60)" }}
                    ></i>
                  </div>
                </a>
              </>
            )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "roles"
                ? " show"
                : activeRoute[2] === "permissions"
                  ? " show"
                  : activeRoute[2] === "users"
                    ? " show"
                    : "")
            }
            id="collapseUsers"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["roles.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "roles"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/roles"
                >
                  Roles
                </Link>
              )}

              {hasAnyPermission(["permissions.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "permissions"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/permissions"
                >
                  Permissions
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "users"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/users"
                >
                  Users
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>

      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        {user.name}
      </div>
    </nav>
  );
}