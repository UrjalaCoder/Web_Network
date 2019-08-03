const child_process = require('child_process');
const path = require('path');

function init(data) {
    const { spawn } = child_process;
    const pythonFile = path.join(__dirname, '/venv/Scripts/python.exe');
    const scriptFile = path.join(__dirname, 'network_scripts', 'main.py');

    // console.log(pythonFile);
    // console.log(scriptFile);

    const pythonProcess = spawn(pythonFile, [scriptFile, JSON.stringify(data)]);
    return new Promise((resolve) => {
        pythonProcess.stdout.on('data', (data) => {
            resolve(data);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.log(data.toString());
            resolve(data);
        })
    });
}

init([100, 400, 500]).then((data) => {console.log(JSON.parse(data))});
