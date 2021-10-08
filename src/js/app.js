import Fetch from "./Fetch"
import * as template from "./templates"

let fetch = new Fetch()

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root")
  const form = root.querySelector("form")
  const input = form.querySelector("input")
  const wrapper = document.getElementById("wrapper")
  const main = root.querySelector("main")
  const h1Text = main.querySelector("h1")

  // Connect to API when DOM is loaded
  fetch
    .connectToApi()
    .then(connected => {
      template.generateHome(input, h1Text, connected, wrapper)
    })
    .catch(err => template.generateError(main, err, wrapper))

  // Calls "template" functions to load different DOM elements based on user input
  form.addEventListener("submit", e => {
    e.preventDefault()
    if (!input.value) {
      template.emptyField(main, wrapper)
    } else if (
      // forbid symbols & numbers
      !/^([a-zA-Z\s]+)$/.test(input.value) ||
      input.value.length <= 3 ||
      input.value.length >= 20
    ) {
      template.invalidInput(main, wrapper)
    } else {
      let team = input.value.toLowerCase().trim()
      fetch
        .fetchMatches(team)
        .then(matches => {
          if (!matches.length) {
            template.teamNoExist(main, team, wrapper)
          } else {
            template.generateCards(matches, main, wrapper)
          }
        })
        .catch(err => template.generateError(main, err, wrapper))
    }
    input.value = ""
  })
})
