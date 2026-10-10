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
