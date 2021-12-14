const fs = require('fs');
const Tree = require('./models/tree');
const {Command, commands: commandList} = require('./models/commands')
const CommandHandler = require('./models/command_handler');
const tree = new Tree();


const main = async () => {
    const commands = await readCommands();
    const handler = new CommandHandler(tree, commands);
    handler.run();
    writeOutput(handler.executionResults);
}

const readCommands = async () => {

    try {
        const data = await fs.readFileSync('input.txt', 'utf-8');
        const lines = data.replace(/\r/g,"").trimEnd().split('\n');
        const commands = []
        lines.forEach((line)=> {
            const action = line.split(' ')[0]
            const args = line.split(' ').splice(1)
            const command = new Command(action, args);
            commands.push(command);
        })   

        return commands;
    } catch (error) {
        throw error;
    }
  
}

const writeOutput = (results) => {
    var file = fs.createWriteStream('output.txt');
    file.on('error', function(err) { console.error("Error writing the output file")});
    results.forEach((result) => {
        file.write(`${result}\n`.replace('\n\n', '\n'))
    });
    file.end();
}

main();