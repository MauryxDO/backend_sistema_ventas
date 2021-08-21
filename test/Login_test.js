let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config()

chai.use(chaiHttp);
const url = process.env.db;

//Registro Usuario
describe("Registro y autenticación", ()=>{
    //Pruebas
    describe("Autenticar usuario", ()=>{
        it("Debe autenticar un usuario", (done)=>{
            chai.request(url)
            .post('/api/usuario/login')
            .send({
                email: "miau@gmail.com",
                password:"123456",
            })
            .end((err, res)=>{
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('tokenReturn');
                done();
            })
        })

        it("Debe rechazar contraseña invalida", (done)=>{
            chai.request(url)
            .post('/api/usuario/login')
            .send({
                email: "miau@gmail.com",
                password:"12345698",
            })
            .end(function(err, res){
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        })

        it("Rechazar email no registrado", (done)=>{
            chai.request(url)
            .post('/api/usuario/login')
            .send({
                email: "maury@gmail.com",
                password:"123456",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        })

    });

});

