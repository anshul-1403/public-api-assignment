#!/usr/bin/env node
const yargs=require('yargs');
const {hideBin}=require('yargs/helpers');
const {fetchPosts,fetchUsers}=require('./apiClient');
const {readCache,writeCache}=require('./cache');

async function loadData(useCache){
    if(useCache){
        const cached=readCache();
        if(cached){
            console.log('Using cached data (cache.json)');
            return cached;
        }else{
            console.log('Cache not available, fetching from API...');
        }
    }

    const [posts,users]=await Promise.all([fetchPosts(),fetchUsers()]);
    validatePosts(posts);
    validateUsers(users);
    writeCache({posts,users});
    return {posts,users};
}

function validatePosts(posts){
    posts.forEach(p=>{
        if(typeof p.id!=='number' || typeof p.userId!=='number'){
            console.warn('Post with malformed fields:',p);
        }
    });
}

function validateUsers(users){
    users.forEach(u=>{
        if(typeof u.id!=='number' || !u.name){
            console.warn('User with missing fields:',u);
        }
    });
}

function listPosts({posts,users,filterUserId,search,limit}){
    let data=[...posts];

    if(filterUserId!==undefined){
        data=data.filter(p=>p.userId===filterUserId);
    }
    if(search){
        const term=search.toLowerCase();
        data=data.filter(p=>p.title.toLowerCase().includes(term) || p.body.toLowerCase().includes(term));
    }
    if(limit!==undefined){
        data=data.slice(0,limit);
    }

    if(data.length===0){
        console.log('No posts found.');
        return;
    }

    console.log(`Showing ${data.length} post(s):`);
    data.forEach(p=>{
        const user=users.find(u=>u.id===p.userId);
        const author=user?user.name:'Unknown';
        console.log('--------------------------------');
        console.log(`ID: ${p.id}`);
        console.log(`Title: ${p.title}`);
        console.log(`Author: ${author}`);
    });
}

function showPostDetail({posts,users,id}){
    const post=posts.find(p=>p.id===id);
    if(!post){
        console.log(`No post found with id ${id}`);
        return;
    }
    const user=users.find(u=>u.id===post.userId);
    console.log('========== POST DETAILS ==========');
    console.log(`ID: ${post.id}`);
    console.log(`Title: ${post.title}`);
    console.log(`Body:\n${post.body}`);
    console.log('------------- AUTHOR -------------');
    console.log(user ? user.name : 'Unknown');
    console.log('==================================');
}

async function main(){
    const argv=yargs(hideBin(process.argv))
        .command('list','List posts',y=>{
            return y
                .option('userId',{alias:'u',type:'number'})
                .option('search',{alias:'s',type:'string'})
                .option('limit',{alias:'l',type:'number'})
                .option('use-cache',{type:'boolean',default:true});
        })
        .command('get','Get post by ID',y=>{
            return y
                .option('id',{alias:'i',type:'number',demandOption:true})
                .option('use-cache',{type:'boolean',default:true});
        })
        .demandCommand(1)
        .help()
        .argv;

    const command=argv._[0];

    try{
        const data=await loadData(argv.useCache);
        if(command==='list'){
            listPosts({
                posts:data.posts,
                users:data.users,
                filterUserId:argv.userId,
                search:argv.search,
                limit:argv.limit
            });
        }else if(command==='get'){
            showPostDetail({
                posts:data.posts,
                users:data.users,
                id:argv.id
            });
        }
    }catch(err){
        console.error('Error:',err.message);
    }
}

main();
