import models from '../models';
export default {

    //Agregar Cliente
    add: async (req,res,next) =>{
        try {
            const emailexiste = await models.Persona.findOne({email:req.body.email});
            if ( emailexiste ) {
                return res.status(400).json({
                    ok: false,
                    message: 'El correo ya existe'
                });
            }else{
                const user = await models.Persona.create(req.body);
                let reg = {
                    message: 'Se ha registrado exitosamente',
                    user,
                }
                res.json(reg)
        }
        } catch (e){
            res.status(500).send({
                error: true,
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Obtener cliente por ID
    query: async (req,res,next) => {
        try {
            const reg=await models.Persona.findOne({_id:req.query._id});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            }else{
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
            const reg=await models.Persona.find({$or:[
                {'nombre':new RegExp},
                {'email':new RegExp}]},
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

    listSearch: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Persona.findOne({$or:[
                {'nombre':new RegExp(valor,'i')},
                {'descripcion':new RegExp(valor,'i')}
            ]},
                {createdAt:0})
                .sort({'createdAt':-1});
            if (!reg){
                res.status(404).send({
                    message: 'No se encontraron resultados'
                });
            }else{
            res.status(200).json(reg);
            }
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
        const emailexiste = await models.Persona.findOne({email:req.body.email});
        try {if ( emailexiste ) {
            return res.status(400).json({
                ok: false,
                message: 'El correo ya existe'
            });
        }else{
            const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},
                {tipo_persona:req.body.tipo_persona,
                    nombre:req.body.nombre,
                    direccion:req.body.direccion,
                    telefono:req.body.telefono,
                    email:req.body.email
                });
                
            res.status(200).json({message: 'La información ha sido actualizada', reg});
        }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    updateEmail: async (req,res,next) => {
        try {
            const emailexiste = await models.Persona.findOne({email:req.body.email});
            if ( emailexiste ) {
                return res.status(400).json({
                    ok: false,
                    message: 'El correo ya existe'
                });
            }else{
                const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},
                    {
                        email:req.body.email,
                    });
                return res.status(200).send({message: 'Se ha actualiado exitosamente el correo', reg})
            }
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
            const reg = await models.Persona.findByIdAndDelete({_id:req.body._id});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            }else{ 
            res.status(200).json({message: 'Los datos han sido eliminados'});
        }
    }catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Habilitar Cliente o provedor
    activate: async (req,res,next) => {
        try {
            const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json({message: 'Se ha habilitado a la persona', reg});
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
            const reg = await models.Persona.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json({message:'Se ha deshabilitado la persona'});
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
