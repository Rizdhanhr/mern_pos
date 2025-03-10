import React from "react";
import Logo from '../assets/logo1.png';
import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
    const location = useLocation();
    const isActive = (paths) => {
        return paths.some((path) => {
            if (path === '/') {
                return location.pathname === '/'; // Cocok hanya jika tepat di root
            }
                return location.pathname.startsWith(path); // Cocok jika path adalah awalan
        });
    };

    return (
        <>
            <div className="sticky-top">
                <header className="navbar navbar-expand-md sticky-top d-print-none">
                    <div className="container-xl">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbar-menu"
                            aria-controls="navbar-menu"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                            <a href=".">
                                <img
                                    // src={`/assets/logo.png`}
                                     src={Logo}
                                     style={{height:50, width:80}}
                                    alt="Tabler"
                                    className="navbar-brand-image"
                                />
                            </a>
                        </h1>
                        <div className="navbar-nav flex-row order-md-last">
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                                    <span
                                        className="avatar avatar-sm"
                                        style={{
                                            backgroundImage:
                                                "url(/template/static/avatars/000m.jpg)",
                                        }}
                                    />
                                    <div className="d-none d-xl-block ps-2">
                                        <div>User</div>
                                        <div className="mt-1 small text-muted">
                                            Role
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <a href="./settings.html" className="dropdown-item">
                                        Settings
                                    </a>
                                    <a className="dropdown-item">
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <header className="navbar-expand-md">
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <div className="navbar">
                            <div className="container-xl">
                                <ul className="navbar-nav">
                                    <li className={`nav-item ${isActive(['/']) ? 'active' : ''}`}>
                                        <Link className="nav-link" to={'/'}>
                                            <i className="bi bi-house-door"></i>
                                            &nbsp;
                                            <span className="nav-link-title">
                                            Home
                                            </span>
                                        </Link>
                                    </li>
                                    <li className={`nav-item dropdown ${isActive(['/brand']) ? 'active' : ''}`}>
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
                                            <span className="nav-link-title">
                                                Master
                                            </span>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="dropdown-menu-columns">
                                                <div className="dropdown-menu-column">
                                                    <Link className={`dropdown-item ${isActive(['/brand']) ? 'active' : ''}`} to={'/brand'}>
                                                        Brand
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
                                            <span className="nav-link-title">
                                                Order
                                            </span>
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="dropdown-menu-columns">
                                                <div className="dropdown-menu-column">
                                                    <a className={`dropdown-item`} >
                                                        Voucher
                                                    </a>
                                                    <a href="" className={`dropdown-item }`} >
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
                                            <span className="nav-link-title">
                                                User Management
                                            </span>
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
                                                    <path
                                                        stroke="none"
                                                        d="M0 0h24v24H0z"
                                                        fill="none"
                                                    />
                                                    <path d="M9 11l3 3l8 -8" />
                                                    <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                                                </svg>
                                            </span>
                                            <span className="nav-link-title">
                                                Report
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
}
