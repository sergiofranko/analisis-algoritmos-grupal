# 🇨🇴 CajeroCOP: Dispensador Inteligente de Moneda Colombiana con Programación Dinámica

## 1. Descripción del Problema

En los sistemas de cajeros automáticos (ATM) y máquinas expendedoras de efectivo, el problema del desglose de cambio consiste en entregar una cantidad exacta de dinero $V$ utilizando **la menor cantidad total posible de piezas físicas** (billetes y monedas).

Minimizar el número de piezas de efectivo optimiza la capacidad física de los dispensadores del cajero, reduce el desgaste mecánico y mejora la experiencia del usuario final.

En este desarrollo se utiliza la familia completa de denominaciones oficiales corrientes de Colombia:
- **Billetes:** \$100.000, \$50.000, \$20.000, \$10.000, \$5.000, \$2.000
- **Monedas:** \$1.000, \$500, \$200, \$100, \$50

---

## 2. Formulación Teórica del Algoritmo de Programación Dinámica

### A. Optimización de Escala por MCD
Dado que la moneda física de menor denominación en Colombia es la de \$50 COP, el Máximo Común Divisor (MCD) de todo el sistema monetario colombiano es 50.

Para prevenir el consumo excesivo de memoria en la matriz $DP$, escalamos el valor objetivo $V$ y el conjunto de denominaciones $D$:

$$V' = \left\lfloor \frac{V}{50} \right\rfloor$$

$$D' = \left\lbrace \frac{c}{50} \mid c \in D \right\rbrace = \lbrace 1, 2, 4, 10, 20, 40, 100, 200, 400, 1000, 2000 \rbrace$$

Esto reduce la memoria utilizada y las iteraciones del algoritmo en un **98%**.

### B. Definición de Estados
Definimos el arreglo unidimensional $DP[i]$ como la **cantidad mínima de billetes y monedas** necesarios para sumar exactamente el valor normalizado $i$ (donde $i \times 50$ es el valor real en COP).

### C. Relación de Recurrencia
Para cada estado $i$ desde $1$ hasta $V'$:

$$DP[i] = 1 + \min_{c' \in D', \, c' \le i} \Big( DP[i - c'] \Big)$$

### D. Casos Base
- $DP[0] = 0$ (Se requieren 0 piezas de efectivo para entregar \$0 COP).
- $DP[i] = \infty \quad \forall i > 0$ (Inicialización previa de inalcanzabilidad).

### E. Reconstrucción de la Solución (Backtracking)
Se utiliza un arreglo auxiliar `parent[i]` que registra la denominación en pesos $c$ seleccionada al actualizar $DP[i]$. Partiendo de $V'$, se efectúa un recorrido inverso restando el valor $c / 50$ hasta llegar al caso base $0$.

### F. Complejidad Algorítmica
- **Complejidad Temporal:** $\mathcal{O}(V' \cdot \vert{}D\vert{})$, donde $V' = V / 50$ y $\vert{}D\vert{} = 11$ denominaciones.
- **Complejidad Espacial:** $\mathcal{O}(V')$ para el vector de estados $DP$.

---

## 3. Estructura del Proyecto

```text
cajerocop-dp/
├── index.html     # Maquetación de la interfaz web y contenedores
├── styles.css     # Estilos CSS, grilla y componentes visuales de billetes
├── app.js         # Algoritmo DP en JS, validaciones y renderizado del DOM
└── README.md      # Documentación matemática y sustentación del proyecto
```

---

## 4. Instrucciones de Ejecución

La aplicación no requiere instalación de dependencias ni compilación.

1. Clonar este repositorio:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd cajerocop-dp
   ```
2. Abrir el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. Ingresar un monto múltiplo de $50 COP y presionar el botón **"Calcular Desglose Óptimo"**.

---

## 5. Historial de Commits

El proyecto fue desarrollado de forma incremental a través de 9 commits estructurados:

1. `chore: inicializar estructura del proyecto y maqueta HTML5 base`
2. `style: maquetacion base, variables CSS, rejilla y contenedores principales`
3. `feat: definir array de denominaciones oficiales de billetes y monedas colombianas`
4. `feat: implementar matriz DP bottom-up y algoritmo de backtracking para el cambio minimo`
5. `style: crear componentes visuales CSS para billetes (100k-2k) y monedas corrientes`
6. `feat: conectar algoritmo DP con el DOM para mostrar los billetes a entregar`
7. `feat: agregar visualizador en tabla HTML de los subproblemas calculados en DP[i]`
8. `fix: agregar validacion de montos positivos y restriccion a multiplos de \$50 COP`
9. `docs: redactar README.md con fundamentacion teorica y enlace al video`

---

## 6. Video de Sustentación

Enlace a la sustentación en video del proyecto (explicación de la recurrencia, código y prueba funcional):

👉 **[Ver Video de Sustentación en YouTube / Loom](https://youtube.com/)**