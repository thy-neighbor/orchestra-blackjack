import { action, observable } from 'mobx';
import type { DeckType } from '../components/GameBoard/DeckType';
import type { CardType } from '../components/Card/CardType';
import axios from 'axios';

interface CardResponse{
    success: boolean, 
    deck_id: string, 
    cards: CardType[], 
    remaining: number
}

interface DeckResponse{
    success: boolean,
    deck_id: string,
    shuffled: boolean,
    remaining: number
}


class DeckStore{
    
    deck : DeckType = {
        success: false,
        deck_id: "",
        shuffled: false,
        remaining: 0
    }

    @observable pulledCards : CardType[] = [];

    @action fetchDeck = async () : Promise<DeckType> => {
        
        try{
            const res = await axios.get<DeckResponse>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            this.deck = res.data;
            //console.log("Here is my deck: ",this.deck);
            return this.deck;
        }catch(error){
            console.error('Error fetching the deck: ', error);
            throw error;
        }

    };
    
    @action drawCards = async (n : number, deckId? : string): Promise<CardType[]> => {

        let id : string = deckId ? deckId : this.deck.deck_id;
            
        //console.log("REMAINING: ", this.deck.remaining);
        try{
            if(n > this.deck.remaining){
                //console.log("NEW DECK ALERTTTT");
                await this.reShuffle().then(data => {
                    id = data.deck_id
                });
            }

            const res = await axios.get<CardResponse>(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${n}`);
    
            const newCards : CardType[] = res.data?.cards;
    
            newCards.forEach((element)=>{this.pulledCards.push(element)});
            
            //console.log("Pulled cards: ", this.pulledCards);

            this.deck.remaining = res.data?.remaining;
    
            return newCards;
        }catch(error) { 
            console.error('Error fetching cards: ', error);
            throw error;
        }

    };

    @action startGame = async () : Promise<CardType[]> => {
        
        return this.fetchDeck().then(data => this.drawCards(4 , data.deck_id));

    };

    @action reShuffle = async () : Promise<DeckType> => {
        
        try{
            const res = await axios.get<DeckResponse>(`https://deckofcardsapi.com/api/deck/${this.deck.deck_id}/shuffle/`);
            this.deck = res.data;
            //console.log("Here is my shuffled deck: ",this.deck);
            return this.deck;
        }catch(error){
            console.error('Error shuffling the deck: ', error);
            throw error;
        }

    };
    
}

export default new DeckStore();