
// import Board from "./pages/game";

// import { HashRouter as Router,Routes,Route } from "react-router-dom";

import  Navbar  from "./components/Navbar";
import Board from "./components/Board";
//import History from "./components/History";
import Status from "./components/Status";
import { useState } from "react";
import { useEffect } from "react";
import { fetchHistory } from "./hooks/fetchData";


export default function App() {
  const [history,setHistory] = useState([
    {player1:{
      name: "player1",
      score: 0
    },
    player2:{
      name: "player2",
      score: 0
    }
    }
   
  ]);
  const [activeGame,setActiveGame] = useState(0);
  const [players,setPlayers] = useState([]);
  const [status,setStatus] = useState("");
  const [isFirstGame,setIsFirstGame] = useState();
  

  useEffect(()=>{
    
    const fetchData = async ()=>{
      
      const session_id = localStorage.getItem("session_id");
      if(session_id === null)
        localStorage.setItem("session_id", "-1");


      const response = await fetchHistory(localStorage.getItem("session_id"));
      
        
      if(response){
        if(response.game_history.length > 0){
          setHistory(response.game_history);
          setIsFirstGame(false);
          setActiveGame(response.game_history.length-1);
        }
        else{
          setIsFirstGame(true);
        }
        //console.log(response);
      }
    }

    fetchData();
    
  },[]);


  return (
    <>
      
      <div className="container">
        {isFirstGame === undefined? <p>Feching data...</p>:
        <>
        <header>
          <Navbar setPlayerName={setPlayers} history={history} setHistory={setHistory} isFirstGame={isFirstGame} setIsFirstGame={setIsFirstGame} setActiveGame={setActiveGame} />
          <hr />
        </header>
        <div className="game-content">
          <Board setStatus={setStatus} setHistory={setHistory} history={history} activeGame={activeGame}/>
        </div>
        <div className="game-status">
          <Status players={players} status={status} history={history} activeGame={activeGame} />
        </div>
        </>
        }
      </div>
    
    </>
  );
}






