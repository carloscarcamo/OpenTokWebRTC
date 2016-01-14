Opentok WebRTC Demo
===================

#Getting Started

##Dependencies
This project uses node.js for a server, and npm to manage dependencies. Install these on your machine to start:

 - [Node >= v0.10.x](http://nodejs.org/download/) (comes with npm)


##Technology Used for This Project
 - [Node](https://nodejs.org/en/)
 - [Gulp](http://gulpjs.com/)
 - [TokBox/OpenTok framework](https://tokbox.com/developer/)
 - [Reactive Extensions](https://github.com/Reactive-Extensions/RxJS)
 - [Bootstrap] (http://getbootstrap.com/)
 - [Express](http://expressjs.com/)
 - [jQuery] (https://jquery.com/)
 - [SweetAlert](http://t4t5.github.io/sweetalert/)


##Setup
In the top directory of the project, run

```
npm install
```

And npm will install all the dependencies required by the app.


To start the Server, run in a separate window (by default it will run on `http://localhost:3000/`)

```
npm start
```

To start server for development and watch for changes using [nodemon](https://github.com/remy/nodemon):

```
npm server-dev
```

During development you can use gulp to watch for changes in your client side ```*.js``` files, and it will minify all ```*.js``` files to ```public/dis/js```, just run:

```
gulp
```
