# Public API Assignment

## Overview

This is a small Node.js project where I am getting data from a public REST API and showing it on the command line.  
I used the JSONPlaceholder API because it is free and does not need any login.  
The API gives dummy posts and users. I used both so I can show which user wrote which post.

The project mainly does these things:

- Fetch data from 2 endpoints  
- Show the posts in a simple list  
- Show a full detail view for one post  
- Allow some filters  
- Save the API data in a cache file  
- Handle errors like no internet, wrong data, etc.

I tried to keep everything simple so that anyone can understand it easily.


## Setup Instructions

1. Installed Node.js on my system.
2. Download or clone this project folder.
3. Open the folder in terminal and run:  npm install
4. Now I can use the app with the commands shown below.


## How to Run the Program

### List all posts
 node src/index.js list

### Filter posts by user
node src/index.js list --userId=1


### Search posts by text
node src/index.js list --search=qui

### Limit number of posts shown
node src/index.js list --limit=5


### Get full details of one post
node src/index.js get --id=10

### Ignore cache and fetch fresh API data
node src/index.js list --use-cache=false


## Endpoints Used

I used two endpoints from the JSONPlaceholder API:

- /posts = gives all posts  
- /users = gives user information

I combined posts and users so I can show the author name for each post.


## Filters Implemented

The following filters work with the `list` command:

- --userId = show posts of a specific user  
- --search = search in post title or body  
- --limit = show only limited number of posts  

These filters make the output more readable.

## Caching

To avoid calling the API again and again, I save the data in a file named **cache.json**.

- If cache exists -> program uses cached data  
- If not -> it calls the API and then creates the cache  

This makes the tool faster.

## Error Handling

I added basic error handling so the program does not crash.  
It handles:

- Network errors  
- API timeout  
- Wrong or missing API fields  
- Invalid post ID from user  
- Corrupt cache file  

The program shows clear messages when something goes wrong.

## Assumptions / Notes

- JSONPlaceholder always returns the same dummy data  
- Posts are between ID 1 to 100  
- User IDs are between 1 to 10  
- Output is kept simple  
- This is only a CLI tool, not a website  

## How Requirements Were Met

| Assignment Requirement | Done | Notes |
|------------------------|------|-------|
| Use public REST API | ✔ | JSONPlaceholder API |
| Use at least 2 endpoints | ✔ | /posts and /users |
| Cache or store data | ✔ | Using cache.json |
| Clean output | ✔ | List + detail view |
| Filtering options | ✔ | userId, search, limit |
| Error handling | ✔ | timeout, network, invalid data |
| README | ✔ | Simple English explanation |

## Conclusion

This project helped me learn:

- How to call REST APIs  
- How to work with JSON data  
- How to create a CLI tool in Node.js  
- How to handle errors  
- How to write basic documentation  



