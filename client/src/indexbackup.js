/*

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_crud"
});

app.post("/create",(req,res)=>{

    const identificacion = req.body.identificacion;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const packhabitacion = req.body.packhabitacion;
    const nhabitacion = req.body.nhabitacion;

    db.query('INSERT INTO clientes(identificacion,nombre,correo,packhabitacion,nhabitacion) VALUES(?,?,?,?,?)',[identificacion,nombre,correo,packhabitacion,nhabitacion],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    }  
    );
});

app.get("/clientes",(req,res)=>{

    db.query('SELECT * FROM clientes',
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    }  
    );
});

app.put("/update",(req,res)=>{

    const id = req.body.id;
    const identificacion = req.body.identificacion;
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const packhabitacion = req.body.packhabitacion;
    const nhabitacion = req.body.nhabitacion;

    db.query('UPDATE clientes SET identificacion=?,nombre=?,correo=?,packhabitacion=?,nhabitacion=? WHERE id=?',[identificacion,nombre,correo,packhabitacion,nhabitacion,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    }  
    );
});

app.delete("/delete/:id",(req,res)=>{

    const id = req.params.id;

    db.query('Delete FROM clientes WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    }  
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})

*/