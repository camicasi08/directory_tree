class Node {
    constructor(name, children = []){
        this.name = name;
        this.children = children;
    }

    addChild(name, children) {
        const child = new Node(name, children);
        this.children.push(child)
    }

    removeChild(name){
        const index = this.children.findIndex((child) => child.name === name)
        if(index !== -1){
            this.children.splice(index, 1);
        }
    }
}

module.exports = Node;

