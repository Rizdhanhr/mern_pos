import React, { useState, useEffect, useRef } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import LoadingOverlay from "../../components/loading/LoadingOverlay";
import {  InputNumber, Select, Upload } from "antd";
import { alertSuccess } from "../../components/alert/Alert";
import { errorValidation } from "../../utils/errorParser";
import { useNavigate, Link } from "react-router-dom";
import CategoryService from "../../services/categoryService";
import ImgCrop from 'antd-img-crop';
import ProductService from "../../services/productService";


export default function ProductCreate(){
    const title = "Create Product";
    const [form, setForm] = useState({
        name: "",
        price: 0,
        category: null,
        status : true
    });

    const [category, setCategory] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    
    useEffect(() => {
        getCategory();
    }, []);

    async function getCategory() {
        try {
            const response = await CategoryService.getAll();
            setCategory(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const optionCategory = () => category.map(ct => ({
        value: ct.id,
        label: ct.name
    }));
    
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const beforeUpload = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
             const croppedFile = {
                ...file,
                url: reader.result,
                preview: reader.result,
                originFileObj: file,
            };
            setFileList([croppedFile]);
            
        };
        return false;  
    };

  

    const onPreview = async (file) => {
        // const src = file.url || (await getSrcFromFile(file));
        // const imgWindow = window.open(src);

        // if (imgWindow) {
        // const image = new Image();
        // image.src = src;
        // imgWindow.document.write(image.outerHTML);
        // } else {
        // window.location.href = src;
        // }
    };

    

    async function formSubmit() {
        setIsLoading(true);
        setErrors({});
        try {
            const formData = new FormData();  
            formData.append("name", form.name);
            formData.append("price", form.price);
            formData.append("category", form.category);
            formData.append("status", form.status);
            if (fileList && fileList.length > 0) {
                formData.append("image", fileList[0].originFileObj);
            };
            const response = await ProductService.create(formData);
            alertSuccess(response.data.message);
            navigate('/product');
        } catch (error) {
            console.log(error);
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
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Name <span style={{ color:'red' }}>*</span></label>
                            <input onChange={(e) => setForm((prevForm) => ({ ...prevForm, name: e.target.value }))} type="text" className={`form-control ${errors.name && 'is-invalid'}`} />
                            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Category <span style={{ color:'red' }}>*</span></label>
                            <Select
                                status={errors.category && 'error'}
                                showSearch
                                placeholder="Select Category"
                                optionFilterProp="label"
                                style={{ width: '100%' }}
                                value={form.category}
                                options={optionCategory()}
                                onChange={(e) => setForm(prev => ({ ...prev, category: e }))}
                            />
                             {errors.category && <span style={{ color: "red" }}>{errors.category}</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Price <span style={{ color:'red' }}>*</span></label>
                            <InputNumber
                                status={errors.price && 'error'}
                                style={{ width: '100%' }}
                                value={form.price} // Use value to control the InputNumber
                                formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\Rp.\s?|(,*)/g, '')}
                                onChange={(e) => setForm((prevForm) => ({...prevForm, price : e}))}
                            />
                             {errors.price && <span style={{ color: "red" }}>{errors.price}</span>}
                        </div>
                        <div className="col-md-3 mb-3">  
                            <label htmlFor="formFile" className="form-label">Images (PNG/JPG/JPEG) <span style={{ color:'red' }}>*</span></label>
                             <ImgCrop showGrid rotationSlider aspectSlider showReset>
                                <Upload
                                 accept=".png,.jpg,.jpeg"
                                    // customRequest={customRequest}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                    maxCount={1}
                                    beforeUpload={beforeUpload}
                                >
                                    {fileList.length < 3 && "+ Upload"}
                                </Upload>
                            </ImgCrop> 
                             {errors.image && <span style={{ color: "red" }}>{errors.image}</span>}    
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Status</label>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" checked={form.status}  onChange={(e) => setForm({ ...form, status: e.target.checked })}/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">Active</label>
                            </div>
                        </div>
                    </div>
                </Cards>
                <div className="row mt-3">
                    <div className="col">
                        <div className="mb-3 d-flex justify-content-center">
                            <Link type="button" to={"/product"}  className="d-flex btn btn-secondary btn-pill">Back</Link>
                            &nbsp;
                            <button onClick={formSubmit} type="button"  className="d-flex btn btn-primary btn-pill">Save</button>
                        </div>
                    </div>
                </div>
            </LayoutsAuth>
             
        </>
    )
}
