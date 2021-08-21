let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config()

chai.use(chaiHttp);
const url = process.env.db;
const tokenReturn = process.env.tokenR;
describe("Funciones de venta", ()=>{
    before(()=>{
        console.log("Probando las funciones de venta");
    });

    after(()=>{
        console.log("Fin de las pruebas")
    });

    describe("Función Agregar ingreso", ()=>{

        it("Debe registrar una Venta", (done)=>{
            chai.request(url)
            .post('/api/venta/add')
            .set({'token': `${tokenReturn}`})
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"FACTURA",
                "serie_comprobante":"004",
                "num_comprobante":"004",
                "total":"1375",
                "detalles":[
                    {
                        "_id":"611c2580f7c3d138d445060a",
                        "articulo":"Esmalte",
                        "cantidad":"5",
                        "precio":"75",
                        "descuento": "0"
                    },
                ]
            
            })
            .end(function(err, res){
                //console.log(res);
                expect('Content-Type', /json/)
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si repite número de sere", (done)=>{
            chai.request(url)
            .post('/api/venta/add')
            .set({'token': `${tokenReturn}`})
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"FACTURA",
                "serie_comprobante":"004",
                "num_comprobante":"004",
                "total":"1375",
                "detalles":[
                    {
                        "_id":"611c2580f7c3d138d445060a",
                        "articulo":"Esmalte",
                        "cantidad":"5",
                        "precio":"75",
                        "descuento": "0"
                    },
                ]
            })
            .end(function(err, res){
                //console.log(res);
                expect('Content-Type', /json/)
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe dar error si se intenta mandar el total vacio", (done)=>{
            chai.request(url)
            .post('/api/venta/add')
            .set({'token': `${tokenReturn}`})
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"FACTURA",
                "serie_comprobante":"011",
                "num_comprobante":"011",
                "total":"",
                "detalles":[
                    {
                        "_id":"611c2580f7c3d138d445060a",
                        "articulo":"Esmalte",
                        "cantidad":"5",
                        "precio":"75",
                        "descuento": "0"
                    },
                ]
            
            })
            .end(function(err, res){
                //console.log(res);
                expect('Content-Type', /json/)
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done();
            });
        });

        it("Debe rechazar si el token es invalido", (done)=>{
            chai.request(url)
            .post('/api/venta/add')
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"FACTURA",
                "serie_comprobante":"002",
                "num_comprobante":"002",
                "total":"1375",
                "detalles":[
                    {
                        "_id":"611c2580f7c3d138d445060a",
                        "articulo":"Esmalte",
                        "cantidad":"5",
                        "precio":"75",
                        "descuento": "0"
                    },
                ]
            
            })
            .end(function(err, res){
                //console.log(res);
                expect('Content-Type', /json/)
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });
        
        it("Debe rechazar si el usuario no esta autorizado", (done)=>{
            chai.request(url)
            .post('/api/venta/add')
            .set({'token': `123${tokenReturn}`})
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"FACTURA",
                "serie_comprobante":"002",
                "num_comprobante":"002",
                "total":"1375",
                "detalles":[
                    {
                        "_id":"611c2580f7c3d138d445060a",
                        "articulo":"Esmalte",
                        "cantidad":"5",
                        "precio":"75",
                        "descuento": "0"
                    },
                ]
            
            })
            .end(function(err, res){
                //console.log(res);
                expect('Content-Type', /json/)
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('message');
                done();
            });
        });
    });

    describe("Funciones Buscar Id, Listar, Buscar por palabra, habilitar y deshabilitar un registro", ()=>{

        it("Buscar venta Por ID", (done)=>{
            chai.request(url)
            .get('/api/venta/query?_id=611c39c0cfc03e1b60d861b6')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('reg');
                done();
            });
        });

        it("Debe dar error si la venta no existe", (done)=>{
            chai.request(url)
            .get('/api/venta/query?_id=611c25fbf7c3d138d4450616')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe listar los registros", (done)=>{
            chai.request(url)
            .get('/api/venta/list')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Filtrar tipo de comprobante", (done)=>{
            chai.request(url)
            .get('/api/venta/listSearch?valor=Factura')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe mandar un mensaje si no existe el resultado", (done)=>{
            chai.request(url)
            .get('/api/venta/listSearch?valor=mauricu')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(404);
                done();
            });
        });
        
        it("Debe deshabilitar la venta y que reduzca el stock", (done)=>{
            chai.request(url)
            .put('/api/venta/activate')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '611c39c0cfc03e1b60d861b6'
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe habilitar la venta y que aumente el stock", (done)=>{
            chai.request(url)
            .put('/api/venta/deactivate')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '611c39c0cfc03e1b60d861b6'
            })
            .end(function(err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });
    });
});