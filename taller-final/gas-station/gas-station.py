class Solution(object):
    def canCompleteCircuit(self, gas, cost):
        total_tank = 0
        current_tank = 0
        start = 0

        for i in range(len(gas)):
            net = gas[i] - cost[i]
            total_tank += net
            current_tank += net

            if current_tank < 0:
                start = i + 1
                current_tank = 0

        return start if total_tank >= 0 else -1
