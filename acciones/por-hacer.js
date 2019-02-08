const fs = require('fs');

const colors = require('colors/safe');

let listado_por_hacer = [];

const guardarDB = () =>{

    let data = JSON.stringify(listado_por_hacer);

    fs.writeFile('db/tareas.json', data, err=>{

        if(err) throw new Error(`No se pudo guardar la tarea. ${err}`);

    });
}

const cargarDB = () =>{
    try {

        listado_por_hacer = require('../db/tareas.json');   

    } catch (error) {

        listado_por_hacer = [];

    }
    // listado_por_hacer = require('../db/tareas.json');  Esta línea genera un error cuando el archivo json está vacío
}

const crear = descripcion =>{

    cargarDB();
   
    let nueva_tarea = {
        descripcion,
        completado: false
    }
    
    listado_por_hacer.push(nueva_tarea);
    
    guardarDB();
    
    return nueva_tarea.descripcion.toUpperCase();

};

const listar  = ()=>{

    cargarDB();

    return listado_por_hacer;

};

const actualizar = (descripcion, completado=true)=>{

    cargarDB();

    let index = listado_por_hacer.findIndex(tarea=>tarea.descripcion===descripcion);

    if(index > -1){

        listado_por_hacer[index].completado = completado;

        guardarDB();

        console.log(colors.yellow(`Estado de la tarea "${descripcion}" actualizado.`));
    }
    else{
        console.log(colors.red(`La tarea "${descripcion}" no se encuentra en la base de datos.`));
    }
};

const eliminar = descripcion =>{

    cargarDB();

    let nuevoListado = listado_por_hacer.filter(tarea=>tarea.descripcion!==descripcion);

    if(nuevoListado.length === listado_por_hacer.length){
       
        console.log(colors.red(`La tarea "${descripcion}" no se encuentra en la base de datos.`));
       
    }
    else{

        listado_por_hacer = nuevoListado;

        guardarDB();

        console.log(colors.yellow(`La tarea "${descripcion}" fue eliminada.`));
    
    }

}

module.exports = {
    crear,
    listar,
    actualizar,
    eliminar
}
