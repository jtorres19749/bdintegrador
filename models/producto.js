const { Schema, model } = require('mongoose');


const imagen = Schema({
    esPrincipal: {
        type: Boolean,
        default: false
    },
    esImagenPequena: {
        type: Boolean,
        default: false
    },
    orden: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: false
    },
    tag: {
        type: String,
        required: true
    }
});



const productoSchema = Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: 
    {
        type: String,
        required: true
    },
    precio: 
    {
        type: Number,
        required: true
    },
    costo: 
    {
        type: Number,
        required: true,
        default: 0
    },
    unidad: 
    {
        type: String,
        required: true,
        default: "pieza"
    },
    iva: 
    {
        type: Number,
        required: true,
        default: 0
    },
    maximoDescuento: 
    {
        type: Number,
        required: true,
        default: 0
    },
    listaImagenes: [
        imagen
    ]
});


productoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'producto', productoSchema );
