let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const tokenReturn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjg2MzM2NDksImV4cCI6MTYyODcyMDA0OX0.UNcRWTnP-O3yXbrWirM--QRkMlLaXPQX3KCysEzwqNg';
describe("Funciones de artiuclos", ()=>{

    //Add
    describe("Agregar, buscar, listar, actualizar y eliminar", ()=>{
        it("Debe registrar un Articulo", (done)=>{
            chai.request(url)
            .post('/api/articulo/add')
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

        it("Debe rechazar si ya existe el ar", (done)=>{
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
    });
});