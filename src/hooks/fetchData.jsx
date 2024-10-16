

export async function fetchHistory(session_id){

    let apikey = session_id;
    try{ 
        const response = await fetch(`http://localhost:3000/api/history?API_KEY=${apikey}`);
        if(response.ok){
            const fetchedData = await response.json();
            if(apikey === "-1" && await fetchedData.api_key){
                localStorage.setItem("session_id",fetchedData.api_key);
            }
            //console.log(await fetchedData);
            return fetchedData;
        }

    }catch(error){
        return ({message:error});
    }
             
}



export async function addNewGame(newHistory){

    const apikey = localStorage.getItem("session_id");

    try {
        const response = await fetch(`http://localhost:3000/api/add-new-game?API_KEY=${apikey}`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newHistory[newHistory.length-1])
        });
        if(response.ok){
            console.log(response);
            return
        }
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

export async function updateHistory(activeGame, idx){

    const apikey = localStorage.getItem("session_id");
    try {
        const response = await fetch(`http://localhost:3000/api/update-history?API_KEY=${apikey}`, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({game:activeGame, idx: idx})
        });
        if(response.ok){
            console.log(response);
            return
        }
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }

}

