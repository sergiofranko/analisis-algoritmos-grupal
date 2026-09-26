// Clase Grafo con Lista de Adyacencia
class Graph {
  constructor() {
    this.nodes = {};
    this.adjacencyList = {};
  }

  // Agregar un nodo con coordenadas (x, y) para representación visual
  addNode(id, label, x, y) {
    this.nodes[id] = { label, x, y };
    this.adjacencyList[id] = [];
  }

  // Agregar una arista no dirigida con peso
  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight });
    this.adjacencyList[node2].push({ node: node1, weight });
  }
}

// Configuración del mapa/grafo de demostración
const graph = new Graph();

// Registrar nodos (Centros de Acopio / Puntos de Entrega)
graph.addNode('A', 'Centro Acopio (A)', 100, 100);
graph.addNode('B', 'Punto B', 250, 80);
graph.addNode('C', 'Punto C', 200, 250);
graph.addNode('D', 'Punto D', 400, 120);
graph.addNode('E', 'Punto E', 420, 320);
graph.addNode('F', 'Destino Final (F)', 600, 220);

// Conexiones con sus pesos (distancia en km)
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'D', 8);
graph.addEdge('C', 'E', 10);
graph.addEdge('D', 'E', 2);
graph.addEdge('D', 'F', 6);
graph.addEdge('E', 'F', 3);