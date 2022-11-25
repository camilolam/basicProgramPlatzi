const express = require('express')
// configuración del servidor
const app = express()
let jugadores = []
class Jugador{
    constructor(id){
        this.id = id
    }
}
// estructura para las peticiones al servidor
app.get('/',(req, res)=>{ 
    res.send('Chingón')
})

app.get('/unirse',(req, res)=>{ 
    let id = `${aleatorio(0,100)}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin","*")
    //console.log(jugadores.length)
    res.send(`El número de jugadores en el momento es de ${jugadores.length} tu id es ${id}`)
})

app.listen(8000,()=>{
    console.log("Servidor escuchando...")
})


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
