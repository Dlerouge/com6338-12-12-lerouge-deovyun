const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

let wins = 0
let losses = 0
let currentWord

class Word {
  constructor(word) {
    this.word = word
    this.displayWord = word.replaceAll(/[\w]/g, "_")
    this.remainingGuesses = 10
    this.incorrectLetters = []
    this.correctLetters = []
  }

  // implement the guessLetter function:
  guessLetter(letter) {
    if (this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter)) {
      return
    }

    if (this.word.includes(letter)) {
      this.correctLetters.push(letter)
      let newDisplayWord = ""
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          newDisplayWord += letter
        } else {
          newDisplayWord += this.displayWord[i]
        }
      }
      this.displayWord = newDisplayWord
    } else {
      this.incorrectLetters.push(letter)
      this.remainingGuesses--
    }
  }

  // implement the updateScreen function:
  updateScreen() {
    const wordToGuessEl = document.getElementById('word-to-guess')
    const remainingGuessesEl = document.getElementById('remaining-guesses')
    const incorrectLettersEl = document.getElementById('incorrect-letters')

    wordToGuessEl.textContent = this.displayWord
    remainingGuessesEl.textContent = this.remainingGuesses
    incorrectLettersEl.textContent = this.incorrectLetters.join(', ')
  }

  // implement the isGameOver method:
  isGameOver() {
    if (this.remainingGuesses <= 0 || this.word === this.displayWord) {
      return true
    }
    return false
  }

  // implement the getWinOrLoss function:
  getWinOrLoss() {
    if (this.word === this.displayWord && this.remainingGuesses > 0) {
      return 'win'
    } else if (this.word !== this.displayWord && this.remainingGuesses <= 0) {
      return 'loss'
    }
    return null}
}

function newGame() {
  const randomWord = words[Math.floor(Math.random() * words.length)]
  currentWord = new Word(randomWord)
  currentWord.updateScreen()
}

document.onkeyup = function(e) {
  const pressedKey = e.key.toLowerCase()
  // early exit for non-letter key presses
  if (!/^[a-z]{1}$/g.test(pressedKey)) return

  // pass in guessed letter to word obj
  currentWord.guessLetter(pressedKey)
  // allow word obj to update screen
  currentWord.updateScreen()

  // check if game is over
  const gameOver = currentWord.isGameOver()

  // if game is over, update wins/losses and start new game
  if (gameOver) {
    const previousWord = document.getElementById('previous-word')
    const winDisplay = document.getElementById('wins')
    const lossDisplay = document.getElementById('losses')
    previousWord.textContent = currentWord.word
    const result = currentWord.getWinOrLoss()
    if (result === 'win') {
      wins++
      winDisplay.textContent = wins
    } else if (result === 'loss') {
      losses++
      lossDisplay.textContent = losses
    }
    newGame()
  }
}

newGame()