import React, { Component } from 'react';
import GridMDC from "./components/GridMDC";
import PaperMDC from "./components/PaperMDC";
import Card from "./components/Card";
import Score from "./components/Score";
import Alert from "./components/Alert/Alert";
import NavBar from "./components/NavBar";
import BottomNavMDC from "./components/BottomNavMDC";
import cards from "./cards.json";

// function App() {
//   return (
//    <div>
//      <h1>Cool Clicky ArteMeso Game Goes Here</h1>
//    </div>
//   );
// }

// export default App;

class App extends Component {

  state = {
    cards: cards,
    pickedCards: [],
    topScore: 0,
    alertMessage: ""
  }

  handlePicked = event => {

    const name = event.target.attributes.getNamedItem("name").value;
    this.shuffleCards()
    this.checkGuess(name, this.updateTopScore)
  }

  shuffleCards = () => {
    this.setState(this.state.cards = this.shuffleArray(this.state.cards))
  }

  shuffleArray = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.pickedCards.includes(name)) {
      newState.alertMessage = `YOU ALREADY PICKED "${name.toUpperCase()}"!`
      newState.pickedCards = []
      this.setState(this.state = newState)
    } else {
      newState.pickedCards.push(name)
      newState.alertMessage = `GOOD CHOICE!`
      this.setState(this.state = newState)
    }
    cb(newState, this.alertWinner)
  }

  updateTopScore = (newState, cb) => {
    if (newState.pickedCards.length > newState.topScore) {
      newState.topScore++
      this.setState(this.state = newState)
    }
    cb(newState)
  }

  alertWinner = (newState) => {
    if (newState.pickedCards.length === 12) {
      newState.alertMessage = "CHAMPION!";
      newState.pickedCards = [];
      this.setState(this.state = newState)
    }
  }

  render() {
    return (
      <div>
        <NavBar style={{ background: "#313133", marginBottom: "5px" }} />

        <GridMDC container direction="column" style={{ margin: "0 auto", maxWidth: 945 }}>

          <GridMDC item lg={12}>
            <PaperMDC>
              {this.state.alertMessage === "GOOD CHOICE!" ? (
                <Alert message={this.state.alertMessage} style={{ color: "green" }} />
              ) : (
                  <Alert message={this.state.alertMessage} style={{ color: "red" }} />
                )}
            </PaperMDC>
          </GridMDC>

          <GridMDC container justify="space-between">

            <GridMDC item lg={6} md={6} sm={12} xs={12}>
              <PaperMDC>
                <Score type="Score" score={this.state.pickedCards.length} />
              </PaperMDC>
            </GridMDC>

            <GridMDC item lg={6} md={6} sm={12} xs={12}>
              <PaperMDC>
                <Score type="Top Score" score={this.state.topScore} />
              </PaperMDC>
            </GridMDC>

          </GridMDC>

        </GridMDC>

        <GridMDC container spacing={24} justify="center" style={{ maxWidth: 945, margin: "0 auto" }}>
          {this.state.cards.map(card => (
            <GridMDC item lg={3} md={3} sm={4} xs={6}>
              <Card
                id={card.id}
                name={card.name}
                image={card.image}
                key={card.id}
                handlePicked={this.handlePicked}
              />
            </GridMDC>
          ))}
        </GridMDC>
        
        <BottomNavMDC style={{ background: "#313133", marginTop: "17.5px", paddingTop: "15px", borderTop: "2.5px solid slategray" }}>
          <a href="" target="_blank" className="link" alt="clicky-game-github-link"><i className="fa fa-github fa-2x"></i></a>
        </BottomNavMDC>

      </div>
    )
  }
}

export default App;

