const db = require('../config/db');
const moment = require("moment");

class Satuan {
    static getAll(){
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM satuan WHERE deleted_at IS NULL ORDER BY name ASC ", (err, results) => {
                if (err) return reject(err);
                results.forEach(item => {
                    if (item.updated_at) {
                        item.updated_at = moment(item.updated_at).format('DD/MM/YY HH:mm:ss');
                    }
                });
                resolve(results);
            });
        });
    }

    static insertData(data){
        return new Promise((resolve, reject) => {
            const { name } = data;
            const query =  "INSERT INTO satuan (name, created_at, updated_at, created_by, updated_by) VALUES (?, NOW(), NOW(),1,1)";
            db.query(query, name, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        }); 
    }

    static getSingleData(id){
        return new Promise((resolve, reject) => {
            const query =  "SELECT * FROM satuan WHERE id = ?";
            db.query(query, id, (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error('No data found'));
                resolve(results);
            });
        }); 
    }

    static updateData(id, data){
        return new Promise((resolve, reject) => {
            const { name } = data;
            const query =  "UPDATE satuan SET name = ? WHERE id = ?";
            db.query(query, [name,id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        }); 
    }

    static deleteData(id){
        return new Promise((resolve, reject) => {
            const query =  "UPDATE satuan SET deleted_at = NOW() WHERE id = ?";
            db.query(query, [id], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error('No data found'));
                resolve(results);
            });
        }); 
    }

    
}

module.exports = Satuan;