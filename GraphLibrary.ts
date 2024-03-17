import { MinPriorityQueue } from "@datastructures-js/priority-queue";

type GraphType = {
  adjacencyList: { [key: string]: { vertex: string; weight: number }[] };
  vertexList: string[];
  edgeList: { start: string; end: string; weight: number }[];
};

type DjQueueType = {
  priority: number;
  element: string;
};

class Graph implements GraphType {
  adjacencyList: { [key: string]: { vertex: string; weight: number }[] };
  vertexList: string[];
  edgeList: { start: string; end: string; weight: number }[];
  constructor() {
    this.adjacencyList = {};
    this.vertexList = [];
    this.edgeList = [];
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
  DFS(startVertex: string, visited: { [key: string]: boolean }) {
    // Mark the current vertex as visited
    visited[startVertex] = true;

    // For each neighbor of the current vertex, if it hasn't been visited, recursively call DFS
    this.adjacencyList[startVertex].map((neighbor) => {
      if (!visited[Number(neighbor.vertex)]) {
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
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
      this.vertexList.push(vertex);
    }
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
  addEdge(vertex1: string, vertex2: string, weight = 0, undirected?: boolean) {
    if (vertex1 === vertex2)
      return console.log("Cannot add an edge to the same vertex");

    if (undirected) {
      if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
        this.adjacencyList[vertex1].push({ vertex: vertex2, weight });
        this.adjacencyList[vertex2].push({ vertex: vertex1, weight });
        this.edgeList.push({ start: vertex1, end: vertex2, weight });
        this.edgeList.push({ start: vertex2, end: vertex1, weight });
      } else {
        return console.log("One of the vertices does not exist");
      }
    } else if (
      this.adjacencyList[vertex1] &&
      this.adjacencyList[vertex1].map((edge) => edge.vertex !== vertex2)
    ) {
      // If the vertex is in the adjaceny list, and we haven't already added the vertex2 to the vertex1's list
      // O(1) Time complexity, preventing the possible N^2 worst case scenario
      this.adjacencyList[vertex1].push({ vertex: vertex2, weight });
      this.edgeList.push({ start: vertex1, end: vertex2, weight });
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

    this.edgeList = this.edgeList.filter((edge) => {
      return edge.start !== vertex1 && edge.end !== vertex2;
    });
  }

  /**
   * Dijkstra - Shortest Path Algorithm, finding the shortest path from one vertex to all other vertices
   * O((V+E) * log(V)) - Time Complexity
   * O(V) - Space Complexity
   * @param startVertex
   */
  Dijkstra(startVertex: string, endVertex?: string) {
    // Comparison function for the priority queue, to sort by priority
    const comparison = (value: DjQueueType) => {
      return value.priority;
    };

    let heap = new MinPriorityQueue(comparison); // Min Heap, for getting the smallest edge
    let distance: { [key: string]: number } = {}; // Distance from the start vertex to all other vertices

    heap.push({ priority: 0, element: startVertex });
    distance[startVertex] = 0;

    // Initialize the distance array
    this.vertexList.map((vertex) => {
      if (vertex !== startVertex) {
        distance[vertex] = Infinity; // Set all other vertices to infinity
      }
    });

    while (heap.size() > 0) {
      // While we have elements in the heap
      let currentVertex = heap.pop().element;
      // pop the element with the smallest priority

      // for each neighbor of the current vertex, calculate the distance
      this.adjacencyList[currentVertex].map((neighbor) => {
        let candidateDistance = distance[currentVertex] + neighbor.weight;

        // we check if the current distance of the node combined with the neighbor
        // is less than the current distance of the neighbor
        if (candidateDistance < distance[neighbor.vertex]) {
          // update if true
          distance[neighbor.vertex] = candidateDistance;
          heap.push({ priority: candidateDistance, element: neighbor.vertex });
        }
      });
    }

    // In the case you want to see the distance from the start vertex to the end vertex
    if (endVertex) return distance[endVertex];

    // Otherwise, return the distance array, with all nodes
    return distance;
  }

  /*
   * Kruskals Algorithm for finding the minimum spanning tree
   * O(E * log(E)) - Time Complexity - Looping through all edges O(E), inserting and popping from the priority queue (log E)
   * O(E) - Space Complexity
   */
  Kruskal() {
    const comparison = (value: {
      startVertex: string;
      vertex: string;
      weight: number;
    }) => {
      return value.weight;
    };
    let heap = new MinPriorityQueue(comparison); // Min Heap, for getting the smallest edge

    this.edgeList.map((edge) => {
      heap.push({
        startVertex: edge.start,
        vertex: edge.end,
        weight: edge.weight,
      });
    });

    let minimumSpanningTree: { start: string; end: string; weight: number }[] =
      [];
    let visited: { [key: string]: boolean } = {};

    this.vertexList.map((vertex) => {
      visited[vertex] = false;
    });

    while (heap.size() > 0) {
      let currentEdge = heap.pop();
      if (!visited[currentEdge.startVertex] || !visited[currentEdge.vertex]) {
        minimumSpanningTree.push({
          start: currentEdge.startVertex,
          end: currentEdge.vertex,
          weight: currentEdge.weight,
        });
        visited[currentEdge.startVertex] = true;
        visited[currentEdge.vertex] = true;
      }
    }

    let totalWeight = minimumSpanningTree.reduce((acc, edge) => {
      acc += edge.weight;
      return acc;
    }, 0);

    return { tree: minimumSpanningTree, weight: totalWeight };
  }

  /*
   *
   *
   *
   */
  Prims(startVertex: string) {
    const comparison = (value: {
      start: string;
      end: string;
      weight: number;
    }) => {
      return value.weight;
    };
    let heap = new MinPriorityQueue(comparison); // Min Heap, for getting the smallest edge connected to the current spanning tree

    let minimumSpanningTree: { start: string; end: string; weight: number }[] =
      [];

    let visited: { [key: string]: boolean } = {}; // keep track of what vertices have been visited
    this.vertexList.map((vertex) => {
      // initialize the visited array to all false
      visited[vertex] = false;
    });

    heap.push({ start: startVertex, end: startVertex, weight: 0 }); // push the start vertex to the heap

    while (heap.size()) {
      let { start, end, weight } = heap.pop();

      if (!visited[end]) {
        minimumSpanningTree.push({ start, end: end, weight });
        visited[end] = true;
        this.adjacencyList[end].map((neighbor) => {
          if (!visited[neighbor.vertex]) {
            heap.push({
              start: end,
              end: neighbor.vertex,
              weight: neighbor.weight,
            });
          }
        });
      }
    }

    // Calculate the minimum weight of the minimum spanning tree
    let minimumWeight = minimumSpanningTree.reduce((acc, edge) => {
      acc += edge.weight;
      return acc;
    }, 0);

    minimumSpanningTree.shift(); // remove the first element, as it is the start vertex

    return { tree: minimumSpanningTree, minimumWeight: minimumWeight };
  }
}

export default Graph;
