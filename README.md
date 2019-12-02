# SPA: Pet shop
## Task
Create SPA with three different data presentation options.

## Solution
##### Node.js + Express + MongoDB + React

### Required

1. mongoDB
2. node
3. npm

### Install

1. Clone this repository.
2. Select repository: `$ cd repo`.
3. Install dependencies:
    ```
    $ npm i
    ```
4. You'll need MongoDB running for work. Start mongoDB in mongo shell and create DB `pets`.
    ```
    $ mongo
    > use pets
    ```
    
5. Import test database in a new tab:
    ```
    $ mongorestore -d pets app/test/mongoDbTestData
    ```
6. Start server:
    ```
    $ npm run start
    ```
    or: 
    ```
    $ node app/server/server.js
    ```
    
7. Go to `localhost:8080/`

## Project structure

```
.
├── README.md
├── app
│   ├── client
│   │   ├── components
│   │   │   ├── app.jsx
│   │   │   ├── app.less
│   │   │   ├── app_styles
│   │   │   ├── creationPanel
│   │   │   ├── home
│   │   │   ├── navigation
│   │   │   └── pets
│   │   ├── flux_architecture
│   │   │   ├── actions
│   │   │   ├── api
│   │   │   ├── constants
│   │   │   ├── dispatcher
│   │   │   └── stores
│   │   └── main.js
│   ├── public
│   │   ├── build
│   │   │   └── bundle.js
│   │   ├── images
│   │   │   ├── petsImages
│   │   │   └── petsTypesIcons
│   │   ├── index.html
│   │   └── style.css
│   ├── server
│   │   ├── config.json
│   │   ├── models
│   │   │   ├── pet.js
│   │   │   └── petType.js
│   │   ├── routes
│   │   │   ├── api
│   │   │   │   ├── api_pets_routes.js
│   │   │   │   ├── api_pets_types_routes.js
│   │   │   │   └── multer_assistant.js
│   │   │   ├── router_assistant.js
│   │   │   └── routes_entry.js
│   │   └── server.js
│   └── test
│       └── mongoDbTestData
│           ├── Pets.bson
│           └── PetsTypes.bson
├── package-lock.json
├── package.json
└── webpack.config.js
```

### API

There are two instances in database:

| Pet       | PetType   |
|---        | ---       |
| name      | type      |
| age       | count     |
| gender    | iconURL   |
| species   |
| type      | 
| petId     |
| imageURL  |
#### api:

*Pets:*

* GET /api/pets?limit&offset
* POST /api/pets
    - <- name
    - <- age
    - <- gender
    - <- species
    - <- type
    - <- petImage (file, not require)
* GET /api/pets/:id
    - -> name
    - -> age
    - -> gender
    - -> species
    - -> type
    - -> id
    - -> imageURL
* DELETE /api/pets/:id

*Pets Types*

* POST /api/petsTypes
    - <- type
* GET /api/petsTypes
    - -> type
    - -> count
    - -> iconURL
* GET /api/petsTypes/:petType
    - -> type
    - -> count
    - -> iconURL
* DELETE /api/petsTypes?petType=type
