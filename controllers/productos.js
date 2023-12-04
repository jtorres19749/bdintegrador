const { response } = require('express');

const Producto = require('../models/producto');


const getproductos = async(req, res = response) => {

    const productos = await Producto.find()

    res.json({
        ok: true,
        productos
    })
}

const crearproducto = async(req, res = response) => {

    const uid = req.uid;
    const producto = new Producto({ 
        usuario: uid,
        ...req.body 
    });

    try {
        
        const productoDB = await producto.save();
        

        res.json({
            ok: true,
            producto: productoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

const actualizarProducto = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el producto correcto

    const uid = req.params.id;


    try {

        const productoDB = await Producto.findById( uid );

        if ( !productoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto por ese id'
            });
        }

        // Actualizaciones
        const { codigo, ...campos } = req.body;

        if ( productoDB.codigo !== codigo ) {

            const existeCodigo = await Producto.findOne({ codigo });
            if ( existeCodigo ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un producto con ese codigo'
                });
            }
        }
        
        campos.codigo = codigo;
        const productoActualizado = await Producto.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            producto: productoActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarProducto = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        const productoDB = await Producto.findById( uid );

        if ( !productoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto por ese id'
            });
        }

        await Producto.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Producto eliminado'
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
    getproductos,
    crearproducto,
    actualizarProducto,
    borrarProducto
}