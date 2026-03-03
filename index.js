const commentStart = "// ";
const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

let res = [];
getAllTodoComments();
for (let comment of res){
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
        res.push(line);
    }
}

function getAllTodoComments() {
    for (const file of files){
        getTodoComments(file);
    }
}

function processCommand(command) {
    let [command_name, command_date] = command.split(' ')
    switch (command_name) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            for (let i = 0; i < res.length; i++) {
                console.log(res[i])
            }
            break;
        case 'important':
            for (let i = 0; i < res.length; i++) {
                if (res[i].includes('!')){
                    console.log(res[i]);
                }
            }
            break;
        case 'user':
            for (let i = 0; i < res.length; i++){
                if (command_date === res[i].slice(5, res[i].indexOf(';')).toLowerCase()){
                    console.log(res[i].slice(res[i].lastIndexOf(';') + 1))
                }
            }
            break;

        case 'sort':
            processSort(command_date);
            for (let comment of res){
                console.log(comment);
            }
            break;

        default:
            console.log('wrong command');
            break;
    }
}


function processSort(sortBy) {
    switch (sortBy) {
        case 'importance':
            res.sort((a, b) => compareByImportance(a, b));
            break;

        case 'user':
            res.sort((a, b) => compareByUser(a, b));
            break;

        case 'date':
            res.sort((a, b) => compareByDate(a, b));
            break;
    }
}

function compareByImportance(a, b){
    let a_count = a.slice(a.indexOf('!'), a.lastIndexOf('!') + 1).length;
    let b_count = b.slice(b.indexOf('!'), b.lastIndexOf('!') + 1).length;
    if (a_count < b_count)  return 1;
    else if (a_count > b_count)  return -1;
    return 0;
}


function compareByUser(a, b){
    aUser = a.slice(5, a.indexOf(';')).toLowerCase();
    bUser = b.slice(5, b.indexOf(';')).toLowerCase();

    if (aUser < bUser)
        return -1;
    else if (aUser > bUser)
        return 1;
    return 0;
}

function compareByDate(a, b){
    let a_data = a.slice(a.indexOf(';') + 1, a.lastIndexOf(';')).replace(' ', '');
    let b_data = b.slice(b.indexOf(';') + 1, b.lastIndexOf(';')).replace(' ', '');
    let [a_year, a_month, a_day] = a_data.split('-');
    let [b_year, b_month, b_day] = b_data.split('-');
    if (b_year < a_year) return 1;
    else if (b_year > a_year) return -1;
    else{
        if (b_month < a_month) return 1;
        else if (b_month > a_month) return -1;
        else{
            if (b_day < a_day) return 1;
            else if (b_day > a_day) return -1;
            else return 0;
        }
    }
}


// TODO you can do it!
