const { response } = require('express');

const Orden = require('../models/orden');


const getordenes = async(req, res = response) => {

    const ordens = await Orden.find()

    res.json({
        ok: true,
        ordens
    })
}

const crearorden = async(req, res = response) => {

    const uid = req.uid;
    const orden = new Orden({ 
        usuario: uid,
        ...req.body 
    });

    try {
        
        const ordenDB = await orden.save();
        

        res.json({
            ok: true,
            orden: ordenDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

const actualizarOrden = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el orden correcto

    const uid = req.params.id;


    try {

        const ordenDB = await Orden.findById( uid );

        if ( !ordenDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un orden por ese id'
            });
        }

        // Actualizaciones
        const { ...campos } = req.body;

        const ordenActualizado = await Orden.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            orden: ordenActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarOrden = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const ordenDB = await Orden.findById( uid );

        if ( !ordenDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un orden por ese id'
            });
        }

        await Orden.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Orden eliminado'
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
    getordenes,
    crearorden,
    actualizarOrden,
    borrarOrden
}