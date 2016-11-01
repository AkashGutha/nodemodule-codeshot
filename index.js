"use strict";

// include required node modules.
let fs = require('fs');
let childProcess = require('child_process');

let environment = "";

let codeShot = function () {
    environment = process.platform;
}

codeShot.prototype.capture = function (path, options) {

    // setting variables to default values
    if (options === 'undefined')
        options = {
            width: 400,
            height: 600,
            quality: 10,
            name: 'screenShot'
        }

    // path for choosing the right environment process.
    let envPath = __dirname + '\\lib\\' + environment + '.js';

    // spawn the right child process for the right platform
    // process.execPath is the current node binary running this process. 
    let nativeCapture = childProcess.spawn(process.execPath, [envPath]);

    // handlers for native child process for error logging and console printing. 

    // when data is logged on to the stdout stream in the child process.
    nativeCapture.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    // when the child process exits
    nativeCapture.on('exit', (data) => {
        console.log('exited : ' + data);
    });
}
module.exports = codeShot;
