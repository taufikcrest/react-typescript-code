# React TypeScript #
This repository consists code base for react with typescript setup.

### Folder Structure ###
* `assets` - # It Contains images,stylesheets,font files which are used in application
* `components` - # It Contains component files which are used in application
* `services` - # All the backend api calls are placed here
* `types` - # It Contains interface of each table with datatype
* `utils` - # It Contains files with common functions,messages and other utility methods that are used in application
    * `constant.js` - It contains constants with key-value pair 
    * `fn.js` - It contains common functions
    * `messageConstant.js` - It contains messages
* `App.css` - # It contains global level css for app component
* `App.test.tsx` - # It contains all the test methods
* `App.tsx` - # File with nav bar and routes are placed here.It also handles permission of route
* `index.css` - # It contains css file with body and root level
* `index.tsx` - # Entry point of application which calls App component
* `route.tsx` - # All the routes are placed inside this file,For unauthorized route redirect happens
* `.env` - # It has all variables which are used in application(User can add data with taking reference of .env.example)

### How to set up? ###
* clone this repo (git clone "git_repo_url")
* create an .env file and add content based on sample .env.example
* run `npm install` to install the dependencies
* run `npm start` to start the development server
* run `npm test` to run the test.
* run `npm run build` to generate build folder
* For testing the apllication please run NODE JS Sample code 
Below credentials are used for the admin role
*  Email - admin@example.com, Password - password  