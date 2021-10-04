export function formatCardProperties(match) {
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
  match.status = match.status.charAt(0) + match.status.toLowerCase().slice(1)

  // toUTCString and remove extra chars at the end of the string
  match.date = new Date(match.date).toUTCString().slice(0, -7)
}

export function removeAllChildNodes(main) {
  while (main.firstChild) {
    main.removeChild(main.firstChild)
  }
}
