const {ipcRenderer, remote} = require('electron')
const HtmlTranslate = require('./utils/htmlTranslate')
const i18next = remote.require('i18next')

document.addEventListener('DOMContentLoaded', event => {
  new HtmlTranslate(document).translate()
})

let eventsAttached = false


let pauseHourMinus = document.getElementById('pauseHourMinus')
let pauseHour = document.getElementById('pauseHour')
let pauseHourPlus = document.getElementById('pauseHourPlus')

let pauseMinuteMinus = document.getElementById('pauseMinuteMinus')
let pauseMinute = document.getElementById('pauseMinute')
let pauseMinutePlus = document.getElementById('pauseMinutePlus')

document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

pauseHourPlus.addEventListener('click', function (e) {
  if (pauseHour.innerHTML !== '5') {
    ipcRenderer.send('pause-setting', 'pauseHour', (parseInt(pauseHour.innerHTML, 10) + 1) * 1000)
  }
})

 pauseHourMinus.addEventListener('click', function (e) {
  if (pauseHour.innerHTML !== '0') {
    ipcRenderer.send('pause-setting', 'pauseHour', (parseInt(pauseHour.innerHTML, 10) - 1) * 1000)
  }
})

pauseMinutePlus.addEventListener('click', function (e) {
  if (pauseMinute.innerHTML !== '55') {
    ipcRenderer.send('pause-setting', 'pauseMinute', (parseInt(pauseMinute.innerHTML, 10) + 5) * 1000 * 60)
  }
})

pauseMinuteMinus.addEventListener('click', function (e) {
  if (pauseMinute.innerHTML !== '0') {
    ipcRenderer.send('pause-setting', 'pauseMinute', (parseInt(pauseMinute.innerHTML, 10) - 5) * 1000 * 60)
  }
})

//ipcRenderer.send('pause-setting2', 'pauseHour', pauseHour.innerHTML)
ipcRenderer.on('renderSettings', (event, data) => {

  pauseMinute.innerHTML = data['pauseMinute'] / 1000 / 60
  pauseHour.innerHTML = data['pauseHour'] / 1000
  document.body.style.background = data['mainColor']
  eventsAttached = true
})
ipcRenderer.send('send-pauseSettings')
