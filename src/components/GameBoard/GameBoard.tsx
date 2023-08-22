import { observer } from 'mobx-react';
import DeckStore from '../../stores/DeckStore';
import { CardType } from '../Card/CardType';
import { useState } from 'react';
import Player from '../Player/Player';
import './GameBoard.css';
import Popup from '../Popup/Popup';


enum CardLegend {
    JACK = 10,
    QUEEN = 10,
    KING = 10,
    ACE = 11
};

const translateCardToValue = (card : CardType, aceValueIsOne : boolean = false) : number => {

    let value : number = 0;
    
    if(card.value.length <= 2){
        value = parseInt(card.value);
    }else if(card.value.length > 2){
        switch(card.value){
            case "JACK" :
                value = CardLegend.JACK;
                break;
            case "QUEEN" :
                value = CardLegend.QUEEN;
                break;
            case "KING" :
                value = CardLegend.KING;
                break;
            case "ACE" :
                value = aceValueIsOne ? 1 : CardLegend.ACE;
                break;
            default:
                console.error("Unknown value in card translation: ", card.value);
                break;
        }
    }
    
    return value;
};

const calculateHandValue = (cards : CardType[]) : number =>{

    let sum = 0;
    let aceIsPresent = false; 
    
    cards.forEach(card => {
        if(card.value === "ACE"){
            aceIsPresent = true;
        }

        sum += translateCardToValue(card);

    });

    if(aceIsPresent && sum > 21){
        sum -= 10;
    }

    return sum;
};

const calculateWinner = (dealerValue : number, playerValue : number) : string => {
    
    const dealerDelta : number = 21 - dealerValue;
    const playerDelta : number = 21 - playerValue;

    if(dealerDelta < playerDelta){
        //dealer is winner, player looses
        return "You Loose";
    }else if(dealerDelta > playerDelta){
        return "You Win";       //player wins
    }else{
        return "It's a Tie";   // tie
    }
}

const testCards : CardType[] = [
    {
        code: "JS", 
        image: "https://deckofcardsapi.com/static/img/JS.png", 
        value: "6", 
        suit: "SPADES"
    },
    {
        code: "JS", 
        image: "https://deckofcardsapi.com/static/img/JS.png", 
        value: "10", 
        suit: "SPADES"
    }
];

const GameBoard = observer(() => {

    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [dealerCards, setDealerCards] = useState<CardType[]>([]);
    const [playerCards , setPlayerCards] = useState<CardType[]>([]);
    const [resultDisplay , setResultDisplay] = useState<string>("");

    const {startGame, drawCards} = DeckStore;

    const beginEvent = () => {

        startGame().then(data => {
            setDealerCards([data[0], data[1]]);
            setPlayerCards([data[2], data[3]]);
        });

        setIsStarted(true);
    };

    const hitEvent = () => {
        drawCards(1).then(data =>{

            const newHand = playerCards.concat(data);

            setPlayerCards(newHand);

            if(calculateHandValue(newHand) > 21){
                setResultDisplay("You Loose");
            }
        });


    };

    const standEvent = () => {
        setResultDisplay(calculateWinner(dealerValue, playerValue));

    };

    const newRoundEvent = () => {
        drawCards(4).then(data => {
            setDealerCards([data[0], data[1]]);
            setPlayerCards([data[2], data[3]]);
        });

        setResultDisplay("");
    };

    const dealerValue = calculateHandValue(dealerCards);
    const playerValue = calculateHandValue(playerCards);

    // console.log("Dealer Card value: ", dealerValue);
    // console.log("Player Card value: ", playerValue);

    return (
        
        <div className="GameBoard__Container">
            <button className={`btn start primary button__clearStyle ${isStarted ? "disabled" : ""}`} onClick={beginEvent}>Press to Start</button>


            {isStarted ? 
                <>
                    <Player title= "Dealer" cards={dealerCards} value={dealerValue}/>
                    <Player title="Player One" cards={playerCards} isHuman={true} value={playerValue} hit={hitEvent} stand={standEvent} isPlaying={isStarted}/>
                </>
                :
                <>
                    <Player title= "Dealer" cards={testCards}/>
                    <Player title="Player One" cards={testCards} isHuman={true}/>
                </>
            }

            <Popup result={resultDisplay} newRound={newRoundEvent} active={resultDisplay ? true : false}/>

        </div>
    )
});

export default GameBoard;