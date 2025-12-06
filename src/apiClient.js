const axios=require('axios');

const api=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
    timeout:5000
});

async function fetchPosts(){
    try{
        const res=await api.get('/posts');
        if(!Array.isArray(res.data)){
            throw new Error('Invalid response: posts is not an array');
        }
        return res.data;
    }catch(err){
        handleAxiosError(err,'/posts');
    }
}

async function fetchUsers(){
    try{
        const res=await api.get('/users');
        if(!Array.isArray(res.data)){
            throw new Error('Invalid response: users is not an array');
        }
        return res.data;
    }catch(err){
        handleAxiosError(err,'/users');
    }
}

function handleAxiosError(err,endpoint){
    if(err.code==='ECONNABORTED'){
        throw new Error(`Request to ${endpoint} timed out`);
    }
    if(err.response){
        throw new Error(`API error on ${endpoint}: status ${err.response.status}`);
    }
    if(err.request){
        throw new Error(`Network error while calling ${endpoint}`);
    }
    throw new Error(`Unexpected error on ${endpoint}: ${err.message}`);
}

module.exports={fetchPosts,fetchUsers};
