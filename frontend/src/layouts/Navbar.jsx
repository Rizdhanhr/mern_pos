import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePermission from "../hooks/usePermission";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, handleLogout } = useAuth();
  const { can, canAny } = usePermission();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (paths) => {
    return paths.some((path) => {
      if (path === "/") {
        return location.pathname === "/"; // Cocok hanya jika tepat di root
      }
      return location.pathname.startsWith(path); // Cocok jika path adalah awalan
    });
  };

  async function signOut() {
    await handleLogout();
    navigate("/login");
  }

  return (
    <>
      <header className="navbar navbar-expand-md  d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              POS
              {/* <img
                src={Logo}
                style={{ height: 25, width: 40 }}
                alt="Tabler"
                className="navbar-brand-image"
              /> */}
            </a>
          </h1>
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  className="avatar avatar-sm"
                  style={{
                    backgroundImage: "url(/template/static/avatars/000m.jpg)"
                  }}
                />
                <div className="d-none d-xl-block ps-2">
                  <div>{user && user.name}</div>
                  <div className="mt-1 small text-muted">
                    {user && user.role.name}
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a href="./settings.html" className="dropdown-item">
                  Settings
                </a>
                <a onClick={() => signOut()} className="dropdown-item">
                  Logout
                </a>
              </div>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
              <ul className="navbar-nav">
                <li className={`nav-item ${isActive(["/"]) ? "active" : ""}`}>
                  <Link className="nav-link" to={"/"}>
                    <i className="bi bi-house-door"></i>
                    &nbsp;
                    <span className="nav-link-title">Home</span>
                  </Link>
                </li>

                {canAny([
                  "VIEW-BRAND",
                  "VIEW-CATEGORY",
                  "VIEW-PRODUCT",
                  "VIEW-UNIT"
                ]) && (
                  <li
                    className={`nav-item dropdown ${
                      isActive(["/brand", "/category", "/product", "/unit"])
                        ? "active"
                        : ""
                    }`}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#navbar-base"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="false"
                    >
                      <i className="bi bi-book"></i>
                      &nbsp;
                      <span className="nav-link-title">Master</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          {can("VIEW-BRAND") && (
                            <Link
                              className={`dropdown-item ${
                                isActive(["/brand"]) ? "active" : ""
                              }`}
                              to={"/brand"}
                            >
                              Brand
                            </Link>
                          )}
                          {can("VIEW-CATEGORY") && (
                            <Link
                              className={`dropdown-item ${
                                isActive(["/category"]) ? "active" : ""
                              }`}
                              to={"/category"}
                            >
                              Category
                            </Link>
                          )}
                          {can("VIEW-PRODUCT") && (
                            <Link
                              className={`dropdown-item ${
                                isActive(["/product"]) ? "active" : ""
                              }`}
                              to={"/product"}
                            >
                              Product
                            </Link>
                          )}
                          {can("VIEW-UNIT") && (
                            <Link
                              className={`dropdown-item ${
                                isActive(["/unit"]) ? "active" : ""
                              }`}
                              to={"/unit"}
                            >
                              Unit
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                {canAny(["VIEW-USER", "VIEW-ROLE"]) && (
                  <li
                    className={`nav-item dropdown ${
                      isActive(["/user", "/role"]) ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link dropdown-toggle"
                      href="#navbar-base"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      role="button"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-fill-gear"></i>
                      &nbsp;
                      <span className="nav-link-title">Access Control</span>
                    </a>
                    <div className="dropdown-menu">
                      <div className="dropdown-menu-columns">
                        <div className="dropdown-menu-column">
                          {can("VIEW-ROLE") && (
                            <Link
                              className={`dropdown-item ${
                                isActive(["/role"]) ? "active" : ""
                              }`}
                              to={"/role"}
                            >
                              Role
                            </Link>
                          )}
                          {can("VIEW-USER") && (
                            <Link
                              className={`dropdown-item ${
                                isActive(["/user"]) ? "active" : ""
                              }`}
                              to={"/user"}
                            >
                              User
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
