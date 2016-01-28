# CodeIt!
*Note - this is currently a work in progress*

A standalone [Blockly](https://developers.google.com/blockly/) programming application, integrated with ROS.
It allows you to use a graphical interface to generate code for a robot, and run it.
You implement "primitives" for the robot, which are combined with a subset of JavaScript to form programs.
From the interface, you can run programs and stop them mid-program.

## Getting started
### Installing
The requirements are:
- MongoDB - install MongoDB and pymongo
- Meteor - install from the Meteor website
- Node - install from the Node website
- From the `frontend` folder, run `npm install -g gulp bower && npm install && bower install`

### Running
- `roslaunch rosbridge_server rosbridge_websocket.launch`
- `rosrun code_it programs.py` - This is the backend that saves and loads the programs to and from MongoDB.
- From the `backend` folder, run `meteor` - This is the JavaScript interpreter that runs the programs.
- From the `frontend` folder, run `gulp` - This is the frontend. Go to localhost:5000 to see the page.

### Deploying
Instructions on deployment coming soon.

## How to add / modify primitives
### Implement the backend
To start with, the primitive should be implemented and accessible through ROS, either as a node listening to a topic, a service, or an action.
Note that your primitive can only take in arguments that are primitive types (Strings, Booleans, Numbers) or Arrays.
Passing in an arbitrary object or a callback function is not supported.

Next, you need to add the primitive to the interpreter.
In `backend/server/robot.js`, add a call to your primitive using roslibjs to the `Robot` function.
Be sure to update the return value of the `Robot` function, at the bottom of the file.

Finally, register your primitive with the interpreter's sandbox.
Edit the function `interpreterApi` in `backend/server/interpreter.js`.
The line `interpreter.setProperty(myRobot, 'myFunction', ...)` means that your primitive will be available as the function `robot.myFunction(...)` in the interpreter.
To create a global function, change the line to `interpreter.setProperty(scope, 'myFunction', ...)`, which creates the global function `myFunction(...)`.

### Implement the frontend
It's recommended that you read the [Custom Blocks](https://developers.google.com/blockly/custom-blocks/overview) section of the Blockly documentation to learn how to make custom blocks in detail.

The general process is to create the code for your block in the [Block Factory](https://developers.google.com/blockly/custom-blocks/block-factory), which is a meta-programming interface that uses Blockly to generate the code for other Blockly blocks.
The video linked above is helpful for understanding how to use the Block Factory.

Once you have the code generated, put the language code in `frontend/app/blockly/blocks/robot.js`, and the generator stub in `frontend/app/blockly/generators/javascript/robot.js`.
You will need to implement the code generation for your block, such that it calls `robot.myFunction()` with the appropriate arguments.

Finally, add the block to the Blockly toolbox, so that users can see the block and drag it into the program.
To do that, edit `frontend/app/elements/code-it-blockly/code-it-blockly.html` and add your block to the toolbox according to the [toolbox documentation](https://developers.google.com/blockly/installation/toolbox).