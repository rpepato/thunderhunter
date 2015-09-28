thunderhunter
=============

ThunderHunter is an application that monitors and reports the location of thunderstorms around the world using real time data. You can see it working right now by firing up a web socket enabled browser and point it up to [http://thunderhunter.herokuapp.com](http://thunderhunter.herokuapp.com).

### How Does it Work?

The ThunderHunter app uses real-time data provided by [STARNET](http://www.zeus.iag.usp.br). The STARNET (Spherics Timing and Ranging NETwork) service provides information about the detection of long range atmospheric electrical discharges. The original idea behind STARNET was conceived by Resolution Display Inc. (RDI) under a NASA Small Business Inovative Research grant. 

You can find more information about STARNET on [http://www.zeus.iag.usp.br](http://www.zeus.iag.usp.br).

The ThunderHunter app is a node.js application that periodically queries the data provided by STARNET, parses it, saves it to a mongodb instance, and add it to a map providing a visual tool to thunderstorms monitoring.

### Dependencies

The following dependencies are required for the application to work:

Server Dependenecies:

* [express](https://www.npmjs.org/package/express)
* [request](https://www.npmjs.org/package/request)
* [moment](https://www.npmjs.org/package/moment)
* [zlib](https://www.npmjs.org/package/zlib)
* [geojson](https://www.npmjs.org/package/geojson)
* [async](https://www.npmjs.org/package/async)
* [socket.io](https://www.npmjs.org/package/socket.io)
* [bower](https://www.npmjs.org/package/bower)
* [mongodb](https://www.npmjs.org/package/mongodb)

Client (browser) Dependencies:

* [leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
* [jquery](https://github.com/jquery/jquery)
* [momentjs](https://github.com/moment/momentjs.com)

### How to Run it on Your Environment

This is a [node.js](http://nodejs.org) application and you'll need a node.js runtime on your environment to run it.

1. Clone the repo
2. Run ```npm install```
3. Run ```bower install``
4. Configure the following environment variables:
  1. USER_ID - The user id for the STARNET service (you can get one on the STARNET page)
  2. USER_PWD - The password for the STARNET service
  3. MONGO_HOST - The url for your mongo instance (this is proably something like: ```/mongodb://localhost:27017/yourdb```)
5. Start your mongodb instance
6. Run ```npm start```
7. Open up your browser and point it to ```http://localhost:3000```

### Motivation

Why build this project, at first?

There are plenty of reasons to do it:

1. Because to code something is just pure fun :);
2. Because I'd like to learn a little bit more about node.js and [leaftlet](http://leafletjs.com), the open source library for web maps;
3. Because concentrating this information on a database overtime can provide data for future research related to hydric resources, predictions, aviation security and other ideas. 
