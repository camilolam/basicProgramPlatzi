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
    res.send("Chigón")
})

app.get('/unirse',(req, res)=>{ 
    const id = `${Math.random}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.send(id)
})

app.listen(8000,()=>{
    console.log("Servidor escuchando...")
})

console.log("Chigón")