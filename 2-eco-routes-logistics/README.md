# EcoRoute Logistics

EcoRoute Logistics es una aplicación web para optimizar rutas de entrega de última milla en un entorno urbano utilizando un algoritmo de **Grafos (Algoritmo de Dijkstra)**.

El sistema permite representar una red vial como un grafo ponderado no dirigido y calcular la ruta con menor distancia o tiempo acumulado entre un centro de acopio y un punto de entrega.

---

## Enlace al video explicativo

[Ver video explicativo de EcoRoute Logistics](https://youtu.be/C-Hm9a1n3BM)

---

## Problema

Supongamos que una empresa de logística necesita enviar mercancía desde un centro de distribución hacia diferentes puntos de la ciudad a través de una red vial interconectada.

Cada tramo vial cuenta con:

- Un nodo de origen (intersección o centro de acopio).
- Un nodo de destino.
- Un peso asociado (distancia en kilómetros o tiempo de recorrido).

Existen múltiples caminos para llegar a un mismo destino, pero no todos son eficientes en cuanto a consumo de combustible y tiempo.

El objetivo es:

> Encontrar la ruta con la menor distancia total acumulada entre un punto de origen y un punto de destino dentro de la red vial.

### Ejemplo

| Tramo (Arista) | Distancia (Peso) |
|---|---|
| A - B | 4 km |
| A - C | 2 km |
| B - C | 1 km |
| B - D | 5 km |
| C - D | 8 km |
| C - E | 10 km |
| D - E | 2 km |
| D - F | 6 km |
| E - F | 3 km |

En este caso existen múltiples caminos para ir desde el nodo **A** hasta el nodo **F**.

EcoRoute Logistics debe determinar automáticamente cuál es la ruta óptima.

---

## Solución

Para resolver el problema se utiliza el **Algoritmo de Dijkstra**.

La estrategia consiste en evaluar de forma sistemática el camino de menor costo acumulado hacia cada uno de los nodos adyacentes no visitados hasta alcanzar el destino deseado.

El procedimiento es:

1. Asignar una distancia provisional de 0 al nodo origen y de infinito a todos los demás nodos.
2. Añadir todos los nodos a un conjunto de nodos no visitados.
3. Seleccionar el nodo no visitado con la menor distancia provisional registrada.
4. Para el nodo actual, evaluar todos sus vecinos no visitados y calcular la suma de la distancia acumulada más el peso de la arista hacia el vecino.
5. Si la suma es menor que la distancia provisional del vecino, se actualiza dicha distancia y se registra el nodo actual como su predecesor.
6. Marcar el nodo actual como visitado.
7. Repetir el proceso hasta llegar al nodo destino o agotar los nodos alcanzables.
8. Reconstruir el camino desde el destino hacia el origen siguiendo la lista de predecesores.

La condición principal de relajación utilizada por el algoritmo es:

```javascript
nuevaDistancia < distancias[nodoVecino]
```

Esto permite evaluar alternativas eficientes, por ejemplo:

```text
Tramo A -> C -> B = 3 km
Tramo directo A -> B = 4 km
```

el algoritmo elegirá pasar por el nodo `C` hacia `B` porque la distancia acumulada total (2 km + 1 km = 3 km) es menor que el trayecto directo (4 km).

---

## Algoritmo utilizado

### Dijkstra - Grafo Ponderado

La implementación principal se encuentra en:

```text
app.js
```

La función encargada de realizar el cálculo es:

```javascript
dijkstra(startNode, endNode)
```

El flujo general del algoritmo es:

```text
Grafo y Nodos de Origen/Destino
        |
        v
Inicializar distancias (Origen=0, resto=Infinito)
        |
        v
Seleccionar nodo no visitado con menor distancia
        |
        v
¿Llegó al destino o distancia es Infinito?
       / \
      Sí  No
     /     \
Finalizar   Evaluar vecinos no visitados
             |
             v
¿Nueva distancia < Distancia registrada?
       / \
      Sí  No
     /     \
Actualizar  Ignorar
distancia y
predecesor
             |
             v
Marcar nodo como visitado
             |
             v
Continuar bucle
```

### Ejemplo

Para la red vial de prueba:

```text
Nodos: A, B, C, D, E, F
Origen: A
Destino: F
```

el algoritmo selecciona la ruta:

```text
A ➔ C ➔ B ➔ D ➔ F
```

calculando las distancias parciales:

```text
A -> C: 2 km
C -> B: 1 km
B -> D: 5 km
D -> F: 6 km
-------------------
Distancia Total: 14 km
```

Por lo tanto:

```text
Nodos evaluados:      6
Ruta óptima:         A ➔ C ➔ B ➔ D ➔ F
Distancia acumulada: 14 km
```

---

## Funcionalidades

EcoRoute Logistics permite:

- Definir la red vial representada mediante grafos.
- Seleccionar un punto de origen desde un panel desplegable.
- Seleccionar un punto de destino desde un panel desplegable.
- Renderizar en tiempo real el grafo interactivo sobre un lienzo Canvas.
- Ejecutar el algoritmo de Dijkstra.
- Resaltar la ruta óptima de color en el gráfico visual.
- Mostrar la secuencia de nodos de la ruta elegida.
- Mostrar la distancia total calculada en kilómetros.
- Validar selecciones erróneas (origen igual a destino).
- Restablecer la visualización a su estado inicial.

---

## Funcionamiento

El flujo general de la aplicación es:

```text
Usuario
   |
   v
Seleccionar Origen y Destino
   |
   v
Presionar \"Calcular Ruta Óptima\"
   |
   v
Algoritmo de Dijkstra (app.js)
   |
   +--------------------+
   |                    |
   v                    v
Reconstruir Camino    Calcular Distancia
   |                    |
   +----------+---------+
              |
              v
Mostrar Resultado y Distancia Total
```

El usuario selecciona los nodos en los controles e interactúa con el botón:

```text
Calcular Ruta Óptima
```

La aplicación procesa la estructura de adyacencia del grafo, ejecuta Dijkstra y resalta el camino en la pantalla.

---

## Arquitectura del proyecto

El proyecto utiliza una estructura limpia e integradora en la raíz del repositorio:

```text
ecoroute-grafos/
│
├── index.html
├── styles.css
├── app.js
└── README.md
```

Cada archivo tiene una responsabilidad específica.

### `index.html`

Contiene la estructura principal de la interfaz.

Incluye:

- Encabezado con título de la aplicación.
- Panel de control interactivo.
- Menús desplegables para selección de origen y destino.
- Botones de cálculo y restablecimiento.
- Caja de texto para resultados.
- Contenedor para el lienzo `<canvas>`.

### `styles.css`

Contiene los estilos visuales de la aplicación.

Se encarga de:

- Distribución y maquetación responsiva con Flexbox.
- Paleta de colores e identidad visual.
- Estilos para selectores y botones con efectos hover.
- Caja de presentación de resultados.
- Diseño del contenedor de Canvas.

### `app.js`

Contiene la lógica completa de la aplicación.

Sus responsabilidades principales son:

```text
Definición de la clase Graph
Construcción de la lista de adyacencia
Implementación del Algoritmo de Dijkstra
Renderizado gráfico del mapa en HTML5 Canvas
Controladores de eventos de la interfaz (DOM)
```

De esta forma, la estructura mantiene la funcionalidad clara dentro de una arquitectura liviana.

---

## Tecnologías

El proyecto fue desarrollado utilizando:

- HTML5
- CSS3
- JavaScript Vanilla
- HTML5 Canvas API
- Git
- GitHub

La aplicación no requiere:

- Backend.
- Base de datos.
- Framework de JavaScript.
- API externa.
- Sistema de autenticación.

Esto permite concentrar el proyecto en la implementación y demostración del algoritmo.

---

## Complejidad del algoritmo

Para un grafo con V vértices (nodos) y E aristas (conexiones), el algoritmo realiza las siguientes operaciones:

### Búsqueda del nodo con menor distancia

Recorrer la lista de nodos no visitados para seleccionar el mínimo requiere:

O(V) por cada iteración -> O(V^2) en total

### Relajación de aristas

Examinar los vecinos adyacentes a lo largo de la ejecución del algoritmo requiere:

O(E)

### Complejidad total

Por lo tanto:

O(V^2) + O(E)

La complejidad dominante para la implementación estándar es:

**O(V^2)**

*(Nota: Con el uso de estructuras como colas de prioridad o montículos binarios, la complejidad puede optimizarse a O((V + E) log V)).*

---

## Ejecución del proyecto

El proyecto está desarrollado con tecnologías web estándar sin dependencias externas.

### Opción 1: Apertura directa

Abrir directamente el archivo `index.html` haciendo doble clic en el explorador de archivos o arrastrándolo a cualquier navegador web moderno.

### Opción 2: Servidor local con Python

Desde la carpeta raíz del proyecto ejecutar:

```bash
python3 -m http.server 8001
```

Después abrir en el navegador:

```text
http://localhost:8001
```

---

## Ejemplo de uso

1. Abrir la aplicación en el navegador.
2. Consultar el gráfico visual con la red de nodos inicial.
3. Seleccionar el **Punto de Origen** (por ejemplo, `A - Centro Acopio`).
4. Seleccionar el **Punto de Destino** (por ejemplo, `F - Destino Final`).
5. Presionar el botón **Calcular Ruta Óptima**.
6. Observar cómo el camino más corto se resalta automáticamente en color rojo sobre el Canvas.
7. Consultar en la caja de resultados la secuencia exacta de nodos y la distancia total acumulada.
8. Probar con otras combinaciones de origen y destino.
9. Presionar **Restablecer** para limpiar la selección activa.

---

## Validaciones

La aplicación realiza validaciones antes de ejecutar la simulación.

El punto de origen y el punto de destino no pueden ser idénticos.

Por ejemplo:

```text
Origen: A
Destino: A
```

no es válido y mostrará el mensaje:

```text
⚠️ El origen y el destino deben ser diferentes.
```

Una selección válida sería:

```text
Origen: A
Destino: F
```

---

## Objetivo académico

El propósito de EcoRoute Logistics es demostrar la aplicación de un algoritmo de Grafos (Dijkstra) a un problema de optimización en la logística real mediante una aplicación web funcional.

El proyecto permite demostrar conceptos relacionados con:

- Teoría de Grafos (Nodos, Aristas, Pesos).
- Algoritmos de Camino Mínimo (Dijkstra).
- Listas de adyacencia.
- Análisis de complejidad algorítmica.
- Renderizado gráfico con Canvas API.
- Manipulación del DOM e interactividad.
- Desarrollo web básico.
- Control de versiones incremental con Git y GitHub.

---

## Evolución del proyecto

El proyecto fue desarrollado incrementalmente mediante commits:

```text
1. docs: inicializar repositorio con estructura base del proyecto

2. feat: crear estructura HTML y estilos base para el visor del grafo

3. feat: implementar clase Grafo y estructura de datos adyacente en JS

4. feat: implementar algoritmo de Dijkstra para cálculo de rutas mínimas

5. feat: añadir renderizado de nodos y aristas en HTML5 Canvas

6. feat: integrar controles interactivos para seleccionar origen, destino y ejecutar Dijkstra

7. style: mejorar interfaz visual y resaltado del camino óptimo

8. docs: añadir README.md con explicación del problema, algoritmo y enlace al video
```

Esta organización permite observar claramente la evolución de la aplicación e identificar de forma exacta el commit donde se introdujo cada componente de la solución.

---

## Autores

Proyecto académico desarrollado para la asignatura:

**Análisis de Algoritmos**

**Desarrollado por:**
- Sergio Esteban Franco Agudelo
- María Alejandra Rúa Monsalve
- Sebastián Espinosa Hernández
