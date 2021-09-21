import Fetch from "./Fetch"

const fetch = new Fetch()

class DOM {
  constructor() {
    this.form = document.getElementById("form")
    this.input = form.children[0]
    this.main = document.getElementById("main")
    this.h1Text = main.querySelector("h1")
  }

  loadDOM() {
    fetch
      .connectToApi()
      .then(connected => {
        if (connected === true) {
          this.input.removeAttribute("disabled")
          this.input.attributes.placeholder.textContent = "Search country"
          this.h1Text.textContent =
            "Enter a team from the Fifa World Cup 2018 to see their matches."
        } else {
          this.h1Text.textContent =
            "Could not connect to API. Refresh the page to try again."
        }
      })
      .catch(err => (this.h1Text.textContent = "Something went wrong: " + err))
  }

  getMatches() {
    this.form.addEventListener("submit", e => {
      e.preventDefault()
      let team = this.input.value.toLowerCase()
      console.log(this.input.value)
      if (!this.input.value) {
        this.h1Text.textContent =
          "Please enter a team to see their matches e.g Russia, England..."
        this.input.value = ""
      } else if (!/^([a-zA-Z\s]+)$/.test(this.input.value)) {
        this.h1Text.textContent = "Please enter a valid team."
        this.input.value = ""
      } else {
        fetch.fetchMatches(team)
        this.input.value = ""
      }
    })
  }
}

export default DOM
