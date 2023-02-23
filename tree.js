//If we need to retrieve parent id to create child node
// A->B and C->B are two different configurations in the history?


class TreeNode{
    //static counter = 0;
    constructor(configuration, parent, action){
        //this.id = TreeNode.counter++;
        this.configuration = configuration;
        this.parent = parent;
        this.action = action;
    }
}

class Tree {
    constructor(){
        this.rootNode = new TreeNode("Root", null);
        this.nodes = [this.rootNode];
  }
    insert(configuration, parent, action){
        if (parent == null){ parent = this.rootNode }
        let newNode = new TreeNode(configuration, parent, action);
        this.nodes.push(newNode);
    }
    insertMultiple(configurations, parent, action){
        var parentNode;
        if (parent == null){ 
            parentNode = this.rootNode 
        } else {
            parentNode = this.findNode(parent);
        }
        for (var config of configurations){
            var newNode = new TreeNode(config, parentNode, action);
            this.nodes.push(newNode);
        }
    }
    findNode(configuration){
        for (var node of this.nodes) {
            if (node.configuration == configuration){
                return node;
            }
        }
        return null
    }
    allConfigurations(){
        var configs = [];
        for (var node of this.nodes){
            configs.push(node.configuration);
        }
        return configs
    }
}

export {TreeNode, Tree}