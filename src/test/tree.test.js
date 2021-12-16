const Tree = require('../models/tree');
const Node  = require('../models/node')
describe('Tree Class', () => {
    const defaultTree = new Tree();
    const subChild = new Node('subChild')
    const childrenArray = [
        subChild
    ]
    defaultTree.root.addChild('child1', childrenArray);

    it('should validate the constructor', () => {
        const tree = new Tree();
        expect(tree.root).toBeInstanceOf(Node)
        expect(tree.stringFormat).toEqual('')
    })

    it('should generate the string format of the directory tree', () => {
        let expectedStringFormat = "  child1\n"
        expectedStringFormat += "    subChild\n"

        const mock = jest.spyOn(defaultTree, 'print');

        defaultTree.print(defaultTree.root, 0);

        expect(defaultTree.stringFormat).toEqual(expectedStringFormat);
        expect(defaultTree.print).toHaveBeenCalledTimes(3)

        mock.mockRestore()
    })

    it('should return a node given a path', () => {
        const expected = subChild;
        const path = ['','child1', 'subChild']
        
        const mock = jest.spyOn(defaultTree, 'search');
        expect(defaultTree.search(path)).toEqual(expected);
        expect(defaultTree.search).toHaveBeenCalledTimes(1)

        mock.mockRestore()
    })

    it('should return null given a  wrong path', () => {
        
        const path = ['','child1', 'subChild2']
        
        const mock = jest.spyOn(defaultTree, 'search');
        expect(defaultTree.search(path)).toBeNull()
        expect(defaultTree.search).toHaveBeenCalledTimes(1)

        mock.mockRestore()
    })


})