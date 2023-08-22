import GameBoard from '../../components/GameBoard/GameBoard';
import './Home.css';

//type Props = {}

const Home = () => {
  return (
    <div>
        <header className="App-header">
            <h1>Orchestra BlackJack</h1>
        </header>
        <GameBoard/>
    </div>
  )
}

export default Home;