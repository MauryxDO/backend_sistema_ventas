import mongoose, {Schema} from 'mongoose';
//modelo que se utilizara para el chat, estara en modificaciones durante el desarrollo
//La persona se le puede considerar como un cliente o un provedor
const personaSchema = new Schema({
    tipo_persona: { type:String,maxlength:20, required:true},
    nombre: { type:String,maxlength:50, unique:true, required:true},
    direccion: { type:String, maxlength:70},
    telefono: { type:String, maxlength:20},
    email: { type:String, maxlength:50, unique:true},
    estado: { type:Number, default:1},
	createdAt: { type: Date, default: Date.now }
});

const Persona = mongoose.model('persona',personaSchema);
export default Persona;