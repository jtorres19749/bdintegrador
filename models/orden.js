const { Schema, model } = require('mongoose');

const ordenSchema = Schema({
    noOrden: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true,
    },
    sucursal: 
    {
        type: String,
        required: true
    },
    noTerminal: 
    {
        type: String,
        required: true
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    articulos: 
    {
        type: Number,
        required: true,
        default: 0
    },
    subtotal: 
    {
        type: Number,
        required: true,
        default: 0
    },
    iva: 
    {
        type: Number,
        required: true,
        default: 0
    },
    total: 
    {
        type: Number,
        required: true,
        default: 0
    },
    listaProductos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
    ]
});


ordenSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'orden', ordenSchema );
