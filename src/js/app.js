import Fetch from "./Fetch"
import * as template from "./templates"
import { validator } from "./utils"

let fetch = new Fetch()

document.addEventListener("DOMContentLoaded", () => {
  const domNodes = {
    form: document.querySelector("form"),
    input: document.querySelector(".search"),
    btn: document.querySelector(".search-btn"),
    wrapper: document.getElementById("wrapper"),
    main: document.querySelector("main"),
    h1Text: document.querySelector("h1")
  }

  // Connect to API when DOM is loaded
  fetch
    .connectToApi()
    .then(connected => {
      template.generateHome(domNodes, connected)
    })
    .catch(err => template.generateError(domNodes, err))

  // Calls "template" functions to load different DOM elements based on user input
  domNodes.form.addEventListener("submit", e => {
    e.preventDefault()
    let team = domNodes.input.value
    if (!team) {
      template.emptyField(domNodes)
    } else if (validator(team) === true) {
      template.invalidInput(domNodes)
    } else {
      team.toLowerCase().trim()
      fetch
        .fetchMatches(team)
        .then(matches => {
          if (!matches.length) {
            template.teamNoExist(domNodes, team)
          } else {
            template.generateCards(domNodes, matches)
          }
        })
        .catch(err => template.generateError(domNodes, err))
    }
    domNodes.input.value = ""
  })

  // Focus input when btn is clicked
  domNodes.btn.addEventListener("click", () => {
    domNodes.input.focus()
  })
})
