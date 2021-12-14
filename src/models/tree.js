const Node = require('./node');

class Tree {
    constructor(){
        this.root = new Node('');
        this.stringFormat = '';
    }

    set treeString(stringFormat){
        this.stringFormat = stringFormat;
    }

    search(path){
        const stack = []
        stack.push(this.root);
        let currentNode;
        let counter = 0;
        while(stack.length > 0){
            currentNode = stack.pop()
            if(currentNode.name != path[0] && stack.length == 0){
                return null;
            }
            if(currentNode.name == path[0] && path.length == 1){
                return currentNode;
            }else if(currentNode.name == path[0] && currentNode.children && currentNode.children.length){
                for(counter = 0; counter < currentNode.children.length; counter ++){
                    stack.push(currentNode.children[counter])
                }
                path.shift()
            }
        }

    }

    print(root, level = 0){
        if(root.name)
        {        
            this.stringFormat += `${"  ".repeat(level)}${root.name}\n`
        }
        root.children.forEach(child => {
            this.print(child, level + 1)
        });
    }

}

module.exports = Tree;

