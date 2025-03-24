import { Helmet } from "react-helmet-async";
import { Cards } from "../../components/card/Card";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import ButtonCreate from "../../components/button/ButtonCreate";

export default function ProductIndex() {
    const title = "Product";
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