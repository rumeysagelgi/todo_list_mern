# TO-DO LIST APP


## Demonstration Video:
https://youtu.be/OnLb9rm-siE


## Description:
To-Do List is a web application designed to help you keep your daily tasks organized. It allows you to add, update, delete and display tasks with ease, ensuring you stay on top of your daily responsibilities. Tasks can be displayed in multiple categories, providing a clear view of your progress. This project highlights a comprehensive set of full-stack development skills and is built with the MERN stack.


## Features:
- User authentication
- Database management
- CRUD operations
- Secure data handling
- Responsive design
- Single-page application


## Tech Stack:
Front-End:
- **React:** a JavaScript-based UI development library
- **Axios:** a promise-based HTTP library
- **Tailwind CSS:** a utility-first CSS framework with predefined classes

Back-End:
- **Node.js:** a cross-platform JavaScript runtime environment
- **Express.js:** a back-end framework that works on top of Node.js web server functionality
- **JSON Web Tokens (JWT):** an open standard for securely sharing JSON data between parties

Database:
- **MongoDB:** a document-oriented NoSQL database
- **Mongoose:** a Node.js-based Object Data Modeling (ODM) library for MongoDB


## How to Run:
Download or clone the project. Navigate to the root directory on your terminal.

### Server
Go to `server` directory and install dependencies with `npm install`.

Create `.env` file and paste the following:
```
MONGO_URI=YOUR-MONGODB-URI
PORT=8000
JWT_SECRET=RANDOM-SECRET-KEY
```

Replace the values with your own environment variables.

Install Nodemon with `npm install -g --force nodemon`.

Start the server with `nodemon server`.

### Client
Go to `client` directory and install dependencies with `npm install`.

Run the app with `npm start`.


## Files:
### > <ins>*client*</ins> folder

<ins>***public***</ins>

- ***index.html*** : Stores HTML template, with meta tags and links to external resources.


<ins>***src***</ins>

- <ins>***components***</ins> : Stores reusable React components.

   - <ins>***TaskCategories***</ins> ***/ AllTasks.jsx*** : Displays a list of all tasks, without considering if it's still processing or done.

   - <ins>***TaskCategories***</ins> ***/ Done.jsx*** : Displays a list of tasks that have been marked as completed.

   - <ins>***TaskCategories***</ins> ***/ Processing.jsx*** : Displays a list of tasks that are still in progress (not completed).

   - ***Footer.jsx*** :  Represents the footer section of the app, with copyright notice and developer credit.

   - ***Header.jsx*** : Represents the header section of the app. It includes a navigation bar with links to different routes.

   - ***Layout.jsx*** : Serves as the layout structure for the app, arranging various components within a flexible grid layout.

   - ***Login.jsx*** : Represents the login page of the app. It allows users to input their e-mail and password to authenticate.

   - ***Register.jsx*** : Represents the registration page of the app. It allows users to input their name, e-mail and password to create a new account.

   - ***SaveTask.jsx*** : Serves as a dynamic form for adding new tasks and updating existing ones.

   - ***Task.jsx*** : Renders individual tasks for All Tasks and Processing categories.

   - ***TaskDone.jsx*** : Renders individual (completed) tasks for Done category.

   - ***TaskSorter.jsx*** : Provides navigation links for sorting tasks based on categories.


- <ins>***context***</ins> : Defines a `TaskContext` and a `TokenContext` using React’s `createContext` function.

   - ***TaskContext.js***

   - ***TokenContext.js***


- <ins>***reducer***</ins>

   - ***taskReducer.js*** : Handles state changes for tasks based on different actions dispatched from components.

   - ***tokenReducer.js*** : Manages state changes for the user token based on different actions dispatched from components.

   - ***userReducer.js*** : Manages state changes related to user data based on dispatched actions.


- <ins>***styles***</ins> : Contains styling files for UI customization.

   - ***app.css*** : For the scrollbar as well as some specific elements.

   - ***header-footer.css*** : For both `header` and `footer` sections.

   - ***index.css*** : Background and font setup for the `body` element. Also includes Tailwind CSS directives.

   - ***task.css*** : For individual tasks.


- <ins>***axios***</ins> ***/ axios.js*** : Creates a custom instance of Axios with a pre-configured base URL.

- ***app.js*** : Main component of the app. Responsible for initializing the app state, fetching user and task data, and setting up routing.

- ***index.js*** : Entry point for the app, setting up the root.


***tailwind.config.css*** : Stores Tailwind CSS configurations.



### > <ins>*server*</ins> folder

<ins>***controllers***</ins> : Stores files that define the controller functions responsible for handling incoming requests and generating appropriate responses.

- ***taskController.js*** : Contains functions that provide the necessary back-end logic to perform CRUD operations on tasks.

- ***userController.js*** : Contains functions responsible for user authentication, registration and retrieval of user information.


<ins>***middleware***</ins>

- ***requireAuth.js*** : Ensures that routes or endpoints requiring authentication are only accessible to authenticated users.


<ins>***models***</ins>  : Stores files that define the data schema and interact with the database using an ODM.

- ***taskModel.js***  : Schema for `Task` in the database.

- ***userModel.js***  : Schema for `User` in the database.


<ins>***routes***</ins> : Stores files that define the routes and route handlers for the API endpoints.

- ***taskRoute.js*** : Defines routes for CRUD operations related to tasks.

- ***userRoute.js*** : Defines routes related to user authentication and user data retrieval.


***server.js*** : Entry point for the back-end server.
