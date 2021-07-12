import models from '../models';
export default {

    //Agregar Cliente
    add: async (req,res,next) =>{
        try {
            const reg = await models.Persona.create(req.body);
            res.status(200).json({message: 'El '+ req.body.tipo_persona+' ha sido agregado'});
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Obtener cliente por ID
    query: async (req,res,next) => {
        try {
            const reg=await models.Persona.findOne({uid:req.query.uid});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Listar todos los clientes y provedores 
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Persona.find({$or:[
                {'nombre':new RegExp(valor,'i')},
                {'email':new RegExp(valor,'i')}]},
                {createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Filtrar Clientes
    listClientes: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Persona.find({$or:[
                {'nombre':new RegExp(valor,'i')},
                {'email':new RegExp(valor,'i')}],
                //Se utiliza el tipo_persona
                'tipo_persona':'Cliente'},
                {createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Filtrar Proveedores
    listProveedores: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Persona.find({$or:[
                {'nombre':new RegExp(valor,'i')},
                {'email':new RegExp(valor,'i')}],
                'tipo_persona':'Proveedor'},{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Actualizar Clientes y provedores
    update: async (req,res,next) => {
        try {         
            const reg = await models.Persona.findByIdAndUpdate({
                uid:req.body.uid},
                {tipo_persona:req.body.tipo_persona,
                    nombre:req.body.nombre,
                    direccion:req.body.direccion,
                    telefono:req.body.telefono,
                    email:req.body.email,
                });
            res.status(200).json({message: 'La información ha sido actualizada'});
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Eliminar Clientes y provedores
    remove: async (req,res,next) => {
        try {
            const reg = await models.Persona.findByIdAndDelete({uid:req.body.uid});
            res.status(200).json({message: 'Los datos han sido eliminados'});
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Habilitar Cliente o provedor
    activate: async (req,res,next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({uid:req.body.uid},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Deshabilitar Cliente o provedor
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({uid:req.body.uid},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
