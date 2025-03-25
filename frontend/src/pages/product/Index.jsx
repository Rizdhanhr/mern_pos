import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import ButtonCreate from "../../components/button/ButtonCreate";
import { useState, useEffect } from "react";
import ProductService from "../../services/productService";

export default function ProductIndex() {
    const title = "Product";
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

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <LayoutsAuth title={title} button={<ButtonCreate link={'/product/create'} name={'Create Product'} />}>
                <Cards>
                   
                </Cards>
            </LayoutsAuth>
        </>
    )
}