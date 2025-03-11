import React, { useEffect, useState } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import ButtonCreate from "../../components/button/ButtonCreate";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import BrandService from "../../services/brandService";
import SearchInput from "../../components/input/SearchInput";
import CustomDataTable from "../../components/table/CustomDatatable";
import ButtonDropdown from "../../components/button/ButtonDropdown";
import { alertConfirmDelete, alertSuccess } from "../../components/alert/Alert";

export default function BrandIndex(){
    const title = "Brand";
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [sortColumn, setSortColumn] = useState(1);
    const [sortOrder, setSortOrder] = useState("desc");
    
    useEffect(() => {
        getData();
    }, [page, perPage, search, sortColumn, sortOrder]);

    async function getData() {
        try {
            setLoading(true);
            const response = await BrandService.getDatatable(page, perPage, search, sortColumn, sortOrder);
            setData(response.data.data);
            setTotalRows(response.data.total);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    async function deleteData(id) {
        try {
            setLoading(true);
            const response = await BrandService.delete(id);
            alertSuccess(response.data.message);
            getData();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            sortField: 0,
        },
        {
            name: 'Last Update',
            selector: row => row.updated_at,
            sortable: true,
            sortField: 1,
            width : '200px'
        },
        {
            name: "Action",  // Nama kolom
                cell: row => {
                    const items = [];
                    items.push({ label: "Edit", type: "link", link: `/brand/${row.id}/edit`});
                    items.push({ label: "Delete", type: "action", onClick: () => alertConfirmDelete(() => deleteData(row.id)) });
                    return <ButtonDropdown
                        title="Options"
                        items={items}
                    />
                },
            button: "true"
        }
    ];

    const handlePageChange = page => {
        setPage(page);
    };

    const handlePerPageChange = (newPerPage, page) => {
        setPerPage(newPerPage);
        setPage(page); 
    };

    const handleSort = (column, sortDirection) => {
        setSortColumn(column.sortField); 
        setSortOrder(sortDirection); 
    };

    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <LayoutsAuth title={title} button={<ButtonCreate link={'/brand/create'} name={'Create Brand'} />}>
                <Cards>
                    <SearchInput search={search} setSearch={setSearch} />
                    <div className="table-responsive">
<CustomDataTable
                        columns={columns}
                        data={data}
                        totalRows={totalRows}
                        handlePageChange={handlePageChange}
                        handlePerPageChange={handlePerPageChange}
                        handleSort={handleSort}
                        loading={loading}
                    />
                    </div>
                     
                </Cards>
            </LayoutsAuth>
        </>
    )
}
