import mongoose,{Schema} from 'mongoose';

const mensajeSchema = new Schema({
    de:{type: Schema.Types.ObjectId, ref: 'persona', required: true},
    para: {type: Schema.Types.ObjectId, ref: 'usuario', required: true},
    mensaje: {type:String, required: true},
},{
    timestamps: true
});

mensajeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});


const Mensaje = mongoose.model('mensaje',mensajeSchema);

export default Mensaje;