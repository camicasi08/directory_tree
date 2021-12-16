# Directory Tree

To run this project you should execute the next commands:

```bash
    npm install
    node src/directories.js
```

If you want to run the test suite (Jest), please execute:
```bash
    npm test
```

- You can change the input.txt to send custom commands
- After running the process an output.txt file is created with the expected results.

## Project structure

The directories.js file is the entry point of the project. Inside it, there are a set of functions that manage the input reading, the command execution, and the output writing.

Folder models contain the classes definition to solve the problem

### Classes

- Node
- Tree
- Command
- CommandHandler: Execute a set of commands and save the obtained results
