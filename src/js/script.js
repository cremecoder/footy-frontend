import Fetch from "./Fetch"
import { generateHome, generateCards, generateError } from "./templates"

let fetch = new Fetch()

const form = document.getElementById("form")
const input = form.children[0]
const main = document.getElementById("main")
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
    let team = input.value.toLowerCase()
    if (!input.value) {
      h1Text.textContent =
        "Please enter a team to see their matches e.g Russia, England..."
      input.value = ""
    } else if (!/^([a-zA-Z\s]+)$/.test(input.value)) {
      h1Text.textContent = "Please enter a valid team."
      input.value = ""
    } else {
      fetch
        .fetchMatches(team)
        .then(matches => {
          if (!matches.length) {
            // main.replaceChildren()
            h1Text.textContent =
              "Sorry, that team did not play in the competition :("
          } else {
            main.replaceChildren()
            generateCards(matches, main)
          }
        })
        .catch(err => generateError(h1Text, err))
      input.value = ""
    }
  })
})

// if (match.score.homeTeam > match.score.awayTeam) {
//   return html`match.homeTeam.name`
// } else if (match.score.homeTeam < match.score.awayTeam) {
//   return html`match.awayTeam.name`
// } else {
//   return html`Draw`
// }
// <span class="text-sm clr-neutral-700 px-1"></span>
