const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};
const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea',
    type: 'boolean'
}
const argv = require('yargs')
        .command('crear', 'Crea una determinada tarea', {descripcion})
        .command('listar', 'Muestra la lista de todas las tareas',{completado})
        .command('actualizar','Actualiza es estado actual de una determinada tarea',{
            descripcion, 
            completado
        })
        .command('eliminar','Elimina una tarea elegida por el usuario',{descripcion})
        .help()
        .argv;

module.exports = {
    argv
}