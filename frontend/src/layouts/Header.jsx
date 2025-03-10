import React from "react";

export default function PageHeader({title,button}) {
    return (
        <>
            <div className="page-header d-print-none">
                <div className="container-xl">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            {/* Page pre-title */}
                            <h2 className="page-title">{title}</h2>
                        </div>
                        {/* Page title actions */}
                        <div className="col-auto ms-auto d-print-none">
                            <div className="btn-list">
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
