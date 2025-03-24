import React, { useEffect } from "react";
import Logo from "../assets/nav_logo.png";
import { Link, useLocation } from "react-router-dom";
import { removeToken } from "../utils/authHelper";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../store/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }
  }, [dispatch, user]);

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
    await removeToken();
    window.location.href = "/login";
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
              <img
                src={Logo}
                style={{ height: 25, width: 40 }}
                alt="Tabler"
                className="navbar-brand-image"
              />
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
                <li
                  className={`nav-item dropdown ${
                    isActive(["/brand", "/category", "/product"])
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
                        <Link
                          className={`dropdown-item ${
                            isActive(["/brand"]) ? "active" : ""
                          }`}
                          to={"/brand"}
                        >
                          Brand
                        </Link>
                        <Link
                          className={`dropdown-item ${
                            isActive(["/category"]) ? "active" : ""
                          }`}
                          to={"/category"}
                        >
                          Category
                        </Link>
                        <Link
                          className={`dropdown-item ${
                            isActive(["/product"]) ? "active" : ""
                          }`}
                          to={"/product"}
                        >
                          Product
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={`nav-item dropdown`}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#navbar-base"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    role="button"
                    aria-expanded="false"
                  >
                    <i className="bi bi-cart"></i>
                    &nbsp;
                    <span className="nav-link-title">Order</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-columns">
                      <div className="dropdown-menu-column">
                        <a className={`dropdown-item`}>Voucher</a>
                        <a href="" className={`dropdown-item }`}>
                          Topup
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className={`nav-item dropdown }`}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#navbar-base"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    role="button"
                    aria-expanded="false"
                  >
                    <i className="bi bi-gear"></i>
                    &nbsp;
                    <span className="nav-link-title">User Management</span>
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-menu-columns">
                      <div className="dropdown-menu-column">
                        <a className={`dropdown-item `} href="">
                          User
                        </a>
                        <a className={`dropdown-item}`} href="">
                          Role
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="./form-elements.html">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {/* Download SVG icon from http://tabler-icons.io/i/checkbox */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 11l3 3l8 -8" />
                        <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Report</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
