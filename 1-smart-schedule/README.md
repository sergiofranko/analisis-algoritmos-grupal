# Smart Schedule

Smart Schedule es una aplicación web para optimizar la programación de actividades utilizando un algoritmo **Greedy (voraz)**.

El sistema permite registrar diferentes actividades con una hora de inicio y una hora de finalización, para posteriormente seleccionar el mayor número posible de actividades compatibles que no presenten conflictos de horario.

---

## Enlace al video explicativo

[Ver video explicativo de Smart Schedule](https://youtu.be/95OJlhP54tU)

---

## Problema

Supongamos que una organización dispone de un recurso limitado, como una sala, una cancha o un espacio de trabajo, y recibe múltiples solicitudes para utilizarlo.

Cada solicitud tiene:

- Un nombre.
- Una hora de inicio.
- Una hora de finalización.

Algunas actividades pueden superponerse, por lo que no es posible realizar todas.

El objetivo es:

> Seleccionar el mayor número posible de actividades que puedan realizarse sin presentar conflictos de horario.

### Ejemplo

| Actividad | Inicio | Fin |
|---|---|---|
| Reunión | 08:00 | 10:00 |
| Tutoría | 09:00 | 11:00 |
| Taller | 10:00 | 12:00 |
| Reunión docente | 11:00 | 12:00 |
| Conferencia | 12:00 | 15:00 |

En este caso existen actividades que se superponen entre sí.

Smart Schedule debe determinar automáticamente cuáles pueden realizarse.

---

## Solución

Para resolver el problema se utiliza un algoritmo **Greedy de selección de actividades**.

La estrategia consiste en seleccionar primero las actividades que terminan más temprano.

El procedimiento es:

1. Ordenar las actividades por hora de finalización.
2. Seleccionar la primera actividad.
3. Recorrer las actividades restantes.
4. Comparar la hora de inicio de cada actividad con la hora de finalización de la última actividad seleccionada.
5. Si la actividad comienza después o exactamente cuando termina la anterior, se selecciona.
6. Continuar hasta revisar todas las actividades.

La condición principal utilizada por el algoritmo es:

```javascript
actividadActual.inicio >= ultimaHoraFin
```

Esto permite, por ejemplo, seleccionar consecutivamente:

```text
Actividad A    08:00 - 10:00
Actividad B    10:00 - 11:00
```

porque la segunda comienza exactamente cuando termina la primera.

---

## Algoritmo utilizado

### Greedy - Selección de actividades

La implementación principal se encuentra en:

```text
js/greedy.js
```

La función encargada de realizar la selección es:

```javascript
seleccionarActividades(actividades)
```

El flujo general del algoritmo es:

```text
Actividades registradas
        |
        v
Ordenar por hora de finalización
        |
        v
Seleccionar primera actividad
        |
        v
Evaluar siguiente actividad
        |
        v
¿Inicio >= última hora de finalización?
       / \
     Sí   No
     |     |
Seleccionar Ignorar
     |
     v
Actualizar última hora de finalización
     |
     v
Continuar
```

### Ejemplo

Para las siguientes actividades:

```text
Reunión          08:00 - 10:00
Tutoría          09:00 - 11:00
Taller           10:00 - 12:00
Reunión docente  11:00 - 12:00
Conferencia      12:00 - 15:00
```

el algoritmo selecciona:

```text
Reunión          08:00 - 10:00
Reunión docente  11:00 - 12:00
Conferencia      12:00 - 15:00
```

y descarta:

```text
Tutoría          09:00 - 11:00
Taller           10:00 - 12:00
```

Por lo tanto:

```text
Actividades ingresadas:     5
Actividades seleccionadas:  3
Actividades descartadas:    2
```

---

## Funcionalidades

Smart Schedule permite:

- Registrar actividades.
- Definir el nombre de una actividad.
- Definir su hora de inicio.
- Definir su hora de finalización.
- Validar los datos ingresados.
- Mostrar las actividades registradas.
- Eliminar actividades.
- Ejecutar el algoritmo Greedy.
- Mostrar las actividades seleccionadas.
- Mostrar las actividades descartadas.
- Visualizar el horario optimizado.
- Mostrar estadísticas del resultado.

---

## Funcionamiento

El flujo general de la aplicación es:

```text
Usuario
   |
   v
Registrar actividades
   |
   v
Lista de actividades
   |
   v
Optimizar horario
   |
   v
Algoritmo Greedy
   |
   +--------------------+
   |                    |
   v                    v
Seleccionadas       Descartadas
   |
   v
Horario optimizado
   |
   v
Estadísticas
```

El usuario registra las actividades y posteriormente presiona el botón:

```text
Optimizar horario
```

La aplicación obtiene las actividades registradas, ejecuta el algoritmo Greedy y muestra el resultado en pantalla.

---

## Arquitectura del proyecto

El proyecto utiliza una estructura modular sencilla:

```text
smart-schedule/
|
├── index.html
|
├── css/
│   └── styles.css
|
├── js/
│   ├── main.js
│   ├── activities.js
│   ├── greedy.js
│   └── ui.js
|
├── README.md
└── .gitignore
```

Cada archivo tiene una responsabilidad específica.

### `index.html`

Contiene la estructura principal de la interfaz.

Incluye:

- Formulario para registrar actividades.
- Lista de actividades.
- Botón de optimización.
- Sección de resultados.
- Horario optimizado.
- Estadísticas.

### `css/styles.css`

Contiene los estilos visuales de la aplicación.

Se encarga de:

- Distribución de los elementos.
- Estilos de formularios.
- Botones.
- Tarjetas de actividades.
- Bloques del horario optimizado.
- Estadísticas.
- Adaptación básica a pantallas pequeñas.

### `js/activities.js`

Administra las actividades registradas.

Sus responsabilidades principales son:

```text
Agregar actividades
Obtener actividades
Eliminar actividades
```

### `js/greedy.js`

Contiene exclusivamente la implementación del algoritmo Greedy.

Su responsabilidad es recibir las actividades y devolver las actividades compatibles seleccionadas.

### `js/ui.js`

Se encarga de actualizar la interfaz.

Entre sus responsabilidades están:

- Mostrar las actividades registradas.
- Mostrar las actividades seleccionadas.
- Mostrar las actividades descartadas.
- Construir la visualización del horario.
- Actualizar las estadísticas.

### `js/main.js`

Es el punto de entrada de la aplicación.

Se encarga de coordinar:

```text
HTML
 |
 v
main.js
 |
 +--------> activities.js
 |
 +--------> greedy.js
 |
 +--------> ui.js
```

De esta forma, la lógica del algoritmo permanece separada de la interfaz.

---

## Tecnologías

El proyecto fue desarrollado utilizando:

- HTML5
- CSS3
- JavaScript
- JavaScript ES Modules
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

Si existen `n` actividades, el algoritmo realiza dos operaciones principales.

### Ordenamiento

Las actividades se ordenan por hora de finalización.

La complejidad del ordenamiento es:

```text
O(n log n)
```

### Selección

Después del ordenamiento, se recorren las actividades una sola vez.

La complejidad de este recorrido es:

```text
O(n)
```

### Complejidad total

Por lo tanto:

```text
O(n log n) + O(n)
```

La complejidad dominante es:

```text
O(n log n)
```

Por lo tanto, la complejidad temporal total del algoritmo es:

**O(n log n)**

---

## Ejecución del proyecto

El proyecto utiliza módulos JavaScript mediante `import` y `export`.

Por esta razón, debe ejecutarse mediante un servidor HTTP local y no abriendo directamente `index.html` mediante `file://`.

### Opción con Python

Desde la carpeta raíz del proyecto ejecutar:

```bash
python3 -m http.server 8001
```

Después abrir en el navegador:

```text
http://localhost:8001
```

Si el puerto `8001` está ocupado, se puede utilizar otro puerto, por ejemplo:

```bash
python3 -m http.server 8002
```

y abrir:

```text
http://localhost:8002
```

---

## Ejemplo de uso

1. Ejecutar el servidor local.
2. Abrir Smart Schedule en el navegador.
3. Registrar varias actividades.
4. Comprobar que aparecen en la sección de actividades registradas.
5. Eliminar alguna actividad si es necesario.
6. Presionar **Optimizar horario**.
7. Consultar las actividades seleccionadas.
8. Consultar las actividades descartadas.
9. Revisar el horario optimizado.
10. Consultar las estadísticas.

---

## Validaciones

La aplicación realiza validaciones básicas antes de registrar una actividad.

Todos los campos deben estar completos.

Además, la hora de finalización debe ser posterior a la hora de inicio.

Por ejemplo:

```text
Inicio: 11:00
Fin:    10:00
```

no es válido.

Tampoco es válido:

```text
Inicio: 11:00
Fin:    11:00
```

Una actividad válida sería:

```text
Inicio: 11:00
Fin:    12:00
```

---

## Objetivo académico

El propósito de Smart Schedule es demostrar la aplicación de un algoritmo Greedy a un problema de optimización mediante una aplicación web funcional.

El proyecto permite demostrar conceptos relacionados con:

- Algoritmos Greedy.
- Selección de actividades.
- Ordenamiento.
- Análisis de complejidad.
- Modularización.
- Separación de responsabilidades.
- Manipulación del DOM.
- Módulos JavaScript.
- Desarrollo web básico.
- Control de versiones con Git y GitHub.

---

## Evolución del proyecto

El proyecto fue desarrollado incrementalmente mediante commits:

```text
1. Initial project structure

2. Create main HTML structure

3. Add activity registration form

4. Implement activity management module

5. Implement greedy activity selection algorithm

6. Connect greedy algorithm with user interface

7. Add optimized schedule visualization

8. Improve application styles

9. Update project documentation
```

Esta organización permite observar claramente la evolución de la aplicación y, especialmente, identificar el commit en el cual se incorporó el algoritmo Greedy.

---

## Autores

Proyecto académico desarrollado para la asignatura:

**Análisis de Algoritmos**

**Desarrollado por:**
- Sergio Esteban Franco Agudelo
- María Alejandra Rúa Monsalve
- Sebastián Espinosa Hernández
