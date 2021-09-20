// import { connectToApi } from "./functions"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form")
  const input = form.children[0]

  const main = document.getElementById("main")
  const h1Text = main.querySelector("h1")

  connectToApi()

  function connectToApi() {
    fetch("http://localhost:9000/api/worldcup")
      .then(res => res.json())
      .then(data => {
        if (data) {
          input.removeAttribute("disabled")
          input.attributes.placeholder.textContent = "Search country"
          h1Text.textContent =
            "Enter a team from the Fifa World Cup 2018 to see their matches."
        }
      })
      .catch(err => {
        h1Text.textContent =
          "Could not connect to API. Refresh the page to try again."
      })
  }

  ////////////////////////////////////////////////////////////////////////

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
      // filter mispellings here ?
      fetchMatches(team)
      input.value = ""
    }
  })

  ////////////////////////////////////////////////////////////////////////

  function fetchMatches(team) {
    fetch("http://localhost:9000/api/worldcup/findMatches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ team })
    })
      .then(res => res.json())
      .then(data => {
        // filter mispellings here ?
        let matches = data.matches
        if (!matches.length) {
          h1Text.textContent =
            "Sorry, that team did not play in the competition :("
        } else {
          generateTemplate(matches)
        }
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  ////////////////////////////////////////////////////////////////////////

  function generateTemplate(matches) {
    main.replaceChildren()
    matches.forEach(match => {
      main.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card bg-neutral-100 clr-neutral-600">
      <ul class="card-top">
        <li class="text-xs p-1">
          STAGE <span class="text-sm clr-neutral-700 px-1">${match.stage.replace(
            /_/g,
            " "
          )}</span>
        </li>
        <li class="text-xs p-1">
          GROUP <span class="text-sm clr-neutral-700 px-1">${match.group}</span>
        </li>
        <li class="text-xs p-1 clr-txt-winner">
          WINNER <span class="text-sm clr-neutral-700 px-1">${
            match.winner
          }</span>
        </li>
      </ul>
      <div class="card-center text-lg--bold text-center">
        <div class="card-center--home p-1">
          <p class="text-xs">HOME TEAM</p>
          <span class="clr-neutral-700">${match.homeTeam.name}</span>
        </div>
        <div class="card-center--score clr-neutral-700 p-1">
          <img
            src="${match.homeTeam.flag}"
            alt="Home flag"
            class="icon--flag"
          />
          <p class="score-fill"><span>${match.score.homeTeam}</span> - <span>${
          match.score.awayTeam
        }</span></p>
          <img
            src="${match.awayTeam.flag}"
            alt="Home flag"
            class="icon--flag"
          />
        </div>
        <div class="card-center--away p-1">
          <p class="text-xs">AWAY TEAM</p>
          <span class="clr-neutral-700">${match.awayTeam.name}</span>
        </div>
      </div>
      <div class="card-bottom">
        <p class="text-xs p-1">
          DATE
          <span class="text-sm clr-neutral-700 px-1"
            >${new Date(match.date).toUTCString()}</span
          >
        </p>
        <p class="text-xs p-1">
          STATUS <span class="text-sm clr-txt-loser px-1">${match.status}</span>
        </p>
      </div>
    </div>
    `
      )
    })
  }
})

/* NOTES */

// -- FIX 'WINNER' IN TEMPLATE
// if (match.score.homeTeam > match.score.awayTeam) {
//   return html`match.homeTeam.name`
// } else if (match.score.homeTeam < match.score.awayTeam) {
//   return html`match.awayTeam.name`
// } else {
//   return html`Draw`
// }
// <span class="text-sm clr-neutral-700 px-1"></span>

// -- Seperate functionality of...
//  - API fetch into a function, also sperate DOM manipulaution into seperate logic
//  - POST fetch into a function, also template literal function into seperate logic
