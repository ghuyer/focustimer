//criar as variáveis

const buttonPlay = document.querySelector('#buttonPlay');
const buttonPause = document.querySelector('#buttonPause');
const buttonStop = document.querySelector('#buttonStop');
const buttonSet = document.querySelector('#buttonSet');
const buttonPlus = document.querySelector('#buttonPlus')
const buttonMinus = document.querySelector('#buttonMinus')

const alarmSound = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")
const buttonClickSound = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const forestSound = new Audio('./sounds/floresta.wav')
const rainSound = new Audio('./sounds/chuva.wav');
const cafeSound = new Audio('./sounds/cafeteria.wav');
const fireSound = new Audio('./sounds/lareira.wav');

let buttonForest = document.querySelector('#buttonForest');
let buttonRain = document.querySelector('#buttonRain');
let buttonCafe = document.querySelector('#buttonCafe');
let buttonFire = document.querySelector('#buttonFire');

let pathForest = document.querySelector('#pathForest');
let pathRain = document.querySelector('#pathRain');
let pathCafe = document.querySelector('#pathCafe');
let pathFire = document.querySelector('#pathFire');

let displayMinutes = document.querySelector('#minutes')
let displaySeconds = document.querySelector('#seconds')

let timerTimeOut


//ao clicar no buttonPlay, iniciar a contagem regressiva
let minutes
let seconds

function countDown() {
  timerTimeOut = setTimeout(function () {

    let countDownSeconds = Number(displaySeconds.textContent)
    let countDownMinutes = Number(displayMinutes.textContent)

    if (countDownSeconds <= 0) {
      countDownSeconds = 60
      displayMinutes.textContent = String(countDownMinutes - 1).padStart(2, "0")
    }

    displaySeconds.textContent = String(countDownSeconds - 1).padStart(2, "0")

    if (displayMinutes.textContent <= 0 && displaySeconds.textContent <= 0) {
      resetControls()
      noSounds()
      alarmSound.play()
      return
    }

    countDown()
  }, 1000)
}

//trocar buttonPlay para buttonPause e vice-versa


buttonPlay.addEventListener('click', function () {
  if (displayMinutes.textContent > 0 || displayMinutes.textContent == 0 && displaySeconds.textContent > 0) {
    buttonPlay.classList.add('hide')
    buttonPause.classList.remove('hide')
    buttonStop.classList.remove('hide')
    buttonSet.classList.add('hide')
    buttonClickSound.play()
    countDown()
  }
 
  
})

buttonPause.addEventListener('click', function () {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  clearTimeout(timerTimeOut)
})

//ao clicar no buttonPause, pausar a contagem

//ao clicar no buttonPlay de novo, voltar a contagem de onde parou

//quando terminar o tempo, soltar o alarme

//trocar buttonStop para buttonSet

buttonStop.addEventListener('click', function () {
  buttonClickSound.play()
  resetControls()
  resetTimer()
  noSounds()
})

function resetControls() {
  buttonStop.classList.add('hide')
  buttonSet.classList.remove('hide')
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
}

function resetTimer() {
  clearTimeout(timerTimeOut)
  displayMinutes.textContent = "00"
  displaySeconds.textContent = "00"
}

//ao clicar no buttonSet, surgir um novo prompt para pegar o novo tempo

buttonSet.addEventListener('click', function () {
  buttonClickSound.play()
  buttonStop.classList.remove('hide')
  buttonSet.classList.add('hide')
  minutes = Number(prompt("Selecione o tempo que deseja:"));
  seconds = 0
  displayMinutes.textContent = String(minutes).padStart(2, "0")
  displaySeconds.textContent = String(seconds).padStart(2, "0")
  alarmSound.pause()
})

//aumentar o tempo em 5min com o buttonPlus

buttonPlus.addEventListener('click', function () {
  displayMinutes.textContent = String(Number(displayMinutes.textContent) + 5).padStart(2, "0")
})

//diminuir o tempo em 5min com o buttonMinus

buttonMinus.addEventListener('click', function () {
  if (displayMinutes.textContent >= 5) {
    displayMinutes.textContent = String(Number(displayMinutes.textContent) - 5).padStart(2, "0")
  }
})

//ao clicar nos sound buttons, trocar as cores dos sound buttons

let forestControl = 1;

function forestAction() {
  if (forestControl == 1) {
    buttonForest.style.backgroundColor = "#02799D",
      pathForest.style.fill = "#FFFFFF"
    forestControl = 2
    forestSound.play()
    forestSound.loop = true
  }
  else if (forestControl == 2) {
    grayForest()
    forestControl = 1
    
  }

  grayRain(), grayCafe(), grayFire()

}

function grayForest() {
  buttonForest.style.backgroundColor = "#E1E1E6",
    pathForest.style.fill = "#323238"
    forestSound.pause()
}

let rainControl = 1;

function rainAction() {
  if (rainControl == 1) {
    buttonRain.style.backgroundColor = "#02799D",
      pathRain.style.fill = "#FFFFFF"
    rainControl = 2
    rainSound.play()
    rainSound.loop = true
  }
  else if (rainControl == 2) {
    grayRain()
    rainControl = 1
  }
  grayForest(), grayCafe(), grayFire()
}

function grayRain() {
  buttonRain.style.backgroundColor = "#E1E1E6",
    pathRain.style.fill = "#323238"
    rainSound.pause()
}

let cafeControl = 1;

function cafeAction() {
  if (cafeControl == 1) {
    buttonCafe.style.backgroundColor = "#02799D",
      pathCafe.style.fill = "#FFFFFF"
    cafeControl = 2
    cafeSound.play()
    cafeSound.loop = true
  }
  else if (cafeControl == 2) {
    grayCafe()
    cafeControl = 1
  }

  grayRain(), grayForest(), grayFire()
}

function grayCafe() {
  buttonCafe.style.backgroundColor = "#E1E1E6",
    pathCafe.style.fill = "#323238"
    cafeSound.pause()
}

let fireControl = 1;

function fireAction() {
  if (fireControl == 1) {
    buttonFire.style.backgroundColor = "#02799D",
      pathFire.style.fill = "#FFFFFF"
    fireControl = 2
    fireSound.play()
    fireSound.loop = true
  }
  else if (fireControl == 2) {
    grayFire()
    fireControl = 1
  }

  grayRain(), grayCafe(), grayForest()
}

function grayFire() {
  buttonFire.style.backgroundColor = "#E1E1E6",
    pathFire.style.fill = "#323238"
    fireSound.pause()
}

buttonForest.addEventListener('click', forestAction)

buttonRain.addEventListener('click', rainAction)

buttonCafe.addEventListener('click', cafeAction)

buttonFire.addEventListener('click', fireAction)

function noSounds(){
  grayForest(),
  grayRain(),
  grayCafe(),
  grayFire()
}















//ao clicar no buttonForest, tocar o som de floresta

//ao clicar no buttonRain, tocar o som de chuva

//ao clicar no buttonCafe, tocar o som de cafeteria

//ao clicar no buttonFire, tocar o som de fogo

//colocar o som em looping

//ao reclicar em qualquer um dos sound buttons acionados, pausar o som



