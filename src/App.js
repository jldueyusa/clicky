import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import friends from "./cards.json";
import "./App.css";

// Random shuffle
function randomFriends(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    friends,
    currentScore: 0,
    topScore: 0,
    correctIncorrect: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      correctIncorrect: "You guessed right!"
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ correctIncorrect: "You win!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      correctIncorrect: "You guessed wrong!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledFriends = randomFriends(friends);
    this.setState({ friends: shuffledFriends });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title="The Clicky Memory Game"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          correctIncorrect={this.state.correctIncorrect}
        />

        <Title>
          Match the images. The fewer the turns the higher the score
        </Title>
        <Container>
          <Row>
            {this.state.friends.map(friend => (
              <Column size="md-3 sm-6">
                <FriendCard
                  key={friend.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={friend.id}
                  image={friend.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}
export default App;

// import React from 'react';
// import ReactCardFlip from "react-card-flip";

// const Card = ({ id, isFlipped, handleClick, cardNumber }) => (
//   <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={1} flipSpeedFrontToBack={1} >
//     <button id={id} className={`card card-front ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="front">
      
//     </button>

//     <button id={id} className={`card card-back ${cardNumber !== -1 ? "" : "hide-card"}`} onClick={handleClick} key="back">
//       { cardNumber }
//     </button>
//   </ReactCardFlip>
// );

// export default Card;

// import React, { PureComponent } from 'react';
// import Header from './components/header/Header';
// import Card from './components/card/Card';
// import GameOver from './components/card/GameOver';

// import './styles/main.css';

// class App extends PureComponent {

//   state = { 
//     isFlipped: Array(16).fill(false),
//     shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
//     clickCount: 1,
//     prevSelectedCard: -1,
//     prevCardId: -1
//   };

//   static duplicateCard = () => {
//     return [0,1,2,3,4,5,6,7].reduce((preValue, current, index, array) => {
//       return preValue.concat([current, current])
//     },[]);
//   };
// JEN THIS IS WHERE IT FLIPS
//   handleClick = event => {
//     event.preventDefault();
//     const cardId = event.target.id;
//     const newFlipps = this.state.isFlipped.slice();
//     this.setState({
//         prevSelectedCard: this.state.shuffledCard[cardId],
//         prevCardId: cardId
//     });

//     if (newFlipps[cardId] === false) {
//       newFlipps[cardId] = !newFlipps[cardId];
//       this.setState(prevState => ({ 
//         isFlipped: newFlipps,
//         clickCount: this.state.clickCount + 1
//       }));

//       if (this.state.clickCount === 2) {
//         this.setState({ clickCount: 1 });
//         const prevCardId = this.state.prevCardId;
//         const newCard = this.state.shuffledCard[cardId];
//         const previousCard = this.state.prevSelectedCard;

//         this.isCardMatch(previousCard, newCard, prevCardId, cardId);
//       }
//     }
//   };
//JEN THIS IS WHERE IT CHECKS TO SEE IF THEY MATCH
//   isCardMatch = (card1, card2, card1Id, card2Id) => {
//     if (card1 === card2) {
//       const hideCard = this.state.shuffledCard.slice();
//       hideCard[card1Id] = -1;
//       hideCard[card2Id] = -1;
//       setTimeout(() => {
//         this.setState(prevState => ({
//           shuffledCard: hideCard
//         }))
//       }, 1000);
//     } else {
//       const flipBack = this.state.isFlipped.slice();
//       flipBack[card1Id] = false;
//       flipBack[card2Id] = false;
//       setTimeout(() => {
//         this.setState(prevState => ({ isFlipped: flipBack }));
//       }, 1000);
//     }
//   };

//   restartGame = () => {
//     this.setState({
//       isFlipped: Array(16).fill(false),
//       shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
//       clickCount: 1,
//       prevSelectedCard: -1,
//       prevCardId: -1
//     });
//   };

//   isGameOver = () => {
//     return this.state.isFlipped.every((element, index, array) => element !== false);
//   };

//   render() {
//     return (
//      <div>
//        <Header restartGame={this.restartGame} />
//        { this.isGameOver() ? <GameOver restartGame={this.restartGame} /> :
//        <div className="grid-container">
//           {
//             this.state.shuffledCard.map((cardNumber, index) => 
//               <Card
//                 key={index} 
//                 id={index} 
//                 cardNumber={cardNumber} 
//                 isFlipped={this.state.isFlipped[index]} 
//                 handleClick={this.handleClick}     
//               />
//             )
//           }
//         </div>
//        }
//      </div>
//     );
//   }
// }

// export default App;