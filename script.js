class FileNode {
    constructor(name, isDirectory = false, parent = null) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.parent = parent;
        this.children = {}; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const root = new FileNode('~', true);
    let currentDir = root;

    const outputDiv = document.getElementById('output');
    const inputField = document.getElementById('cmd-input');
    const promptSpan = document.getElementById('prompt');
    const terminal = document.getElementById('terminal');

    function getPath(node) {
        let path = [];
        let curr = node;
        while (curr !== null) {
            path.unshift(curr.name);
            curr = curr.parent;
        }
        return path.join('/').replace('~/', '~'); 
    }

    function updatePrompt() {
        promptSpan.textContent = `kumar@webterm:${getPath(currentDir)}$`;
    }

    function printToTerminal(text, className = '') {
        const newLine = document.createElement('div');
        newLine.innerHTML = text.replace(/ /g, '&nbsp;'); 
        if (className) newLine.className = className;
        outputDiv.appendChild(newLine);
        terminal.scrollTop = terminal.scrollHeight;
    }

    const commands = {
        help: () => {
            printToTerminal("Available commands:");
            printToTerminal("  pwd          - Print working directory");
            printToTerminal("  ls           - List directory contents");
            printToTerminal("  mkdir <dir>  - Create a new directory");
            printToTerminal("  touch <file> - Create a new empty file");
            printToTerminal("  cd <dir>     - Change directory");
            printToTerminal("  clear        - Clear terminal screen");
        },
        pwd: () => printToTerminal(getPath(currentDir)),
        ls: () => {
            const items = Object.values(currentDir.children);
            if (items.length === 0) return;
            
            const outputLine = document.createElement('div');
            items.forEach(item => {
                const span = document.createElement('span');
                span.textContent = item.name + '  ';
                if (item.isDirectory) span.className = 'dir';
                outputLine.appendChild(span);
            });
            outputDiv.appendChild(outputLine);
            terminal.scrollTop = terminal.scrollHeight;
        },
        mkdir: (args) => {
            const dirName = args[0];
            if (!dirName) return printToTerminal("mkdir: missing operand", "error");
            if (currentDir.children[dirName]) return printToTerminal(`mkdir: cannot create directory '${dirName}': File exists`, "error");
            currentDir.children[dirName] = new FileNode(dirName, true, currentDir);
        },
        touch: (args) => {
            const fileName = args[0];
            if (!fileName) return printToTerminal("touch: missing operand", "error");
            if (!currentDir.children[fileName]) {
                currentDir.children[fileName] = new FileNode(fileName, false, currentDir);
            }
        },
        cd: (args) => {
            const target = args[0];
            if (!target) return; 
            if (target === '..') {
                if (currentDir.parent) {
                    currentDir = currentDir.parent;
                    updatePrompt();
                }
                return;
            }
            const nextDir = currentDir.children[target];
            if (!nextDir) {
                printToTerminal(`cd: ${target}: No such file or directory`, "error");
            } else if (!nextDir.isDirectory) {
                printToTerminal(`cd: ${target}: Not a directory`, "error");
            } else {
                currentDir = nextDir;
                updatePrompt();
            }
        },
        clear: () => outputDiv.innerHTML = ''
    };

    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputStr = inputField.value.trim();
            inputField.value = ''; 
            
            if (inputStr === '') return;
            
            printToTerminal(`${promptSpan.textContent} ${inputStr}`);
            
            const parts = inputStr.split(' ');
            const cmd = parts[0];
            const args = parts.slice(1);
            
            if (commands[cmd]) {
                commands[cmd](args);
            } else {
                printToTerminal(`Command not found: ${cmd}`, "error");
            }
        }
    });

    terminal.addEventListener('click', () => inputField.focus());
    updatePrompt();
});
