const express = require("express");
const app = express();
const mysql = require ("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ihome"
});

app.post("/create",(req,res)=>{
    const ID=req.body.ID
    const NOMBRE=req.body.NOMBRE
    const CEDULA=req.body.CEDULA
    const BLOQUE=req.body.BLOQUE
    const APARTAMENTO=req.body.APARTAMENTO
    const PAIS=req.body.PAIS
    const EMAIL=req.body.EMAIL
    const TELEFONOCEL=req.body.TELEFONOCEL

    db.query('INSERT INTO residentes(ID,NOMBRE,CEDULA,BLOQUE,APARTAMENTO,PAIS,EMAIL,TELEFONOCEL) VALUES(?,?,?,?,?,?,?,?)',[ID,NOMBRE,CEDULA,BLOQUE,APARTAMENTO,PAIS,EMAIL,TELEFONOCEL],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("RESIDENTE REGISTRADO CON EXITO");

        }
    }
    )
});


app.get("/residentes",(req,res)=>{
    

    db.query('SELECT * FROM residentes',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result);

        }
    }
    )
});
app.put ("/update",(req,res)=>{
    const ID=req.body.ID
    const NOMBRE=req.body.NOMBRE
    const CEDULA=req.body.CEDULA
    const BLOQUE=req.body.BLOQUE
    const APARTAMENTO=req.body.APARTAMENTO
    const PAIS=req.body.PAIS
    const EMAIL=req.body.EMAIL
    const TELEFONOCEL=req.body.TELEFONOCEL

    db.query('UPDATE residentes SET NOMBRE=?,CEDULA=?,BLOQUE=?,APARTAMENTO=?,PAIS=?,EMAIL=?,TELEFONOCEL=? WHERE ID=?',[NOMBRE,CEDULA,BLOQUE,APARTAMENTO,PAIS,EMAIL,TELEFONOCEL,ID],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("RESIDENTE ACTUALIZADO CON EXITO!!");

        }
    }
    );
});

app.delete("/delete/:ID",(req,res)=>{
    const ID=req.params.ID
    

    db.query('DELETE FROM residentes WHERE ID=?',ID,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Residente eliminado con exito");

        }
    }
    );
});


app.listen(3002,()=>{console.log("corriendo en el puerto 3002")}
)