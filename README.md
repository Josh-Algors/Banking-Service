
## Film API
This is a Node.js REST API that provides endpoints to manage a film database. The API leverages the repository pattern to interact with a MySQL database.

### Repository Pattern
The repository pattern is widely used design pattern that separates the data access layer from the business logic layer. The pattern provides a layer of abstraction between the application and the database, which can make the code more maintainable and testable.

In this API, the repository layer consists of classes that implement CRUD (Create, Read, Update) operations for each entity. The classes provide a set of methods that can be used to perform operations on the database, such as getAllFilms(), getFilmById(), createComment(), getAllComments().

The repository layer also includes a db.js file, which sets up a connection pool to the MySQL database.

The business logic layer consists of the service layer, which contains classes that implement the business logic for the application. The service classes use the repository classes to interact with the database, and provide methods that are used by the controller layer to respond to HTTP requests.

The controller layer is responsible for handling HTTP requests and responses. The controller classes use the service classes to perform operations on the database, and use the express framework to handle HTTP requests and responses.

#### Running the API
To run the API, follow these steps:

Clone the repository to your local machine.
Install the dependencies by running `npm install` in the project directory.
Create a .env file in the project directory and set the following environment variables:

```
PORT=<port-number>
```
```
DB_HOST=<database-host>
```
```
DB_PORT=<database-port>
```
```
DB_USER=<database-username>
```
```
DB_PASSWORD=<database-password>
```
```
DB_NAME=<database-name>
```

Then run `npm run migrate` to run migrations

Start the server by running npm start.
Send HTTP requests to the API endpoints using Postman.

#### API Endpoints

