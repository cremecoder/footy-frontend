class Fetch {
  constructor() {
    this.connected = false
    this.matches = []
    this.errors = []
  }

  connectToApi() {
    let connect = fetch("https://worldcup2018-api.herokuapp.com/api/worldcup")
      .then(res => res.json())
      .then(connection => {
        this.connected = connection
        return this.connected
      })
      .catch(err => {
        this.errors.push(err)
        return this.errors
      })
    return connect
  }

  fetchMatches(team) {
    let getMatches = fetch(
      "https://worldcup2018-api.herokuapp.com/api/worldcup/findMatches",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ team })
      }
    )
      .then(res => res.json())
      .then(data => {
        this.matches = data.matches
        return this.matches
      })
      .catch(err => {
        this.errors.push(err)
        return this.errors
      })
    return getMatches
  }
}

export default Fetch
