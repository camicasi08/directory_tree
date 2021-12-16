const {Command} = require('../models/commands')

describe('Command class', () => {
    it('should create a command instance (CREATE)', () => {
        const command  = new Command('CREATE', ['new_folder'])
        expect(command.command).toEqual('CREATE')
        expect(command.args.length).toEqual(1)
    })
})