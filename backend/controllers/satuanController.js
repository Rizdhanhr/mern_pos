const connection = require("../config/db");
const Satuan = require("../models/Satuan");
const { body, validationResult } = require('express-validator');


async function satuanIndex(req, res) {
    try {
        const results = await Satuan.getAll();
        res.render('satuan/index', { title: "Satuan", satuan: results });
    } catch (err) {
        res.render('exception/500');
    }
    // connection.query("SELECT name, DATE_FORMAT(updated_at, '%Y-%m-%d %H:%i:%s') AS last_update FROM satuan ORDER BY name ASC", (err, results) => {
    //    res.render('satuan/index',{title: "Satuan", satuan: results});
    // });
}

function satuanGetData(req, res) {
    // res.render('satuan/index',{title: "Satuan"});
}

function satuanCreate(req, res){
    res.render('satuan/create',{title: "Create Satuan"});
}

async function satuanStore(req, res){
    // res.send('cok');
    try{
        const errors = validationResult(req);
            req.flash('oldInput', req.body);
            if (!errors.isEmpty()) {
                const errorMessage = errors.array().reduce((acc, error) => {
                    if(!acc[error.path]){
                        acc[error.path] = error.msg; 
                    }
                    return acc;
                }, {});
                req.flash('errors', errorMessage);
                return res.redirect('/satuan/create');
            }

        const results = await Satuan.insertData(req.body); 
        req.flash('successMessage', 'Data Saved'); 
        return res.redirect('/satuan');
    }catch(error){
        req.flash('errorMessage', 'Server Error!');
        return res.redirect('/satuan/create');
    }
}

async function satuanEdit(req, res){
    try {
        const id = req.params.id; // Ambil ID dari parameter URL
        const result = await Satuan.getSingleData(id); // Ambil data berdasarkan ID
        // Render formulir edit dengan data yang diambil
       
        res.render('satuan/edit', { title:'Satuan Edit',satuan: result[0] }); // Sesuaikan nama view dan data yang dioper
    } catch (error) {
       res.render('exception/404');
    }

}


async function satuanUpdate(req, res){
    try {
        const id = req.params.id;
        const errors = validationResult(req);
        req.flash('oldInput', req.body);
        if (!errors.isEmpty()) {
            const errorMessage = errors.array().reduce((acc, error) => {
                if(!acc[error.path]){
                    acc[error.path] = error.msg; 
                }
                return acc;
            }, {});
            req.flash('errors', errorMessage);
            return res.redirect(`/satuan/edit/${id}`);
        }

        const result = await Satuan.updateData(id, req.body);  
        // res.send('sukses')
        req.flash('successMessage', 'Data Updated'); 
        return res.redirect('/satuan'); // Sesuaikan nama view dan data yang dioper
    } catch (error) {
        req.flash('errorMessage', 'Server Error!');
        return res.redirect('/satuan/create');
    }

}

async function satuanDelete(req, res){
    try{
        const id = req.params.id;
        const result = await Satuan.deleteData(id);
        req.flash('successMessage', 'Data Deleted'); 
        return res.redirect('/satuan');
    }catch(error){
        req.flash('errorMessage', 'Server Error!');
        return res.redirect('/satuan');
    }
}

module.exports = {
  satuanIndex,
  satuanCreate,
  satuanStore,
  satuanEdit,
  satuanUpdate,
  satuanDelete
};
