"use strict";

// base de datos de canciones
const songList = [
    {
        title: "Enemy - Imagine dragons",
        file: "enemy.mp3",
        cover: "https://i.ibb.co/8MfG2wH/570157.jpg"
    },
    {
        title: "Avenged Sevenfold - Hail To The King",
        file: "Avenged Sevenfold  Hail To The King.mp3",
        cover: "https://kubomusical.com/wp-content/uploads/2021/07/avenged-sevenfold-hail-to-the-king.jpg"
    },
    {
        title: "Grabbitz - Die for you",
        file: "valorant.mp3",
        cover: "https://i.ibb.co/X34krh3/1149345.jpg"
    },
]

// cancion actual 
let actualSong = null

// capturar elementos del DOM
const songs = document.querySelector(".songs");
const audio = document.getElementById("audio")
const cover = document.querySelector(".cover")
const h1 = document.querySelector(".title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const random = document.getElementById("random")
const progress = document.querySelector(".progress")
const progressContainer = document.querySelector(".progress-container")

// escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress)
progressContainer.addEventListener("click", setProgress)

// escuchar clicks en los controles
play.addEventListener("click", ()=> {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})

next.addEventListener("click", ()=> nextSong())
prev.addEventListener("click", ()=> prevSong())
random.addEventListener("click", ()=> randomSong())

// mostrar el listado de canciones   
function loadSongs(){
    songList.forEach((song,index) => {
        // crear li
        const li = document.createElement("li")
        // crear a 
        const link = document.createElement("a")
        // hidratar a
        link.textContent = song.title
        link.href="#"
        // escuchar clicks
        link.addEventListener("click", ()=> loadSong(index))
        // a??adir a li
        li.appendChild(link)
        // a??adir li a ul
        songs.appendChild(li)
    });
} 

// cargar canci??n seleccionada
function loadSong(songIndex) {
    if (songIndex !== actualSong){
        changeActiveClass(actualSong,songIndex)
        actualSong = songIndex
        
        audio.src = songList[songIndex].file
        audio.play()
        
        // llamar al resto de funciones al activarse esta
        changeCover(songIndex)
        changeTitle(songIndex)
        addButtonsClass()
        playSong()
    }
}

// actualizar barra de progreso de la canci??n
function updateProgress(event) {
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%"
}

// hacer barra de progreso clicacble
function setProgress(event) {
    if (actualSong !== null){
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
    }

}

// actualizar controles 
function updateControls() {
    if (audio.paused){
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}

// reproducior canci??n 
function playSong() {
    if (actualSong !== null){
        audio.play()
        updateControls()
    }
}

// pausar canci??n
function pauseSong() {
    audio.pause()
    updateControls()
}

// cambiar clase activa
function changeActiveClass(lastIndex,newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex != null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

function addButtonsClass() {
    document.getElementById("prev").classList.add("active")
    document.getElementById("play").classList.add("active")
    document.getElementById("next").classList.add("active")
    document.getElementById("random").classList.add("active")
}

// cambiar el cover de la canci??n 
function changeCover(actualSong) {
    cover.src = songList[actualSong].cover
}

// cambiar nombre del titulo de la canci??n 
function changeTitle(actualSong){
    h1.textContent = songList[actualSong].title
}

// anterior canci??n 
function prevSong() {
    if (actualSong != null && actualSong > 0) {
        loadSong(actualSong - 1)
    } else if (actualSong !== null) {
        loadSong(songList.length - 1)
    }
}

// siguiente canci??n
function nextSong() {
    if (actualSong != null && actualSong < songList.length - 1) {
        loadSong(actualSong + 1)
    } else if (actualSong !== null) {
        loadSong(0)
    }
}

//lanzar siguiente canci??n cuando se acaba la actual
audio.addEventListener("ended", ()=> nextSong())

// reproducir una canci??n aleatoria
function randomSong(){
    if (actualSong != null) {
        loadSong(aleatorio(0,songList.length - 1))
    }
}

// generar un n??mero aleario
function aleatorio(min, max){
    let resultado = Math.floor(Math.random() * (max - min + 1)) + min
    return resultado
}

// go!
loadSongs()
