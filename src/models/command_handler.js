const {commands: commandList} = require('./commands');


class CommandHandler {
    constructor(tree, commands){
        this.tree = tree;
        this.commands = commands;
        this.executionResults = [];
    }

    run(){
        this.commands.forEach(command => {
            if(command.command === commandList.CREATE){
                this.create(command.args[0]);
            }else if(command.command === commandList.DELETE){
                this.delete(command.args[0]);
            }else if(command.command === commandList.MOVE){
                this.move(command.args[0], command.args[1]);
            }else if(command.command === commandList.LIST){
                this.list();
            }
            
        })
    }

    create(path) {
       
        let pathArray = path.split('/')

        const folderName = pathArray[pathArray.length-1];
        pathArray  = pathArray.splice(0, pathArray.length -1)
      
        if(pathArray.length >= 1){
            const searchQuery = ['', ...pathArray]
            const element = this.tree.search(searchQuery);   
            if(element){
                element.addChild(folderName);
                this.executionResults.push(`${commandList.CREATE} ${path}`)
            }else{
                this.executionResults.push(`${commandList.CREATE} ${path}`)
                this.executionResults.push(`Cannot create ${path} - ${pathArray[pathArray.length-1]} does not exist`)
            }
            
        }else{
            this.tree.root.addChild(path);
            this.executionResults.push(`${commandList.CREATE} ${path}`)
        }
    }

    delete(path){
        let pathArray = path.split('/')
        const folderName = pathArray[pathArray.length-1];
        pathArray  = pathArray.splice(0, pathArray.length -1)
        if(pathArray.length >= 1){
            const searchQuery = ['', ...pathArray]
            const element = this.tree.search(searchQuery);
            if(element) {
                element.removeChild(folderName);
                this.executionResults.push(`${commandList.DELETE} ${path}`)
            }else{
                this.executionResults.push(`${commandList.DELETE} ${path}`)
                this.executionResults.push(`Cannot delete ${path} - ${searchQuery} does not exist`)
            }
        }else{
            this.tree.root.removeChild(path)
            this.executionResults.push(`${commandList.DELETE} ${path}`)
        }
    }

    move(fromPath, toPath) {
        let fromPathArray = fromPath.split('/');
        let toPathArray = toPath.split('/');
        const element = this.tree.search(['',...fromPathArray])
        const destination = this.tree.search(['',...toPathArray])
        if(element && destination){
            this.delete(fromPath);
            this.executionResults.pop();
            destination.addChild(element.name,  element.children);
            this.executionResults.push(`${commandList.MOVE} ${fromPath} ${toPath}`);
        }
    }

    list(){
        this.tree.treeString = '';
        this.tree.print(this.tree.root, -1);
        this.executionResults.push(commandList.LIST);
        this.executionResults.push(this.tree.stringFormat);
    }
}

module.exports = CommandHandler;