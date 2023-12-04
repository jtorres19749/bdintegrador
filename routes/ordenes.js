/*
    ordenes
    ruta: '/api/ordenes'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getordenes,
    crearorden,
    actualizarOrden,
    borrarOrden
} = require('../controllers/ordenes')


const router = Router();

router.get( '/', getordenes );

router.post( '/',
    [
        validarCampos
    ], 
    crearorden 
);

router.put( '/:id',
    [],
    actualizarOrden
);

router.delete( '/:id',
    borrarOrden 
);



module.exports = router;
