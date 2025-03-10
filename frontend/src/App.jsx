import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProgressBar from './components/loading/ProgressBar';
import AppRoutes from './routes/AppRoutes';
function App() {
  

  return (
    <>
      <HelmetProvider>
        <Router>
          <ProgressBar/>
          <AppRoutes/>
        </Router>
      </HelmetProvider>
     
    </>
  )
}

export default App
