const { Schema, model } = require('mongoose');

const clientedireccion = Schema({
    esDireccionEntregaDefault: {
        type: Boolean,
        default: false
    },
    esDireccionFacturacionDefault: {
        type: Boolean,
        default: false
    },
    calle: {
        type: String,
        required: true
    },
    colonia: {
        type: String,
        required: false
    },
    numero: {
        type: String,
        required: true
    },
    interior: {
        type: String,
        required: false
    },
    cp: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    }
});



const clienteMediosDeCobro = Schema({
    esMedioDeCobroDefault: {
        type: Boolean,
        default: false
    },
    NoTarjeta: {
        type: String,
        default: false
    },
    fechaExpiracion: {
        type: String,
        required: true
    },
    nombreEnTarjeta: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: false
    }
});

const clienteSchema = Schema({
    telefono: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: false
    },
    direcciones: [clientedireccion],
    mediosDePago: [clienteMediosDeCobro]
});


clienteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Cliente', clienteSchema );
