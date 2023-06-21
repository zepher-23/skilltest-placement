This webapp is built for the placement department to log and download details of students, interviews and the corresponding results.

It comprises for the following pages
- Signup / Signin
- Dashboard
- Student list
- Interview list
- Results page
- Jobs

This webapp provides the following functionalities
- Create new employee
- Login for existing employees
- Create new student
- View list of students
- Create interviews
- View list of interviews
- Update result of the interview
- View results of all interviews
- View available jobs in React/ NodeJS (India)

This webapp collects the following data
1. Employees
    - Employee ID
    - Password

2. Students
    - Student ID
    - Student Name
    - Student College
    - Batch Number
    - Placement Status [Placed, Not Placed]
    - DSA Final Score
    - WebD Final Score
    - React Final Score

3. Interview
    - Company Name
    - Interview Date
    - Interview Student Name
    - Result Status [Pass, Fail, On Hold, Did not Attempt, No result]

The database is designed using MongoDB and uses mongoose library to access and manipulate database. Following four models are designed,
- Employee
- Interview
- Result
- Student

Front end is designed using a templating engine EJS.
The entry point file for the server is 'server.js'.

The folder structure of the project is as follows
- Views(To view html pages)
- Routes (To handle routing for specific endpoint)
- public (Contains static files)
- Models (Contains database schema)
- Controllers (Contains functions for logical operations and handling requests)

---------------------------------------------------------------------------------------------
INSTRUCTION TO INSTALL AND RUN THE WEB APP.
---------------------------------------------------------------------------------------------

- Extract the files from the .zip file
- Open the folder in vscode
- run `npm install` (Installs all necessary packages & libraries mentioned in `package.json`)

The server is started using `nodemon` library to restart server when changes are made.
The static files are monitored by `browser-sync` tool to reflect changes in EJS files and other static files, configuration can be modified in the `bs-config.js` file. The server starts in port 3000 and gets proxied to port 4000 by `browser-sync`.
`nodemon` and `browser-sync` is started simultaneously using `concurrently` library.

NOTE: Incase the page gets stuck in loading, reload the page.

Employee password is hashed and stored in the database using `bcrypt`.
Session is managed by `express-session`.

Navigating the web app

1. Index page
    - create employee by providing the employee id and password in the sign up form
    - on successful creation, enter the credentials in the sign in form

2. Dashboard
    - click on student list option 
    - add student details in the form and submit 
    - on successful submission the student details should get updated on the left container element ( add few more students optionally)

    - click on the dashboard link on the top right corner of the page (navigates back to dashboard)
    - click on interview list 
    - add new interview in the form and submit
    - the interview details gets reflected in the list on the left container element
    - on creating the interview, by default the result status of the interview is 'no result'
    - option to update the result status is available in the interview list
    
    - navigate back to dashboard
    - select the result option to view all interview results

    - click on the download option to download csv file of interview details of all students

    - additionally jobs option views all the available jobs in React/Nodejs in india (using open api '`adzuna`')




