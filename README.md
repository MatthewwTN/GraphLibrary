# GraphLibrary

A graph library implementing multiple Algorithms and Graph Capabalities




## Introduction	

This project is a simple web crawler built with Node.js and Selenium. It reads URLs from a file and crawls each URL to a specified depth, building a graph of nodes and edges representing the links between pages. This is the term project for CSC 3430 (Algorithms Design and Analysis)

## Description

The main function of the web crawler is crawler(filePath, maxDepth).
filePath is the path to a text file containing the URLs to be crawled. Each URL should be on a separate line. This .txt file is passed through an API and Node JS Library Multer.
maxDepth is the maximum depth to which the crawler should follow links. A depth of 0 means that only the initial level of URLs will be crawled, a depth of 1 means that the crawler will follow links from the initial URLs to other pages, and so on.
The crawler will output a graph of nodes and edges. Each node represents a URL, and each edge represents a link from one URL to another.

On the front end, the user of this application will be able to place in the depth they want the graph to go to, as well as the set of url's in the .txt file that the user would like to scrape at the specified depth.

## Requirements	
1. Desktop, or Laptop Device
2. Node Version 16.0.0 or Later 
3. Terminal / Visual Studio Code Editor Terminal
   
## User Manual
To Run the project, download the source folder from the repository, and place it in any given directory of your choosing. Navigate to the directory where the source folder is, and cd into the source code folder.

> [!IMPORTANT]
npm install -g typescript
npm install -g ts-node
npm install --save-dev jest ts-jest @types/jest
npx ts-jest config:init
npm i -g jest

> [!IMPORTANT]
> Note this step can take a long time depending on the depth you choose - be mindful of this as Javascript is not multi threaded which can lead to longer compile times.


## Reflection
>  


