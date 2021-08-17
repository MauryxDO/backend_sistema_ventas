import models from '../models';
import bcrypt from 'bcryptjs';
import token from '../services/token';
const { transporter } = require('../utils/passwordReset');
export default {
//_id
    //Agregar Usuario
    add: async (req,res,next) =>{
        try {
            const existeEmail = await models.Usuario.findOne({email:req.body.email});
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    message: 'El correo ya existe'
                });
            }
            if (!req.body.email) {
                res.status(400).json({ message: 'El correo es obligatorio' });
                next();
            }
            if (!req.body.password) {
                res.status(400).json({ message: 'La contraseña es obligatoria' });
                next();
            }else{
            req.body.password = await bcrypt.hash(req.body.password,10);
            const user = await models.Usuario.create(req.body);
            // Evitar enviar la password
            user.password = null;
    
            let reg = {
                response: 'Ok',
                message: 'Se ha registrado el usuario',
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

    //Obtener Usuario por ID
    query: async (req,res,next) => {
        try {
            const reg=await models.Usuario.findOne({_id:req.query._id});
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

    //Listar Usuario
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Usuario.find({$or:[
                {'nombre':new RegExp(valor,'i')},
                {'email':new RegExp(valor,'i')}]}
                ,{createdAt:0})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Actualizar usuario
    update: async (req,res,next) => {
        try {
            let pas = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id});
            if (pas!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10); 
            }            
            const reg = await models.Usuario.findByIdAndUpdate(
                {_id:req.body._id},
                {rol:req.body.rol,nombre:req.body.nombre,
                    direccion:req.body.direccion,telefono:req.body.telefono,
                    email:req.body.email,
                    password:req.body.password
                });
            res.status(200).json({message:"Usuario actualizado",reg});
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //eliminar usuario
    remove: async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id});
            if (!reg){
                res.status(404).send({
                    message: 'El registro no existe'
                });
            }else{ 
            res.status(200).json({message: 'El usuario ha sido eliminado'});
        }
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Habilitar usuario acceso al sistema
    activate: async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //inhabilitar usuario acceso al sistema
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Función Login
    login: async (req,res,next) => {
        try {
            /*El sistema verifica que el usuario este registrado dentro de la base de datos y 
            validar que el usuario este activo*/
            let user = await models.Usuario.findOne({email:req.body.email,estado:1});
            if (user){
                let match = await bcrypt.compare(req.body.password,user.password);
                if (match){
                    //Generando token al usuario por medio del ID
                    let tokenReturn = await token.encode(user._id);
                    res.status(200).json({user,tokenReturn});
                } else{
                    res.status(404).send({
                        message: 'Password Incorrecto'
                    });
                }
            } else{
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
        } catch(e){
            res.status(500).send({
                error: true,
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    //Restaurar contraseña
    forgotPassword: async(req,res,next)=>{
        try {
            let email = req.body.email;
            if(!email){
                res.status(400).json({
                    error: true,
                    message: 'Se debe proporcionar un email.',
                });
            }

            //buscar usuario con el email
            const user = await models.Usuario.findOne({ 
                email:req.body.email,estado:1
            });

            if (!user) {
                res.status(404).json({
                    error: true,
                    message: 'No existe el email.',
                });
            }
            // generar token y enviar email
            let tokenReturn = await token.encode(user._id);
            user.resetToken = tokenReturn;

            await transporter.sendMail({
                from: '"Forgot password" <mau03041@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: "Forgot password ✔", // Subject line
                html: `<b>Por favor da clic en el enlace</b>
                        <a href="${tokenReturn}">${tokenReturn}</a>
                `, // html body
            });

            if (tokenReturn){
                res.json({
                    message: 'Se ha enviado el correo de recuperación.',
                });
            }else{
                res.status(503).json({
                    error: true,
                    message: 'Ocurrió un error al enviar el correo de recuperación.',
                });
            }
        } catch (error) {
                console.error(error);
            res.status(503).json({
                error: true,
                message: 'Error al enviar el correo de recuperación.',
            });
        }
    },

    //Validación de tokens
    newPassword: async(req,res,next)=>{
        try {
            let tokenReturn = await token.encode(user._id);
            let password = await  models.Usuario.findOne({password:req.body.password});
            //validar el token
            const user = await models.Usuario.findOne({ 
                passwordResetToken: tokenReturn,
                email:req.body.email,estado:1
            });
    
            if (!user) {
                res.status(400).json({
                    message: 'El token es invalido o ha expirado'
                });
            }
            // comprobar que nos envio la nueva contraseña
            if (!password) {
                res.json({
                    error: true,
                    message: 'La contraseña es obligatoria'
                });
            }
    
            // cifrar la contraseña
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            // quitar el token de recuperacion
            user.passwordResetToken = '';
            user.passwordResetExpire = null;
            await user.save();
    
            res.json({
                message: 'Se ha actualizado la contraseña correctamente'
            })
    
        } catch (error) {
            console.error(error);
            res.status(503).json({
                error: true,
                message: 'Error al guardar la nueva contraseña',
            });
        }
    },

}
