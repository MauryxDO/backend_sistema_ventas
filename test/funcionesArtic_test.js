let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config()

chai.use(chaiHttp);
const url = process.env.db;
const tokenReturn = process.env.tokenR;
describe("Funciones de Articulos", ()=>{
    before(()=>{
        console.log("Probando las funciones de Articulo");
    });

    after(()=>{
        console.log("Fin de las pruebas")
    });

    //Add
    
    describe("Función Agregar Articulo", ()=>{

        it("Debe registrar un Articulo", (done)=>{
            chai.request(url)
            .post('/api/articulo/add')
            .set({'token': `${tokenReturn}`})
            .send({
                categoria:"6114a5e07290192e40931ee4",
                codigo: "1",
                nombre: "Pomada",
                descripcion: "Prueba",
                precio_venta: 50,
                stock: 20
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si ya existe un Articulo", (done)=>{
            chai.request(url)
            .post('/api/articulo/add')
            .set({'token': `${tokenReturn}`})
            .send({
                categoria:"6114a5e07290192e40931ee4",
                codigo: "1",
                nombre: "Pomada",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si el código ya esta registrado", (done)=>{
            chai.request(url)
            .post('/api/articulo/add')
            .set({'token': `${tokenReturn}`})
            .send({
                categoria:"6114a5e07290192e40931ee4",
                codigo: "1",
                nombre: "Pomada",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si no hay token", (done)=>{
            chai.request(url)
            .post('/api/articulo/add')
            .send({
                categoria:"6114a5e07290192e40931ee4",
                codigo: "2",
                nombre: "Hola",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar token no autorizado", (done)=>{
            chai.request(url)
            .post('/api/articulo/add')
            .set({'token': `123${tokenReturn}`})
            .send({
                categoria:"6114a5e07290192e40931ee4",
                codigo: "2",
                nombre: "Hola",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si hay campos vacios", (done)=>{
            chai.request(url)
            .post('/api/articulo/add')
            .set({'token': `${tokenReturn}`})
            .send({
                categoria:"6114a5e07290192e40931ee4",
                codigo: "2",
                nombre: "",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done();
            });
        });


    });
    

    //Funciones Listar, buscar, actualizar y eliminar
    describe("Funciones Listar, buscar, actualizar y eliminar", ()=>{
        
        it('Debe listar Articulos', (done)=>{
            chai.request(url)
            .get('/api/articulo/list')
            .set({'token': `${tokenReturn}`})
            .end((err, res)=>{
                //id = res.body[res.body.length - 1]._id;
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe Buscar la palabra hidratante", (done)=>{
            chai.request(url)
            .get('/api/articulo/listSearch?valor=hidratante')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe regresar error si no se encuentran resultados", (done)=>{
            chai.request(url)
            .get('/api/articulo/listSearch?valor=hola')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Debe actualizar el Articulo', (done)=>{
            chai.request(url)
            .put('/api/articulo/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '611b6d38cc4726098801b234',
                categoria:"6114a5e07290192e40931ee4",
                codigo: "21",
                nombre: "Prueba",
                descripcion: "Prueba",
                precio_venta: 50,
                stock: 20
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('No debe actualizar si hay valores vacios', (done)=>{
            chai.request(url)
            .put('/api/articulo/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '611b6d38cc4726098801b234',
                categoria:"6114a5e07290192e40931ee4",
                codigo: "",
                nombre: "",
                descripcion: "Prueba",
                precio_venta: 50,
                stock: 20
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done();
            });
        });
        
        it('Debe detectar valores invalidos', (done)=>{
            chai.request(url)
            .put('/api/articulo/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '611b6d38cc4726098801b234',
                categoria:"6114a5e07290192e40931ee4",
                codigo: "12",
                nombre: "s",
                descripcion: "Prueba",
                precio_venta: '40n',
                stock: '20n',
            })
            .end((err, res)=>{
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Debe eliminar el registro',(done)=>{
            chai.request(url)
            .delete('/api/articulo/remove')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611b7d38feca0b3224c621d2'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Al eliminar detectar si el registro existe',(done)=>{
            chai.request(url)
            .delete('/api/articulo/remove')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611b7b3f8035582f10493b03'
            })
            .end((err, res)=>{
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Debe detectar si no se ingresa el id',(done)=>{
            chai.request(url)
            .delete('/api/articulo/remove')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:''
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done();
            });
        });
    });
});