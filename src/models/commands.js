const commands = {
    CREATE : 'CREATE',
    DELETE: 'DELETE',
    LIST: 'LIST',
    MOVE: 'MOVE'
}

class Command {
    constructor(command, args){
        this.command = command;
        this.args = args;
    }
}

module.exports = {
    commands,
    Command
};