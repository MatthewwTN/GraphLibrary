import Graph from "./GraphLibrary";

describe("Graph Library Tests", () => {
  let graph: Graph;

  beforeEach(() => {
    // Before each test is called we refresh the graph object
    // This allows for better testing and tracking of specific features the graph has
    graph = new Graph();
  });

  it("should add an edge to the graph", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addEdge("A", "B", 4);
    expect(graph.adjacencyList["A"]).toEqual([{ vertex: "B", weight: 4 }]);
  });

  it("should add a vertex to the graph", () => {
    graph.addVertex("A");
    expect(graph.adjacencyList["A"]).toEqual([]);
  });

  it("should remove an edge from the graph", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addEdge("A", "B", 4);
    graph.removeEdge("A", "B");
    expect(graph.adjacencyList["A"]).toEqual([]);
  });

  it("should perform a depth first search", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");

    graph.addEdge("A", "B", 4);
    graph.addEdge("A", "C", 2);
    graph.addEdge("B", "E", 3);
    graph.addEdge("C", "F", 4);
    graph.addEdge("E", "D", 3);
    graph.addEdge("E", "F", 1);
    graph.addEdge("D", "F", 1);

    const visited = {} as { [key: string]: boolean };
    graph.DFS("A", visited);
    expect(Object.keys(visited)).toEqual(["A", "B", "E", "D", "F", "C"]);
  });

  it("should perform a breadth first search", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");

    graph.addEdge("A", "B", 4);
    graph.addEdge("A", "C", 2);
    graph.addEdge("B", "E", 3);
    graph.addEdge("C", "F", 4);
    graph.addEdge("E", "D", 3);
    graph.addEdge("E", "F", 1);
    graph.addEdge("D", "F", 1);

    const visited = {} as { [key: string]: boolean };
    graph.BFS("A", visited);

    expect(Object.keys(visited)).toEqual(["A", "B", "C", "E", "F", "D"]);
  });

  it("Should perform Dijkstra's Algorithm from 1 vertex to another", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");
    graph.addVertex("J");

    graph.addEdge("A", "B", 26);
    graph.addEdge("A", "C", 2);
    graph.addEdge("B", "E", 3);
    graph.addEdge("C", "F", 8);
    graph.addEdge("E", "D", 17);
    graph.addEdge("E", "F", 1);
    graph.addEdge("D", "F", 1);
    graph.addEdge("J", "D", 5);

    // Remember here that the edges are being set from the 1st parameter edge to the 2nd.
    // This is important to consider when testing.

    const result = graph.Dijkstra("A", "F");
    expect(result).toEqual(10);
  });

  it("Should perform Dijkstra's Algorithm from 1 vertex to all", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");
    graph.addVertex("J");

    graph.addEdge("A", "B", 26);
    graph.addEdge("A", "C", 2);
    graph.addEdge("B", "E", 3);
    graph.addEdge("C", "F", 8);
    graph.addEdge("E", "D", 17);
    graph.addEdge("E", "F", 1);
    graph.addEdge("D", "F", 1);
    graph.addEdge("J", "D", 5);

    // Remember here that the edges are being set from the 1st parameter edge to the 2nd.
    // This is important to consider when testing.

    const result = graph.Dijkstra("A");
    expect(result).toEqual({
      A: 0,
      B: 26,
      C: 2,
      D: 46,
      E: 29,
      F: 10,
      J: Infinity,
    });
  });

  it("Should perform Kruskal's Algorithm for Minimum Spanning Tree", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");
    graph.addVertex("J");

    graph.addEdge("A", "B", 3);
    graph.addEdge("C", "A", 1);
    graph.addEdge("A", "C", 10);
    graph.addEdge("B", "E", 5);
    graph.addEdge("C", "F", 4);

    const result = graph.Kruskal();
    expect(result).toEqual({
      MST: [
        { start: "C", end: "A", weight: 1 },
        { start: "A", end: "B", weight: 3 },
        { start: "C", end: "F", weight: 4 },
        { start: "B", end: "E", weight: 5 },
      ],
      weight: 13,
    });
  });

  it("Should perform Prim's Algorithm for Minimum Spanning Tree on a Directed Graph", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");
    graph.addVertex("J");

    graph.addEdge("A", "J", 2);
    graph.addEdge("A", "C", 3);
    graph.addEdge("B", "F", 4);
    graph.addEdge("C", "B", 1);
    graph.addEdge("C", "D", 5);
    graph.addEdge("E", "D", 2);
    graph.addEdge("F", "E", 6);
    graph.addEdge("F", "J", 7);

    // Remember here that the edges are being set from the 1st parameter edge to the 2nd.
    // This is important to consider when testing.

    // Typically Prims Algorithm is used to find the MST on a undirected, weighted graph
    // In this example, the graph is not connected, but a minimum spanning tree can still be found

    const result = graph.Prims("A");
    expect(result).toEqual({
      MST: [
        {
          start: "A",
          end: "J",
          weight: 2,
        },
        {
          start: "A",
          end: "C",
          weight: 3,
        },
        {
          start: "C",
          end: "B",
          weight: 1,
        },
        {
          start: "B",
          end: "F",
          weight: 4,
        },
        {
          start: "C",
          end: "D",
          weight: 5,
        },
        {
          start: "F",
          end: "E",
          weight: 6,
        },
      ],
      minimumWeight: 21,
    });
  });

  it("Should perform Prim's Algorithm for Minimum Spanning Tree on an Undirected Graph", () => {
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");
    graph.addVertex("J");

    graph.addEdge("A", "B", 3, true);
    graph.addEdge("A", "C", 1, true);
    graph.addEdge("A", "J", 2, true);
    graph.addEdge("B", "E", 5, true);
    graph.addEdge("C", "F", 4, true);
    graph.addEdge("E", "D", 10, true);
    graph.addEdge("D", "C", 1, true);

    const result = graph.Prims("A");
    expect(result).toEqual({
      MST: [
        { start: "A", end: "C", weight: 1 },
        { start: "C", end: "D", weight: 1 },
        { start: "A", end: "J", weight: 2 },
        { start: "A", end: "B", weight: 3 },
        { start: "C", end: "F", weight: 4 },
        { start: "B", end: "E", weight: 5 },
      ],
      minimumWeight: 16,
    });
  });
});
