

export async function fetchHistory(session_id){

    let apikey = session_id;
    try{ 
        const response = await fetch(`https://tic-tac-toe-server-zeta.vercel.app/api/history?API_KEY=${apikey}`);
        if(response.ok){
            const fetchedData = await response.json();
            if(apikey === "-1" && await fetchedData.api_key){
                localStorage.setItem("session_id",fetchedData.api_key);
            }
            //console.log(fetchedData);
            return fetchedData.history[0];
        }

    }catch(error){
        return ({message:error});
    }
             
}



export async function addNewGame(newHistory){

    const apikey = localStorage.getItem("session_id");

    try {
        const response = await fetch(`https://tic-tac-toe-server-zeta.vercel.app/api/add-new-game?API_KEY=${apikey}`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newHistory[newHistory.length-1])
        });
        if(response){
            //console.log(response);
            return
        }
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
    //console.log(JSON.stringify(newHistory[newHistory.length-1]))
}


export async function updateHistory(activeGame, idx){

    const apikey = localStorage.getItem("session_id");
    try {
        const response = await fetch(`https://tic-tac-toe-server-zeta.vercel.app/api/update-history?API_KEY=${apikey}`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({game:activeGame, idx: idx})
        });
        if(response.ok){
            //console.log(response);
            return
        }
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }

}

