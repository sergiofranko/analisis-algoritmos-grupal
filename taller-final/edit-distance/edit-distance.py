
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m = len(word1)
        n = len(word2)

        # Crear tabla de programación dinámica
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        # Casos base: convertir una palabra en una cadena vacía
        for i in range(m + 1):
            dp[i][0] = i

        for j in range(n + 1):
            dp[0][j] = j

        # Calcular el mínimo de operaciones
        for i in range(1, m + 1):
            for j in range(1, n + 1):

                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    insertar = dp[i][j - 1]
                    eliminar = dp[i - 1][j]
                    reemplazar = dp[i - 1][j - 1]

                    dp[i][j] = 1 + min(
                        insertar,
                        eliminar,
                        reemplazar
                    )

        return dp[m][n]
