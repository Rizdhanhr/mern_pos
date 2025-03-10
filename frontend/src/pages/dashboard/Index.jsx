import React from "react";
import LayoutsAuth from "../../layouts/LayoutsAuth";
import { Helmet } from "react-helmet-async";

export default function Dashboard(){
    const title = "Dashboard";
   
    return(
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <LayoutsAuth title={title}>

            </LayoutsAuth>
        </>
    )
}
