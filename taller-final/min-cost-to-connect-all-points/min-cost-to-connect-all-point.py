
from typing import List

class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        visitados = [False] * n
        distancias = [float('inf')] * n
        distancias[0] = 0

        costo_total = 0

        for _ in range(n):
            actual = -1

            # Buscar el punto no visitado más cercano
            for i in range(n):
                if not visitados[i]:
                    if actual == -1 or distancias[i] < distancias[actual]:
                        actual = i

            # Agregar el punto al árbol de expansión mínima
            visitados[actual] = True
            costo_total += distancias[actual]

            # Actualizar las distancias a los puntos restantes
            x1, y1 = points[actual]

            for j in range(n):
                if not visitados[j]:
                    x2, y2 = points[j]
                    distancia = abs(x1 - x2) + abs(y1 - y2)

                    if distancia < distancias[j]:
                        distancias[j] = distancia

        return costo_total
