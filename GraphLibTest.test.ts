import Graph from "./GraphLibrary";

describe("Graph Library", () => {
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

    const visited = [] as string[];
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
});
