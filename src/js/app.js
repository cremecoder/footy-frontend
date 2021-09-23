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

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root")
  const form = root.querySelector("form")
  const input = form.querySelector("input")
  const main = root.querySelector("main")
  const h1Text = main.querySelector("h1")

  fetch
    .connectToApi()
    .then(connected => {
      generateHome(input, h1Text, connected)
    })
    .catch(err => generateError(h1Text, err))

  form.addEventListener("submit", e => {
    e.preventDefault()
    if (!input.value) {
      emptyField(main)
    } else if (!/^([a-zA-Z\s]+)$/.test(input.value)) {
      invalidInput(main)
    } else {
      let team = input.value.toLowerCase().trim()
      fetch
        .fetchMatches(team)
        .then(matches => {
          if (!matches.length) {
            teamNoExist(main)
          } else {
            generateCards(matches, main)
          }
        })
        .catch(err => generateError(h1Text, err))
    }
    input.value = ""
  })
})

// ENV Vars?

// if (match.score.homeTeam > match.score.awayTeam) {
//   return html`match.homeTeam.name`
// } else if (match.score.homeTeam < match.score.awayTeam) {
//   return html`match.awayTeam.name`
// } else {
//   return html`Draw`
// }
// <span class="text-sm clr-neutral-700 px-1"></span>

// ADD MORE OPTIONS FOR MISPELLING E.G KOREA, SOUTH KOREA, KOREA REPUBLIC
// DONT NEED WHITESPACE
// OR ONE ONE WORD SAUDI
