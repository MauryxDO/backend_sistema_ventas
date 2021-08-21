let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config()

chai.use(chaiHttp);
const url = process.env.db;
const tokenReturn = process.env.tokenR;
const tokenVendedor = process.env.tokenV;

describe("Registro de usuarios", ()=>{

    //Add
    describe("Registrar Usuario", ()=>{

        it("Debe registrar usuario", (done)=>{
            chai.request(url)
            .post('/api/usuario/add')
            .set({'token': `${tokenReturn}`})
            .send({
                rol:"Administrador",
                nombre:"Alfonso Felipe",
                direccion: "Epatlan",
                telefono: "2431101233",
                email: "afelipe@gmail.com",
                password:"123456",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si ya existe Email", (done)=>{
            chai.request(url)
            .post('/api/usuario/add')
            .set({'token': `${tokenReturn}`})
            .send({
                rol:"Administrador",
                nombre:"Alfonso Felipe",
                direccion: "Epatlan",
                telefono: "2431101233",
                email: "afelipe@gmail.com",
                password:"123456",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar el registro si no existe token", (done)=>{
            chai.request(url)
            .post('/api/usuario/add')
            .send({
                rol:"Administrador",
                nombre:"Yolito",
                direccion: "Calle reforma #134",
                telefono: "242314423",
                email: "miau@gmail.com",
                password:"123456",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar el registro si el usuario no esta autorizado", (done)=>{
            chai.request(url)
            .post('/api/usuario/add')
            .set({'token': `${tokenVendedor}`})
            .send({
                rol:"Almacenero",
                nombre:"Juan",
                direccion: "Calle reforma #134",
                telefono: "242314423",
                email: "juan@gmail.com",
                password:"123456",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si no hay Email", (done)=>{
            chai.request(url)
            .post('/api/usuario/add')
            .set({'token': `${tokenReturn}`})
            .send({
                rol:"Administrador",
                nombre:"Yolito",
                direccion: "Calle reforma #134",
                telefono: "242314423",

                password:"123456",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si no hay contraseña", (done)=>{
            chai.request(url)
            .post('/api/usuario/add')
            .set({'token': `${tokenReturn}`})
            .send({
                rol:"Administrador",
                nombre:"Yolito",
                direccion: "Calle reforma #134",
                telefono: "242314423",
                email: "yolito@gmail.com",

            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        })

        
    });

});
