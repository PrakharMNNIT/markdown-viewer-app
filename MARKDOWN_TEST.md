# Markdown Rendering Test Document

## Table of Contents

- [Headers](#headers)
- [Text Formatting](#text-formatting)
- [Lists](#lists)
- [Links and Images](#links-and-images)
- [Code Blocks](#code-blocks)
- [Math Syntax](#math-syntax)
- [Tables](#tables)
- [Blockquotes](#blockquotes)
- [Mermaid Diagrams](#mermaid-diagrams)
- [Miscellaneous](#miscellaneous)

---

# H1 - Main Header

## H2 - Secondary Header

### H3 - Tertiary Header

#### H4 - Fourth Level

##### H5 - Fifth Level

###### H6 - Sixth Level

---

## Text Formatting

**Bold text** and **also bold**

_Italic text_ and _also italic_

**_Bold and italic_** and **_also bold italic_**

~~Strikethrough text~~

==Highlighted text== (if supported)

`Inline code snippet`

<u>Underlined text</u> (HTML)

<mark>Marked/highlighted text</mark> (HTML)

Text with H~2~O subscript (if supported)

Text with X^2^ superscript (if supported)

HTML subscript: H<sub>2</sub>O and superscript: x<sup>2</sup>

> [!NOTE]
> This is a note callout (GitHub style)

> [!WARNING]
> This is a warning callout

> [!TIP]
> This is a tip callout

> [!IMPORTANT]
> This is an important callout

> [!CAUTION]
> This is a caution callout

---

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
    - Deep nested 2.2.1
- Item 3

- Alternative bullet
- Another item

- Plus sign bullet
- Another item

### Ordered Lists

1. First item
2. Second item
   1. Nested numbered 2.1
   2. Nested numbered 2.2
      1. Deep nested 2.2.1
3. Third item

### Mixed Lists

1. Ordered item
   - Unordered nested
   - Another unordered
2. Back to ordered
   1. Nested ordered
      - Mixed deep nesting

### Task Lists / Checkboxes

- [x] Completed task
- [x] Another completed
- [ ] Incomplete task
- [ ] Another incomplete
  - [x] Nested completed
  - [ ] Nested incomplete

### Definition Lists (if supported)

Term 1
: Definition for term 1

Term 2
: Definition for term 2
: Another definition for term 2

---

## Links and Images

### Links

[Basic link](https://example.com)

[Link with title](https://example.com 'Hover title text')

<https://autolink-url.com>

<email@example.com>

[Reference style link][ref1]

[Another reference][ref2]

[ref1]: https://example.com 'Reference 1'
[ref2]: https://example.org 'Reference 2'

### Images

![Alt text for image](https://via.placeholder.com/300x150 'Image title')

[![Clickable image](https://via.placeholder.com/200x100)](https://example.com)

![Reference image][img1]

[img1]: https://via.placeholder.com/250x125 'Reference image'

### Image with sizing (HTML)

<img src="https://via.placeholder.com/400x200" alt="Sized image" width="400" height="200">

---

## Code Blocks

### Inline Code

Use `console.log()` for debugging. The `<div>` element is a container. Run `npm install` first.

### JavaScript / TypeScript

```javascript
// JavaScript Example
const greeting = 'Hello, World!';
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
```

```typescript
// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;
}

type Status = 'pending' | 'approved' | 'rejected';

function processUser<T extends User>(user: T): void {
  console.log(`Processing ${user.name}`);
}

const users: User[] = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];
```

### Python

```python
# Python Example
from typing import List, Optional
import asyncio

def fibonacci(n: int) -> List[int]:
    """Generate Fibonacci sequence up to n terms."""
    sequence = []
    a, b = 0, 1
    for _ in range(n):
        sequence.append(a)
        a, b = b, a + b
    return sequence

class DataProcessor:
    def __init__(self, data: List[dict]):
        self.data = data

    async def process(self) -> Optional[dict]:
        results = [item for item in self.data if item.get('active')]
        return results[0] if results else None

# List comprehension with condition
squares = [x**2 for x in range(10) if x % 2 == 0]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}

# Lambda and map
doubled = list(map(lambda x: x * 2, [1, 2, 3, 4, 5]))
```

### Java

```java
// Java Example
package com.example;

import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Stream API
        List<String> filtered = names.stream()
            .filter(name -> name.length() > 3)
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        // Lambda expression
        names.forEach(name -> System.out.println("Hello, " + name));
    }

    // Generic method
    public static <T extends Comparable<T>> T findMax(List<T> list) {
        return Collections.max(list);
    }
}

// Record (Java 14+)
record Person(String name, int age) {}

// Sealed class (Java 17+)
sealed interface Shape permits Circle, Rectangle {}
final class Circle implements Shape { double radius; }
final class Rectangle implements Shape { double width, height; }
```

### C++

```cpp
// C++ Example
#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>
#include <string>

template<typename T>
class Container {
private:
    std::vector<T> items;
public:
    void add(T item) { items.push_back(std::move(item)); }
    size_t size() const { return items.size(); }

    // Iterator support
    auto begin() { return items.begin(); }
    auto end() { return items.end(); }
};

int main() {
    // Smart pointers
    auto ptr = std::make_unique<int>(42);
    auto shared = std::make_shared<std::string>("Hello");

    // Lambda with capture
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int multiplier = 3;
    std::transform(nums.begin(), nums.end(), nums.begin(),
        [multiplier](int n) { return n * multiplier; });

    // Range-based for loop
    for (const auto& n : nums) {
        std::cout << n << " ";
    }

    // Structured bindings (C++17)
    std::pair<int, std::string> p{1, "one"};
    auto [num, str] = p;

    return 0;
}
```

### C

```c
// C Example
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
} Person;

// Function pointer type
typedef int (*Comparator)(const void*, const void*);

int compare_persons(const void* a, const void* b) {
    return ((Person*)a)->age - ((Person*)b)->age;
}

int main() {
    // Dynamic memory allocation
    Person* people = malloc(3 * sizeof(Person));

    strcpy(people[0].name, "Alice");
    people[0].age = 30;

    // Function pointer usage
    qsort(people, 3, sizeof(Person), compare_persons);

    // Pointer arithmetic
    for (Person* p = people; p < people + 3; p++) {
        printf("%s: %d\n", p->name, p->age);
    }

    free(people);
    return 0;
}
```

### Rust

```rust
// Rust Example
use std::collections::HashMap;

#[derive(Debug, Clone)]
struct User {
    name: String,
    age: u32,
}

impl User {
    fn new(name: &str, age: u32) -> Self {
        Self {
            name: name.to_string(),
            age,
        }
    }
}

fn main() {
    // Pattern matching
    let value = Some(42);
    match value {
        Some(n) if n > 0 => println!("Positive: {}", n),
        Some(n) => println!("Non-positive: {}", n),
        None => println!("No value"),
    }

    // Iterator chain
    let numbers: Vec<i32> = (1..=10)
        .filter(|n| n % 2 == 0)
        .map(|n| n * n)
        .collect();

    // HashMap
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert("Alice".to_string(), 100);

    // Closure
    let add = |a: i32, b: i32| -> i32 { a + b };
}
```

### Go

```go
// Go Example
package main

import (
    "fmt"
    "sync"
)

type Server struct {
    mu      sync.Mutex
    clients map[string]chan string
}

func (s *Server) AddClient(id string) <-chan string {
    s.mu.Lock()
    defer s.mu.Unlock()

    ch := make(chan string, 10)
    s.clients[id] = ch
    return ch
}

func main() {
    // Goroutine and channel
    ch := make(chan int)

    go func() {
        for i := 0; i < 5; i++ {
            ch <- i
        }
        close(ch)
    }()

    // Range over channel
    for n := range ch {
        fmt.Println(n)
    }

    // Slice operations
    nums := []int{1, 2, 3, 4, 5}
    doubled := make([]int, len(nums))
    for i, n := range nums {
        doubled[i] = n * 2
    }

    // Map
    scores := map[string]int{
        "Alice": 100,
        "Bob":   85,
    }
}
```

### Shell / Bash

```bash
#!/bin/bash

# Variables
NAME="World"
COUNT=5

# Function
greet() {
    local name="$1"
    echo "Hello, $name!"
}

# Conditional
if [ "$COUNT" -gt 3 ]; then
    echo "Count is greater than 3"
elif [ "$COUNT" -eq 3 ]; then
    echo "Count is exactly 3"
else
    echo "Count is less than 3"
fi

# Loop
for i in {1..5}; do
    echo "Iteration $i"
done

# Array
fruits=("apple" "banana" "cherry")
for fruit in "${fruits[@]}"; do
    echo "Fruit: $fruit"
done

# Command substitution
current_date=$(date +%Y-%m-%d)
echo "Today is: $current_date"

# Pipe and redirection
cat file.txt | grep "pattern" | sort | uniq > output.txt
```

### SQL

```sql
-- SQL Example
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Complex query with CTE
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', sale_date) AS month,
        SUM(amount) AS total_sales
    FROM sales
    WHERE sale_date >= '2024-01-01'
    GROUP BY DATE_TRUNC('month', sale_date)
)
SELECT
    month,
    total_sales,
    LAG(total_sales) OVER (ORDER BY month) AS prev_month_sales,
    ROUND((total_sales - LAG(total_sales) OVER (ORDER BY month)) /
          LAG(total_sales) OVER (ORDER BY month) * 100, 2) AS growth_pct
FROM monthly_sales
ORDER BY month;

-- Window function example
SELECT
    department,
    employee_name,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sample Page</title>
    <style>
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>
    <main class="container">
      <article>
        <h1>Welcome</h1>
        <p>This is a sample paragraph.</p>
      </article>
    </main>
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        console.log('Page loaded');
      });
    </script>
  </body>
</html>
```

### CSS / SCSS

```css
/* CSS Example */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing);
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .container {
    padding: calc(var(--spacing) / 2);
  }
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
```

```scss
// SCSS Example
$primary: #3498db;
$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
);

@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

.component {
  padding: 1rem;

  &__title {
    font-size: 1.5rem;
    color: $primary;
  }

  &__content {
    @include respond-to('md') {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &--highlighted {
    background: lighten($primary, 40%);
  }
}
```

### JSON

```json
{
  "name": "markdown-test",
  "version": "1.0.0",
  "description": "A comprehensive markdown test",
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  },
  "scripts": {
    "start": "node index.js",
    "build": "tsc && webpack"
  },
  "config": {
    "database": {
      "host": "localhost",
      "port": 5432,
      "name": "testdb"
    },
    "features": ["auth", "api", "notifications"],
    "enabled": true
  }
}
```

### YAML

```yaml
# YAML Example - Docker Compose
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/app
    depends_on:
      - db
      - redis
    volumes:
      - ./app:/usr/src/app
      - /usr/src/app/node_modules
    networks:
      - app-network
    deploy:
      replicas: 3
      restart_policy:
        condition: on-failure

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: app
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

### XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appSettings>
        <add key="ApiUrl" value="https://api.example.com"/>
        <add key="Timeout" value="30"/>
    </appSettings>

    <connectionStrings>
        <add name="DefaultConnection"
             connectionString="Server=localhost;Database=TestDB;"
             providerName="System.Data.SqlClient"/>
    </connectionStrings>

    <system.web>
        <compilation debug="true" targetFramework="4.8"/>
        <httpRuntime targetFramework="4.8"/>
    </system.web>
</configuration>
```

### R

```r
# R Example
library(tidyverse)
library(ggplot2)

# Data manipulation with dplyr
data <- mtcars %>%
  filter(mpg > 20) %>%
  group_by(cyl) %>%
  summarise(
    avg_mpg = mean(mpg),
    avg_hp = mean(hp),
    count = n()
  ) %>%
  arrange(desc(avg_mpg))

# Function definition
calculate_stats <- function(x, na.rm = TRUE) {
  list(
    mean = mean(x, na.rm = na.rm),
    sd = sd(x, na.rm = na.rm),
    median = median(x, na.rm = na.rm)
  )
}

# ggplot2 visualization
ggplot(mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3, alpha = 0.7) +
  geom_smooth(method = "lm", se = FALSE) +
  labs(
    title = "MPG vs Weight by Cylinders",
    x = "Weight (1000 lbs)",
    y = "Miles per Gallon",
    color = "Cylinders"
  ) +
  theme_minimal()
```

### Diff

```diff
--- a/file.txt
+++ b/file.txt
@@ -1,5 +1,5 @@
 Line 1
-Line 2 (removed)
+Line 2 (added)
 Line 3
-Old line 4
+New line 4
 Line 5
```

### Markdown (nested)

```markdown
# Nested Markdown

This is **markdown** inside a code block.

- List item
- Another item

[Link](https://example.com)
```

### Plain text / No highlighting

```
This is plain text without syntax highlighting.
It preserves spacing and formatting.
    Indented text here.
```

---

## Math Syntax

### 1️⃣ Inline Math – Basic & Edge Cases

**Simple letters & numbers:** $a, b, c, 1, 2, 3$

**Subscripts & superscripts (including nesting):** $x_i$, $y^{2}$, $z_{i}^{\,j}$, $a_{b_{c}}^{d^{e}}$

**Euler's identity:** $e^{i\pi}+1=0$

**Fractions inline:** $\frac{p}{q}$ and display-style inline: $\dfrac{a+b}{c+d}$, text-style: $\tfrac{x}{y}$

**Binomial/choose notation:** $\binom{n}{k}$ and ${n \choose k}$

**Roots with optional index:** $\sqrt{x}$, $\sqrt[3]{8}$, $\sqrt[n]{a}$

**Greek letters:** $\alpha, \beta, \gamma, \delta, \epsilon, \zeta, \eta, \theta, \iota, \kappa, \lambda, \mu$

**Greek uppercase:** $\Gamma, \Delta, \Theta, \Lambda, \Xi, \Pi, \Sigma, \Phi, \Psi, \Omega$

**Blackboard-bold sets:** $\mathbb{R}, \mathbb{Z}, \mathbb{N}, \mathbb{Q}, \mathbb{C}, \mathbb{H}$

**Calligraphic, fraktur, script fonts:** $\mathcal{F}, \mathcal{L}, \mathfrak{g}, \mathfrak{S}, \mathscr{L}, \mathscr{H}$

**Bold/italic/sans-serif in math:** $\mathbf{ABC}, \mathsf{ABC}, \mathit{ABC}, \mathrm{ABC}$

**Accents:** $\hat{x}, \tilde{y}, \bar{z}, \dot{u}, \ddot{v}, \acute{a}, \grave{e}, \breve{o}, \check{c}$

**Vectors & arrow notation:** $\vec{a}, \overrightarrow{AB}, \overleftarrow{CD}, \widehat{ABC}$

**Over/under braces with annotations:**

- $\overbrace{1+2+ \dots +n}^{\text{n terms}}$
- $\underbrace{a_1 + a_2 + \dots + a_n}_{\text{sum}}$

**Strikethrough/cancel:** $\cancel{(x+y)}$, $\bcancel{abc}$, $\xcancel{xyz}$

**Color in math:** $\color{red}{x^2} + \color{blue}{y^2} = \color{green}{z^2}$

**Boxed expression:** $\boxed{E = mc^2}$

**Multiple inline formulas on a single line (spacing test):**
The quadratic formula is $x = \frac{-b\pm\sqrt{b^{2}-4ac}}{2a}$ while the discriminant is $D = b^{2}-4ac$ and the roots satisfy $ax^{2}+bx+c=0$.

---

### 2️⃣ Display (Block) Math – Standard & Edge Cases

#### 2.1 Simple displayed equations

$$
\int_{0}^{\infty} e^{-x^{2}}\,dx = \frac{\sqrt{\pi}}{2}
$$

$$
\lim_{n\to\infty}\frac{1}{n}\sum_{k=1}^{n}k = \frac{1}{2}
$$

#### 2.2 Large operators with limits

$$
\sum_{i=1}^{n}\sum_{j=1}^{m} a_{ij}
\qquad
\prod_{k=1}^{\infty}\left(1+\frac{1}{k^{2}}\right)
\qquad
\bigcup_{i\in I} A_i
\qquad
\bigcap_{i=1}^{n} B_i
$$

$$
\limsup_{x\to 0}\frac{\sin x}{x}=1,
\qquad
\liminf_{n\to\infty}\frac{a_n}{b_n}=0
$$

#### 2.3 Multi-line alignment

$$
\begin{aligned}
f(x) &= ax^{2}+bx+c \\
f'(x) &= 2ax+b \\
\int_{0}^{1}x^{n}\,dx &= \frac{1}{n+1}
\end{aligned}
$$

#### 2.4 cases (piece-wise definitions)

$$
f(x)=
\begin{cases}
x^{2}          & \text{if } x\ge 0,\\[4pt]
-x             & \text{if } x<0.
\end{cases}
$$

$$
|x| =
\begin{cases}
x & x \geq 0 \\
-x & x < 0
\end{cases}
$$

#### 2.5 All Matrix Types

$$
A=\begin{pmatrix}
1 & 0 & 0\\
0 & \cos\theta & -\sin\theta\\
0 & \sin\theta & \phantom{-}\cos\theta
\end{pmatrix},
\qquad
B=\begin{bmatrix}
a & b\\
c & d
\end{bmatrix}
$$

$$
\det C=\begin{vmatrix}
x & y\\
z & w
\end{vmatrix},
\qquad
D=\begin{Vmatrix}
p & q\\
r & s
\end{Vmatrix}
$$

---

### 3️⃣ Delimiters

**Auto-sizing with \\left \\right:**

$$
\left(
  \frac{a}{b}
\right),
\quad
\left[
  \frac{1}{1+\displaystyle\frac{x}{y}}
\right],
\quad
\left\langle
  \sum_{i=1}^{n} i
\right\rangle
$$

**Floor, ceiling, and absolute value:**

$$
\lfloor x \rfloor, \quad \lceil y \rceil, \quad |z|, \quad \|v\|
$$

---

### 4️⃣ Advanced Symbols

| Symbol                 | LaTeX Code                             | Rendered                             |
| ---------------------- | -------------------------------------- | ------------------------------------ |
| **Implication**        | `$A \implies B$`                       | $A \implies B$                       |
| **Equivalence**        | `$A \iff B$`                           | $A \iff B$                           |
| **Logical operators**  | `$p \land q,\; p \lor q,\; \neg p$`    | $p \land q,\; p \lor q,\; \neg p$    |
| **Set builder**        | `$\{x\in\mathbb{R}\mid x>0\}$`         | $\{x\in\mathbb{R}\mid x>0\}$         |
| **Function arrow**     | `$f\colon X\to Y$`                     | $f\colon X\to Y$                     |
| **Partial derivative** | `$\frac{\partial f}{\partial x}$`      | $\frac{\partial f}{\partial x}$      |
| **Nabla / gradient**   | `$\nabla f$`                           | $\nabla f$                           |
| **Infinity**           | `$\infty$`                             | $\infty$                             |
| **Relations**          | `$x\sim y,\; x\approx y,\; x\equiv y$` | $x\sim y,\; x\approx y,\; x\equiv y$ |

---

### 5️⃣ Calculus & Analysis

$$
\frac{d}{dx}\left( \int_{a}^{x} f(t)\,dt \right) = f(x)
$$

$$
\nabla \times \vec{E} = -\frac{\partial \vec{B}}{\partial t}
$$

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
\frac{\partial^2 u}{\partial t^2} = c^2 \nabla^2 u
$$

---

### 6️⃣ Continued Fractions

$$
\cfrac{1}{1 + \cfrac{1}{1 + \cfrac{1}{1 + \cfrac{1}{1 + x}}}}
$$

---

### 7️⃣ Special Functions

$$
\Gamma(n) = (n-1)! = \int_0^\infty t^{n-1}e^{-t}dt
$$

$$
\mathcal{L}\{f(t)\} = \int_0^\infty f(t)e^{-st}dt = F(s)
$$

$$
\forall x \in \mathbb{R}, \exists y \in \mathbb{N} : y > x
$$

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}
$$

---

### 8️⃣ Physics Equations

**Maxwell's Equations:**

$$
\begin{aligned}
\nabla \cdot \vec{E} &= \frac{\rho}{\epsilon_0} \\
\nabla \cdot \vec{B} &= 0 \\
\nabla \times \vec{E} &= -\frac{\partial \vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0\vec{J} + \mu_0\epsilon_0\frac{\partial \vec{E}}{\partial t}
\end{aligned}
$$

**Schrödinger Equation:**

$$
i\hbar\frac{\partial}{\partial t}\Psi(\vec{r},t) = \left[-\frac{\hbar^2}{2m}\nabla^2 + V(\vec{r},t)\right]\Psi(\vec{r},t)
$$

**Einstein Field Equations:**

$$
R_{\mu\nu} - \frac{1}{2}Rg_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4}T_{\mu\nu}
$$

---

## Tables

### Basic Table

| Header 1 | Header 2
