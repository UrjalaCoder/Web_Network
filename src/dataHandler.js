import child_process from 'child_process';
import path from 'path';

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
    });
}

export default init;
