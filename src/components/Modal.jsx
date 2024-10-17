/* eslint-disable react/prop-types */

import { useState } from "react";
import { addNewGame } from "../hooks/fetchData";
import History from "./History";
export default function Modal({status, close,setPlayerName,history,setHistory,isFirstGame,setIsFirstGame, setActiveGame}){
    const [player1,setPlayer1] = useState("player1");
    const [player2,setPlayer2] = useState("player2");
    function handleSubmit(e){
        
        e.preventDefault();
        setPlayerName([player1,player2]);

        if(isFirstGame){
            setIsFirstGame(false);
            const newHistory = history.slice();
            newHistory[0].player1.name = player1;
            newHistory[0].player2.name = player2;
            setActiveGame(newHistory.length-1);
            addNewGame(newHistory);
            setHistory(newHistory);
            
        }else{
            
            const newHistory = history.slice();
            newHistory.push(
                {player1:{
                  name: player1,
                  score: 0
                },
                player2:{
                  name: player2,
                  score: 0
                }
                }
            )
            //console.log(newHistory);
            addNewGame(newHistory);
            setActiveGame(newHistory.length-1);
            setHistory(newHistory);

        }
        //setActiveGame(history.length-1);
        
        //location.reload();
        close();

    }
    //console.log(history[0].player1.name);    
    return(
        
        <>
            
            <div className="modal">
                <div className="overlay" >
                    <div className="modal-content">
                        <button className="exit-btn" onClick={close} disabled={isFirstGame} >❌</button>
                        {status === true ? 
                            <>
                                <h3>Create New Game</h3>
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="player-form">
                                        <label htmlFor="player1">Player 1 (X)</label>
                                        <input onChange={(e) => setPlayer1(e.target.value)} type="text" value={player1} id="player1"/>
                                    </div>
                                    <div className="player-form">
                                        <label htmlFor="player2">Player 2 (O)</label>
                                        <input onChange={(e) => setPlayer2(e.target.value)} type="text" value={player2} id="player2"/>
                                    </div>
                                    <button type="submit">DONE</button>
                                </form>
                            </>
                        : 
                            <>
                                <h3>Game History</h3>
                                <History history={history} setActiveGame={setActiveGame} close={close} />
                            </>

                            }

                    </div>
                </div>
            </div>
            
        </>

    );

}
