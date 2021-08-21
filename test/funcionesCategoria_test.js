let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config()

chai.use(chaiHttp);
const url = process.env.db;
const tokenReturn = process.env.tokenR;
describe("Funciones de Categoria", ()=>{
    before(()=>{
        console.log("Probando las funciones de Categoria");
    });

    after(()=>{
        console.log("Fin de las pruebas")
    });

    describe("Función Agregar Categoria", ()=>{

        it("Debe registrar una Categoria", (done)=>{
            chai.request(url)
            .post('/api/categoria/add')
            .set({'token': `${tokenReturn}`})
            .send({
                nombre: 'Tintes',
                descripcion: 'Todo tipos de tintes'
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si ya existe la categoria", (done)=>{
            chai.request(url)
            .post('/api/categoria/add')
            .set({'token': `${tokenReturn}`})
            .send({
                nombre: 'Tintes',
                descripcion: 'Todo tipos de tintes'
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
            .post('/api/categoria/add')
            .send({
                nombre: 'uñas',
                descripcion: 'Productos para la piel'
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
            .post('/api/categoria/add')
            .set({'token': `123${tokenReturn}`})
            .send({
                nombre: 'uñas',
                descripcion: 'Productos para la piel'
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
            .post('/api/categoria/add')
            .set({'token': `${tokenReturn}`})
            .send({
                nombre: '',
                descripcion: 'Productos para la piel'
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
        
        it('Debe listar categorias', (done)=>{
            chai.request(url)
            .get('/api/categoria/list')
            .set({'token': `${tokenReturn}`})
            .end((err, res)=>{
                //id = res.body[res.body.length - 1]._id;
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe Buscar la palabra cabeza", (done)=>{
            chai.request(url)
            .get('/api/categoria/listSearch?valor=cabeza')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe regresar error si no se encuentran resultados", (done)=>{
            chai.request(url)
            .get('/api/categoria/listSearch?valor=hola')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Debe actualizar la categoria', (done)=>{
            chai.request(url)
            .put('/api/categoria/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'60ebfaa1b69c6024ccef563c',
                nombre: 'Belleza',
                descripcion: 'Productos para el cuidado de pies a cabeza'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('No debe actualizar si hay valores vacios', (done)=>{
            chai.request(url)
            .put('/api/categoria/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '60ebfaa1b69c6024ccef563c',
                nombre: '',
                descripcion: 'Productos para el cuidado de pies a cabeza'
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done();
            });
        });

        it('No debe actualizar si ya existe la categoria', (done)=>{
            chai.request(url)
            .put('/api/categoria/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '60ebfaa1b69c6024ccef563c',
                nombre: 'Belleza',
                descripcion: 'Productos para el cuidado de pies a cabeza'
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        });
        
        it('Debe eliminar la categoria',(done)=>{
            chai.request(url)
            .delete('/api/categoria/remove')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'61206f54cbffd91f3c714342'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Validar si el ID existe',(done)=>{
            chai.request(url)
            .delete('/api/categoria/remove')
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
            .delete('/api/categoria/remove')
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

        it('Debe desahabilitar una categoria',(done)=>{
            chai.request(url)
            .put('/api/categoria/deactivate')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611b83ee1d194229801f346e'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });
    });
});