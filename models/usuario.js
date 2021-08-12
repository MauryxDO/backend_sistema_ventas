import mongoose, {Schema} from 'mongoose';
const usuarioSchema = new Schema({
    rol: { type:String,maxlength:30, required:true},
    nombre: { type:String,maxlength:50, required:true},
    direccion: { type:String, maxlength:70},
    telefono: { type:String, maxlength:20},
    email: { type:String, maxlength:50, unique:true, required:true},
    password: { type:String, maxlength:64, required:true},
    estado: { type:Number, default:1},
	createdAt: { type: Date, default: Date.now },
    online: {type: Boolean, default: false}
});

usuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

const Usuario = mongoose.model('usuario',usuarioSchema);
export default Usuario;