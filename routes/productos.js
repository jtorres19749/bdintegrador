/*
    productoes
    ruta: '/api/productos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getproductos,
    crearproducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos')


const router = Router();

router.get( '/', getproductos );

router.post( '/',
    [
        check('nombre','El nombre del producto es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearproducto 
);

router.put( '/:id',
    [],
    actualizarProducto
);

router.delete( '/:id',
    borrarProducto
);



module.exports = router;
