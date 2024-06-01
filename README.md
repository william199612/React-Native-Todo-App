# React Native Todo App

This project is Todo application with user signup and login. Logged in users can add task, view todos with selected date on calendar. Users can also change view mode(Light/Dark) with settings.

## Contributing

To contribute to the development of this application, follow these steps:

1. Clone the repo

    ```
    git clone https://github.com/william199612/todo-app.git
    ```

2. Create a new branch

    ```
    git checkout -b feature/my-feature
    ```

3. Make your changes

4. Commit your changes

    ```
    git commit -m "Add new feature"
    ```

5. Push to the branch

    ```
    git push -u origin feature/my-feature
    ```

6. Create a new Pull Request

> You will need to use your own databse credentials and run the `init.sql` script to access your own database with this project schema.

## Features

- Simple User Login/Sign Up (using bcrypt)
- Manage your Todo List (Create/Edit/Delete)
- View your Todos on the calendar
- Light & Dark Mode View

## Getting Started

### Dependencies

**App**

- `expo`: (~50.0.17) A framework and platform for universal React applications.
- `react`: (18.2.0) A JavaScript library for building user interfaces.
- `react-native`: (0.73.6) A framework for building native apps using React.
- `@react-native-community/datetimepicker`: (7.6.1) A DateTimePicker component for React Native
- `@react-navigation`: (6.x.x) A library for routing and navigation in React Native applications.

**Server**

- `bcrypt`: (^5.1.1) A library to help to hash passwords.
- `cookie-parser`: (~1.4.4) Middleware for parsing cookies in an HTTP request.
- `cors`: (^2.8.5) Middleware to enable Cross-Origin Resource Sharing (CORS). 
- `debug`: (~2.6.9) A small debugging utility for Node.js.
- `dotenv`: (^16.4.5) A module to load environment variables from a .env file into process.env.
- `express`: (~4.16.1) A minimal and flexible Node.js web application framework
- `http-errors`: (~1.6.3) A utility to create HTTP error objects for Express.
- `jade`: (~1.11.0) A high-performance template engine for Node.js.
- `knex`: (^3.1.0) A SQL query builder for Node.js
- `morgan`: (~1.9.1) A HTTP request logger middleware for Node.js.
- `mysql2`: (^3.9.7) A MySQL client for Node.js, providing an API for connecting to and interacting with MySQL databases.
- `swagger-ui-express`: (^5.0.0) Middleware to serve Swagger UI for API documentation.

### Installation

First, you need to install the dependencies, for

**Frontend**

```
cd ./app
npm install
```

**Backend**

```
cd ./server
npm install
```

### Execute Program

To run the program, run the frontend & backend separately: 

**Frontend**

```
npx expo start
```

> default port: `8081`, you can add `--port` to start your desired server

**Backend**

```
nodemon
```

> default port: `8080`

### API Documentation

After running the server, you can see the API docs on:

```
localhost:8080/docs
```

## Architecture

The application is built using `React` and `React Native` for the mobile application. `react-navigation` is used for client side routing. Backend utilizes `express` as the framework, and `MySQL` as the database.

- Frontend: React, React Native
- Backend: Express
- Database: MySQL
- Encryption: bcrypt
- API Documentation: Swagger

The main components of the architecture include:

- Welcome Screen: Landing screen, displaying options for Login and Signup.
- Login Screen: User login with email and password.
- Signup Screen: user password is encrypted with `bcrypt` and stored in the database.
- Tabbar Screen: Bottom navigation bar for switching screens.
- Todo Screen: Displays today's todo list with a add todo button.
- Calendar Screen: A calendar to display the todos on a selected date, and a add todo button.
- About Screen: Information about this application. (Including features, architecture, and lisence list)
- Settings Screen: Includes switch between light and dark mode viewing, and logout button.

## Issue Reporting
If you encounter any issues or bugs while using the application, please report them [here](https://github.com/william199612/todo-app/issues) by following these steps:

1. Click on the "Issues" tab in the repository
2. Click on the "New Issue" button
3. Provide a clear and detailed description of the issue, including steps to reproduce it
4. Add any relevant screenshots or error messages
5. Click "Submit new issue"

## License

This project is licensed under the MIT License - see the LICENSE.txt file for details.
