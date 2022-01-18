# ***
# * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
# * Licensed under the MIT license. See LICENSE file in the project root 
# * for full license information.
# *
# * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
# *
# * For related information - https://github.com/CodeWithRodi/CodexDrake/
# *
# * This "Setup.py" file is not optimized or designed to function optimally, it 
# * does not have refactored code nor is it written in the best way with good 
# * practices, this file is only to facilitate processes using a simple command 
# * so that the developer does not have To do it on your own, for more information 
# * read the "README.md" located at the root of the source code, this file will 
# * be updated in future versions to work optimally with many more functionalities.
# *
# * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
# ****/

from os import system
import sys, platform, time

kOperativeSystem = platform.system()
kCallArguments = sys.argv

def FinishScript() -> None:
    ClearScreen()
    print('\n\n: CodexDrake => Remember drink water <3.\n\n')
    sys.exit()

def ClearScreen() -> None:
    system('cls' if kOperativeSystem == 'Windows' else 'clear')

def DeleteClientSource() -> None:
    print('''\
 /> ::>Codex<:: DELETE CLIENT SOURCE ::>Drake<:: />
 
 :-: Next you will eliminate all the source code that belongs to 
 :-: the client, that is, you will not be able to execute the server 
 :-: because you will not have access to the code, this can be useful 
 :-: in case you have the services distributed, that is, in this case 
 :-: you only want to execute the Backend server and not the Client 
 :-: server, so you don't need it and want to delete it.

 >>> Do you want continue(n/Y): ''', end='')
    if input('').upper() == 'N':
        FinishScript()

    print(' :-: In the next 5 seconds the source will be removed...')
    time.sleep(5.0)
    system('rm Client/*' if kOperativeSystem == 'Windows' else 'rm -rf Client/')
    ClearScreen()
    print(' :-: Success in removing both modules!')
    sys.exit()

def DeleteServerSource() -> None:
    print('''\
 /> ::>Codex<:: DELETE SERVER SOURCE ::>Drake<:: />

 :-: Next you will eliminate all the source code that makes up the 
 :-: Backend server, when executing this action you will not be able 
 :-: to execute the heart of CodexDrake, because you will only have access 
 :-: to the Client server, you NEED the backend of the application, this 
 :-: can be useful if you have the services distributed and on this server 
 :-: you only want to run the client so you want to remove the source 
 :-: code from the backend.
 
 >>> Do you want continue(n/Y): ''', end='')
    if input('').upper() == 'N':
        FinishScript()

    print(' :-: In the next 5 seconds the source will be removed...')
    time.sleep(5.0)
    system('rm Server/*' if kOperativeSystem == 'Windows' else 'rm -rf Server/')
    ClearScreen()
    print(' :-: Success in removing both modules!')
    sys.exit()

def DeleteServerModules() -> None:
    print('''\
 /> ::>Codex<:: DELETE SERVER MODULES ::>Drake<:: />

 :-: Next you will eliminate all the modules of the backend 
 :-: server, when executing this action you will not be able to 
 :-: initialize the server, this because you do not have the necessary 
 :-: modules for compilation, you can reinstall these modules using 
 :-: "cd Server / && npm i" or directly executing this file 
 :-: "python3 Setup.py" which will automatically install these modules.

 >>> Do you want continue(n/Y): ''', end='')
    if input('').upper() == 'N':
        FinishScript()

    print(' :-: In the next 5 seconds the modules will be removed from the server...')
    time.sleep(5.0)
    system('rm Server/node_modules/*' if kOperativeSystem == 'Windows' else 'rm -rf Server/node_modules/')
    system('del /f Server/package-lock.json' if kOperativeSystem == 'Windows' else 'rm Server/package-lock.json')
    ClearScreen()
    print(' :-: Success in removing both modules!')
    sys.exit()

def DeleteClientModules() -> None:
    print('''\
 /> ::>Codex<:: DELETE CLIENT MODULES ::>Drake<:: />

 :-: Next you will eliminate all the modules of the React 
 :-: application, which corresponds to the application's Client 
 :-: server, when executing this action you will not be able to 
 :-: initialize the server, this because you do not have the necessary 
 :-: modules for compilation, you can reinstall these modules using 
 :-: "cd Client / && npm i" or directly executing this file 
 :-: "python3 Setup.py" which will automatically install these modules.

 >>> Do you want continue(n/Y): ''', end='')
    if input('').upper() == 'N':
        FinishScript()

    print(' :-: In the next 5 seconds, client modules will be removed.')
    time.sleep(5.0)
    system('rm Client/node_modules/*' if kOperativeSystem == 'Windows' else 'rm -rf Client/node_modules/')
    system('del /f Client/package-lock.json' if kOperativeSystem == 'Windows' else 'rm Client/package-lock.json')
    print(' :-: Success in removing both modules!')
    sys.exit()

def DeleteModules() -> None:
    print(f'''\
 /> ::>Codex<:: DELETE MODULES ::>Drake<:: />

 :-: Next, all the necessary modules will be eliminated whose 
 :-: serve so that the React application (Client) as the Backend 
 :-: server can function correctly, when executing this action you 
 :-: will not be able to start the servers, because you will not 
 :-: have the necessary packages, no worry, you can reinstall them by 
 :-: doing an "npm i" inside both directories that contain the source 
 :-: code of the given server, or you can use "python3 Setup.py" which 
 :-: will install the modules for both, removing the modules can be 
 :-: useful if you don't want to have garbage on your server, because 
 :-: the modules take up a considerable space.

 >>> Do you want continue(n/Y): ''', end='')
    if input('').upper() == 'N':
        FinishScript()

    ClearScreen()
    print(' :-: In the next 5 seconds, client modules will be removed.')
    time.sleep(5.0)
    system('rm Client/node_modules/*' if kOperativeSystem == 'Windows' else 'rm -rf Client/node_modules/')
    system('del /f Client/package-lock.json' if kOperativeSystem == 'Windows' else 'rm Client/package-lock.json')
    ClearScreen()
    print(' :-: Client modules removed successfully.')
    print(' :-: In the next 5 seconds the modules will be removed from the server...')
    time.sleep(5.0)
    system('rm Server/node_modules/*' if kOperativeSystem == 'Windows' else 'rm -rf Server/node_modules/')
    system('del /f Server/package-lock.json' if kOperativeSystem == 'Windows' else 'rm Server/package-lock.json')
    ClearScreen()
    print(' :-: Success in removing both modules!')
    sys.exit()

ArgumentsExecutables = {
    'deletemodules': DeleteModules,
    'deleteclientmodules': DeleteClientModules,
    'deleteservermodules': DeleteServerModules,
    'deleteclientsource': DeleteClientSource,
    'deleteserversource': DeleteServerSource
}

try:
    ClearScreen()

    for Argument in kCallArguments:
        if Argument.lower() in ArgumentsExecutables:
            ArgumentsExecutables[Argument.lower()]()

    print(f'''\
 >>> [Website] https://codewithrodi.com/
 >>> [Source Code] https://github.com/CodeWithRodi/CodexDrake/
 >>> [Email] contact@codewithrodi.com

 :-: It has been detected that you are using <{kOperativeSystem}>, you are 
 :-: executing the CodexDrake Setup, you have a detailed explanation 
 :-: of how to do the installation manually in the "README.md" located 
 :-: at the root of the source code of this software, where it is also 
 :-: It explains how to use this Setup, read, learn and contribute!
 :-: Next, the necessary modules of the client's application, built 
 :-: in React, will be installed. (>>> Client/ [Folder])
 :-: After the React application modules have been installed, the necessary 
 :-: modules will be installed to run the built backend. (>>> Server/ [Folder])
 
 >>> Do you want continue(n/Y): ''', end='')
    if input('').upper() == 'N':
        FinishScript()

    ClearScreen()
    print(' :-: In the next 5 seconds the React application modules will be installed...')
    time.sleep(5.0)
    ClearScreen()
    system('cd Client && npm i')
    ClearScreen()

    print(' :-: React application modules installed successfully.')
    print(' :-: In the next 5 seconds the backend modules will be installed.')
    time.sleep(5.0)
    ClearScreen()
    system('cd Server && npm i')
    ClearScreen()

    print('''\
 * CodexDrake -> Free And Secure Open Source Search Engine

 :-: Apparently everything went successfully, you can carefully read 
 :-: the "README.md" found at the root of the source code of this 
 :-: software, this so that you can continue with the configuration and 
 :-: deploy your application, if you have already done all the steps 
 :-: necessary and you have everything configured you can initialize 
 :-: the servers using following commands:
    <<< cd Server && npm run <start/dev>
    <<< cd Client && npm run start
    
 :-: You can initialize the two servers without performing the 
 :-: configuration that is related to you in the "README.md", if so, 
 :-: both servers will run at the address "0.0.0.0" (Address by default), 
 :-: where the client will be running on the port "3000" and the 
 :-: server at "8000", success!

 >>> [Website] https://codewithrodi.com/
 >>> [Source Code] https://github.com/CodeWithRodi/CodexDrake/
 >>> [Email] contact@codewithrodi.com
    ''')

except KeyboardInterrupt:
    ClearScreen(), FinishScript()