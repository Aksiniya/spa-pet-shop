# SPA: Pet's shop
## Task
Create SPA with three different data presentation options.

## Solution
##### Node.js + Express + MongoDB + React


### API

* GET /pets?limit&offset
* POST /pets 
    - name
    - age
    - gender
    - species
* GET /pets/:id
* PUT /pets/:id
* DELETE /pets/:id

## How to use

### Required

1. mongoDB
2. node
3. nmp

### Install

1. Clone this repository.
2. Select repository: `cd repo`.
3. Install dependencies:
    ```shell script
    npm i
    ```
4. You'll need MongoDB running for work. Start mongoDB in mongo shell and create DB `pets`.
    ```shell script
    $ mongo
    > use pets
    ```
5. Start server:
```shell script
node app/src/server.js
```