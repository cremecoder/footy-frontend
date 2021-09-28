/*
- Called on successful connection to API 
*/
export function generateHome(input, h1Text, connected) {
  if (connected === true) {
    input.removeAttribute("disabled")
    input.focus()
    input.attributes.placeholder.textContent = "Search country"
    h1Text.textContent =
      "Enter a team from the Fifa World Cup 2018 to see their matches."
  } else {
    h1Text.textContent =
      "Could not connect to API. Refresh the page to try again."
  }
}

/*
- Called on successful user input and shows match cards in DOM
*/
export function generateCards(matches, main) {
  removeAllChildNodes(main)
  matches.forEach(match => {
    formatCardProperties(match)
    main.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card bg-neutral-100 clr-neutral-600">
      <ul class="card-top">
        <li class="text-xs p-1">
          STAGE <span class="text-sm clr-neutral-700 px-1">${match.stage}</span>
        </li>
        <li class="text-xs p-1">
          GROUP <span class="text-sm clr-neutral-700 px-1">${match.group}</span>
        </li>
        <li class="text-xs p-1 clr-txt-winner">
          WINNER <span class="text-sm clr-neutral-700 px-1">${match.winner}</span>
        </li>
      </ul>
      <div class="card-center text-lg--bold text-center">
        <div class="card-center--home p-1">
          <p class="text-xs">HOME TEAM</p>
          <span class="clr-neutral-700">${match.homeTeam.name}</span>
        </div>
        <div class="card-center--score clr-neutral-700 p-1">
          <div class="img-container">
            <img
              src="${match.homeTeam.flag}"
              alt="Home flag"
              class="icon--flag"
            />
          </div>
          <div>
          <p class="score-fill"><span>${match.score.homeTeam}</span> - <span>${match.score.awayTeam}</span></p>
          </div>
          <div class="img-container">
            <img
              src="${match.awayTeam.flag}"
              alt="Away flag"
              class="icon--flag"
            />
          </div>
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
            >${match.date}</span
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

/*
- Called inside generateCards function, before rendering cards
*/
function formatCardProperties(match) {
  // Format match.winner to show correct data
  if (match.score.homeTeam > match.score.awayTeam) {
    match.winner = match.homeTeam.name
  } else if (match.score.homeTeam < match.score.awayTeam) {
    match.winner = match.awayTeam.name
  } else {
    match.winner = "Draw"
  }
  // toLowerCase all but first letter & remove hyphens & underscores
  match.stage = match.stage.charAt(0) + match.stage.toLowerCase().slice(1)
  match.stage = match.stage.replace(/_|-/g, " ")

  // toLowerCase all but first letter
  match.status = match.status.charAt(0) + match.status.toLowerCase().slice(1)

  // toUTCString and remove extra chars at the end of the string
  match.date = new Date(match.date).toUTCString().slice(0, -7)
}

/*
- Called if user submits empty field
*/
export function emptyField(main) {
  removeAllChildNodes(main)
  main.insertAdjacentHTML(
    "beforeend",
    `
      <div class="enter">
      <h1 class="text-lg--bold clr-neutral-800 text-center">Please enter a team to see their matches e.g Russia, England...</h1>
      <div class="box">
        <div class="shadow"></div>
        <div class="gravity">
          <div class="ball"></div>
        </div>
      </div>
    </div>
      `
  )
}

/*
- Called if user input is too short/long or has forbidden characters
*/
export function invalidInput(main) {
  removeAllChildNodes(main)
  main.insertAdjacentHTML(
    "beforeend",
    `
    <div class="enter">
    <h1 class="text-lg--bold clr-neutral-800 text-center">Please enter a valid team.</h1>
    <div class="box">
      <div class="shadow"></div>
      <div class="gravity">
        <div class="ball"></div>
      </div>
    </div>
  </div>
    `
  )
}

/*
- Called if server can't find requested team
*/
export function teamNoExist(main, team) {
  removeAllChildNodes(main)
  main.insertAdjacentHTML(
    "beforeend",
    `
    <div class="enter">
    <h1 class="text-lg--bold clr-neutral-800 text-center">Sorry, "${team}" did not play in the competition :(</h1>
    <div class="box">
      <div class="shadow"></div>
      <div class="gravity">
        <div class="ball"></div>
      </div>
    </div>
  </div>
    `
  )
}

/*
- Called on server error from Fetch.js catches
*/
export function generateError(main, err) {
  removeAllChildNodes(main)
  main.insertAdjacentHTML(
    "beforeend",
    `
    <div class="enter">
    <h1 class="text-lg--bold clr-neutral-800 text-center">Soemthing went wrong: ${err}</h1>
    <div class="box">
      <div class="shadow"></div>
      <div class="gravity">
        <div class="ball"></div>
      </div>
    </div>
  </div>
    `
  )
}

/*
- Called before each "generate" function renders new DOM elements
*/
function removeAllChildNodes(main) {
  while (main.firstChild) {
    main.removeChild(main.firstChild)
  }
}
