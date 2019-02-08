const { argv } = require('./config/yargs');

const colors = require('colors/safe');

const porHacer = require('../por-hacer/acciones/por-hacer');

let comando = argv._[0];

switch(comando){
    case "crear":
        let nuevaTarea = porHacer.crear(argv.descripcion);
        console.log(colors.yellow(`Tarea creada exitosamente: "${nuevaTarea}"`));
        break;

    case "listar":
        let listado = porHacer.listar();
        console.log(colors.green('======= TAREAS POR HACER ======='));
        for(let i = 0; i < listado.length; i++){
            console.log(colors.yellow(`${i+1}. ${listado[i].descripcion}`));
            console.log(colors.yellow(`Completado: ${listado[i].completado}`));
            console.log(colors.green('-------------------------------------'));
        }
        break;

    case "actualizar":
        porHacer.actualizar(argv.descripcion, argv.completado);
        break;

    case "eliminar":
        porHacer.eliminar(argv.descripcion);
        break;
        
    default:
        console.log("Comando no reconocido");
        break;
}