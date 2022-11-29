const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVictoriasJugador = document.getElementById('victorias-jugador')
const spanVictoriasEnemigo = document.getElementById('victorias-enemigo')
const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let botonTierra 
let botonFuego 
let botonAgua 
let botones = []
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let ataquesMokepon
let ataquesMokepoEnemigo
let inputHipodoge
let inputCapipepo
let inputRatigueya
let victoriasJugador = 0
let victoriasEnemigo = 0

let mascotaEscogidaJugador
let mascotaEscogidaEnemigo

let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo = mapa.getContext("2d")
let mokeponElegido
let intervalo
let backgroundImage = new Image()
backgroundImage.src = './assets/mokemap.png'

let alturaDeseada
let anchoMapa = window.innerWidth - 20
const anchoMax = 500
const urlServidor = 'http://192.168.0.107:8000'
let jugadorId = null
let enemigoId = null

anchoMapa = anchoMapa>anchoMax?anchoMax:anchoMapa

alturaDeseada = anchoMapa*600/800
mapa.width = anchoMapa
mapa.height = alturaDeseada


class Mokepon {
    constructor(nombre, foto, vida,id= null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0,mapa.width-this.ancho)
        this.y = aleatorio(0,mapa.height-this.alto)
        
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

const HIPODOGE_ATAQUES = [{ nombre: '💧', id: 'boton-agua' },
{ nombre: '💧', id: 'boton-agua' },
{ nombre: '💧', id: 'boton-agua' },
{ nombre: '🔥', id: 'boton-fuego' },
{ nombre: '🌱', id: 'boton-tierra' }]

const RATIGUEYA_ATAQUES = [{ nombre: '🔥', id: 'boton-fuego' },
{ nombre: '🔥', id: 'boton-fuego' },
{ nombre: '🔥', id: 'boton-fuego' },
{ nombre: '💧', id: 'boton-agua' },
{ nombre: '🌱', id: 'boton-tierra' }]

const CAPIPEPO_ATAQUES = [{ nombre: '🌱', id: 'boton-tierra' },
{ nombre: '🌱', id: 'boton-tierra' },
{ nombre: '🌱', id: 'boton-tierra' },
{ nombre: '💧', id: 'boton-agua' },
{ nombre: '🔥', id: 'boton-fuego' }]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
capipepo.ataques.push(...CAPIPEPO_ATAQUES)
ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

     inputHipodoge = document.getElementById('Hipodoge')
     inputCapipepo = document.getElementById('Capipepo')
     inputRatigueya = document.getElementById('Ratigueya')
     botonReiniciar.addEventListener('click', reiniciarJuego)
    })
   
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch(`${urlServidor}/unirse`) // hace una petición get por defecto, si es necesario se le debe decir cuando es post
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function (respuesta){
                        jugadorId = respuesta
                        console.log(respuesta)
                    })
            }
        })
}



function seleccionarMascotaJugador() {
    
   
    //sectionSeleccionarAtaque.style.display = 'flex'
    
    iniciarMapa()

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaEscogidaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaEscogidaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaEscogidaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
        return
    }
    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    seleccionarMokepon(mascotaEscogidaJugador)
    extraerAtaques(mascotaEscogidaJugador)
}

function seleccionarMokepon(mascotaJugador){
    fetch(`${urlServidor}/mokepon/${jugadorId}`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            mokepon:mascotaJugador
        })
    })
}

function extraerAtaques(mascotaEscogidaJugador){
    let ataques
    for (var i = 0; i< mokepones.length; i++) {
        if(mokepones[i].nombre === mascotaEscogidaJugador){
            ataques = mokepones[i].ataques
            mokeponElegido = mokepones[i]
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML+=ataquesMokepon
    })
    botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click',(e)=>{
            console.log(e)
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            }else{
                ataqueJugador.push('TIERRA')
                boton.style.backgroundColor = '#112f58'
                boton.disabled = true
            }
            console.log(`jugador: ${ataqueJugador}`)
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
            
        })
    }) 
    
}

function enviarAtaques(){
    fetch(`${urlServidor}/mokepon/${jugadorId}/ataques`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            ataques:ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques,50)
}

function obtenerAtaques(){
    fetch(`${urlServidor}/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            if (res.ok){
                res.json()
                    .then(function({ataques}){
                        if(ataques.length === 5 ){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}
// ----------- Seccion para el enemigo --------------------------

function seleccionarMascotaEnemigo(enemigo) {
    //let mascotaAleatoria = aleatorio(0,mokepones.length -1)
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMoqueponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0,ataquesMoqueponEnemigo.length-1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(`enemigo: ${ataqueEnemigo}`)
    //combate()
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length == 5){
        combate()
    }
}

// ---------- Combatir ---------------------------

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    clearInterval(intervalo)
    for (var i = 0; i < ataqueJugador.length; i++) {
       if(ataqueEnemigo[i] == ataqueJugador[i]) {
            indexAmbosOponentes(i,i)
            crearMensaje("EMPATE")
        } else if(ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA') {
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO') {
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA') {
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(i,i)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasEnemigo < victoriasJugador) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else if (victoriasEnemigo > victoriasJugador) {
        crearMensajeFinal('Lo siento, perdiste :(')
    } else{
        crearMensajeFinal('Gran Empate')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    /*botonFuego.disabled = true
    botonAgua.disabled =   
    botonTierra.disabled = true*/
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function enviarPosicion(x,y){
    fetch(`${urlServidor}/mokepon/${jugadorId}/pos`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            x, //notacion que js entiende que el valor se llama igual que la propiedad
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    let mokeponEnemigo = null
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5,enemigo.id)
                        }else if (mokeponNombre === "Capipepo"){
                            mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5,enemigo.id)
                        }else if(mokeponNombre === "Ratigueya"){
                            mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5,enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y     
                        return mokeponEnemigo
                    })
                })
        }
    })
}

function pintarCanvas(){
    mokeponElegido.x += mokeponElegido.velocidadX
    mokeponElegido.y += mokeponElegido.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        backgroundImage,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokeponElegido.pintarMokepon()
    enviarPosicion(mokeponElegido.x,mokeponElegido.y)

    mokeponesEnemigos.forEach(function (mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

function detenerMovimiento(){
    mokeponElegido.velocidadX = 0
    mokeponElegido.velocidadY = 0
}
function moverArriba(){  
    mokeponElegido.velocidadY-=5
}
function moverAbajo(){
    mokeponElegido.velocidadY+=5
}
function moverIzquierda(){
    mokeponElegido.velocidadX-=5
}
function moverDerecha(){
    mokeponElegido.velocidadX+=5
}

function teclaPresionada(event){
    //console.log(event.key)
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;

        case "ArrowRight":
            moverDerecha()
            break;

        case "ArrowLeft":
            moverIzquierda()
        break;
        default:
            break;
    }
}

function iniciarMapa(){
    intervalo = setInterval(pintarCanvas,50)
    window.addEventListener("keydown", teclaPresionada)
    window.addEventListener("keyup",detenerMovimiento)
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y+enemigo.alto
    const izquierdaEnemigo = enemigo.x
    const derechaEnemigo = enemigo.x + enemigo.ancho

    const arribaMascota = mokeponElegido.y
    const abajoMascota = mokeponElegido.y+mokeponElegido.alto
    const izquierdaMascota = mokeponElegido.x
    const derechaMascota = mokeponElegido.x + mokeponElegido.ancho


    if( 
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }else{
        detenerMovimiento()
        clearInterval(intervalo)
        enemigoId = enemigo.id
        sectionSeleccionarAtaque.style.display = "flex"
        sectionVerMapa.style.display = "none"
        seleccionarMascotaEnemigo(enemigo)
    }
}
 
window.addEventListener('load', iniciarJuego)