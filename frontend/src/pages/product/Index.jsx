import { React, useState, useEffect } from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import ButtonCreate from "../../components/button/ButtonCreate";
import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import ProductService from "../../services/productService"; 
import SearchInput from "../../components/input/SearchInput";
import ButtonDropdown from "../../components/button/ButtonDropdown";
import { alertConfirmDelete, alertSuccess } from "../../components/alert/Alert";
import CustomDatatable from "../../components/table/CustomDatatable";
import { Image, Tag } from "antd";
import { alertError } from "../../components/alert/Alert";

export default function ProductIndex() {
    const title = "Product";
    const [data, setData] = useState([]);
    const [tableState, setTableState] = useState({
        page: 1,
        perPage: 10,
        sortColumn: 6,
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
            const response = await ProductService.getDatatable(
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
            const response = await ProductService.delete(id);
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
            width: 300,
            fixed:"left"
        },
        {
            title: "Brand",
            dataIndex: ["brand","name"],
            key: "brand.name",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 1 && tableState.sortOrder,
            columnKey: 1,
            width: 300
        }, 
        {
            title: "Category",
            dataIndex: ["category","name"],
            key: "category.name",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 2 && tableState.sortOrder,
            columnKey: 2,
            width: 300
                
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 3 && tableState.sortOrder,
            columnKey: 3,
            render: (text, record) => {
                return text.toLocaleString()+' / '+record.unit.symbol;
            },
            width: 150,
            align: "center"
        },
        {
            title: "Price Buy",
            dataIndex: "price_buy",
            key: "price_buy",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 4 && tableState.sortOrder,
            columnKey: 4,
            render: (text, record) => {
                return 'Rp. '+text.toLocaleString();
            },
            width: 200
        },
        {
            title: "Price Sell",
            dataIndex: "price_sell",
            key: "price_sell",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 5 && tableState.sortOrder,
            columnKey: 5,
            render: (text, record) => {
                return 'Rp. '+text.toLocaleString();
            },
            width: 200
        },
        {
            title: "Images",
            dataIndex: "images",
            key: "images",
            render: (text, record) => {
                return <Image
                    width={80}
                    src={import.meta.env.VITE_IMAGE_URL + "/product/"+text}
                />
            },
            width: 100,
        },
        {
            title: "Last Update",
            dataIndex: "updated_at",
            key: "updated_at",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 6 && tableState.sortOrder,
            columnKey: 6,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: true,
            sortDirections: ['ascend','descend','ascend'],
            defaultSortOrder : tableState.sortColumn === 7 && tableState.sortOrder,
            columnKey: 7,
            render: (text, record) => {
                return (
                    text? <Tag color="green">Active</Tag> :<Tag color="red">Disabled</Tag>
                )
            },
            width: 120,
            align : "center"
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => {
                let items = [];
                items.push({ label: "Edit", type: "link", link: `/product/${record.id}/edit`});
                items.push({ label: "Delete", type: "action", onClick: () => alertConfirmDelete(() => deleteData(record.id)) });
                return <ButtonDropdown
                    title="Options"
                    items={items}
                />
            },
            width: 40,
            fixed:"right"
        },
        
    ];

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <LayoutsAuth title={title} button={<ButtonCreate link={'/product/create'} name={'Create Product'} />}>
                <Cards>
                     <SearchInput search={search} setSearch={setSearch} setTableState={setTableState} />
                    <CustomDatatable dataSource={data} columns={columns} loading={loading} tableState={tableState} setTableState={setTableState} total={total}/>
                </Cards>
            </LayoutsAuth>
        </>
    )
}