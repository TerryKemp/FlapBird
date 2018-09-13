var cvs = document.getElementById('canvas')
var ctx = cvs.getContext('2d')

// load images

var bird = new Image()
var background = new Image()
var fg = new Image()
var poleUp = new Image()
var poleDown = new Image()

bird.src = 'images/bird.png'
background.src = 'images/background.png'
// fg.src = 'images/fg.png'
poleUp.src = 'images/poleUp.png'
poleDown.src = 'images/poleDown.png'

// some variables

var gap = 85
var constant

var bX = 10
var bY = 150

var gravity = 1.5

var score = 0

// audio files

var fly = new Audio()
var scor = new Audio()

fly.src = 'sounds/fly.mp3'
scor.src = 'sounds/score.mp3'

// on key down

document.addEventListener('keydown', moveUp)

function moveUp () {
  bY -= 25
  fly.play()
}

// pole coordinates

var pole = []

pole[0] = {
  x: cvs.width,
  y: 0
}

// draw images

function draw () {
  ctx.drawImage(background, 0, 0)

  for (var i = 0; i < pole.length; i++) {
    constant = poleUp.height + gap
    ctx.drawImage(poleUp, pole[i].x, pole[i].y)
    ctx.drawImage(poleDown, pole[i].x, pole[i].y + constant)

    pole[i].x--

    if (pole[i].x == 125) {
      pole.push({
        x: cvs.width,
        y: Math.floor(Math.random() * poleUp.height) - poleUp.height
      })
    }

    // detect collision

    if (bX + bird.width >= pole[i].x && bX <= pole[i].x + poleUp.width && (bY <= pole[i].y + poleUp.height || bY + bird.height >= pole[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
      location.reload() // reload the page
    }

    if (pole[i].x === 5) {
      score++
      scor.play()
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height)

  ctx.drawImage(bird, bX, bY)

  bY += gravity

  ctx.fillStyle = '#000'
  ctx.font = '20px Verdana'
  ctx.fillText('Score : ' + score, 10, cvs.height - 20)

  requestAnimationFrame(draw)
}

draw()
