let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const tokenReturn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjg2MzM2NDksImV4cCI6MTYyODcyMDA0OX0.UNcRWTnP-O3yXbrWirM--QRkMlLaXPQX3KCysEzwqNg';
describe("Funciones de Articulos", ()=>{

    //Add
    describe("Funciones basicas de categoria", ()=>{
        it("Debe registrar un Articulo", (done)=>{
            chai.request(url)
            .post('/api/categoria/add')
            .set({'token': `${tokenReturn}`})
            .send({
                nombre:"Peluqueria",
                descripcion: "Hola soy una categoria",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('reg');
                done();
            });
        });

        it("Debe rechazar si ya existe un Articulo", (done)=>{
            chai.request(url)
            .post('/api/categoria/add')
            .set({'token': `${tokenReturn}`})
            .send({
                nombre:"Cosmeticos",
                descripcion: "Hola soy un cosmetico",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si no hay token", (done)=>{
            chai.request(url)
            .post('/api/categoria/add')
            .set({'token': ''})
            .send({
                nombre:"Cosmeticos",
                descripcion: "Hola soy un cosmetico",
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
            .post('/api/usuario/add')
            .set({'token': `123${tokenReturn}`})
            .send({
                nombre:"Cosmeticos",
                descripcion: "Hola soy un cosmetico",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(403);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Debe listar Articulos', (done)=>{
            chai.request(url)
            .get('/api/categoria/list')
            .set({'Token': `${tokenReturn}`})
            .end((err, res)=>{
                id = res.body[res.body.length - 1]._id;
                expect(res).to.have.status(200);
                done();
            });
        });

        it('Debe buscar el producto Maquina', (done)=>{
            chai.request(url)
            .get('/api/categoria/list?valor=cabello')
            .set({'Token': `${tokenReturn}`})
            .end((err, res)=>{
                expect(res).to.have.status(200);
                done();
            });
        });

        it('Debe buscar Articulo por ID', (done)=>{
            chai.request(url)
            .get('/api/categoria/query?_id=60ebfaa1b69c6024ccef563c')
            .set({'Token': `${tokenReturn}`})
            .end((err, res)=>{
                expect(res).to.have.status(200);
                done();
            });
        });

        it('Debe rechazar si el ID no existe', (done)=>{
            chai.request(url)
            .get('/api/categoria/query?_id=60dea51271ee4331b0571a9e')
            .set({'Token': `${tokenReturn}`})
            .end((err, res)=>{
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe actualizar una Articulo", (done)=>{
            chai.request(url)
            .post('/api/categoria/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'60ebfaa1b69c6024ccef563c',
                nombre:"Holi",
                descripcion: "Hola soy una categoria",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(404);
                done();
            });
        });

        it("Debe rechazar si se intenta actualizar Articulo existente", (done)=>{
            chai.request(url)
            .post('/api/categoria/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'60ebfaa1b69c6024ccef563c',
                nombre:"Cosmeticos",
                descripcion: "Hola soy una categoria",
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(404);
                done();
            });
        });
        //Eliminar Articulo
        it("Eliminar Articulo mediante id",(done)=>{
                chai.request(url)
                .delete('/api/usuario/remove')
                .set({'Token': `${tokenReturn}`})
                .send({
                    _id:'6114a37d114d75356caa350c',
                })
                .end((err, res)=>{
                    expect(res).to.have.status(404);
                    done()
                });
        })
    
            it("Validar que el Id exista",(done)=>{
                chai.request(url)
                .delete('/api/categoria/remove')
                .set({'Token': `${tokenReturn}`})
                .send({
                    _id: '61149c926b37213cc49b39b4',
                })
                .end((err, res)=>{
                    console.log(res.body);
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message');
                    done()
                });
        })
    
            it("Validar que se recibe un id valido",(done)=>{
                chai.request(url)
                .delete('/api/categoria/remove')
                .set({'Token': `${tokenReturn}`})
                .send({
                    _id: '123',
                })
                .end((err, res)=>{
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message');
                    done()
                });
        })

    });
});