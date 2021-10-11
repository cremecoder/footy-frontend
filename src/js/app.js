import Fetch from "./Fetch"
import * as template from "./templates"

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
    if (!domNodes.input.value) {
      // template.emptyField(main, wrapper)
      template.emptyField(domNodes)
    } else if (
      // forbid symbols & numbers
      !/^([a-zA-Z\s]+)$/.test(domNodes.input.value) ||
      domNodes.input.value.length <= 3 ||
      domNodes.input.value.length >= 20
    ) {
      // template.invalidInput(main, wrapper)
      template.invalidInput(domNodes)
    } else {
      let team = domNodes.input.value.toLowerCase().trim()
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
})
