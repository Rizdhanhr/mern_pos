require("dotenv").config();
const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Nama database
  process.env.DB_USERNAME, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql", // Dialek database yang digunakan
    logging: false, // Nonaktifkan logging query di console (opsional)
    pool: {
      // Konfigurasi koneksi pool (opsional)
      max: 5, // Jumlah koneksi maksimum
      min: 0, // Jumlah koneksi minimum
      acquire: 30000, // Waktu maksimum untuk mendapatkan koneksi
      idle: 10000 // Waktu maksimum koneksi tidak digunakan
    }
  }
);

module.exports = sequelize;
