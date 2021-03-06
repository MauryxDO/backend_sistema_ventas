import models from '../models';
export default {
    //Se reutiliza la mayor parte del codigo de Categoria 

    //Agregar Articulo
    add: async (req,res,next) =>{
        const existe = await models.Articulo.findOne({nombre:req.body.nombre});
        const code = await models.Articulo.findOne({codigo:req.body.codigo});
        try {
            if(existe){
                res.status(400).send({message:"El nombre del articulo ya existe"})
            }
            if(code){
                res.status(400).send({message:"El código ya existe"})
            }
            else{
            const reg = await models.Articulo.create(req.body);
            res.status(200).json({message: req.body.nombre+' ha sido agregado',reg});
        }
        } catch (e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Obtener Articulo por ID
    query: async (req,res,next) => {
        try {
            const reg=await models.Articulo.findOne({_id:req.query._id})
            .populate('categoria',{nombre:1});//Referenciando a la tabla categoria con populate
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

    //Listar articulo
    list: async (req,res,next) => {
        try {
            const reg=await models.Articulo.find({$or:[
                {'nombre':new RegExp},
                {'descripcion':new RegExp}
            ]},
                {createdAt:0})
            .populate('categoria',{nombre:1})//Se utiliza populate para relacionar o referenciar las tablas articulo/categoria
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Buscar articulo
    listSearch: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Articulo.findOne({$or:[
                {'nombre':new RegExp(valor,'i')},
                {'descripcion':new RegExp(valor,'i')}
            ]},
                {createdAt:0})
            .populate('categoria',{nombre:1})//Se utiliza populate para relacionar o referenciar las tablas articulo/categoria
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
    //Actualizar articulo
    update: async (req,res,next) => {
        const existe = await models.Articulo.findOne({nombre:req.body.nombre});
        const code = await models.Articulo.findOne({codigo:req.body.codigo});
        try {
            if(existe){
                res.status(400).send({message:"El nombre del articulo ya existe"})
            }
            if(code){
                res.status(400).send({message:"El código ya existe"})
            }else{
            const reg = await models.Articulo.findByIdAndUpdate(
                {_id:req.body._id},
                {categoria:req.body.categoria,
                codigo:req.body.codigo,
                nombre:req.body.nombre,
                descripcion:req.body.descripcion,
                precio_venta:req.body.precio_venta,
                stock:req.body.stock});
            res.status(200).json({message:'El articulo ha sido actualizado'});
            }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Eliminar articulo
    remove: async (req,res,next) => {
        try {
            const reg = await models.Articulo.findByIdAndDelete({_id:req.body._id});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            }else{ 
            res.status(200).json({message: 'Los datos han sido eliminados'});
        }
    } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Activar articulo
    activate: async (req,res,next) => {
        try {
            const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Desactivar articulo
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
     //Obtener Articulo por medio de su codigo
    queryCodigo: async (req,res,next) => {
        try {
            const reg=await models.Articulo.findOne({codigo:req.query.codigo})
            .populate('categoria',{nombre:1});//Referenciando a la tabla categoria con populate
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
}
