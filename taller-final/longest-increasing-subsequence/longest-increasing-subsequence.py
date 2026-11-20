
from typing import List

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)

        # Cada numero forma una subsecuencia de longitud 1
        dp = [1] * n

        # Buscar subsecuencias crecientes
        for i in range(n):
            for j in range(i):

                # Verificar si podemos extender la subsecuencia
                if nums[j] < nums[i]:
                    dp[i] = max(dp[i], dp[j] + 1)

        # Retornar la longitud maxima encontrada
        return max(dp)
