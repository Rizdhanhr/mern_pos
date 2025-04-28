import React, { useEffect, useState } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import LoadingOverlay from "../../components/loading/LoadingOverlay";
import RoleService from "../../services/roleService";
import { alertSuccess } from "../../components/alert/Alert";
import { errorValidation } from "../../utils/errorParser";
import { useNavigate, Link, useParams } from "react-router-dom";



export default function RoleEdit() {
    const { id } = useParams();
    const title = "Edit Role";
    const [form, setForm] = useState({
        name: "",
        description: "",
        permission : []
    });
    
    const [menu, setMenu] = useState([]);
    const [permission, setPermission] = useState({});
    const [module, setModule] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            setIsLoading(true);
            const [resRolePermission, resData] = await Promise.all([
                RoleService.getFormAttributes(),
                RoleService.getById(id)
            ]);
            const dataAll = resRolePermission.data.data;
            const dataEdit = resData.data.data;
            setMenu(dataAll.menu);
            setModule(dataAll.module);
            setPermission(dataAll.permission);
            setForm({
                name: dataEdit.role.name,
                description: dataEdit.role.description,
                permission : dataEdit.permission
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    async function formSubmit() {
        setIsLoading(true);
        setErrors({});
        try {
            const response = await RoleService.update(id,form);
            alertSuccess(response.data.message);
            navigate('/role');
        } catch (err) {
            if (err.status === 422) {
                const parsedErrors = errorValidation(err.response);
                setErrors(parsedErrors); 
            }
        } finally {
            setIsLoading(false)
        }
    }

    function handleCheckboxChange(e, permissionId, menuId) {
        const isChecked = e.target.checked;
        setForm((prev) => {
            const newPermissions = isChecked
            ? [...prev.permission, permissionId] // Tambah jika dicentang
            : prev.permission.filter((id) => id !== permissionId); // Hapus kalau tidak

            return {
            ...prev,
                permission: newPermissions,
            };
        });
    } 


    function handleMainCheckboxChange(e, menuId) {
        const isChecked = e.target.checked;
        const permissionIdsInRow = Object.values(permission[menuId] || {});

        setForm((prev) => {
            let newPermissions = [...prev.permission];
            if (isChecked) {
                permissionIdsInRow.forEach((pid) => {
                    if (!newPermissions.includes(pid)) {
                        newPermissions.push(pid);
                    }
                });
            } else {
                newPermissions = newPermissions.filter((pid) => !permissionIdsInRow.includes(pid));
            }

            return {
                ...prev,
                permission: newPermissions,
            };
        });
    }

    function isAllChecked(menuId) {
        const permissionsInRow = Object.values(permission[menuId] || []);
        return permissionsInRow.length > 0 && permissionsInRow.every((id) =>
            form.permission.includes(id)
        );
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
                    <div className="mb-3">
                       <label className="form-label">Description</label>
                       <input value={form.description} onChange={(e) => setForm((prevForm) => ({ ...prevForm, description: e.target.value }))} type="text" className={`form-control ${errors.description && 'is-invalid'}`} />
                       {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
                    </div>
                    <div className="mb-3">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col" width="5%" className="text-center align-middle"></th>
                                        <th scope="col" className="align-middle">Menu</th>
                                        {module.map((m) => (
                                        <th className="text-center align-middle" width="10%" key={m.id} scope="col">
                                            {m.name}
                                        </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {menu.map((m) => (
                                        <tr key={m.id}>
                                            <td className="text-center align-middle">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"    
                                                    checked={isAllChecked(m.id)}
                                                    onChange={(e) => handleMainCheckboxChange(e, m.id)}
                                                />
                                            </td>
                                            <td >{m.name}</td>
                                            {
                                                module.map((mod) => (
                                                    <td className="text-center align-middle" key={mod.id}>
                                                        {permission[m.id] && permission[m.id][mod.id] ? (
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={form.permission.includes(permission[m.id][mod.id])}
                                                                onChange={(e) => handleCheckboxChange(e, permission[m.id][mod.id], m.id)}
                                                            />
                                                        ) : null
                                                        }    
                                                    </td>
                                                ))
                                            }     
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Cards>
                <div className="row mt-3">
                    <div className="col">
                        <div className="mb-3 d-flex justify-content-center">
                            <Link type="button" to={"/role"}  className="d-flex btn btn-secondary btn-pill">Back</Link>
                            &nbsp;
                            <button onClick={formSubmit} type="button"  className="d-flex btn btn-primary btn-pill">Save</button>
                        </div>
                    </div>
                </div>
            </LayoutsAuth>
        </>
    )
}
