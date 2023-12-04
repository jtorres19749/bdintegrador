const { response } = require('express');

const Cliente = require('../models/cliente');

const getclientes = async(req, res = response) => {

    const clientes = await Cliente.find()


    res.json({
        ok: true,
        clientes
    })
}

const crearcliente = async (req, res = response) => {

    const { telefono } = req.body;

    try {
        console.log(req.body);

        const existeTelefono = await Cliente.findOne({ telefono });

        if ( existeTelefono ) {
            return res.status(400).json({
                ok: false,
                msg: 'El telefono ya está registrado'
            });
        }

        const cliente = new Cliente( req.body );

        await cliente.save();

        
        res.json({
            ok: true,
            cliente: cliente
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


const actualizarCliente = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el cliente correcto

    const uid = req.params.id;


    try {

        const clienteDB = await Cliente.findById( uid );

        if ( !clienteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente por ese id'
            });
        }

        // Actualizaciones
        const { telefono, ...campos } = req.body;

        if ( clienteDB.telefono !== telefono ) {

            const existeTelefono = await Cliente.findOne({ telefono });
            if ( existeTelefono ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un cliente con ese telefono'
                });
            }
        }
        
        campos.telefono = telefono;
        const clienteActualizado = await Cliente.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            cliente: clienteActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarCliente = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const clienteDB = await Cliente.findById( uid );

        if ( !clienteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente por ese id'
            });
        }

        await Cliente.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Cliente eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}



module.exports = {
    getclientes,
    crearcliente,
    actualizarCliente,
    borrarCliente
}