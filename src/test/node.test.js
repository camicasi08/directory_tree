const Node = require('../models/node');

describe('Node Class', () => {

    it('should validate  the instantiation of the Node class', () => {
        const node = new Node('root', []);
        expect(node.name).toEqual('root')
        expect(node.children).toEqual([])
        
    })

    it('should add a child to the root node', () => {
        const root = new Node('root');

        const mock = jest.spyOn(root, 'addChild');

        root.addChild('child', [])
        expect(root.children.length).toEqual(1)
        expect(root.addChild).toHaveBeenCalledTimes(1);

        mock.mockRestore();
    })

    it('should remove a child from the root node', () => {
        const root = new Node('root');
        
        root.addChild('child', [])

        const mock = jest.spyOn(root, 'removeChild');
        root.removeChild('child');
        
        expect(root.children.length).toEqual(0);
        expect(root.removeChild).toHaveBeenCalledTimes(1);

        mock.mockRestore();

    })

    it('should not remove a child from the root node', () => {
        const root = new Node('root');
        root.addChild('child', []);
        const mock = jest.spyOn(root, 'removeChild');
        root.removeChild('child1');

        expect(root.children.length).toEqual(1);
        expect(root.removeChild).toHaveBeenCalledTimes(1);

        mock.mockRestore()


    })
})