/*
    clientes
    ruta: '/api/clientes'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getclientes,
    crearcliente,
    actualizarCliente,
    borrarCliente
} = require('../controllers/clientes')


const router = Router();

router.get( '/', getclientes );

router.post( '/',
    [
        validarCampos
    ], 
    crearcliente 
);

router.put( '/:id',
    [],
    actualizarCliente
);

router.delete( '/:id',
    borrarCliente
);



module.exports = router;



