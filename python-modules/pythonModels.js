var spawn = require('child_process').spawn;

const text = 'Dolo 650mg Tablet 15 s';

const process = spawn('python', ['alt-brand-finder.py', text]);

let test = "";

process.stdout.on('data', (data) => {
    test = data.toString();
});

process.stderr.on('data', (data) => {
    console.log('err results: %j', data.toString('utf8'))
});

process.stdout.on('end', function(){
    console.log('Test Data', test);
});