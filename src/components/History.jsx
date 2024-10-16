/* eslint-disable react/prop-types */

function Item({player1, scoreP1, player2, scoreP2, handleClick}){
    return(
       
        <li className="list-item" onClick={handleClick}> 
            <div className="item-container">
                <span className="player-name">{player1}</span>
                <span className="score"> {scoreP1} : {scoreP2} </span>
                <span className="player-name"> {player2} </span>
            </div> 
           
        </li>
    ) 
        
}
export default function History({history, setActiveGame,close}){
    
    function handleClick(idx){

        
        setActiveGame(idx);
        close();
    }



    
    return(

        <>
            <div className="history-container">
                <ul className="history-list">
                    {history.length > 0 ? history.map((item, idx)=> (
                       
                      <Item key={idx} player1={item.player1.name} player2={item.player2.name} scoreP1={item.player1.score} scoreP2={item.player2.score} handleClick={()=>{
                        handleClick(idx)
                      }} />
                       
                    )):
                      <li className="list-itenm">NO HISTORY</li>
                    }
                </ul>
            </div>
            
        </>
    );

}