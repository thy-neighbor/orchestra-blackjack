import { CardType } from './CardType';


const Card = ({image, value, suit} : CardType) => {
  return (
    <div className="card__container">
        <div className="crop__container">
            <img className="crop__image" src={image} alt={`${value} of ${suit}`}/>
        </div>
    </div>
  )
}

export default Card