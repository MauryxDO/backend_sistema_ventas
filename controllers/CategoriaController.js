import models from '../models';
export default {
    add: async (req,res,next) =>{
        const existe = await models.Categoria.findOne({nombre:req.body.nombre});
        try {
            if(existe){
                res.status(400).send({message:"El nombre de la categoria ya existe"})
            }else{
            const reg = await models.Categoria.create(req.body);
            res.status(200).json({message:'Se ha registrado una nueva categoria',reg});
            }
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },


    query: async (req,res,next) => {
        try {
            const reg=await models.Categoria.findOne({_id:req.query._id});
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


    list: async (req,res,next) => {
        try {
            const reg=await models.Categoria.find({$or:[
                {'nombre':new RegExp},
                {'descripcion':new RegExp}]
                },
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
            const reg=await models.Categoria.findOne({$or:[
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

    update: async (req,res,next) => {
        const existe = await models.Categoria.findOne({nombre:req.body.nombre});
        try {
            if(existe){
                res.status(400).send({message:"El nombre de la categoria ya existe"})
            }else{
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},
                {nombre:req.body.nombre,
                    descripcion:req.body.descripcion});
            res.status(200).json({message:'Se ha actualizado la categoria',reg});
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },


    remove: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                })
            }else{ 
            res.status(200).json({message: 'Los datos han sido eliminado'});
        }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },


    activate: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json({message:'Se habilito la categoria',reg});
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json({message:'Se ha desahabilitado la categoria'});
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    }
}
