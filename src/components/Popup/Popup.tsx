import './Popup.css';

type Props = {
    result : string
    newRound : () => void
    active?: boolean
}

const Popup = ({result, newRound, active = false}: Props) => {
  return (
    <div className={`Popup__Container ${active ? "" : "hidden"}`}>
        <h2>{result}</h2>
        <button className=" btn secondary button__clearStyle" onClick={newRound}>Play Again!</button>
    </div>
  )
}

export default Popup