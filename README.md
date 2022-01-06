# Book Library API

## Backend Module for Manchester Codes

Creating a Book Library API which works in conjunction with MySQL to form a relational database. Making use of RESTful standards to allow CRUD (Create, Read, Update and Delete) operations.

API built using Node.js and Express to integrate MySQL functionality. Test Driven Development using Mocha testing framework.

HTTP Routing functions perform validation to make sure user entry is in line with database formatting - e.g. valid email address in input. Routes are entered as below but make use of a 'Helper' file to perform spectific HTTP requests (POST, GET, PATCH, DELETE).

## HTTP Routes

### Reader

- Create Reader - POST to '/reader'
- Read all Reader - GET from '/reader'
- Read one Reader ID - GET from '/reader/:id'
- Update Reader - PATCH '/reader/:id'
- Delete Reader - DELETE '/reader/:id'

### Book

- Create Book - POST to '/book'
- Read all Book - GET from '/book'
- Read one Book ID - GET from '/book/:id'
- Update Book - PATCH '/book/:id'
- Delete Book - DELETE '/book/:id'

### Genre

- Create Genre - POST to '/genre'
- Read all Genre - GET from '/genre'
- Read one Genre ID - GET from '/genre/:id'
- Update Genre - PATCH '/genre/:id'
- Delete Genre - DELETE '/genre/:id'

### Author

- Create Author - POST to '/author'
- Read all Author - GET from '/author'
- Read one Author ID - GET from '/author/:id'
- Update Author - PATCH '/author/:id'
- Delete Author - DELETE '/author/:id'

## Instructions

- Pull and run a new MySQL Docker image `docker run -d -p 3307:3306 --name book_library_mysql -e MYSQL_ROOT_PASSWORD=password mysql` - make sure to chance `MYSQL_ROOT_PASSWORD` to something more appropriate. This will be used in `.env` file.
- Connect your MYSQL image to MYSQL Workbench application.
- Clone this repo and chance into the directory
- Run `npm install`
- Create a `.env` file and add local variables: `DB_PASSWORD`, `DB_NAME`, `DB_USER`, `DB_HOST`, `DB_PORT`, `PORT`
- Run `npm start` to start the project

### Testing

For testing, create a `.env.test` file with same local variables - just make sure to change `DB_NAME` (e.g. `mysql_book_library_test`)
