const { response } = require('express');

const Usuario = require('../models/usuario');
const cliente = require('../models/cliente');
const producto = require('../models/producto');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, clientes, productoes ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Cliente.find({ nombre: regex }),
        producto.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        clientes,
        productoes
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'clientes':
            data = await cliente.find({ nombre: regex })
        break;

        case 'productoes':
            data = await producto.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/clientes/productoes'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}

