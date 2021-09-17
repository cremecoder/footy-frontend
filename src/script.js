document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form")
  const input = form.children[0]

  const main = document.getElementById("main")
  const h1Text = main.querySelector("h1")

  fetch("http://localhost:9000/api/worldcup")
    .then(res => res.json())
    .then(data => {
      if (data === true) {
        input.removeAttribute("disabled")
        input.attributes.placeholder.textContent = "Search country"
        h1Text.textContent =
          "Enter a team from the Fifa World Cup 2018 to see their matches."
      } else {
        h1Text.textContent =
          "Could not connect to API. Refresh the page to try again."
      }
    })
    .catch(err => console.log("Error: " + err))

  form.addEventListener("submit", e => {
    e.preventDefault()
    let team = input.value.toLowerCase()

    fetch("http://localhost:9000/api/worldcup/findMatches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        team: team
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data)
        }
      })
      .catch(error => {
        console.error("Error:", error)
      })
  })
})
