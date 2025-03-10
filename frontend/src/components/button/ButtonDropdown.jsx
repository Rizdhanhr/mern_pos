import React from "react";
import { Link } from "react-router-dom";


export default function ButtonDropdown({items}) {
    return (
        <>
            <div className="dropdown">
            <button className="btn btn-sm btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Option
            </button>
            <ul className="dropdown-menu">
                {items.map((item, index) => (
                    <li key={index}>
                        {item.type === "link" ? (
                            <Link className="dropdown-item" to={item.link}>
                                {item.label}
                            </Link>
                        ) : (
                            <button className="dropdown-item" onClick={item.onClick}>
                                {item.label}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            </div>
        </>
    )
}