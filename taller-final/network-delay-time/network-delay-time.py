from collections import defaultdict
import heapq

class Solution:
    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:
        graph: dict[int, list[tuple[int, int]]] = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))

        dist: list[float] = [float("inf")] * (n + 1)
        dist[k] = 0.0
        pq: list[tuple[float, int]] = [(0.0, k)]

        while pq:
            curr_time, u = heapq.heappop(pq)
            if curr_time > dist[u]:
                continue

            for v, w in graph[u]:
                new_time = curr_time + w
                if new_time < dist[v]:
                    dist[v] = new_time
                    heapq.heappush(pq, (new_time, v))

        max_time = max(dist[1:])
        return -1 if max_time == float("inf") else int(max_time)