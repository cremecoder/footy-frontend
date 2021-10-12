import englandFlag from "../images/england.svg"

export function formatCardProperties(match) {
  // Format match.winner to show correct data
  if (match.score.homeTeam > match.score.awayTeam) {
    match.winner = match.homeTeam.name
  } else if (match.score.homeTeam < match.score.awayTeam) {
    match.winner = match.awayTeam.name
  } else {
    match.winner = "Draw"
  }

  // Replace GB flag with England flag
  if (match.homeTeam.flag === "https://flagcdn.com/gb.svg") {
    match.homeTeam.flag = englandFlag
  }
  if (match.awayTeam.flag === "https://flagcdn.com/gb.svg") {
    match.awayTeam.flag = englandFlag
  }

  // toLowerCase all but first letter & remove hyphens & underscores
  match.stage = match.stage.charAt(0) + match.stage.toLowerCase().slice(1)
  match.stage = match.stage.replace(/_|-/g, " ")
  match.status = match.status.charAt(0) + match.status.toLowerCase().slice(1)

  // toUTCString and remove extra chars at the end of the string
  match.date = new Date(match.date).toUTCString().slice(0, -7)
}

export function removeAllChildNodes(main) {
  while (main.firstChild) {
    main.removeChild(main.firstChild)
  }
}

export function validator(input) {
  // forbid symbols & numbers
  if (
    !/^([a-zA-Z\s]+)$/.test(input) ||
    input.length <= 2 ||
    input.length >= 20
  ) {
    return true
  } else {
    return false
  }
}
