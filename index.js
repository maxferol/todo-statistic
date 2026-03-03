const commentStart = "// ";
const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

let todoComments = [];
getAllTodoComments();
for (let comment of todoComments){
    console.log(comment);
}

console.log('Please, write your command!');
readLine(processCommand);


function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getTodoComments(file) {
    file = file.substring(file.indexOf("\n") + 1);
    let lines = file.slice(file.indexOf(commentStart)).split(commentStart);
    lines = lines.slice(1,);
    for (let line of lines){
        let endIndex = line.indexOf('\n');
        line = line.substring(0, endIndex);
        todoComments.push(line);
    }
}

function getAllTodoComments() {
    for (const file of files){
        getTodoComments(file);
    }
}


function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!
