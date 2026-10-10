/**
 * Divisas oficiales, en pesos, de Colombia 
 * Ordenadas de mayor a menor para estructurar la solución.
 */
const DENOMINATIONS_COP = [
    { value: 100000, type: 'bill', name: '$100.000', label: 'C. Lleras Restrepo' },
    { value: 50000,  type: 'bill', name: '$50.000',  label: 'G. García Márquez' },
    { value: 20000,  type: 'bill', name: '$20.000',  label: 'A. López Michelsen' },
    { value: 10000,  type: 'bill', name: '$10.000',  label: 'V. Gutiérrez' },
    { value: 5000,   type: 'bill', name: '$5.000',   label: 'J. A. Silva' },
    { value: 2000,   type: 'bill', name: '$2.000',   label: 'D. Arango' },
    { value: 1000,   type: 'coin', name: '$1.000',   label: 'Moneda' },
    { value: 500,    type: 'coin', name: '$500',     label: 'Moneda' },
    { value: 200,    type: 'coin', name: '$200',     label: 'Moneda' },
    { value: 100,    type: 'coin', name: '$100',     label: 'Moneda' },
    { value: 50,     type: 'coin', name: '$50',      label: 'Moneda' }
];

// Factor de escala es 50, debido a que es la menor denominación en Colombia
const SCALE = 50;

function solveCoinChangeDP(rawAmount) {
    const targetNormalized = rawAmount / SCALE;

    const scaledDenoms = DENOMINATIONS_COP.map(d => ({
        ...d,
        scaledValue: d.value / SCALE
    }));

    // 1. Inicialización de arreglo DP y punteros para reconstrucción
    const INF = Infinity;
    const dp = new Array(targetNormalized + 1).fill(INF);
    const parent = new Array(targetNormalized + 1).fill(-1);

    // Caso Base
    dp[0] = 0;

    // 2. Relación de Recurrencia: DP[i] = 1 + min(DP[i - c'])
    for (let i = 1; i <= targetNormalized; i++) {
        for (let d of scaledDenoms) {
            if (d.scaledValue <= i) {
                if (dp[i - d.scaledValue] + 1 < dp[i]) {
                    dp[i] = dp[i - d.scaledValue] + 1;
                    parent[i] = d.value; // Almacenamos la denominación real elegida
                }
            }
        }
    }

    if (dp[targetNormalized] === INF) {
        return { possible: false };
    }

    // 3. Reconstrucción del conjunto óptimo (Backtracking)
    const counts = {};
    let current = targetNormalized;

    while (current > 0) {
        const coinVal = parent[current];
        counts[coinVal] = (counts[coinVal] || 0) + 1;
        current -= (coinVal / SCALE);
    }

    return {
        possible: true,
        totalPieces: dp[targetNormalized],
        counts: counts,
        dpTable: dp,
        parentTable: parent
    };
}

/**
 * Dibuja en el DOM las tarjetas visuales de los billetes y monedas seleccionados,
 * así como los indicadores de totales.
 */
function renderResults(totalAmount, totalPieces, counts) {
    document.getElementById('res-total').innerText = `$${totalAmount.toLocaleString('es-CO')} COP`;
    document.getElementById('res-count').innerText = totalPieces;

    const container = document.getElementById('currency-container');
    container.innerHTML = '';

    DENOMINATIONS_COP.forEach(denom => {
        const qty = counts[denom.value];
        if (qty) {
            if (denom.type === 'bill') {
                const billEl = document.createElement('div');
                billEl.className = `bill bill-${denom.value}`;
                billEl.innerHTML = `
                    <div class="count-badge">${qty}x</div>
                    <div>${denom.name}</div>
                    <small style="font-size:0.65rem; opacity:0.8">${denom.label}</small>
                `;
                container.appendChild(billEl);
            } else {
                const coinEl = document.createElement('div');
                coinEl.className = 'coin';
                coinEl.innerHTML = `
                    <div class="count-badge">${qty}x</div>
                    <span>${denom.name}</span>
                `;
                container.appendChild(coinEl);
            }
        }
    });
}

/**
 * Controller function invoked by the UI button.
 */

function calculateChange() {
    const amountInput = document.getElementById('amount');
    const rawAmount = parseInt(amountInput.value, 10);

    // Validación 1: Campo vacío o no numérico
    if (isNaN(rawAmount)) {
        alert("Por favor ingrese un monto numérico válido.");
        return;
    }

    // Validación 2: Valores negativos o iguales a cero
    if (rawAmount <= 0) {
        alert("El monto debe ser un valor positivo mayor a \$0 COP.");
        return;
    }

    // Validación 3: Restricción de múltiplo del factor de escala (\$50 COP)
    if (rawAmount % SCALE !== 0) {
        alert(`El monto debe ser múltiplo de $${SCALE} COP (ejemplo: $187.500), ya que $50 es la moneda de menor denominación en Colombia.`);
        return;
    }

    // Ejecución del algoritmo de Programación Dinámica
    const result = solveCoinChangeDP(rawAmount);

    if (result.possible) {
        renderResults(rawAmount, result.totalPieces, result.counts);
        renderDPTable(result.dpTable, result.parentTable, 50);
    } else {
        alert("No es posible calcular un desglose exacto para el monto ingresado.");
    }
}

// Ejecutar el cálculo automático la primera vez que carga la página
window.onload = calculateChange;

function renderDPTable(dp, parent, limit) {
    const tbody = document.getElementById('dp-table-body');
    tbody.innerHTML = '';

    // Solo mostramos hasta el 'limit' para no saturar el DOM visualmente
    for (let i = 0; i <= limit && i < dp.length; i++) {
        const tr = document.createElement('tr');
        const realCOP = i * SCALE;
        const lastCoinUsed = parent[i] !== -1 ? `$${parent[i].toLocaleString('es-CO')}` : '-';

        tr.innerHTML = `
            <td>${i}</td>
            <td>$${realCOP.toLocaleString('es-CO')} COP</td>
            <td>${dp[i] === Infinity ? '∞' : dp[i]}</td>
            <td>${lastCoinUsed}</td>
        `;
        tbody.appendChild(tr);
    }

    // Si el arreglo DP es más grande que el límite, añadimos una fila de aviso
    if (dp.length - 1 > limit) {
        const extraRow = document.createElement('tr');
        extraRow.innerHTML = `<td colspan="4" class="placeholder-text">... Mostrando los primeros ${limit} de ${dp.length - 1} subproblemas calculados ...</td>`;
        tbody.appendChild(extraRow);
    }
}