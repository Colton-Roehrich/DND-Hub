# DND Hub

DND hub is a collection of tools that gives you everything you need to run your RPG.

## Tools Included

This app includes a timer for combat and a dice roller so far, with more to come.

## Setting up the project

### Connecting to your database
first, you will need to get an instance of postgresql running on localhost. the settings to connect to this server can be found in '/server/modules/pool.js'. Next, you'll need to connect to your database. The database name can be whatever you'd like, but if it isn't 'DND_HUB' you'll need to also change the database name in the same pool.js file.

### Setting up your tables
copy and paste the statements from setup.sql and run them to create all the tables you'll need for your database.

### `npm start`
this should start the client-side app, but it won't be able to find any data from the database. The dice roller tool should still work without the server running.

### `npm run server`
this should start up the connection to the database. All tools should work when the server and client are both running
