import { CardType } from '../Card/CardType';
import Card from '../Card/Card'
import './Player.css';


type Props = {
    title?: string
    cards : CardType[]
    isHuman? : boolean
    hit? : () => void
}

const Player = ({title, cards, isHuman = false, hit}: Props) => {

    const displayCards = cards.map( (element : CardType, index : number) => {
        const {code, image, value, suit} = element;
        return(
            <li key={index}>
                <Card code={code} image={image} value={value} suit={suit} />
            </li>

        );
    });
    

    return (
        <div className="Player__Container" >{title}
            <ul className={`Player__Cards list__clearStyle ${isHuman ? "" : ""}`}>
                {displayCards}
            </ul>
            <div className="Player__Options">
                {isHuman ? <button className="Player__Options__hit-btn button__clearStyle" onClick={hit}>Hit</button> : ""}
            </div>
        </div>
    )
}

export default Player;