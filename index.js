const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            for (let i = 0; i < res.length; i++) {
                console.log(res[i])
            }
        case 'important':
            for (let i = 0; i < res.length; i++) {
                if (res[i].includes('!')){
                    console.log(res[i]);
                }
            }
            break;
        case command.includes(`user`):
            for (let i = 0; i < res.length; i++){
                if (command.slice(5) === res[i].slice(8, res[i].indexOf(';')).toLowerCase()){
                    console.log(res[i].slice(res[i].lastIndexOf(';')))
                }
            }
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
