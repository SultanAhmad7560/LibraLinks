const spawn = require('child_process').spawn;

const childPython = spawn('python', ['AiBot.py']);
		
childPython.stdout.on('data', (data) => 
{
data = toString(data)
  console.log(data)
});

childPython.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

childPython.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});