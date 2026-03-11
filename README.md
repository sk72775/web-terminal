# WebTerm 

Welcome to WebTerm! This is a simple, browser-based virtual terminal built with HTML, CSS, and JavaScript. It features an in-memory file system, allowing you to navigate, create directories, and make files just like a real command line. 

## ✨ Features
* **In-Memory File System**: Simulates a real directory tree that resets whenever you refresh the page.
* **Classic Terminal Look**: Features a dark mode aesthetic with green text (`#00ff00`) on a black background (`#000000`).
* **Color-Coded Feedback**: Directories appear in light blue (`#8be9fd`), errors show up in red (`#ff5555`), and the prompt is yellow (`#f1fa8c`).
* **Custom Prompt**: The terminal defaults to the user `kumar@webterm`.

## 🚀 How to Run
To use the terminal, simply open the `terminal.html` file in any modern web browser. The HTML file automatically loads the required `style.css` and `script.js` files. 

## 🛠️ Available Commands
You can type `help` in the terminal to see this list at any time:
* `pwd` - Print working directory (shows your current path)
* `ls` - List directory contents
* `mkdir <dir>` - Create a new directory
* `touch <file>` - Create a new empty file
* `cd <dir>` - Change directory (you can use `cd ..` to go back one folder)
* `clear` - Clear the terminal screen

## 💻 Technologies Used
* **HTML**: Provides the structural layout, including the terminal window, output area, and input line.
* **CSS**: Handles the visual styling, creating the centered, fixed-height terminal window.
* **JavaScript**: Powers the command logic and uses a `FileNode` class to build the underlying tree data structure.
