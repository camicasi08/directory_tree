const CommandHandler = require('../models/command_handler');
const {Command, commands: commandList} = require('../models/commands');
//jest.mock('../models/tree')
jest.mock('../models/node')
const Tree = require('../models/tree');
const Node = jest.fn();






describe('Command handler behavior', () => {

    const mockAddChild = jest.fn();
    Node.mockImplementation(() => {
        return {
            addChild: mockAddChild
        }
    })


    const list = [
        new Command(commandList.CREATE, ['vehicles']),
        new Command(commandList.CREATE, ['vehicles/cars']),
        //new Command(commandList.LIST)
    ]
    it('should validate the behavior of the create command', () => {
        const initialTree = new Tree();
        const createCommands = [
            list[0]   
        ]
        const commandHandler = new CommandHandler(initialTree, createCommands);

        const spyRun = jest.spyOn(commandHandler, 'run');
        const spyCreate = jest.spyOn(commandHandler, 'create');
        commandHandler.run();
        
        expect(commandHandler.run).toHaveBeenCalledTimes(1);
        expect(commandHandler.create).toHaveBeenCalledTimes(1);
        expect(commandHandler.executionResults[0]).toEqual('CREATE vehicles')

        spyRun.mockRestore();
        spyCreate.mockRestore();
        
    })

    it('should validate a subdirectory creation', () => {
        const initialTree = new Tree();
        const createCommands = [
            list[0],
            list[1]   
        ]
        const commandHandler = new CommandHandler(initialTree, createCommands);

        const spyRun = jest.spyOn(commandHandler, 'run');
        const spyCreate = jest.spyOn(commandHandler, 'create');
        commandHandler.run();
        
        expect(commandHandler.run).toHaveBeenCalledTimes(1);
        expect(commandHandler.create).toHaveBeenCalled();
        expect(commandHandler.executionResults[0]).toEqual('CREATE vehicles')
        expect(commandHandler.executionResults[1]).toEqual('CREATE vehicles/cars')

        spyRun.mockRestore();
        spyCreate.mockRestore();
    })

    it('should return an error message when trying to delete a nonexistent folder', () => {
        const initialTree = new Tree();
        const deleteCommands = [
            new Command('DELETE', ['airplanes'])
        ]

        const commandHandler = new CommandHandler(initialTree, deleteCommands);
        const spyRun = jest.spyOn(commandHandler, 'run');
        const spyDelete = jest.spyOn(commandHandler, 'delete');

        commandHandler.run();
        expect(commandHandler.run).toHaveBeenCalledTimes(1);
        expect(commandHandler.delete).toHaveBeenCalledTimes(1);
        expect(commandHandler.executionResults[0]).toEqual('DELETE airplanes');
        expect(commandHandler.executionResults[1]).toEqual('Cannot delete airplanes - airplanes does not exist');
       
        spyRun.mockRestore();
        spyDelete.mockRestore();

    })
})