import "./error.css";
export default function Forbidden() {
    return (
        <>
         <div className="page page-center">
      <div className="empty-state">
        <h2 className="empty-state-title">403 FORBIDDEN</h2>
        <p className="empty-state-subtitle">Oops, you found an error page!</p>
        <div className="empty-state-action">
          <a href="/" className="btn btn-primary">
            {/* Download SVG icon from http://tabler-icons.io/i/arrow-left */}
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l6 6" />
              <path d="M5 12l6 -6" />
            </svg>
            Take me home
          </a>
        </div>
      </div>
    </div>
      
        </>
    )
}