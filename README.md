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
 - [simple-actors](https://www.npmjs.com/package/simple-actors)
 - [Bootstrap] (http://getbootstrap.com/)
 - [Express](http://expressjs.com/)
 - [Socket.io](http://socket.io/)
 - [jQuery] (https://jquery.com/)
 - [SweetAlert](http://t4t5.github.io/sweetalert/)


##Setup
In the top directory of the project, run

```
npm install
```

And npm will install all the dependencies required by the app.

Add your OpenTok Credentials in `config.js`

```
// OpenTok Credentials
config.opentok.key = process.env.TB_KEY || '<your_apiKey>';
config.opentok.secret=  process.env.TB_SECRET || '<your_secret>';
```


To start the Server, run in a separate window (by default it will run on `http://localhost:3000/`)

```
npm start
```

To start server for development and watch for changes using [nodemon](https://github.com/remy/nodemon):

```
npm run devServer
```

During development you can use gulp to watch for changes in your client side `*.js` files, and it will minify all `*.js` files to `public/dis/js`, just run:

```
gulp
```
