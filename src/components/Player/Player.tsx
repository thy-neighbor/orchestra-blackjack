import { CardType } from '../Card/CardType';
import Card from '../Card/Card'
import './Player.css';

type Props = {
    title?: string
    cards : CardType[]
    isHuman? : boolean
    isPlaying? : boolean
    hit? : () => void
    stand? : () => void
    value? : number
}

const Player = ({title, cards, isHuman = false, hit, stand, value, isPlaying = false}: Props) => {

    const displayCards = cards.map( (element : CardType, index : number) => {
        const {code, image, value, suit} = element;
        return(
            <li key={index}>
                <Card code={code} image={image} value={value} suit={suit} />
            </li>

        );
    });
    

    return (
        <div className="Player__Container row" ><h3>{title}</h3>
            <ul className={`Player__Cards list__clearStyle ${isHuman ? "" : ""}`}>
                {displayCards}
            </ul>
            <div className="Player__Options">
                <div className="Player__Value">Total = {value}</div>
                {isHuman ?
                    <div className="Player__Button__Container">
                        <button className={`btn player button__clearStyle ${isPlaying ? "" : "disabled"}`} onClick={hit}>Hit</button>
                        <button className={`btn player button__clearStyle ${isPlaying ? "" : "disabled"}`} onClick={stand}>Hold</button>
                    </div>
                    : ""
                }
            </div>
        </div>
    )
}

export default Player;