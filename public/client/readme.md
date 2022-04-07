
[![Author](https://img.shields.io/badge/author-9r3i-lightgrey.svg)](https://github.com/9r3i)
[![License](https://img.shields.io/github/license/9r3i/express-mysql-sequelize.svg)](https://github.com/9r3i/express-mysql-sequelize/blob/master/license.txt)
[![Forks](https://img.shields.io/github/forks/9r3i/express-mysql-sequelize.svg)](https://github.com/9r3i/express-mysql-sequelize/network)
[![Stars](https://img.shields.io/github/stars/9r3i/express-mysql-sequelize.svg)](https://github.com/9r3i/express-mysql-sequelize/stargazers)
[![Issues](https://img.shields.io/github/issues/9r3i/express-mysql-sequelize.svg)](https://github.com/9r3i/express-mysql-sequelize/issues)
[![Release](https://img.shields.io/github/release/9r3i/express-mysql-sequelize.svg)](https://github.com/9r3i/express-mysql-sequelize/releases)
[![Package](https://img.shields.io/npm/v/express-mysql-sequelize.svg?label=npm)](https://www.npmjs.com/package/express-mysql-sequelize)


# express-mysql-sequelize

A Node.js API using ExpressJS, MySQL and Sequelize.


# Requirements

- Node.js, with npm
- ExpressJS
- MySQL
- Sequelize


# Installation

Configure database name, username and password in ```app/config/db.config.js```

```
$ git clone https://github.com/9r3i/express-mysql-sequelize.git
$ cd express-mysql-sequelize
$ npm install
$ npm start
```
Server will run on port 3000, or configure server port in ```server.js```

Access the server in ```http://localhost:3000```, and the API will use route path ```/api/winners```

So, base API URL is ```http://localhost:3000/api/winners```


# Preparation

Testing preparation for client, using curl cli or using javascript fetch.
First, install curl for cli in terminal (debian/ubuntu/mint):
```
$ sudo apt install curl
```

And for javascript, we will prepare a fetching function with profer headers.
```js
/* fetch data */
async function fetchData(url = '', data={}, method='GET'){
  const baseURL = 'http://localhost:3000/api/winners';
  /* default options are marked with */
  const response = await fetch(url, {
    /* GET, POST, PUT, DELETE */
    method: method,
    /* no-cors, *cors, same-origin */
    mode: 'cors',
    /* *default, no-cache, reload, force-cache, only-if-cached */
    cache: 'no-cache',
    /* include, *same-origin, omit */
    credentials: 'same-origin',
    /* headers, we will use json */
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    /* manual, *follow, error */
    redirect: 'follow',
    /* no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url */
    referrerPolicy: 'no-referrer',
    /* stringify data (for Content-Type: application/json only) */
    body: JSON.stringify(data)
  });
  /* return the parsed json (object) */
  return response.json();
}
```

Or use the cloned application in the same host for testing only, access ```http://localhost:3000/client/index.html```

Also using Postman is a lot easier to see the response, and I recommend this app to do some API tests.


# Read a single data by an id

- request path: ```/:id```
- request method: ```GET```
- request data: NO

Use path ```/:id```, where id is an integer of primary key.
With request method ```GET```.

Example fetch of row id 39:
```
$ curl -X GET -d 'http://localhost:3000/api/winners/39'
```
or using javascript fetch
```js
const response = await fetchData('/39');
```


# Read multiple data

- request path: ```/all```
- request method: ```GET```
- request data: NO


...


# Read multiple data [POST]

- request path: ```/all```
- request method: ```POST```
- request data: YES

Notice: This ```POST``` fetch only to serve the client test app.

Use path ```/all``` with method ```POST``` and some data request variable:
- startRow, integer of start of row number to be red
- endRow, integer of last row number to be red
- filterModel, object of filter model for specific porpose
- sortModel, array of sorting and ordering by column name

Example fetch multiple data with pagination, 
- start with row 100
- end with row 200
```
$ curl -X POST -d \
    '{"startRow":100,"endRow":200,"filterModel":{},"sortModel":[]}' \
    'http://localhost:3000/api/winners/all'
```
or using javascript fetch
```js
const response = await fetchData('/all',{
  startRow:100,
  endRow:200,
  filterModel:{},
  sortModel:[]
},'POST');
```

We'll add sortModel arguments, it will be like:
- sort, string of sort method between ASC and DESC
- colId, string of column name, like: id

Example:
```
$ curl -X POST -d \
    '{"startRow":100,"endRow":200,"filterModel":{},"sortModel":[
      {
        "sort": "DESC",
        "colId": "id"
      }
    ]}' \
    'http://localhost:3000/api/winners/all'
```
or using javascript fetch
```js
const response = await fetchData('/all',{
  startRow:100,
  endRow:200,
  filterModel:{},
  sortModel:[
    {
      sort: "DESC",
      colId: "id"
    }
  ]
},'POST');
```


... sortModel (upside ...)
... filterModel


# Create/Insert data

- request path: ```/```
- request method: ```POST```
- request data: YES

Create or Insert data use path ```/``` with method ```POST``` and also with request data.

Example:
```
$ curl -X POST -d \
    '{"athlete":"Ronaldo Esteban","age":30,"year":2013,"date":"2013-08-06"}' \
    'http://localhost:3000/api/winners/'
```
or using javascript fetch
```js
const response = await fetchData('/',{
  athlete:"Ronaldo Esteban",
  age:30,
  year:2013,
  date:'2013-08-06'
},'POST');
```


# Update a single data

- request path: ```/:id```
- request method: ```PUT```
- request data: YES

Update request is using path ```/:id``` with ```PUT``` method, and also with request data.

...


# Delete a single data

- request path: ```/:id```
- request method: ```DELETE```
- request data: NO

...


# Delete all data

- request path: ```/```
- request method: ```DELETE```
- request data: NO

...





