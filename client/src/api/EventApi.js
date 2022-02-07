
const API_URL = process.env.REACT_APP_API_URL;
const authToken = localStorage.getItem('token');

export async function addEvent(eventData,bannerUrl,startDate,endDate){
    const start_time = startDate;
    const end_time = endDate;
    //console.log(authToken);
    const response = await fetch(`${API_URL}/api/event/addevent`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${authToken}`
        },
        body: JSON.stringify({event_name:eventData.event_name, description:eventData.description, event_banner:bannerUrl,address:eventData.address,latitude:eventData.latitude,longitude:eventData.longitude,start_time:start_time,end_time:end_time})
    });

    const json = await response.json();
    return json;
    
}

export async function updateEvent(id,eventData,startDate,endDate){
    const start_time = startDate;
    const end_time = endDate;
   // console.log(authToken);
    const response = await fetch(`${API_URL}/api/event/updateevent/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${authToken}`
        },
        body: JSON.stringify({event_name:eventData.event_name, description:eventData.description,address:eventData.address,start_time:start_time,end_time:end_time})
    });

    const json = await response.json();
    return json;
}


export async function getEventList(startDate, endDate){
    
    const start_time = startDate;
    const end_time = endDate;
    
    const response = await fetch(`${API_URL}/api/event/fetcheventlist`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({start_time:start_time, end_time: end_time})
    });

    const json = await response.json();
    //console.log(json);
    if(json.success){
        return json.events;
    }
    
    return [];
}

export async function deleteEvent(id){
    const response = await fetch(`${API_URL}/api/event/deleteevent/${id}`,{
        method:'DELETE',
        headers:{
            'auth-token': `${authToken}`
        }
    });

    const json = await response.json();
    return json;
}

export async function starEvent(){

}

export async function unstarEvent(){
    
}

export async function fetchMyEvents(){
    const response = await fetch(`${API_URL}/api/event/myevents`,{
        method:'GET',
        headers: {
            'auth-token': `${authToken}`
        }
    });

    
    const json = await response.json();
    //console.log(json);
    return json;  
}

export async function fetchStarredEvents(){
    const response = await fetch(`${API_URL}/api/event/mystarevents`,{
        method:'GET',
        headers: {
            'auth-token': `${authToken}`
        }
    });

    const json = await response.json();
    return json;
}