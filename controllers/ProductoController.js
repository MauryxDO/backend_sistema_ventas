var Producto = require('../models/producto');

//AGREGAR PRODUCTO
function registrar(req,res){
    var data = req.body;

    if(req.files){
        var imagen_path = req.files.imagen.path;
        //Creando un array (coleción de datos) mediante split
        var name = imagen_path.split('\\');
        //se obtiene la imagen mediante los indices
        var imagen_name = name[2];

        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err,producto_save)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if (producto_save) {
                    res.status(200).send({message: 'El producto ha sido agregado exitosamente'});
                } else {
                    res.status(403).send({message: 'No se registro el producto'});
                }
            }
        });
    }else{
        var producto = new Producto();
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = null;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.idcategoria = data.idcategoria;
        producto.puntos = data.puntos;

        producto.save((err,producto_save)=>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if (producto_save) {
                    res.status(200).send({message: 'El producto ' + data.titulo + ' ha sido agregado'});
                } else {
                    res.status(403).send({message: 'No se registro el producto'});
                }
            }
        });
    }
}

//FILTRAR PRODUCTOS LISTAR
function listar(req, res){
    var titulo = req.params['titulo'];

    Producto.find({titulo: new RegExp(titulo, 'i')}, (err,producto_listado)=>{
        if (err) {
            res.status(500).send({message: 'Error en el servidor'})
        } else {
            if (producto_listado) {
                res.status(200).send({productos: producto_listado})
            } else {
                res.status(403).send({message: 'No hay ningun registro que coincida con el titulo'})
            }
        }
    });
}

//EDITAR PRODUCTO
function editar(req, res){
    var data = req.body;
    var id = req.params['id'];
    
    var img = req.params['img'];
        if (req.files) {

            //Actualizarla por una nueva desde la raiz de la carpeta
            fs.unlink('./uploads/productos/'+img, (err)=>{
                if(err) throw err;
            });

        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];



        Producto.findByIdAndUpdate({_id:id},{
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            idcategoria: data.idcategoria,
            puntos: data.puntos,
        }, (err, producto_edit)=>{
            if(err){
                res.status(500).send({message: 'error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({message: 'El producto fue actualizado'});
                }else{
                    res.status(402).send({message: 'No se modifico el producto'})
                }
            }
        });
        //CODIGO PARA LA ACTUALIZACIÓN SIN IMAGEN
        }else{
            Producto.findByIdAndUpdate({_id:id},{
                titulo: data.titulo,
                descripcion: data.descripcion,
                precio_compra: data.precio_compra,
                precio_venta: data.precio_venta,
                stock: data.stock,
                idcategoria: data.idcategoria,
                puntos: data.puntos,
            }, (err, producto_edit)=>{
                if(err){
                    res.status(500).send({message: 'error en el servidor'});
                }else{
                    if(producto_edit){
                        res.status(200).send({message: 'El producto fue actualizado'});
                    }else{
                        res.status(402).send({message: 'No se modifico el producto'})
                    }
                }
            });
        }

}

//Obtener producto por ID
function obtener_producto(req, res){
    var id = req.params['id'];

    Producto.findOne({_id: id}, (err, producto_data)=>{
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if (producto_data) {
                res.status(200).send({producto: producto_data});
            } else {
                res.status(403).send({message: 'No hay existe ningún registo'});
            }
        }
    })
}


//Eliminar
function eliminar(req, res){
    var id = req.params['id'];
    Producto.findByIdAndRemove({_id:id}, (err,producto_delete)=>{
        if(err){
            res.status(500).send({message: 'error en el servidor'});
        }else{
            if (producto_delete) {
                res.status(200).send({message: 'El producto se ha eliminado'});
            } else {
                res.status(403).send({message: 'El producto no se puede eliminar'});
            }
        }
    })
}

//FUNCIÓN AUMENTAR STOCK
function update_stock(req, res){
    var id = req.params['id'];
    let data = req.body;

    Producto.findById(id,(err,producto_data)=>{
        if(producto_data){
            Producto.findByIdAndUpdate(id,{
                stock: parseInt(producto_data.stock) + parseInt(data.stock)
            }, (err, producto_edit)=>{
                if(producto_edit){
                    res.status(200).send({message: 'El stock ha aumentado a ' + data.stock + ' unidades'});
                }
            });
        }else{
            res.status(402).send(err);
        }
    })
}


module.exports ={
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
}