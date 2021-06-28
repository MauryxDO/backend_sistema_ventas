var Cliente = require('../models/cliente');

//FUNCIÓN REGISTRAR
function registrar(req, res){
    let data = req.body;
    var cliente = new Cliente();
    cliente.nombres = data.nombres;
    cliente.correo = data.correo;
    cliente.puntos = 10;

    cliente.save((err,cliente_save)=>{
        if(cliente_save){
            res.status(200).send({message: 'El cliente '+data.nombres+' ha sido registrado'})
        }else{
            res.status(500).send(err);
        }
    })
}

//FUNCIÓN EDITAR
function editar(req, res){
    let id = req.params['id'];
    let data = req.body;

    Cliente.findOneAndUpdate(id,{
        nombres: data.nombres,
        correo: data.correo
    },(err,cliente_edit)=>{
        if(cliente_edit){
            res.status(200).send({message: 'El cliente '+ data.nombres +' fue actualizado santisfactoriamente'})
        }else{
            res.status(500).send(err)
        }
    });
}

//FUNCIÓN ELIMINAR
function eliminar(req, res){
    let id = req.params['id'];

    Cliente.findByIdAndRemove(id,(err,cliente_delete)=>{
        if(cliente_delete){
            res.status(200).send({message: 'El cliente fue eliminado con exito'});
        }else{
            res.status(500).send(err,);
        }
    });
}

module.exports = {
    registrar,
    editar,
    eliminar,
}