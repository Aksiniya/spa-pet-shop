# SPA: Pet shop
## Task
Create SPA with three different data presentation options.

## Solution
##### Node.js + Express + MongoDB + React


### API

There are two instances in database:

| Pet       | PetType   |
|---        | ---       |
| name      | type      |
| age       | count     |
| gender    |
| species   |
| type      | 

#### api:

*Pets:*

* GET /api/pets?limit&offset
* POST /api/pets
    - <- name
    - <- age
    - <- gender
    - <- species
    - <- type
* GET /api/pets/:id
    - -> name
    - -> age
    - -> gender
    - -> species
    - -> type
    - -> id
* DELETE /api/pets/:id

*Pets Types*

* POST /api/petsTypes
    - <- type
* GET /api/petsTypes
    - -> type
    - -> count
* DELETE /api/petsTypes?petType=type
#### user:

* GET /pets

## How to use

## Project structure

```
.
├── README.md
├── app
│   ├── client                                      # -> Client-side code
│   │   ├── components                              # 
│   │   └── main.js                                 # Entry for webpack (for modules)
│   ├── public                                      # Static public assets and uploads
│   │   ├── build                                   # Distribution folder (/dist by default in webpack)
│   │   │   └── bundle.js                           # Output for webpack
│   │   ├── images                                  #
│   │   ├── index.html                              #
│   │   └── style.css                               #
│   └── src                                         # -> Server-side code
│       ├── config.json                             # Project configurations
│       ├── models                                  # Database models 
│       │   ├── pet.js                              #
│       │   └── petType.js                          #
│       ├── routes                                  # REST API
│       │   ├── api                                 # API for getting data from database
│       │   │   ├── api_pets_routes.js              #
│       │   │   └── api_pets_types_routes.js        #
│       │   ├── pet_routes.js                       # Client routes
│       │   ├── router_assistant.js                 # Error, OK and etc messages to client
│       │   └── routes_entry.js                     # Entry point for routes
│       └── server.js                               # Server application start point
├── package-lock.json
├── package.json
└── webpack.config.js
```



### Required

1. mongoDB
2. node
3. nmp

### Install

1. Clone this repository.
2. Select repository: `$ cd repo`.
3. Install dependencies:
    ```shell script
    $ npm i
    ```
4. You'll need MongoDB running for work. Start mongoDB in mongo shell and create DB `pets`.
    ```shell script
    $ mongo
    > use pets
    ```
5. Start server:
    ```shell script
    $ node app/src/server.js
    ```
    
    or: 
    ```shell script
    $ npm run start
    ```
6. Go to `localhost:8000/`