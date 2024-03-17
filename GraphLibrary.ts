import { MinPriorityQueue } from "@datastructures-js/priority-queue";

type GraphType = {
  adjacencyList: { [key: string]: { vertex: string; weight: number }[] };
};

class Graph implements GraphType {
  adjacencyList: { [key: string]: { vertex: string; weight: number }[] };
  constructor() {
    this.adjacencyList = {};
  }

  /**
   * BFS - Breadth First Search
   * O(V+E) - Time Complexity (V = Vertices, E = Edges)
   * O(V) - Space Complexity
   * @param startVertex
   * @param visited
   */
  BFS(startVertex: string, visited: { [key: string]: boolean }) {
    let queue = [startVertex]; // start with the first vertex

    while (queue.length) {
      // Pop from the queue, and mark as visited
      let currentVertex = queue.shift() as string;
      visited[currentVertex] = true;

      // For each neighbor of the current vertex, if it hasn't been visited, add it to the queue
      // Mark as visited
      this.adjacencyList[currentVertex].map((neighbor) => {
        if (!visited[neighbor.vertex]) {
          queue.push(neighbor.vertex);
          visited[neighbor.vertex] = true;
        }
      });
    }
  }

  /**
   * DFS - Depth First Search
   * O(V+E) - Time Complexity (V = Vertices, E = Edges)
   * O(V) - Space Complexity
   * @param startVertex
   * @param visited
   */
  DFS(startVertex: string, visited: string[]) {
    // Mark the current vertex as visited
    visited[startVertex] = true;

    // For each neighbor of the current vertex, if it hasn't been visited, recursively call DFS
    this.adjacencyList[startVertex].map((neighbor) => {
      if (!visited[neighbor.vertex]) {
        this.DFS(neighbor.vertex, visited);
      }
    });
  }

  /**
   * addVertex
   * O(1) - Time Complexity
   * O(1) - Space Complexity
   * @param vertex
   */
  addVertex(vertex: string) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  /**
   * addEdge
   * O(N) - Time Complexity - we must loop to prevent adding the same edge twice
   * O(1) - Space Complexity
   * @param vertex1
   * @param vertex2
   * @param weight
   * @returns
   */
  addEdge(vertex1: string, vertex2: string, weight = 0) {
    if (vertex1 === vertex2)
      return console.log("Cannot add an edge to the same vertex");

    if (
      this.adjacencyList[vertex1] &&
      this.adjacencyList[vertex1].map((edge) => edge.vertex !== vertex2)
    ) {
      // If the vertex is in the adjaceny list, and we haven't already added the vertex2 to the vertex1's list
      // O(1) Time complexity, preventing the possible N^2 worst case scenario
      this.adjacencyList[vertex1].push({ vertex: vertex2, weight });
    }
  }

  /**
   * removeEdge
   * O(N) - Time Complexity - looping to filter out the edge that the user wants to remove
   * O(1) - Space Complexity
   * @param vertex1
   * @param vertex2
   * @returns
   */
  removeEdge(vertex1: string, vertex2: string) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return console.log("One of the vertices does not exist");
    }

    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v) => {
      v.vertex !== vertex2;
    });

    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v) => {
      v.vertex !== vertex1;
    });
  }

  /**
   * Dijkstra - Shortest Path Algorithm
   * O((V+E) * log(V)) - Time Complexity
   * O(V) - Space Complexity
   * @param startVertex
   */
  Dijkstra(startVertex: string) {}

  /*
   *
   *
   *
   */
  Kruskal() {}

  /*
   *
   *
   *
   */
  Prim() {}
}

export default Graph;
