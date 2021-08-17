let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config()

chai.use(chaiHttp);
const url = process.env.db;
const tokenReturn = process.env.tokenR;
describe("Funciones de ingreso", ()=>{
    before(()=>{
        console.log("Probando las funciones de Ingreso");
    });

    after(()=>{
        console.log("Fin de las pruebas")
    });
    describe("Función Agregar ingreso", ()=>{

        it("Debe registrar una Factura", (done)=>{
            chai.request(url)
            .post('/api/ingreso/add')
            .set({'token': `${tokenReturn}`})
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"FACTURA",
                "serie_comprobante":"001",
                "num_comprobante":"001",
                "impuesto": "0.16",
                "total":"2000",
                "detalles":[
                    {
                        "_id":"6112d5f79ec75b15c0d74c67",
                        "articulo":"Hydra",
                        "cantidad":"10",
                        "precio":"38"
                    }
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

        it("Debe rechazar si repite número de comprobante", (done)=>{
            chai.request(url)
            .post('/api/ingreso/add')
            .set({'token': `${tokenReturn}`})
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"FACTURA",
                "serie_comprobante":"001",
                "num_comprobante":"001",
                "impuesto": "0.16",
                "total":"2000",
                "detalles":[
                    {
                        "_id":"6112d5f79ec75b15c0d74c67",
                        "articulo":"Hydra",
                        "cantidad":"10",
                        "precio":"38"
                    }
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
            .post('/api/ingreso/add')
            .set({'token': `${tokenReturn}`})
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"FACTURA",
                "serie_comprobante":"002",
                "num_comprobante":"002",
                "impuesto": "0.16",
                "total":"",
                "detalles":[
                    {
                        "_id":"6112d5f79ec75b15c0d74c67",
                        "articulo":"Hydra",
                        "cantidad":"10",
                        "precio":"38"
                    }
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
            .post('/api/ingreso/add')
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"Habilitar",
                "serie_comprobante":"004",
                "num_comprobante":"004",
                "impuesto": "0.16",
                "total":"200",
                "detalles":[
                    {
                        "_id":"611c2580f7c3d138d445060a",
                        "articulo":"Esmalte",
                        "cantidad":"20",
                        "precio":"75"
                    }
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
            .post('/api/ingreso/add')
            .set({'token': `123${tokenReturn}`})
            .send({
                "usuario": {"_id":"6112d5f79ec75b15c0d74c67"},
                "persona":{"_id":"611b927b1f47c1379c9b701e"},
                "tipo_comprobante":"Habilitar",
                "serie_comprobante":"004",
                "num_comprobante":"004",
                "impuesto": "0.16",
                "total":"200",
                "detalles":[
                    {
                        "_id":"611c2580f7c3d138d445060a",
                        "articulo":"Esmalte",
                        "cantidad":"20",
                        "precio":"75"
                    }
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

        it("Buscar Ingreso Por ID", (done)=>{
            chai.request(url)
            .get('/api/ingreso/query?_id=611c2f1ffda90c3ad8a01d42')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('reg');
                done();
            });
        });

        it("Debe dar error si el registro no existe", (done)=>{
            chai.request(url)
            .get('/api/ingreso/query?_id=611c25fbf7c3d138d4450616')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe listar ingresos", (done)=>{
            chai.request(url)
            .get('/api/ingreso/list')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Filtrar todas las facturas", (done)=>{
            chai.request(url)
            .get('/api/ingreso/listSearch?valor=FACTURA')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe mandar un mensaje si no existe el resultado", (done)=>{
            chai.request(url)
            .get('/api/ingreso/listSearch?valor=mauricu')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(404);
                done();
            });
        });
        
        it("Debe deshabilitar el ingreso y que reduzca el stock", (done)=>{
            chai.request(url)
            .put('/api/ingreso/activate')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '611c315ffe79952bd40276e3'
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe habilitar el ingreso y que aumente el stock", (done)=>{
            chai.request(url)
            .put('/api/ingreso/deactivate')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '611c315ffe79952bd40276e3'
            })
            .end(function(err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });
    });
});