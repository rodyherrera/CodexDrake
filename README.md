# The Privacy-First Search Engine
CodexDrake is an open source search engine, which allows you to browse the Internet safely and anonymously, finding a diversity of results based on different categories such as: Images, News, Internet Sites, Books, among others...
<br /> <br />
<a href="https://ko-fi.com/codewithrodi"> 
    <img align="left" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="200" alt="Donate - Contribute" />
</a>

<br /> <br />
The software is mostly written in JavaScript, using NodeJS as the backend and Vite + React on the frontend. Inside the backend, the "cdrake-se" library published by NPM is used, which in simple terms allows you to embed the search engine that makes this software possible to any application you have.

<a href='https://www.npmjs.com/package/cdrake-se'>Go to "cdrake-se" package in NPM.</a>

Within the library, a wide variety of search engines are used to be able to solve the requests made, among them: Google, Bing, Yahoo, Ask, Qwant, Youtube, among others... In addition, it allows you to find suggestions according to a term delivered and perform searches on Wikipedia.

![CodexDrake Desktop Search Presentation](/Screenshots/Desktop-Search.png)

Consider that 'cdrake-se' is not exempt from an HTTP 429 (Too Many Requests) error, which can be caused if a large number of requests are made in a relatively short amount of time. However, when using the automatic search (you can learn more about this in the library's documentation), "Promise.any" is used, which translates to something like "Of all the requests made to the search engines to solve the query, the one that finishes first will be the one that will be returned.
." That is, taking into account the variety of search engines that integrates the library, if any error of any kind occurs, including HTTP 429, it will not be a problem since there will be other engines that do return a response. The aforementioned concept is what makes the search engine fast and efficient to a large extent.

As for the name "CodexDrake", it has its meaning from behind, the interpretation of the name is "Greed of Results", Codex from Latin is greed and Drake interpreting it knowing that it is an equation that allows finding the number of civilizations in a certain galaxy. (I think I'm not crazy).

The software is designed so that it can be self-hosted on any server that you prepare for it, it has support for you to deploy with Docker or performing manual installation, I mean, install the npm modules of both the client and the server and then give an npm run start... you know.

As mentioned in the library that allows the operation of this software 'cdrake-se', the results of the searches will depend on the geographical area where the server is located. As of the time I write this, I have the instance deployed on a server in Germany. Keep in mind that if you deploy the software locally on your computer and, for example, you are in a different country like Chile, the results will be different. I think this is related to  the corresponding search engines and the way the backend service works, I guess they take the IP, extract the country and return a response accordingly to the country context.

![CodexDrake Desktop Image Search Presentation](/Screenshots/Desktop-Image-Search.png)

### Some Features You might Consider:
- Safe and friendly with your data
- Responsive Web UI
- No fees or subscriptions (No paid APIs)
- Rich user experience
- Easy-to-use architecture
- Ridiculously fast
- Dark mode and light mode
- Docker support

## Deploying Your Instance
There are two ways to deploy your instance, manually or through Docker.
Both are relatively simple, below we will deploy manually, just a couple of commands in the terminal will suffice.

```bash
# Cloning the repository
git clone https://github.com/codewithrodi/CodexDrake/
# Accessing the generated folder
cd CodexDrake
# Initializing the Server and Client Setup using the 'Setup.py' file which will be explained later
python3 Setup.py
# Now you must wait for 'Setup.py' to do its thing, try to accept everything it proposes.

# Start Web UI
cd Client && npm run dev
# Start Backend Server
cd Server && npm run start
```

#### Using Docker 
```bash
# Cloning the repository
git clone https://github.com/codewithrodi/CodexDrake/
# Accessing the generated folder
cd CodexDrake
# Running docker
docker compose up -d
```

## Environment Files: Web UI and Backend.
The ".env" environment files do not have much science behind them, inside the "Server/" folder there is the ".env" file which contains definitions used when executing it, some such as SSL certificates or the address in the server network they are declared there. In this section I will focus on showing you what really matters, and that is linking the client application with the server. The server environment file is quite descriptive in terms of variable nomenclature, in addition to having comments, despite the fact that nothing should be taken for granted, there is no need to explain that file to you, you will understand on your own.

Inside the "Client/" folder, where the Vite + React application is located, there is a file called ".env", where you must pay attention to the variable "VITE_CDRAKE_SERVER_ENDPOINT" whose value must be the endpoint of the backend server of your instance , by default this is http://0.0.0.0:8000, but it can be for example http://backend.mycodexdrakeinstance.com.

```env
# <Client/.env> 
VITE_CDRAKE_REPOSITORY = https://github.com/codewithrodi/CodexDrake/
VITE_CDRAKE_VERSION = Stable v1.0.3
VITE_CDRAKE_SERVER_ENDPOINT = http://0.0.0.0:8000/api/v1
```

Consider adding /api/v1 to your endpoint.

### The Software Setup File
Inside the folder that has been generated when the repository is cloned, there is a file called "Setup.py", which allows you to execute several instructions that will save you a little time, then the arguments that this file can receive will be explained to you.
```bash
# Inside the folder generated when cloning the repository.
# (( /CodexDrake/ )

# Automatically install the "node_modules" of the server and client applications.
python3 Setup.py

# Remove the "node_modules" for the client and server application.
python3 Setup.py DeleteModules

# Remove only the "node_modules" from the client application.
python3 Setup.py DeleteClientModules

# Remove only the "node_modules" from the server application.
python3 Setup.py DeleteServerModules

# Remove all source code from the server application.
python3 Setup.py DeleteServerSource

# Remove all source code from the client application.
python3 Setup.py DeleteClientSource
```

## Software under MIT license
The MIT license (Massachusetts Institute of Technology License) is a permissive open source software license. It allows developers to use, modify, distribute and sublicense the software without material restrictions. The MIT license is characterized by its simplicity and does not impose many legal restrictions on users.

Break and learn from the software, extract pieces from it and build better things. Good luck!

[Website](https://www.codewithrodi.com)
<br />
[NPM](https://www.npmjs.com/~codewithrodi)
<br />
[Codepen](https://codepen.io/codewithrodi)
<br />
[Github](https://github.com/codewithrodi/)
