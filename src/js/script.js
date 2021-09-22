import Fetch from "./Fetch"
import {
  generateHome,
  generateCards,
  emptyField,
  invalidInput,
  teamNoExist,
  generateError
} from "./templates"

let fetch = new Fetch()

const root = document.getElementById("root")
const form = root.querySelector("form")
const input = form.querySelector("input")
const main = root.querySelector("main")
const h1Text = main.querySelector("h1")

document.addEventListener("DOMContentLoaded", () => {
  fetch
    .connectToApi()
    .then(connected => {
      generateHome(input, h1Text, connected)
    })
    .catch(err => generateError(h1Text, err))

  form.addEventListener("submit", e => {
    e.preventDefault()
    if (!input.value) {
      removeAllChildNodes(main)
      emptyField(main)
    } else if (!/^([a-zA-Z\s]+)$/.test(input.value)) {
      removeAllChildNodes(main)
      invalidInput(main)
    } else {
      fetch
        .fetchMatches(input.value)
        .then(matches => {
          if (!matches.length) {
            removeAllChildNodes(main)
            teamNoExist(main)
          } else {
            removeAllChildNodes(main)
            generateCards(matches, main)
          }
        })
        .catch(err => generateError(h1Text, err))
    }
    input.value = ""
  })

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  }
})

// if (match.score.homeTeam > match.score.awayTeam) {
//   return html`match.homeTeam.name`
// } else if (match.score.homeTeam < match.score.awayTeam) {
//   return html`match.awayTeam.name`
// } else {
//   return html`Draw`
// }
// <span class="text-sm clr-neutral-700 px-1"></span>
