/* eslint-disable react/prop-types */


export default function Status({status,history, activeGame}){

    // console.log(history);

    return(

        <>
            <div className="player-status status">
                <h3> {history[activeGame].player1.name + "(X)"}  </h3>
                <div className="score" defaultValue={0}> {history[activeGame].player1.score }</div>
            </div>
            <div className="state-status status">
            <h3>Status</h3>
            {status}
            </div>
            <div className="player-status status">
                <h3> {history[activeGame].player2.name +"(O)"} </h3>
                <div className="score" > {history[activeGame].player2.score} </div>
            </div>
            

        </>

    )
        
}