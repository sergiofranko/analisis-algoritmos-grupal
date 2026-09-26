// Clase Grafo con Lista de Adyacencia y Dijkstra
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

  // Algoritmo de Dijkstra para encontrar la ruta mínima
  dijkstra(startNode, endNode) {
    const distances = {};
    const previous = {};
    const unvisited = new Set();

    // 1. Inicialización
    for (let node in this.nodes) {
      distances[node] = Infinity;
      previous[node] = null;
      unvisited.add(node);
    }
    distances[startNode] = 0;

    // 2. Bucle principal
    while (unvisited.size > 0) {
      let currentNode = null;
      
      // Obtener el nodo no visitado con menor distancia
      for (let node of unvisited) {
        if (currentNode === null || distances[node] < distances[currentNode]) {
          currentNode = node;
        }
      }

      // Si la menor distancia es infinito, o llegamos al destino, paramos
      if (distances[currentNode] === Infinity || currentNode === endNode) {
        break;
      }

      unvisited.delete(currentNode);

      // 3. Evaluar vecinos y relajar aristas
      for (let neighbor of this.adjacencyList[currentNode]) {
        if (unvisited.has(neighbor.node)) {
          let newDist = distances[currentNode] + neighbor.weight;
          if (newDist < distances[neighbor.node]) {
            distances[neighbor.node] = newDist;
            previous[neighbor.node] = currentNode;
          }
        }
      }
    }

    // 4. Reconstruir el camino óptimo desde el final hacia el inicio
    const path = [];
    let curr = endNode;
    while (curr !== null) {
      path.unshift(curr);
      curr = previous[curr];
    }

    return {
      distance: distances[endNode],
      path: distances[endNode] !== Infinity ? path : []
    };
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
