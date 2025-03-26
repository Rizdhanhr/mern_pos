import React, { useEffect, useState } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import ButtonCreate from "../../components/button/ButtonCreate";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import BrandService from "../../services/brandService";
import SearchInput from "../../components/input/SearchInput";
import ButtonDropdown from "../../components/button/ButtonDropdown";
import { alertConfirmDelete, alertSuccess } from "../../components/alert/Alert";
import CustomDatatable from "../../components/table/CustomDatatable";

export default function BrandIndex(){
    const title = "Brand";
    const [data, setData] = useState([]);
    const [tableState, setTableState] = useState({
        page: 1,
        perPage: 10,
        sortColumn: 1,
        sortOrder: 'descend',
    });
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        getData();
    }, [tableState, search]);

    async function getData() {
        setLoading(true);
        try {
            const { page, perPage, sortColumn, sortOrder } = tableState;
            const response = await BrandService.getDatatable(
                page,
                perPage,
                search,
                sortColumn,
                sortOrder
            );
            setData(response.data.data);
            setTotal(response.data.total);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
            title: "Name",
            dataIndex: "name",
            key: " name",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 0 && tableState.sortOrder,
            columnKey: 0,
            width: 800,
        },
        {
            title: "Last Update",
            dataIndex: "updated_at",
            key: "updated_at",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 1 && tableState.sortOrder,
            columnKey: 1,
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => {
                let items = [];
                items.push({ label: "Edit", type: "link", link: `/brand/${record.id}/edit`});
                items.push({ label: "Delete", type: "action", onClick: () => alertConfirmDelete(() => deleteData(record.id)) });
                return <ButtonDropdown
                    title="Options"
                    items={items}
                />
            },
            width: 100
        },
    ];
    
    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <LayoutsAuth title={title} button={<ButtonCreate link={'/brand/create'} name={'Create Brand'} />}>
                <Cards>
                    <SearchInput search={search} setSearch={setSearch} setTableState={setTableState} />
                    <CustomDatatable dataSource={data} columns={columns} loading={loading} tableState={tableState} setTableState={setTableState} total={total}/>
                </Cards>
            </LayoutsAuth>
        </>
    )
}
