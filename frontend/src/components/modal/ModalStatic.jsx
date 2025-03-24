import React, { useEffect, useRef } from "react";

export default function ModalStatic({
  show,
  setShow,
  title = "Modal Title",
  children
}) {
  const previousFocusRef = useRef(null);
  useEffect(
    () => {
      const modalElement = document.getElementById("staticBackdrop");
      const modal = new window.bootstrap.Modal(modalElement);

      if (show) {
        previousFocusRef.current = document.activeElement;
        modal.show();
        modalElement.removeAttribute("aria-hidden");
      } else {
        modal.hide();
        modalElement.setAttribute("aria-hidden", "true");
        previousFocusRef.current && previousFocusRef.current.focus();
      }
    },
    [show]
  );

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden={true}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShow(false)}
              />
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShow(false); // Menutup modal setelah aksi
                }}
              >
                {actionButtonText}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
