import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "antd";
// import './ButtonDropdown.css';


export default function ButtonDropdown({ title = "Options", items = [] }) {
    const antItems = items.map((item, index) => {
        return {
        key: index,
        label:
            item.type === "link" ? (
            <Link to={item.link}>{item.label}</Link>
            ) : (
            <span onClick={item.onClick}>{item.label}</span>
            ),
        };
    });

    return (
        <>
            <Dropdown menu={{ items: antItems }} trigger={['click']} placement="bottomRight">
                <Button size="small">{title}</Button>
            </Dropdown>
            {/* <div className="btn-group dropup">
                <div className="dropdown">
                    <button className="btn btn-sm btn-secondary dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" data-bs-container="body" aria-expanded="false">
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
            </div> */}
            
        </>
    )
}