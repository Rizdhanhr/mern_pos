import React, { children } from "react";
import PageHeader from "./Header";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import store from "../store";
export default function LayoutsAuth({children,title,button}){

    return(
        <>
            <Provider store={store}>
            <div className="page">
                <Navbar/>
                <div className="page-wrapper">
                    <PageHeader button={button} title={title}/>
                        <div className="page-body">
                            <div className="container">
                        {children}

                            </div>
                    </div>
                </div>
            </div>
            </Provider>
    </>
    )

}
