const Usuario = require('../models/usuario');
const fs = require('fs');

const cliente = require('../models/cliente');
const producto = require('../models/producto');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'clientes':
            const cliente = await cliente.findById(id);
            if ( !cliente ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/clientes/${ cliente.img }`;
            borrarImagen( pathViejo );

            cliente.img = nombreArchivo;
            await cliente.save();
            return true;

        break;
        
        case 'productoes':
            const producto = await producto.findById(id);
            if ( !producto ) {
                console.log('No es un producto por id');
                return false;
            }

            pathViejo = `./uploads/productoes/${ producto.img }`;
            borrarImagen( pathViejo );

            producto.img = nombreArchivo;
            await producto.save();
            return true;

        break;
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/productoes/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
