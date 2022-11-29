const express = require('express')
const cors = require('cors')
// configuración del servidor
const app = express()

app.use(express.static('programar'))
app.use(cors()) //nos ayuda a que no haya problemas con el origen de las aplicaciones que vana consumir las apis
app.use(express.json()) //nos permite configurar que la información que se puede recibir en el servidor, venga en formato json



let jugadores = []
class Jugador{
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon) {
        this.mokepon=mokepon
    }

    actualizarPosicion(x,y){
        this.x=x
        this.y=y
    }

    asignarAtaques(ataques){
        this.ataques=ataques
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre=nombre
    }
    
}
app.get('/unirse',(req, res)=>{ 
    let id = `${aleatorio(0,100)}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin","*")
    console.log(`Nuevo jugagor!! `)
    console.log(`En el momento hay ${jugadores.length} jugadores`)
    res.send(id)
})

app.post("/mokepon/:jugadorId",(req,res) => {
    const jugadorId = req.params.jugadorId || ""// acceder a la información que está en a url
    const nombreMokepon = req.body.mokepon || ""

    const mokepon = new Mokepon(nombreMokepon)

    const jugadorIndex = jugadores.findIndex((jugador)=>jugadorId===jugador.id)

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    //console.log(jugadores)
    //console.log(`id: ${jugadorId}`)
    res.end()
})

app.post("/mokepon/:jugadorId/pos",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""// acceder a la información que está en a url
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador)=>jugadorId===jugador.id)

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((enemigo)=>jugadorId!== enemigo.id)
    res.send({enemigos})
})

app.post("/mokepon/:jugadorId/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""// acceder a la información que está en a url
    const ataques = req.body.ataques || []
    const jugadorIndex = jugadores.findIndex((jugador)=>jugadorId===jugador.id)

    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    console.log("recibir atatques del jugador ")
    res.end()
})

app.get("/mokepon/:jugadorId/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador)=>jugadorId === jugador.id)

    res.send({
        ataques:jugador.ataques || []
    })
})

app.listen(8000,()=>{
    console.log("Servidor escuchando...")
})


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
