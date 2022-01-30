const API_URL = process.env.REACT_APP_API_URL;

export async function loginUser(credentials){
    const response = await fetch(`${API_URL}/api/auth/login`,{
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
      
        body: JSON.stringify({username: credentials.username, password: credentials.password})
    });

    return await response.json();
}

export async function uploadImage(image){
    const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","eventmapper");
    data.append("cloud_name","prashantpks")
    const response = await fetch("https://api.cloudinary.com/v1_1/prashantpks/image/upload",{
        method: 'POST',
        body: data
    });

    const json = await response.json();
    return json.url;
}

export async function createUser(credentials,imageurl){
    const response = await fetch(`${API_URL}/api/auth/createuser`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:credentials.username,email: credentials.email, password: credentials.password, photo:imageurl})
    });

    const json = await response.json();
    return json;
}

export async function updateUser(){
    
}