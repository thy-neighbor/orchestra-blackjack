//import { useEffect } from 'react'
// import Player from '../Player/Player';
// import { CardType } from '../Card/CardType';
import { observer } from 'mobx-react';
import DeckStore from '../../stores/DeckStore';
import { CardType } from '../Card/CardType';
import { useState } from 'react';
import Player from '../Player/Player';
// import { useEffect} from 'react';

//type Props = {}

const testCards : CardType[] = [
    {
        code: "KH", 
        image: "https://deckofcardsapi.com/static/img/KH.png", 
        value: 6, 
        suit: "HEARTS"
    },
    {
        code: "KH", 
        image: "https://deckofcardsapi.com/static/img/KH.png", 
        value: 10, 
        suit: "HEARTS"
    }
];

const GameBoard = observer(() => {

    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [dealerCards, setDealerCards] = useState<CardType[]>([]);
    const [playerCards , setPlayerCards] = useState<CardType[]>([]);

    // useEffect(() => {
        // startGame().then(data => {
        //     setDealerCards([data[0], data[1]]);
        //     setPlayerCards([data[2], data[3]])
        // });
    //     fetchDeck();
    //   }, []);


    const beginEvent = () => {

        startGame().then(data => {
            setDealerCards([data[0], data[1]]);
            setPlayerCards([data[2], data[3]])
        });

        setIsStarted(true);
    };

    const {startGame} = DeckStore;

    return (
        
        <div className="GameBoard__Container">
            <button onClick={beginEvent}>Begin Game</button>


            {isStarted ? 
                <>
                    <Player title= "Dealer" cards={dealerCards}/>
                    <Player title="Player One" cards={playerCards} isHuman={true}/>
                </>
                :
                <>
                    <Player title= "Dealer" cards={testCards}/>
                    <Player title="Player One" cards={testCards} isHuman={true}/>
                </>
            }

        </div>
    )
});

export default GameBoard;

// {isStarted ? 
//     <>
//         <Player title= "Dealer" cards={dealerCards}/>
//         <Player title="Player One" cards={playerCards} isHuman={true}/>
//     </>
//     :
//     <>
//         <Player title= "Dealer" cards={testCards}/>
//         <Player title="Player One" cards={testCards} isHuman={true}/>
//     </>
// }