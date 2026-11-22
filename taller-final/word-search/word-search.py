class Solution(object):
    def exist(self, board, word):
        rows, cols = len(board), len(board[0])
        
        board_counts = Counter(char for row in board for char in row)
        word_counts = Counter(word)
        for char, count in word_counts.items():
            if board_counts[char] < count:
                return False
        
        if board_counts[word[0]] > board_counts[word[-1]]:
            word = word[::-1]

        def dfs(r, c, idx):
            if idx == len(word):
                return True
            
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[idx]:
                return False
            
            temp = board[r][c]
            board[r][c] = "#"
            
            found = (
                dfs(r + 1, c, idx + 1) or
                dfs(r - 1, c, idx + 1) or
                dfs(r, c + 1, idx + 1) or
                dfs(r, c - 1, idx + 1)
            )
            
            board[r][c] = temp
            return found

        for r in range(rows):
            for c in range(cols):
                if board[r][c] == word[0] and dfs(r, c, 0):
                    return True
                    
        return False
        
