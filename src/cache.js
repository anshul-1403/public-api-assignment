const fs=require('fs');
const path=require('path');

const CACHE_PATH=path.resolve(__dirname,'..','cache.json');

function readCache(){
    try{
        if(!fs.existsSync(CACHE_PATH)) return null;
        const raw=fs.readFileSync(CACHE_PATH,'utf8');
        const parsed=JSON.parse(raw);
        if(!parsed.posts || !parsed.users){
            console.warn('Cache file is missing required fields, ignoring it.');
            return null;
        }
        return parsed;
    }catch(err){
        console.warn('Failed to read cache:',err.message);
        return null;
    }
}

function writeCache(data){
    try{
        const payload={
            timestamp:new Date().toISOString(),
            posts:data.posts,
            users:data.users
        };
        fs.writeFileSync(CACHE_PATH,JSON.stringify(payload,null,2),'utf8');
    }catch(err){
        console.warn('Failed to write cache:',err.message);
    }
}

module.exports={readCache,writeCache};
