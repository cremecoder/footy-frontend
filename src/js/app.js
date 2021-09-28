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

  /*
  - Connect to API when DOM is loaded
  */
  fetch
    .connectToApi()
    .then(connected => {
      generateHome(input, h1Text, connected)
    })
    .catch(err => generateError(main, err))

  /*
  - Form event listener
  - Calls "template" functions to load different DOM elements based on user input
  */
  form.addEventListener("submit", e => {
    e.preventDefault()
    if (!input.value) {
      emptyField(main)
    } else if (
      // forbid special chars & numbers
      !/^([a-zA-Z\s]+)$/.test(input.value) ||
      input.value.length <= 3 ||
      input.value.length >= 20
    ) {
      invalidInput(main)
    } else {
      let team = input.value.toLowerCase().trim()
      fetch
        .fetchMatches(team)
        .then(matches => {
          if (!matches.length) {
            teamNoExist(main, team)
          } else {
            generateCards(matches, main)
          }
        })
        .catch(err => generateError(main, err))
    }
    input.value = ""
  })
})

// ENV Vars?
