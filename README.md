# CodexDrake Search Engine
##### A simple, fast, secure, private and self-hosted free search engine written in JavaScript.

CodexDrake is an open source search engine that will allow you to browse the internet, find different categories of results such as links, pages, news, images, videos, books and shopping articles, this software is a real-case implementation of a library called like [CDrake-SE](https://github.com/codewithrodi/CDrake-SE/ "CDrake-SE"), the name of this engine means Greed of Results, Codex from Latin is greed and Drake interpreting it knowing that it is an equation that allows finding the number of civilizations in a certain galaxy, this software is safe and private, due because you can host it on your own servers or even have it on your own computer, it is extremely fast and light, totally built in JavaScript, you can have your own search engine without having to pay APIs, nobody will be able to know the things you are looking for on the internet, maybe pretty kittens or pepa pig porn, it's in your hands.
In the README of the library used for this engine, it is explained that the results obtained depending on the geographic zone in which the server is running will depend, assuming that the server is hosted in Japan, the results of that instance will be different from those of the server hosted in Chile, it is an imbalance, you may not even get results due to problems with scraping, it will be fixed in future versions, for now, this is fine.

### Features
- Highly secure
- Firewall for XSS attacks
- Helmet for secure HTTP Headers
- Cors integration
- Manager to facilitate tasks
- Responsive
- No fees or subscriptions
- Specific actions handled, lost connection or server crash...
- Small animations to soften the user's view
- Easy-to-use architectures
- Ridiculously fast
- Built without design libraries
- Dark mode and light mode

### Installation
The installation of this software is simple, it can take you less than 10 minutes to have your own search engine running on your computer, it's amazing, incredible, let's get to it, you just have to follow certain instructions, commands that you have to execute in your terminal, for Please follow the instructions step by step so that you do not have any problem installing this software.
```bash
# Cloning the repository
git clone https://github.com/codewithrodi/CodexDrake/
# Accessing the generated folder
cd CodexDrake
# Initializing the Server and Client Setup using the 'Setup.py' file which will be explained later
python3 Setup.py
# Now you must wait for 'Setup.py' to do its thing, try to accept everything it proposes.
```
### Applying the necessary configurations to the server
Inside the folder generated after cloning the repository, you have two folders, one called 'Server' and another 'Client', you must access the Server folder where you will find a file called 'Settings.env', which is the environment file that contains configuration that you must apply in case you want to deploy to production.
```bash
# The mode in which the server is running, you can select "development" or "production" depending on the circumstances.
NODE_ENV = production

# CORS origin configuration
CORS_ORIGIN = *

# Indicate the port on which your server will be running, by default 
# this port is assigned at 8000, if you remove it the server will start 
# running on port 5000, you choose the port by changing the value of "SERVER_PORT"
SERVER_PORT = 8000

# It indicates the address in which the server will run, by default it 
# is assigned in 0.0.0.0, making reference to where it will run on the server's 
# base network, it is recommended that you do not change this
SERVER_HOST = 0.0.0.0

# If you want the server using SSL, you must complete these two 
# fields, it will automatically start using SSL, the first variable 
# called "SSL_CERT" must contain the path of where your certificate
# is located, for example "MyCert.pem", while the other variable 
# called "SSL_KEY" must contain the path where your key is located, for 
# example "MyKey.pem", once this is done your server should start in 
# the port indicated with SSL.
SSL_CERT = 
SSL_KEY

# Here you indicate the maximum amount of weight that can be received 
# when data is sent to the server, it is advisable to have this low 
# to avoid lagging in the server.
BODY_MAX_SIZE = 10kb
```
Within the anatomy of the Server folder where you were editing 'Settings.env', you will also find a folder named 'Settings', which contains a file named 'ApiRoutes.json', which has all the routes that It has the API, in case you want to modify the routes you must edit that file, in this way we have everything more controlled when we want to modify things.
```json
{
    "Suffix": "/api/v1",
    "Search": {
        "Suffix": "/search",
        "Search": "/",
        "Images": "/images",
        "News": "/news",
        "Videos": "/videos",
        "Shopping": "/shopping",
        "Books": "/books",
        "Suggestions": "/suggestions"
    }
}
```
### Configuring the client application
It is time to configure the React application, within the root of the folder generated at the time of cloning the repository, you will have a folder called "Client", this folder contains the source code of the client application, that is, the source code of the Application built in ReactJS, it is time to configure it, when opening the "Client" folder, you must enter the "src" folder, within this you will find a folder called "Settings", quite similar to what you did in The previous step with the server source code, this Settings folder in the client source code contains 3 files as well, where the first corresponds to "ApiRoutes.json", where all the endpoints or routes where the requests will be made are declared of the API, IT IS IMPORTANT that you edit this file, because in the first lines of the .json you will find the "Server" key where you MUST declare the server address, for example "https://mybackendcutternetserver.com/", or in case you are running the server locally "http://0.0.0.0:8000/", the second file called "ClientRoutes.json" contains all the routes of the React application, when accessing a page in Specifically, the path of said page must be declared in this json, as previously explained, it is much simpler and more readable to edit a .json than to see a .js with a hundred lines of code, finally we have the file called " General.json ", where this file contains general settings that will be used throughout the execution of the React application.
Next you will be shown the content of "ApiRoutes.json", file that contains all the routes of the server, the endpoints where the requests will be made from the React application, these routes must coincide with the file previously modified in the anatomy of the source code of the server.
```json
{
    "Server": "http://0.0.0.0:8000/api/v1",
    "Search": {
        "Search": "/search/",
        "Images": "/search/images/",
        "News": "/search/news/",
        "Videos": "/search/videos/",
        "Shopping": "/search/shopping/",
        "Books": "/search/books/",
        "Suggestions": "/search/suggestions/"
    }
}
```
Now you will be shown the "ClientRoutes.json" file, which as previously explained contains the routes of the react application, in case you want to modify a route you must modify this .json.
```json
{
    "Search": "/search",
    "ServiceConditions": "/service-conditions"
}
```
The 'General.json' file, as explained before, only has values ​​that will be used throughout the application, so as not to modify it in each file, it is better to have it controlled in a .json, then its content will be shown.
```json
{
    "Repository": "https://github.com/codewithrodi/CodexDrake/",
    "Version": "Stable v1.0.1"
}
```
### The Setup file
Inside the folder that has been generated when the repository is cloned, there is a file called "Setup.py", which allows you to execute several instructions that will save you a little time, then the arguments that this file can receive will be explained to you.
```bash
# Inside the folder generated when cloning the repository.
# (( /CodexDrake/ )

# It will automatically install the "node_modules" of the server and client applications.
python3 Setup.py

# It will remove the "node_modules" for the client and server application.
python3 Setup.py DeleteModules

# It will remove only the "node_modules" from the client application.
python3 Setup.py DeleteClientModules

# It will remove only the "node_modules" from the server application.
python3 Setup.py DeleteServerModules

# It will remove all source code from the server application.
python3 Setup.py DeleteServerSource

# It will remove all source code from the client application.
python3 Setup.py DeleteClientSource
```
### Running the servers
Once you have configured everything, especially the server endpoint in the api routes within the React application, it is time to start the servers, you can do it from the 'Setup.py', or manually, then we will do it the manually.
```bash
# Inside the folder generated when cloning the repository.
# Terminal <1>
# (( /CodexDrake/ )
cd Client && npm run start
```
```bash
# Inside the folder generated when cloning the repository.
# Terminal <2>
# (( /CodexDrake/ )
cd Server && npm run start
```

### Future versions and contributions
CodexDrake together with its engine will continue to be updated, it is open to receiving improvements from the community of developers who are interested in the project, in the same way, we have released the source code so that other developers can learn how this works, so that they can create something better, the point is to have fun and learn.

#### Remember drink water, bby <3
