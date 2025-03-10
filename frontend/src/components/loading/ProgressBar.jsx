import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// import "./ProgressBar.css";

export default function ProgressBar() {
  const location = useLocation();

  nprogress.configure({ showSpinner: false });

  useEffect(
    () => {
      // Mulai progress saat lokasi berubah
      nprogress.start();

      return () => {
        // Ini akan dipanggil sebelum lokasi berubah
        nprogress.done();
      };
    },
    [location]
  );

  useEffect(
    () => {
      // Selalu pastikan progress selesai saat halaman sudah siap
      nprogress.done();
    },
    [location]
  );

  return null;
}
