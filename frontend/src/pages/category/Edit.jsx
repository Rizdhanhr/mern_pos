import React, { useEffect, useState } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import LoadingOverlay from "../../components/loading/LoadingOverlay";
import CategoryService from "../../services/categoryService";
import { alertSuccess } from "../../components/alert/Alert";
import { errorValidation } from "../../utils/errorParser";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function CategoryEdit() {
    const { id } = useParams();
    const title = "Edit Category";
    const [form, setForm] = useState({
        name: ""
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            setIsLoading(true);
            const response = await CategoryService.getById(id);
            setForm({
                ...form,
                name: response.data.data.name 
            });  
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }


    async function formSubmit() {
        setIsLoading(true);
        setErrors({});
        try {
            const response = await CategoryService.update(id,form);
            alertSuccess(response.data.message);
            navigate('/category');
        } catch (err) {
            if (err.status === 422) {
                const parsedErrors = errorValidation(err.response);
                setErrors(parsedErrors); 
            }
        } finally {
            setIsLoading(false)
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
                    <div className="mb-3">
                        <label className="form-label">Name <span style={{ color:'red' }}>*</span></label>
                        <input value={form.name} onChange={(e) => setForm((prevForm) => ({ ...prevForm, name: e.target.value }))} type="text" className={`form-control ${errors.name && 'is-invalid'}`} />
                       {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                    </div>
                </Cards>
                <div className="row mt-3">
                    <div className="col">
                        <div className="mb-3 d-flex justify-content-center">
                            <Link type="button" to={"/category"}  className="d-flex btn btn-secondary btn-pill">Back</Link>
                            &nbsp;
                            <button onClick={formSubmit} type="button"  className="d-flex btn btn-primary btn-pill">Save</button>
                        </div>
                    </div>
                </div>
            </LayoutsAuth>
        </>
    )
}
