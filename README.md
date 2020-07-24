# Flight

Flight is an air travel application that shows available flights from airline companies, with their flight number, country, destination and date of departure.
This means if in use a client can get details about available flights, their destinations, and the time left for departure as a countdown. 
This application is set such that admins that control it are able to login add and/or delete flights.

This is a full stack application, which makes use of ReactJS on the frontend, NodeJS in the form of ExpressJS, and a Mongo database on Mlab,
all this hosted on Heroku.

The choice of stack to use for this was based on speed, maintainability and mastery. 
With ReactJS being very fast due to the way it was created(usage of virtual dom to only update changed parts of an application), 
with NodeJS itself also being fast as a result of it single asynchronous thread which handles all request, and lastly 
MongoDB also being very fast and capable of handling large unstructured data.
From a maintainance and future assurance point of view, ReactJS was developped and is maintained by Facebook, which indicates one can be sure it will be around 
for a long time and support and improvement of it will be available, while NodeJS and MongoDB also already very popular technologies, that reassures me my 
application will be up without problems for long to come, since this two are also well maintained.
Lastly my choice of stack also also influenced by my mastery of this technologies and ability to come up with the application fast using these.

In terms of tradeoffs, or things left out, I would say not using Typescript for type safety is the first, and also not using a state management library like
Redux in case more functionality needs to be added, which will make moving data between components difficult. With more time, it will be possible to add TypeScript 
for type safety, as well as Redux if it required more functionalities.

In terms of links to other projects I am happy about, a credit union application to ease application for loans at credit unions, here is the front end github 
repository https://github.com/shinyuy/loan-application-app, and the backend https://github.com/shinyuy/loan-application-app-server and a new project I am working on 
for finding local hotels, restaurant and snacks, which has a web and mobile app parts to it, and also uses TypeScript, PostgreSQL alongside ReactJS, NodeJS and ExpressJS.
https://github.com/shinyuy/snack

My public profiles are my LinkedIn https://www.linkedin.com/in/shinyuy-marcel-fonyuy-710a38169/ and my old portfolio site at https://shinyuy.github.io/

The link to the hosted version of this application is https://nameless-waters-69285.herokuapp.com/ on Heroku, and here you have access to flights and the flight details
page of each flight which takes a dynamic Id to find the flight, and also can login to add and/ or delete flights, with a working email=jon@mail.com and password=marcel
