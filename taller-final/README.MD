# Tabla de autoría
```markdown
| Integrante | Usuario de git | Ejercicios |
| Sebastian Espinosa Hernández | sebasespinosa18 | 215, 743 |
| Sergio Esteban Franco Agudelo | sergiofranko | … |
| Maria Alejandra Rua Monsalve | Alejandra-Rua | … |
```

## Ejercicio 1 · [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

**Autor:** Sebastian Espinosa (`sebasespinosa18`)  
**Dificultad:** Medium  
**Familia:** heap
**Idea:** Mantener un min-heap con a lo sumo `k` elementos que represente los `k` mayores valores encontrados hasta el momento. Si llega un elemento mayor que la raíz (el mínimo del top `k`), se reemplaza la raíz por el nuevo valor; al terminar, la raíz es el k-ésimo mayor. No se ordena todo el arreglo.  
**Complejidad:** Tiempo $O(n \log k)$ y espacio extra $O(k)$, donde $n$ es el tamaño de `nums`.

## Enunciado
Dado `nums` y un entero `k`, devolver el **k-ésimo mayor**. Es el mayor del arreglo si `k = 1`, el segundo mayor si `k = 2`, y así.

## Evidencias

![Accepted — Kth Largest](evidencias/kth-largest-accepted.png)