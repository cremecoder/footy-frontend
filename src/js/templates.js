export function generateHome(input, h1Text, connected) {
  if (connected === true) {
    input.removeAttribute("disabled")
    input.attributes.placeholder.textContent = "Search country"
    h1Text.textContent =
      "Enter a team from the Fifa World Cup 2018 to see their matches."
  } else {
    h1Text.textContent =
      "Could not connect to API. Refresh the page to try again."
  }
}

export function generateCards(matches, main) {
  removeAllChildNodes(main)
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

export function teamNoExist(main) {
  removeAllChildNodes(main)
  main.insertAdjacentHTML(
    "beforeend",
    `
    <div class="enter">
    <h1 class="text-lg--bold clr-neutral-800 text-center">Sorry, that team did not play in the competition :(</h1>
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

export function generateError(h1Text, err) {
  h1Text.textContent = "Something went wrong: " + err
}

function removeAllChildNodes(main) {
  while (main.firstChild) {
    main.removeChild(main.firstChild)
  }
}
