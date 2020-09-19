const fs = require('fs');


function insertMensaje (obj) {
    fs.writeFileSync(`./persistencia/data/${obj.ts}.json`,JSON.stringify(obj))
}

function getMensaje(ts){

    return fs.readFileSync(`./persistencia/data/${ts}.json`, 'utf-8')
}

function getMensajes(){
    let mensajes = []
    fs.readdirSync('./persistencia/data/').forEach((e)=>{
        let mensaje = fs.readFileSync(`./persistencia/data/${e}`, 'utf-8')
        mensajes.push(JSON.parse(mensaje))
    })

    return mensajes
}





exports.insertMensaje = insertMensaje
exports.getMensaje = getMensaje
exports.getMensajes = getMensajes