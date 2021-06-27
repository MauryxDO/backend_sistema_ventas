//Se añadiran las funciones que estan dentro de la carpeta models

function login (req, res){
    var data = req.body;
    User.findOne({email: data.email},(err,user_data)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(user_data){
                bcrypt.compare(data.password, user_data.password, function(err,check){
                    if(check){
                        if(data.gettoken){
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data
                            })
                        }else{
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: jwt.createToken(user_data),
                            })
                        }
                    }else{
                        res.status(403).send({message: 'El correo o contraseña no coinciden'})
                    }
                })
            }else{
                res.status(403).send({message: 'El correo no existe'})
            }
        }
    });
}

module.exports= {
    registrar,
    //nuevo
    login,

}
