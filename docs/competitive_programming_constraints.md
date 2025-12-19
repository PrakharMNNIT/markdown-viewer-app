# 🎯 Coding Interview & Competitive Programming Constraints Guide

### 📝 2025-12-19
**Category**: `interview prep` | **Level**: `Essential` | **Time**: `15 min read`

> **Master the numbers** that every competitive programmer and interviewee should know by heart!

---

## 📋 Table of Contents

1. [Standard Assumptions](#-standard-assumptions)
2. [Integer Limits & Data Types](#-integer-limits--data-types)
3. [Array & Container Constraints](#-array--container-constraints)
4. [String Constraints](#-string-constraints)
5. [Time Complexity Limits](#-time-complexity-limits)
6. [Space Complexity Limits](#-space-complexity-limits)
7. [Common Primes & Mathematical Constants](#-common-primes--mathematical-constants)
8. [Edge Cases Checklist](#-edge-cases-checklist)
9. [Platform-Specific Constraints](#-platform-specific-constraints)
10. [Quick Reference Cheatsheet](#-quick-reference-cheatsheet)

---

## 🎯 Standard Assumptions

### The Golden Rules

| Assumption | Typical Value | Reasoning |
|------------|---------------|-----------|
| **Time Limit** | 1-2 seconds | ~10⁸ simple operations/second |
| **Memory Limit** | 256 MB | Standard competitive programming |
| **Max Input Size (n)** | 10⁵ to 10⁶ | Fits in memory, allows O(n log n) |
| **Max Integer Value** | 10⁹ | Fits in `int` |
| **Large Integer Value** | 10¹⁸ | Requires `long long` |

### What to Ask in Interviews

1. **Input size constraints?** (n ≤ ?)
2. **Value range?** (values ≤ ?)
3. **Can values be negative?**
4. **Are there duplicates?**
5. **Is input sorted?**
6. **Can input be empty?**

---

## 🔢 Integer Limits & Data Types

### Standard Integer Ranges

| Type | Bytes | Range | Max (~) | Use When |
|------|-------|-------|---------|----------|
| `int` | 4 | -2³¹ to 2³¹-1 | ±2.1×10⁹ | Default choice |
| `unsigned int` | 4 | 0 to 2³²-1 | 4.3×10⁹ | Non-negative only |
| `long long` | 8 | -2⁶³ to 2⁶³-1 | ±9.2×10¹⁸ | Large values |
| `unsigned long long` | 8 | 0 to 2⁶⁴-1 | 1.8×10¹⁹ | Very large non-negative |

### Critical Constants (MEMORIZE!)

```cpp
#include <climits>

INT_MAX    =  2,147,483,647      // ≈ 2.1 × 10⁹
INT_MIN    = -2,147,483,648      // ≈ -2.1 × 10⁹
LLONG_MAX  =  9,223,372,036,854,775,807  // ≈ 9.2 × 10¹⁸
LLONG_MIN  = -9,223,372,036,854,775,808  // ≈ -9.2 × 10¹⁸

// Quick mental math
INT_MAX   ≈ 2 × 10⁹    (2 billion)
LLONG_MAX ≈ 9 × 10¹⁸   (9 quintillion)
```

### When to Use Which Type

| Problem Constraint | Type to Use | Example |
|-------------------|-------------|---------|
| n ≤ 10⁵, values ≤ 10⁹ | `int` | Most problems |
| Values > 2×10⁹ | `long long` | Large sums, products |
| Sum of n elements, n ≤ 10⁵ | `long long` | 10⁵ × 10⁹ = 10¹⁴ |
| Product of elements | `long long` or modulo | Overflow danger! |
| n × n where n ≤ 10⁵ | `long long` | 10¹⁰ > INT_MAX |

### ⚠️ Overflow Danger Zones

```cpp
// ❌ OVERFLOW! (10⁵ × 10⁵ = 10¹⁰ > INT_MAX)
int n = 100000;
int result = n * n;  // WRONG!

// ✅ SAFE
long long result = (long long)n * n;
long long result = 1LL * n * n;

// ❌ OVERFLOW! (sum of 10⁵ elements each up to 10⁹)
int sum = 0;
for (int x : arr) sum += x;  // WRONG if arr is large!

// ✅ SAFE
long long sum = 0;
for (int x : arr) sum += x;
```

### Modular Arithmetic

When problem says "answer modulo 10⁹+7":

```cpp
const int MOD = 1e9 + 7;  // 1,000,000,007 (prime)

// Addition
(a + b) % MOD

// Subtraction (add MOD to avoid negative)
((a - b) % MOD + MOD) % MOD

// Multiplication
(1LL * a * b) % MOD  // Cast to long long first!

// Common modulo values
10⁹ + 7  = 1,000,000,007  // Most common (prime)
10⁹ + 9  = 1,000,000,009  // Also prime
998244353                  // FFT-friendly prime (2²³ × 7 × 17 + 1)
```

---

## 📊 Array & Container Constraints

### Maximum Array Sizes

| Memory | Max Elements (`int`) | Max Elements (`long long`) |
|--------|---------------------|---------------------------|
| 256 MB | ~64 million | ~32 million |
| 512 MB | ~128 million | ~64 million |
| 1 GB | ~256 million | ~128 million |

**Formula:** Max elements = Memory / sizeof(type)
- 256 MB = 256 × 10⁶ bytes
- int array: 256 × 10⁶ / 4 = 64 × 10⁶

### Typical Constraints by Problem Type

| Problem Type | Typical n | Expected Complexity |
|--------------|-----------|-------------------|
| Easy | ≤ 10³ | O(n²) acceptable |
| Medium | ≤ 10⁵ | O(n log n) expected |
| Hard | ≤ 10⁶ | O(n) or O(n log n) |
| Very Hard | ≤ 10⁷ | O(n) only |

### 2D Array Limits

```cpp
// Max 2D array with 256MB memory
// n × m × sizeof(int) ≤ 256 × 10⁶

// Safe limits:
int arr[1000][1000];     // 4 MB - ✅ Safe
int arr[5000][5000];     // 100 MB - ✅ Usually safe
int arr[10000][10000];   // 400 MB - ❌ Too large!

// For larger grids, use vector (dynamic allocation)
vector<vector<int>> grid(n, vector<int>(m));
```

### Container Memory Usage

| Container | Memory per Element | Notes |
|-----------|-------------------|-------|
| `vector<int>` | 4 bytes | Most efficient |
| `deque<int>` | 4 bytes + overhead | Block allocation |
| `list<int>` | 4 + 16 bytes | Node pointers |
| `set<int>` | 4 + 32 bytes | Red-black tree |
| `unordered_set<int>` | 4 + ~8 bytes | Hash table |
| `map<int,int>` | 8 + 32 bytes | Red-black tree |
| `unordered_map<int,int>` | 8 + ~16 bytes | Hash table |

---

## 📝 String Constraints

### String Length Limits

| Constraint | Typical Value | Common Problems |
|------------|---------------|-----------------|
| Short strings | ≤ 100 | Brute force OK |
| Medium strings | ≤ 10⁵ | O(n) required |
| Long strings | ≤ 10⁶ | O(n) only |
| Multiple strings | Total length ≤ 10⁶ | Sum constraint |

### Character Set Assumptions

```cpp
// Lowercase letters only: 'a' to 'z' (26 chars)
int freq[26] = {0};
freq[ch - 'a']++;

// All letters: 'A'-'Z', 'a'-'z' (52 chars)
// Usually case-insensitive or convert to one case

// Digits: '0' to '9' (10 chars)
int digit = ch - '0';

// ASCII printable: 32 to 126 (95 chars)
int freq[128] = {0};  // Safe for all ASCII

// Unicode: Use std::string with UTF-8
// Careful: string[i] may not be a full character!
```

### String Comparison Complexity

```cpp
// Comparing two strings of length n and m
s1 == s2;           // O(min(n, m))
s1.compare(s2);     // O(min(n, m))
s1 < s2;            // O(min(n, m))

// For multiple comparisons, use hashing
hash<string> hasher;
size_t h = hasher(s);
```

---

## ⏱️ Time Complexity Limits

### Operations per Second

| Operation Type | Operations/Second |
|---------------|-------------------|
| Simple arithmetic | ~10⁹ |
| Array access | ~10⁸ - 10⁹ |
| Vector operations | ~10⁸ |
| Set/Map operations | ~10⁷ |
| String operations | ~10⁷ |
| I/O (cin/cout) | ~10⁶ (without fast I/O) |
| I/O (fast I/O) | ~10⁷ |

### Maximum n for Time Limits

| Time Limit | O(n) | O(n log n) | O(n²) | O(n³) | O(2ⁿ) |
|------------|------|------------|-------|-------|-------|
| 1 second | 10⁸ | 10⁶-10⁷ | 10⁴ | 500 | 25 |
| 2 seconds | 2×10⁸ | 2×10⁷ | 1.4×10⁴ | 600 | 26 |
| 5 seconds | 5×10⁸ | 5×10⁷ | 2×10⁴ | 800 | 28 |

### Quick Complexity Check

```cpp
// Given n, what's the max acceptable complexity?
n ≤ 10     → O(n!) or O(2ⁿ) OK
n ≤ 20     → O(2ⁿ) OK, O(n!) too slow
n ≤ 100    → O(n³) OK
n ≤ 1000   → O(n²) OK
n ≤ 10⁵    → O(n log n) or better
n ≤ 10⁶    → O(n log n) risky, O(n) preferred
n ≤ 10⁸    → O(n) only
```

### Reverse: Given Complexity, Max n

| Complexity | Max n (1 sec) |
|------------|---------------|
| O(n!) | n ≤ 10 |
| O(2ⁿ) | n ≤ 20-25 |
| O(n³) | n ≤ 500 |
| O(n² log n) | n ≤ 1000 |
| O(n²) | n ≤ 5000-10000 |
| O(n√n) | n ≤ 10⁵ |
| O(n log n) | n ≤ 10⁶-10⁷ |
| O(n) | n ≤ 10⁸ |
| O(log n) | n ≤ 10¹⁸ |
| O(1) | n = anything |

---

## 💾 Space Complexity Limits

### Memory Calculation

```cpp
// Typical memory limits
256 MB = 256 × 10⁶ bytes = 64 × 10⁶ ints
512 MB = 512 × 10⁶ bytes = 128 × 10⁶ ints

// Stack vs Heap
// Stack: Limited (~1-8 MB) - local variables, recursion
// Heap: Limited by problem constraint - new, vector

// Recursion depth limit (stack)
// ~10⁴ - 10⁵ calls typically safe
// Deep recursion may cause stack overflow!

// Tail recursion or iteration preferred for deep recursion
```

### Data Structure Space

| Structure | Space | Example |
|-----------|-------|---------|
| Array of n ints | 4n bytes | n = 10⁶ → 4 MB |
| n × n int matrix | 4n² bytes | n = 5000 → 100 MB |
| Adjacency list | O(V + E) | |
| Adjacency matrix | O(V²) | |
| Binary tree (n nodes) | ~32n bytes | Node + 2 pointers |
| Graph (V vertices, E edges) | V + E | Adjacency list |

---

## 🔢 Common Primes & Mathematical Constants

### Primes to Know

```cpp
// For modular arithmetic
10⁹ + 7 = 1,000,000,007  // Most common modulo (prime)
10⁹ + 9 = 1,000,000,009  // Alternative (prime)
998244353                 // NTT prime (2²³ × 7 × 17 + 1)

// Small primes for hashing
31, 37, 53, 97, 131, 1009, 10007

// For string hashing (rolling hash)
base = 31 or 37 (for lowercase letters)
base = 53 (for mixed case)
mod = 10⁹ + 7 or 10⁹ + 9

// Largest prime ≤ n
// Under 100: 97
// Under 1000: 997
// Under 10000: 9973
// Under 10⁵: 99991
// Under 10⁶: 999983
// Under 10⁹: 999999937
```

### Mathematical Constants

```cpp
// For geometry and floating point
const double PI = acos(-1);        // 3.14159265358979...
const double PI = 3.14159265358979323846;
const double E = exp(1);           // 2.71828...

// For comparison (floating point tolerance)
const double EPS = 1e-9;
if (abs(a - b) < EPS) // a == b

// For "infinity" in algorithms
const int INF = 1e9;           // For int (won't overflow on add)
const int INF = INT_MAX / 2;   // Safe for addition
const long long INF = 1e18;    // For long long
const long long INF = LLONG_MAX / 2;
```

### Useful Mathematical Facts

```cpp
// Factorials
10! = 3,628,800             // Fits in int
12! = 479,001,600           // Last to fit in int
13! = 6,227,020,800         // Needs long long
20! ≈ 2.4 × 10¹⁸            // Last to fit in long long
21! overflows long long!

// Powers of 2
2¹⁰ = 1,024 ≈ 10³
2²⁰ = 1,048,576 ≈ 10⁶
2³⁰ = 1,073,741,824 ≈ 10⁹
2³² = 4,294,967,296 ≈ 4 × 10⁹ (unsigned int max + 1)
2⁶⁴ ≈ 1.8 × 10¹⁹

// Fibonacci
F(45) = 1,134,903,170       // Last to fit in int
F(92) = 7,540,113,804,746,346,429  // Last to fit in long long

// Catalan numbers (combinatorics)
C(17) = 129,644,790         // Fits in int
C(35) = 3,116,285,494,907,301,262  // Fits in long long
```

---

## ✅ Edge Cases Checklist

### Array/Vector Edge Cases

```cpp
// Always test:
□ Empty array (n = 0)
□ Single element (n = 1)
□ Two elements (n = 2)
□ All same elements
□ Already sorted (ascending)
□ Reverse sorted (descending)
□ Maximum size (n = max constraint)
□ Negative numbers
□ Zero values
□ INT_MAX / INT_MIN values
□ Duplicates at boundaries
```

### String Edge Cases

```cpp
// Always test:
□ Empty string (s = "")
□ Single character (s = "a")
□ All same character (s = "aaa")
□ Palindrome
□ All unique characters
□ Maximum length
□ Spaces/special characters (if allowed)
□ Case sensitivity (if relevant)
```

### Graph Edge Cases

```cpp
// Always test:
□ Empty graph (no edges)
□ Single node
□ Disconnected graph
□ Complete graph
□ Tree (n-1 edges)
□ Cycle
□ Self-loop (if allowed)
□ Multiple edges between same nodes
□ Negative edge weights (if allowed)
□ All edges same weight
```

### Tree Edge Cases

```cpp
// Always test:
□ Empty tree (null root)
□ Single node
□ Skewed tree (all left or all right)
□ Perfect/complete binary tree
□ Maximum depth
□ All same values
□ Negative values (if allowed)
```

### Number Edge Cases

```cpp
// Always test:
□ Zero (0)
□ Negative zero (-0 for floating point)
□ INT_MAX (2,147,483,647)
□ INT_MIN (-2,147,483,648)
□ Powers of 2
□ One less than power of 2
□ Prime numbers
□ Perfect squares
□ Negative numbers
□ Very small positive (1)
□ Very large (max constraint)
```

### Binary Search Edge Cases

```cpp
// Always test:
□ Target at index 0
□ Target at last index
□ Target not in array
□ Target smaller than all elements
□ Target larger than all elements
□ All elements are target
□ Single element equals target
□ Single element doesn't equal target
□ Two elements
```

---

## 🖥️ Platform-Specific Constraints

### LeetCode

```cpp
// Typical constraints
n ≤ 10⁵ (most problems)
n ≤ 10³ (allows O(n²))
n ≤ 10⁴ (O(n²) risky)
Values: -10⁹ to 10⁹ (fits in int)

// Time limit: Usually generous
// Memory: 256 MB typical

// Fast I/O not needed (uses function calls)
```

### Codeforces

```cpp
// Typical constraints
n ≤ 2 × 10⁵ (common)
n ≤ 10⁶ (harder problems)
Time: 1-2 seconds
Memory: 256 MB (standard)

// Fast I/O REQUIRED for large input
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

### HackerRank

```cpp
// Varies by problem
// Often has multiple test cases
// Time limits can be strict
// Fast I/O recommended

// Multiple test cases pattern
int t;
cin >> t;
while (t--) {
    // solve
}
```

### Google/FAANG Interviews

```cpp
// Focus on:
- Optimal time complexity
- Clean, readable code
- Handle all edge cases
- Discuss trade-offs

// Typical expectations:
n ≤ 10⁵ to 10⁶
Time: O(n) or O(n log n)
Space: O(1) to O(n)
```

---

## 📋 Quick Reference Cheatsheet

### Numbers to Memorize

| Value | Meaning | Use Case |
|-------|---------|----------|
| 10⁹ | ~INT_MAX / 2 | Safe int limit |
| 2 × 10⁹ | ~INT_MAX | Max positive int |
| 10¹⁸ | ~LLONG_MAX / 9 | Safe long long |
| 10⁹ + 7 | Common modulo | Modular arithmetic |
| 10⁵ | Typical n limit | O(n log n) problems |
| 10⁴ | O(n²) threshold | When O(n²) is OK |
| 20-25 | 2ⁿ threshold | Bitmask/subset problems |
| 10 | n! threshold | Permutation problems |

### Quick Type Selection

```cpp
// Default
int x;                  // Values ≤ 10⁹

// Large values
long long x;           // Values > 2×10⁹

// Large sums
long long sum = 0;     // Sum of many ints

// Products
long long prod = 1LL * a * b;  // Multiply ints

// Modular
const int MOD = 1e9 + 7;
((1LL * a * b) % MOD)
```

### Fast I/O Template

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Your code here

    return 0;
}
```

### Infinity Values

```cpp
// For shortest path, DP
const int INF = 1e9;           // int infinity
const long long INF = 1e18;    // long long infinity

// For comparisons (safe for addition)
const int INF = INT_MAX / 2;
const long long INF = LLONG_MAX / 2;
```

---

## 🎯 Interview Tips

1. **Always ask for constraints first** - Determines algorithm choice
2. **State assumptions explicitly** - "I'm assuming n ≤ 10⁵"
3. **Check for overflow** - Especially with multiplication and sums
4. **Use appropriate data types** - `long long` when in doubt
5. **Test edge cases mentally** - Before coding, walk through edge cases
6. **Know your constants** - INT_MAX, 10⁹+7, complexity thresholds

---

*Last Updated: December 19, 2025*
