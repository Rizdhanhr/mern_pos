import React from "react";

export function Cards({ children, header, footer }) {
  return (
    <div className="card">
      {header
        ? <div className="card-header">
            {header}
          </div>
        : ""}
      <div className="card-body">
        {children}
      </div>
      {footer
        ? <div className="card-footer">
            {footer}
          </div>
        : ""}
    </div>
  );
}
