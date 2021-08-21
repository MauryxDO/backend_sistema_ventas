let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
require('dotenv').config()

chai.use(chaiHttp);
const url = process.env.db;
const tokenReturn = process.env.tokenR;
//Usuario por ID
    describe("Funciones usuario", ()=>{
console
    //Listar Usuario
    describe("Funciones Listar, obtener, actualizar y eliminar usuario", ()=>{

        it('Debe listar Usuarios', (done)=>{
            chai.request(url)
            .get('/api/usuario/list')
            .set({'Token': `${tokenReturn}`})
            .end((err, res)=>{
                id = res.body[res.body.length - 1]._id;
                expect(res).to.have.status(200);
                done();
            });
        });

        //Obtener usuario ID
        it("Devolver usuario por ID", (done)=>{
            chai.request(url)
            .get('/api/usuario/query?_id=6112d5f79ec75b15c0d74c67')
            .set({'Token': `${tokenReturn}`})
            .end((err, res)=>{
                expect(res).to.have.status(200);
                done();
            })
        });

        it("Debe rechazar si no existe el usuario",(done)=>{
            chai.request(url)
            .get('/api/usuario/query?_id=6112d5f79ec75b15c0d74c61')
            .set({"Token": `${tokenReturn}`})
            .end(function(err, res){
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done();
            });
        });

        //Actualizar Usuario
        it("Debe actualizar usuario por Id", (done)=>{
            chai.request(url)
            .put('/api/usuario/update')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: '611ef8e8e088b52c88da5ba0',
                rol: "Vendedor",
                nombre:"Prueba1",
                direccion: "Calle imaginaria",
                email: "test1@gmail.com",
                telefono: "243122345",
                password:"abc",
            })
            .end((err, res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done()
            })
        })

        it("No debe actualizar si no hay Email", (done)=>{
            chai.request(url)
            .put('/api/usuario/update')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: '6112d5f79ec75b15c0d74c61',
                rol: "Administrador",
                nombre:"Felipe Lima",
                direccion: "San Juan Epatlan Calle 1",
                telefono: "231340382",
                password:"123456",
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done()
            })
        })

        it("No debe actualizar si no hay contraseña", (done)=>{
            chai.request(url)
            .put('/api/usuario/update')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: '6112d5f79ec75b15c0d74c61',
                rol: "Administrador",
                nombre:"Felipe Lima",
                direccion: "San Juan Epatlan Calle 1",
                email: "afelipe@gmail.com",
                telefono: "231340382",
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done()
            })
        })

        it("Debe dar error si el usuario no existe", (done)=>{
            chai.request(url)
            .put('/api/usuario/update')
            .set({'token': `${tokenReturn}`})
            .send({
                _id: '6112d5f79ec75b15c0d74c61',
                rol: "Administrador",
                nombre:"Yolito",
                direccion: "San Juan Epatlan Calle 1",
                email: "jimenez@gmail.com",
                password: "233"
            })
            .end((err, res)=>{
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done()
            })
        })

        it("Debe dar error si el token es inválido", (done)=>{
            chai.request(url)
            .put('/api/usuario/update')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: '6112d5f79ec75b15c0d74c61',
                rol: "Administrador",
                nombre:"Felipe Lima",
                direccion: "San Juan Epatlan Calle 1",
                email: "afelipe@gmail.com",
                telefono: "231340382",
            })
            .end((err, res)=>{
                expect(res).to.have.status(400);
                done()
            })
        })

        //Eliminar Usuario
        it("Eliminar Usuario mediante id",(done)=>{
            chai.request(url)
            .delete('/api/usuario/remove')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: '61206ebe46bf190d483269f2',
            })
            .end((err, res)=>{
                
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done()
            });
        })

        it("Validar que el Id exista",(done)=>{
            chai.request(url)
            .delete('/api/usuario/remove')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: '61143d486e951e17bcd10e64',
            })
            .end((err, res)=>{
                
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('message');
                done()
            });
        })

        it("Validar que se introduce un id valido",(done)=>{
            chai.request(url)
            .delete('/api/usuario/remove')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: '',
            })
            .end((err, res)=>{
                
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('errors');
                done()
            });
        })

        it("Debe ocurrir un error al introducir Id invalidos",(done)=>{
            chai.request(url)
            .delete('/api/usuario/remove')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: '6114410b743',
            })
            .end((err, res)=>{
                
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done()
            });
        })
    });

});