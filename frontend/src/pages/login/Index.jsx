import React, { useState } from "react";
import Logo from '../../assets/pos_logo.png';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import LoadingOverlay from "../../components/loading/LoadingOverlay";
import { errorValidation } from "../../utils/errorParser";
import { setToken } from "../../utils/authHelper";
import { alertError } from "../../components/alert/Alert";


export default function LoginIndex() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

  async function formSubmit(e) {
    setErrors({});
    setIsLoading(true);
    try {
      e.preventDefault();
      const response = await AuthService.loginStore(form); 
      setToken(response.data.token);
      navigate("/");
    } catch (error) { 
      if (error.status === 422) {
        const parsedErrors = errorValidation(error.response);
        setErrors(parsedErrors); 
      } else {
        alertError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <LoadingOverlay isActive={isLoading} text="Process..." />
      <div className="page page-center">
        <div className="container container-tight py-4">
          <div className="text-center mb-4">
            <a  className="navbar-brand navbar-brand-autodark">
              <img src={Logo} height={80} width={150}  />
            </a>
          </div>
          <div className="card card-md">
            <div className="card-body">
              <h2 className="h2 text-center mb-4">Login to your account cok</h2>
              <form onSubmit={formSubmit}  method="POST" >
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email && 'is-invalid'}`}
                    placeholder="your@email.com"
                                      autoComplete="off"
                                      onChange={(e) => setForm({...form, email:e.target.value})}
                  />
                   {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Password
                    
                  </label>
                  <input
                      type="password"
                      onChange={(e) => setForm({...form, password:e.target.value})}
                      className={`form-control ${errors.password && 'is-invalid'}`}
                      placeholder="Your password"
                      autoComplete="off"
                    />
                     {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                </div>
                
                <div className="form-footer">
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </div>
              </form>
            </div>
            
          </div>
         
        </div>
      </div>
    </>
  );
}
