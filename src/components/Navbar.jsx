/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";

export default function Navbar({ setPlayerName,history,setHistory, isFirstGame, setIsFirstGame, setActiveGame}){

    const [newGameModal, setNewGameModal] = useState(isFirstGame === true? true : false);
    const [historyModal, setHistoryModal] = useState(false);

    function handleNewGame(){
        setNewGameModal(true);

    }

    function handleViewHistory(){
        setHistoryModal(true);
    }
    function closeModal(){
        setNewGameModal(false);
        setHistoryModal(false);
    }
    
    
    return(

        <>
            {(newGameModal || historyModal) && (
                <Modal status={newGameModal} close={closeModal} setPlayerName={setPlayerName} history={history} setHistory={setHistory} isFirstGame={isFirstGame} setIsFirstGame={setIsFirstGame} setActiveGame={setActiveGame} />
            )}
       
            <div className="navbar">
                <h1>Tic-Tac-Toe</h1>
                <button className="history-btn
                " onClick={handleViewHistory} >History📜</button>         
                <button className="new-game-btn
                " onClick={handleNewGame}>New Game🆕</button>         
            </div>

            
        </>
    )
}