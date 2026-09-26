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

    for (let node in this.nodes) {
      distances[node] = Infinity;
      previous[node] = null;
      unvisited.add(node);
    }
    distances[startNode] = 0;

    while (unvisited.size > 0) {
      let currentNode = null;
      for (let node of unvisited) {
        if (currentNode === null || distances[node] < distances[currentNode]) {
          currentNode = node;
        }
      }

      if (distances[currentNode] === Infinity || currentNode === endNode) {
        break;
      }

      unvisited.delete(currentNode);

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

// Contexto de Canvas para renderizado visual
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
let currentPath = [];

// Función para dibujar el grafo completo
function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Dibujar aristas (líneas de conexión)
  const drawnEdges = new Set();
  for (let node in graph.adjacencyList) {
    const start = graph.nodes[node];
    for (let edge of graph.adjacencyList[node]) {
      const end = graph.nodes[edge.node];
      const edgeId = [node, edge.node].sort().join('-');

      if (!drawnEdges.has(edgeId)) {
        drawnEdges.add(edgeId);

        const isPathEdge = isEdgeInPath(node, edge.node);

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = isPathEdge ? '#e74c3c' : '#bdc3c7';
        ctx.lineWidth = isPathEdge ? 5 : 2;
        ctx.stroke();

        // Mostrar texto de peso (distancia)
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        ctx.fillStyle = '#2c3e50';
        ctx.font = '12px Arial';
        ctx.fillText(`${edge.weight} km`, midX + 5, midY - 5);
      }
    }
  }

  // 2. Dibujar nodos (círculos)
  for (let id in graph.nodes) {
    const node = graph.nodes[id];
    const isInPath = currentPath.includes(id);

    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = isInPath ? '#e74c3c' : '#3498db';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(id, node.x, node.y);
  }
}

// Función auxiliar para verificar si una conexión está en la ruta óptima
function isEdgeInPath(node1, node2) {
  for (let i = 0; i < currentPath.length - 1; i++) {
    if (
      (currentPath[i] === node1 && currentPath[i + 1] === node2) ||
      (currentPath[i] === node2 && currentPath[i + 1] === node1)
    ) {
      return true;
    }
  }
  return false;
}

// Renderizar grafo por primera vez
drawGraph();