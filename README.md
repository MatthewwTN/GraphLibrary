# GraphLibrary

A Graph Library Implementing Multiple Algorithms and Graph Capabalities

## Introduction	

This library contains Algorithms such as: 

1. Prims MST Algorithm
2. Kruskals MST Algorithm
3. Depth First Search
4. Breadth First Search
5. Dijkstras Algorithm
6. Find a Path using Backtracking (DFS style)

Along with this - You can Add Vertices and Edges between the Vertices in an Adjacency List Format. 
TypeScript was used for this project to keep functions and algorithms in the graph strongly typed, preventing any mistakes with inputs.

## Description

To test the program, you will need to have Jest installed, which is a testing library commonly used for Web development (React, Next.JS)
Rather than using the graph library in a regular .js file. I wrote the tests in Jest as this is a more common, professional way to test functionality, and it also comes with a lot of great utilities that make writing tests easy.

10 Tests can be ran on the graph library, and the .test.ts file can be edited further for the sake of testing. 
These tests show the functionality of the MST functions, as well as BFS and DFS, Dijkstra as well.

* GraphLibTest.test.ts
* Is a file that uses jests testing framework on the GraphLibrary Class that is implemented in GraphLibrary.ts
* You will run this file, in doing so the tests will appear that check the functionality of the GraphLibrary

## Requirements	
1. Desktop, or Laptop Device
2. Node Version 16.0.0 or Later 
3. Terminal / Visual Studio Code Editor Terminal
   
## User Manual

Before running you will need to install a few things: 

> [!IMPORTANT]
> Double check that you have TypeScript and Jest downloaded. (To run the .test.ts file you will need Jest downloaded globally, so use the -g accordingly which can be seen below.)
> Open a Terminal, within the source code directory on your computer - Run the following commands.

1. npm install -g typescript
3. npm install --save-dev ts-jest @types/jest
4. npm i -g jest

To Run the project, download the source folder from the repository, and place it in any given directory of your choosing. Navigate to the directory where the source folder is, and cd into the source code folder.
Once Jest is downloaded, to run the test file, simply run: 

* jest --watch 

This will run the test suite and you will be able to see that all tests pass with the algorithms that are used.




