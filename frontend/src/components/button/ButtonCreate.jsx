import React from "react";
import { Link } from "react-router-dom";


export default function ButtonCreate({name,link}) {
    return (
        <>
            <div>
                <Link to={link} className="btn btn-primary d-none d-sm-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                    {name}
                </Link>
                <Link to={link} className="btn btn-primary d-sm-none btn-icon" >
                    {/* Download SVG icon from http://tabler-icons.io/i/plus */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                </Link>
            </div>

        </>
    )
}