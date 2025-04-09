const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

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
    const pais = req.body.pais;
    const telefono = req.body.telefono;

    db.query('INSERT INTO clientes(identificacion,nombre,correo,pais,telefono) VALUES(?,?,?,?,?)',[identificacion,nombre,correo,pais,telefono],
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
    const pais = req.body.pais;
    const telefono = req.body.telefono;

    db.query('UPDATE clientes SET identificacion=?,nombre=?,correo=?,pais=?,telefono=? WHERE id=?',[identificacion,nombre,correo,pais,telefono,id],
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


app.get("client/public/index.html",function(req,res){

    res.render("index.html");
});


app.post('/crearEmp', (req, res) => {
  const { nombreE, salario, edad, cargo } = req.body;
  db.query('INSERT INTO empleados (nombreE, salario, edad, cargo) VALUES (?, ?, ?, ?)',[nombreE, salario, edad, cargo],
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

app.put("/updateE",(req,res)=>{

    const { id_unicoE, nombreE, salario, edad, cargo } = req.body;

    db.query('UPDATE empleados SET nombreE=?,salario=?,edad=?,cargo=? WHERE id_unicoE=?',[nombreE, salario, edad, cargo,id_unicoE],
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

app.delete("/deleteE/:id_unicoE",(req,res)=>{

    const id_unicoE = req.params.id_unicoE;

    db.query('Delete FROM empleados WHERE id_unicoE=?',id_unicoE,
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

app.get("/empleados",(req,res)=>{

    db.query('SELECT * FROM empleados',
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


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.post('/rooms', upload.single('image'), (req, res) => {
    const { category, price } = req.body;
    const image = req.file.filename; 

    const query = 'INSERT INTO rooms (category, price, image) VALUES (?, ?, ?)';
    db.query(query, [category, price, image], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ id: results.insertId, category, price, image });
        }
    });
});

app.put('/Editroom', upload.single('image'), (req, res) => {
    const { category, price } = req.body;
    const image = req.file.filename; 
    const { id_room } = req.body;

    db.query('UPDATE rooms SET category = ?, price = ?, image = ? WHERE id_room = ?',[category, price, image, id_room],
    (error, results) => {
        if (error) {
            console.error(error);
        } else {
                res.send(results);
        }
    });
});

app.delete("/deleteR/:id_room",(req,res)=>{

    const id_room = req.params.id_room;

    db.query('Delete FROM rooms WHERE id_room=?',id_room,
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

app.use('/uploads', express.static('uploads'));



app.get("/Mostrarrooms",(req,res)=>{

    db.query('SELECT * FROM rooms',
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


app.post("/addReserva",(req,res)=>{

    const FK_cliente = req.body.FK_cliente;
    const FK_empleado = req.body.FK_empleado;
    const FK_rooms = req.body.FK_rooms;

    db.query('INSERT INTO reservas(FK_cliente,FK_empleado,FK_rooms) VALUES(?,?,?)',[FK_cliente,FK_empleado,FK_rooms],
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
app.get("/Mostrarinfo",(req,res)=>{

    db.query('SELECT reservas.id_reservas,clientes.id,clientes.identificacion,clientes.nombre,clientes.correo,empleados.id_unicoE,empleados.nombreE,empleados.cargo,rooms.id_room,rooms.category,rooms.price FROM reservas INNER JOIN clientes ON clientes.id = reservas.FK_cliente INNER JOIN empleados ON empleados.id_unicoE = reservas.FK_empleado INNER JOIN rooms ON rooms.id_room = reservas.FK_rooms ',
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

app.post("/createReport",(req,res)=>{

    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const fk_reserva = req.body.fk_reserva;

    db.query('INSERT INTO reportes(titulo,descripcion,fk_reserva) VALUES(?,?,?)',[titulo,descripcion,fk_reserva],
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