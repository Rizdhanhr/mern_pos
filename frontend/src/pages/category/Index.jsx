import React, { useEffect, useState } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import ButtonCreate from "../../components/button/ButtonCreate";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import CategoryService from "../../services/categoryService";
import SearchInput from "../../components/input/SearchInput";
import CustomDatatable from "../../components/table/CustomDatatable";
import ButtonDropdown from "../../components/button/ButtonDropdown";
import { alertConfirmDelete, alertSuccess } from "../../components/alert/Alert";
import usePermission from "../../hooks/usePermission";

export default function CategoryIndex() {
    const {can, canAny} = usePermission();
    const title = "Category";
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
            const response = await CategoryService.getAll(
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
            setLoading(false)
        }
    }

    async function deleteData(id) {
        try {
            setLoading(true);
            const response = await CategoryService.delete(id);
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
            key: "name",
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
                if (can("UPDATE-CATEGORY")) {
                    items.push({ label: "Edit", type: "link", link: `/category/${record.id}/edit`});
                }
                if(can("DELETE-CATEGORY")) {
                    items.push({ label: "Delete", type: "action", onClick: () => alertConfirmDelete(() => deleteData(record.id)) });
                }
                const btnOption = canAny(["UPDATE-CATEGORY","DELETE-CATEGORY"]) && <ButtonDropdown
                    title="Options"
                    items={items}
                />
                return btnOption;
            },
            width: 40
        },
    ];

    

    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <LayoutsAuth title={title} button={ can("CREATE-CATEGORY") &&(<ButtonCreate link={'/category/create'} name={'Create Category'} />) }>
                <Cards>
                    <SearchInput search={search} setSearch={setSearch} setTableState={setTableState} />
                    <CustomDatatable dataSource={data} columns={columns} loading={loading} tableState={tableState} setTableState={setTableState} total={total}/>
                </Cards>
            </LayoutsAuth>
        </>
    )
}
