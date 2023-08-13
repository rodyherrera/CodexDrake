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
Inside the folder generated after cloning the repository, you have two folders, one called 'Server' and another 'Client', you must access the Server folder where you will find a file called '.env', which is the environment file that contains configuration that you must apply in case you want to deploy to production.
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

### Configuring the client application
Inside the "Client" folder is the source code of the CodexDrake web application, built using ReactJS through Vite. Consider that you must edit the .env file, so that from the web application you can connect correctly to the backend server.
```
VITE_CDRAKE_REPOSITORY = https://github.com/codewithrodi/CodexDrake/
VITE_CDRAKE_VERSION = Stable v1.0.2
VITE_CDRAKE_SERVER_ENDPOINT = http://0.0.0.0:8000/api/v1
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