import React, { useState, useEffect, useRef } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import LoadingOverlay from "../../components/loading/LoadingOverlay";
import {  InputNumber, Select, Upload, Image, Modal } from "antd";
import { alertSuccess } from "../../components/alert/Alert";
import { errorValidation } from "../../utils/errorParser";
import { useNavigate, Link, useParams } from "react-router-dom";
import CategoryService from "../../services/categoryService";
import BrandService from "../../services/brandService";
import UnitService from "../../services/unitService";
import ImgCrop from 'antd-img-crop';
import ProductService from "../../services/productService";


export default function ProductEdit(){
    const title = "Edit Product";
    const { id } = useParams();
     const [form, setForm] = useState({
           name: "",
           priceSell: 0,
           priceBuy : 0,
           category: null,
           brand: null,
           unit: null,
           status : true
    });

    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [unit, setUnit] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        setIsLoading(true);
        try {
            const [resCategory, resBrand, resUnit, resData] = await Promise.all([
                CategoryService.getAll(),
                BrandService.getAll(),
                UnitService.getAll(),
                ProductService.getById(id)
            ]);
            const editData = resData.data.data;
            
            setForm({
                name: editData.name,
                priceSell: editData.price_sell,
                priceBuy : editData.price_buy,
                category: editData.category.id,
                brand: editData.brand.id,
                unit: editData.unit.id,
                status : editData.status? true : false
            });
            setFileList([
                {
                    uid: "-1",
                    name: "image.jpg",
                    status: "done",
                    url: import.meta.env.VITE_IMAGE_URL + "/product/" + editData.images,
                },
            ]);
            setCategory(resCategory.data.data);
            setBrand(resBrand.data.data);
            setUnit(resUnit.data.data);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    const optionCategory = () => category
        .sort((a, b) => a.name.localeCompare(b.name)) 
        .map(ct => ({
        value: ct.id,
        label: ct.name
    }));

    const optionBrand = () => brand
        .sort((a, b) => a.name.localeCompare(b.name)) 
        .map(ct => ({
        value: ct.id,
        label: ct.name
        }));
    
    const optionUnit = () => unit
        .sort((a, b) => a.symbol.localeCompare(b.symbol)) 
        .map(ct => ({
        value: ct.id,
        label: ct.symbol
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
        let src = file.url;
        if (!src) {
        src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        }
        setPreviewImage(src);
        setPreviewOpen(true);
    };

    

    async function formSubmit() {
        setIsLoading(true);
        setErrors({});
        try {
            const formData = new FormData();  
            formData.append("name", form.name);
            formData.append("priceSell", form.priceSell);
            formData.append("priceBuy", form.priceBuy);
            formData.append("brand", form.brand);
            formData.append("category", form.category);
            formData.append("unit", form.unit);
            formData.append("status", form.status);
            if (fileList && fileList.length > 0) {
                const file = fileList[0];
                if (file.originFileObj) {
                    formData.append("image", file.originFileObj); // only append if user uploaded new
                }
            }
            const response = await ProductService.update(id, formData);
            alertSuccess(response.data.message);
            navigate('/product');
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
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Name <span style={{ color:'red' }}>*</span></label>
                            <input value={form.name} onChange={(e) => setForm((prevForm) => ({ ...prevForm, name: e.target.value }))} type="text" className={`form-control ${errors.name && 'is-invalid'}`} />
                            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                        </div>
                        <div className="col-md-4 mb-3">
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
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Unit <span style={{ color:'red' }}>*</span></label>
                            <Select
                                status={errors.unit && 'error'}
                                showSearch
                                placeholder="Select Unit"
                                optionFilterProp="label"
                                style={{ width: '100%' }}
                                value={form.unit}
                                options={optionUnit()}
                                onChange={(e) => setForm(prev => ({ ...prev, unit: e }))}
                            />
                             {errors.unit && <span style={{ color: "red" }}>{errors.unit}</span>}
                        </div>  
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Brand <span style={{ color:'red' }}>*</span></label>
                            <Select
                                status={errors.brand && 'error'}
                                showSearch
                                placeholder="Select Brand"
                                optionFilterProp="label"
                                style={{ width: '100%' }}
                                value={form.brand}
                                options={optionBrand()}
                                onChange={(e) => setForm(prev => ({ ...prev, brand: e }))}
                            />
                             {errors.brand && <span style={{ color: "red" }}>{errors.brand}</span>}
                        </div>
                         <div className="col-md-5 mb-3">
                            <label className="form-label">Price Buy <span style={{ color:'red' }}>*</span></label>
                            <InputNumber
                                status={errors.priceBuy && 'error'}
                                min={0}
                                style={{ width: '100%' }}
                                value={form.priceBuy} // Use value to control the InputNumber
                                formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\Rp.\s?|(,*)/g, '')}
                                onChange={(e) => setForm((prevForm) => ({...prevForm, priceBuy : e}))}
                            />
                             {errors.priceBuy && <span style={{ color: "red" }}>{errors.priceBuy}</span>}
                        </div>
                        <div className="col-md-5 mb-3">
                            <label className="form-label">Price Sell <span style={{ color:'red' }}>*</span></label>
                            <InputNumber
                                min={0}
                                status={errors.priceSell && 'error'}
                                style={{ width: '100%' }}
                                value={form.priceSell} // Use value to control the InputNumber
                                formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\Rp.\s?|(,*)/g, '')}
                                onChange={(e) => setForm((prevForm) => ({...prevForm, priceSell : e}))}
                            />
                             {errors.priceSell && <span style={{ color: "red" }}>{errors.priceSell}</span>}
                        </div>
                         <div className="col-md-2 mb-3">
                            <label className="form-label">Status</label>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" checked={form.status}  onChange={(e) => setForm({ ...form, status: e.target.checked })}/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">Active</label>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">  
                            <label htmlFor="formFile" className="form-label">Images (PNG/JPG/JPEG) <span style={{ color:'red' }}>*</span></label>
                            <ImgCrop aspect={686 / 416} modalWidth={686} showGrid rotationSlider  showReset>
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
                             {previewImage && (
                                <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: visible => setPreviewOpen(visible),
                                    afterOpenChange: visible => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                                />
                            )}
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
