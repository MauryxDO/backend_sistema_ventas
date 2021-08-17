let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config()

chai.use(chaiHttp);
const url = process.env.db;
const tokenReturn = process.env.tokenR;
describe("Funciones de Persona", ()=>{
    before(()=>{
        console.log("Probando las funciones de Persona");
    });

    after(()=>{
        console.log("Fin de las pruebas")
    });

    //Add
    
    describe("Función Agregar persona", ()=>{

        it("Debe registrar un persona", (done)=>{
            chai.request(url)
            .post('/api/persona/add')
            .set({'token': `${tokenReturn}`})
            .send({
                tipo_persona: 'Cliente',
                nombre: 'Liliana Paredes',
                direccion: 'Calle Reforma #134',
                telefono: '2431221203',
                email: 'lili@gmail.com'
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe rechazar si ya existe el email", (done)=>{
            chai.request(url)
            .post('/api/persona/add')
            .set({'token': `${tokenReturn}`})
            .send({
                tipo_persona: 'Cliente',
                nombre: 'Liliana Paredes',
                direccion: 'Calle Reforma #134',
                telefono: '2431221203',
                email: 'lili@gmail.com'
            })
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        });


        it("Debe rechazar token no autorizado", (done)=>{
            chai.request(url)
            .post('/api/persona/list')
            .set({'token': `123${tokenReturn}`})
            .end(function(err, res){
                //console.log(res);
                expect(res).to.have.status(404);
                done();
            });
        });

        it("Debe rechazar si hay campos vacios", (done)=>{
            chai.request(url)
            .post('/api/persona/add')
            .set({'token': `${tokenReturn}`})
            .send({
                tipo_persona: '',
                nombre: '',
                direccion: 'Calle Reforma #134',
                telefono: '2431221203',
                email: 'lli@gmail.com'
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
        
        it('Debe listar a las personas', (done)=>{
            chai.request(url)
            .get('/api/persona/list')
            .set({'token': `${tokenReturn}`})
            .end((err, res)=>{
                //id = res.body[res.body.length - 1]._id;
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe Buscar a la persona Lucia", (done)=>{
            chai.request(url)
            .get('/api/persona/listSearch?valor=Lucia')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe regresar error si no se encuentran resultados", (done)=>{
            chai.request(url)
            .get('/api/persona/listSearch?valor=hola')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it("Debe filtrar solo a proovedores", (done)=>{
            chai.request(url)
            .get('/api/persona/listProveedores')
            .set({'token': `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(200);
                done();
            });
        });

        it('Debe actualizar a la persona', (done)=>{
            chai.request(url)
            .put('/api/persona/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611ae58a7407d7335cb2322f',
                tipo_persona: 'Cliente',
                nombre: 'Lucía Alvez',
                direccion: 'Calle Reforma #134',
                telefono: '2431221203',
                email: 'lulu@gmail.com'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('No debe actualizar si hay valores vacios', (done)=>{
            chai.request(url)
            .put('/api/persona/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611ae58a7407d7335cb2322f',
                tipo_persona: '',
                nombre: 'Lucía Alvez',
                direccion: 'Calle Reforma #134',
                telefono: '2431221203',
                email: ''
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done();
            });
        });
        
        it('Debe detectar email existente', (done)=>{
            chai.request(url)
            .put('/api/persona/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611ae58a7407d7335cb2322f',
                tipo_persona: 'Cliente',
                nombre: 'Lucía Alvez',
                direccion: 'Calle Reforma #134',
                telefono: '2431221203',
                email: 'lili@gmail.com'
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Debe eliminar el registro',(done)=>{
            chai.request(url)
            .delete('/api/persona/remove')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611b924c6425772150441cc0'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Al eliminar detectar si el registro existe',(done)=>{
            chai.request(url)
            .delete('/api/persona/remove')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611b8e7096786e3590f45b02'
            })
            .end((err, res)=>{
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        it('Debe detectar si no se ingresa el id',(done)=>{
            chai.request(url)
            .delete('/api/persona/remove')
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

        it('Debe habilitar a la persona',(done)=>{
            chai.request(url)
            .put('/api/persona/activate')
            .set({'token': `${tokenReturn}`})
            .send({
                _id:'611b8ecdc18c9e295cd3946f'
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
        });
    });
});