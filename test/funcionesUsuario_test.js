let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';
const tokenReturn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjg2MzM2NDksImV4cCI6MTYyODcyMDA0OX0.UNcRWTnP-O3yXbrWirM--QRkMlLaXPQX3KCysEzwqNg';
const uid = '61131bc898c8692b4c096122';
const eliminar = '611442df556cb9373449fb85';
//Usuario por ID
    describe("Funciones usuario", ()=>{

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
            .get(`/api/usuario/query?_id=${id}`)
            .set({'Token': `${tokenReturn}`})
            .end((err, res)=>{
                //console.log(res.body);
                expect(res).to.have.status(200);
                done();
            })
        });

        it("Debe rechazar si no existe el usuario",(done)=>{
            chai.request(url)
            .get('/api/usuario/query?uid=')
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
                _id: uid,
                rol: "Administrador",
                nombre:"Felipe Lima",
                direccion: "San Juan Epatlan Calle 1",
                email: "afelipe@gmail.com",
                telefono: "231340382",
                password:"123456",
            })
            .end((err, res)=>{
                console.log(res.body);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('reg');
                done()
            })
        })

        it("No debe actualizar si no hay correo", (done)=>{
            chai.request(url)
            .put('/api/usuario/update')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: uid,
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
                _id: uid,
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
        

        //Eliminar Usuario
        it("Eliminar Usuario mediante id",(done)=>{
            chai.request(url)
            .delete('/api/usuario/remove')
            .set({'Token': `${tokenReturn}`})
            .send({
                _id: eliminar,
            })
            .end((err, res)=>{
                console.log(res.body);
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
                console.log(res.body);
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
                console.log(res.body);
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
                console.log(res.body);
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message');
                done()
            });
        })
    });

});