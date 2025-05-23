import React, { useState, useEffect, useRef } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import LoadingOverlay from "../../components/loading/LoadingOverlay";
import {  InputNumber, Select, Upload, Image, Modal } from "antd";
import { alertSuccess } from "../../components/alert/Alert";
import { errorValidation } from "../../utils/errorParser";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../../services/userService";


export default function UserCreate(){
    const title = "Create User";
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        role: null
    });

    const [role, setRole] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
   
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setIsLoading(true);
        try {
            const response = await UserService.getFormAttributes();
            setRole(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const optionRole = () => role
        .sort((a, b) => a.name.localeCompare(b.name)) 
        .map(ct => ({
        value: ct.id,
        label: ct.name
   }));
    
    async function formSubmit() {
        setIsLoading(true);
        setErrors({});
        try {
            const response = await UserService.create(form);
            alertSuccess(response.data.message);
            navigate('/user');
        } catch (error) {
            if (error.status === 422) {
                const parsedErrors = errorValidation(error.response);
                setErrors(parsedErrors);
            }                        
        } finally {
            setIsLoading(false);
        }
    }   

   

    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <LoadingOverlay isActive={isLoading} text="Saving..." />
            <LayoutsAuth title={title}>
                <Cards>  
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Name <span style={{ color:'red' }}>*</span></label>
                            <input value={form.name} onChange={(e) => setForm((prevForm) => ({ ...prevForm, name: e.target.value }))} type="text" className={`form-control ${errors.name && 'is-invalid'}`} />
                            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email <span style={{ color:'red' }}>*</span></label>
                            <input value={form.email} onChange={(e) => setForm((prevForm) => ({ ...prevForm, email: e.target.value }))} type="email" className={`form-control ${errors.email && 'is-invalid'}`} />
                            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Role <span style={{ color:'red' }}>*</span></label>
                            <Select
                                status={errors.role && 'error'}
                                showSearch
                                placeholder="Select Role"
                                optionFilterProp="label"
                                style={{ width: '100%' }}
                                value={form.role}
                                options={optionRole()}
                                onChange={(e) => setForm(prev => ({ ...prev, role: e }))}
                            />
                             {errors.role && <span style={{ color: "red" }}>{errors.role}</span>}
                        </div>
                         <div className="col-md-4 mb-3">
                            <label className="form-label">Password <span style={{ color:'red' }}>*</span></label>
                            <input value={form.password} onChange={(e) => setForm((prevForm) => ({ ...prevForm, password: e.target.value }))} type="password" className={`form-control ${errors.password && 'is-invalid'}`} />
                            {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
                        </div>
                         <div className="col-md-4 mb-3">
                            <label className="form-label">Confirm Password <span style={{ color:'red' }}>*</span></label>
                            <input value={form.passwordConfirmation} onChange={(e) => setForm((prevForm) => ({ ...prevForm, passwordConfirmation: e.target.value }))} type="password" className={`form-control ${errors.passwordConfirmation && 'is-invalid'}`} />
                            {errors.passwordConfirmation && <span style={{ color: "red" }}>{errors.passwordConfirmation}</span>}
                        </div>
                         
                       
                    </div>
                </Cards>
                <div className="row mt-3">
                    <div className="col">
                        <div className="mb-3 d-flex justify-content-center">
                            <Link type="button" to={"/user"}  className="d-flex btn btn-secondary btn-pill">Back</Link>
                            &nbsp;
                            <button onClick={formSubmit} type="button"  className="d-flex btn btn-primary btn-pill">Save</button>
                        </div>
                    </div>
                </div>
            </LayoutsAuth>
             
        </>
    )
}
