# 🧪 Syntax Highlighting Test Cases

Test this markdown content in the application to verify all languages work correctly.

---

## **JavaScript**

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

---

## **Python**

```python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3, 6, 8, 10, 1, 2, 1]))
```

---

## **Java**

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        // Array example
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.println(num);
        }
    }
}
```

---

## **C++**

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};

    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

---

## **C# (Previously Not Working)**

```csharp
using System;
using System.Linq;

class Program
{
    static void Main()
    {
        var numbers = new[] { 1, 2, 3, 4, 5 };
        var sum = numbers.Sum();
        Console.WriteLine($"Sum: {sum}");
    }
}
```

---

## **Go**

```go
package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    sum := 0

    for _, num := range numbers {
        sum += num
    }

    fmt.Printf("Sum: %d\n", sum)
}
```

---

## **Rust**

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();

    println!("Sum: {}", sum);
}
```

---

## **TypeScript**

```typescript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person): string {
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}

const john: Person = { name: 'John', age: 30 };
console.log(greet(john));
```

---

## **PHP (Previously Not Working)**

```php
<?php
function factorial($n) {
    if ($n <= 1) return 1;
    return $n * factorial($n - 1);
}

echo "Factorial of 5: " . factorial(5);
?>
```

---

## **Ruby (Previously Not Working)**

```ruby
class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def greet
    "Hello, I'm #{@name} and I'm #{@age} years old"
  end
end

person = Person.new("Alice", 25)
puts person.greet
```

---

## **Bash/Shell (Previously Not Working)**

```bash
#!/bin/bash

# Function to calculate factorial
factorial() {
    local n=$1
    if [ $n -le 1 ]; then
        echo 1
    else
        local prev=$(factorial $((n - 1)))
        echo $((n * prev))
    fi
}

result=$(factorial 5)
echo "Factorial of 5: $result"
```

---

## **SQL**

```sql
SELECT
    u.id,
    u.username,
    COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.username
HAVING COUNT(p.id) > 5
ORDER BY post_count DESC
LIMIT 10;
```

---

## **HTML (Previously Not Working)**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sample Page</title>
  </head>
  <body>
    <h1>Welcome</h1>
    <p class="intro">This is a <strong>sample</strong> page.</p>
  </body>
</html>
```

---

## **CSS (Previously Not Working)**

```css
/* Modern CSS with custom properties */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

---

## **JSON (Previously Not Working)**

```json
{
  "name": "markdown-viewer-app",
  "version": "1.0.0",
  "description": "A professional markdown viewer",
  "features": ["syntax-highlighting", "themes", "export"],
  "config": {
    "autoSave": true,
    "theme": "default-light",
    "zoom": 100
  }
}
```

---

## **YAML (Previously Not Working)**

```yaml
# Application Configuration
app:
  name: Markdown Viewer Pro
  version: 1.0.0
  features:
    - syntax-highlighting
    - themes
    - export

database:
  host: localhost
  port: 5432
  credentials:
    username: admin
    password: ${DB_PASSWORD}

cache:
  enabled: true
  ttl: 3600
```

---

## **Kotlin (Previously Not Working)**

```kotlin
data class Person(val name: String, val age: Int)

fun main() {
    val people = listOf(
        Person("Alice", 25),
        Person("Bob", 30),
        Person("Charlie", 35)
    )

    val adults = people.filter { it.age >= 18 }
    adults.forEach { person ->
        println("${person.name} is ${person.age} years old")
    }
}
```

---

## **Swift (Previously Not Working)**

```swift
struct Person {
    var name: String
    var age: Int

    func greet() -> String {
        return "Hello, I'm \(name) and I'm \(age) years old"
    }
}

let person = Person(name: "Alice", age: 25)
print(person.greet())

// Array operations
let numbers = [1, 2, 3, 4, 5]
let doubled = numbers.map { $0 * 2 }
print("Doubled: \(doubled)")
```

---

## **Dart (Previously Not Working)**

```dart
class Person {
  String name;
  int age;

  Person(this.name, this.age);

  String greet() {
    return 'Hello, I\'m $name and I\'m $age years old';
  }
}

void main() {
  var person = Person('Alice', 25);
  print(person.greet());

  // List operations
  var numbers = [1, 2, 3, 4, 5];
  var doubled = numbers.map((n) => n * 2).toList();
  print('Doubled: $doubled');
}
```

---

## **Scala (Previously Not Working)**

```scala
object HelloWorld {
  def factorial(n: Int): Int = {
    if (n <= 1) 1
    else n * factorial(n - 1)
  }

  def main(args: Array[String]): Unit = {
    val numbers = List(1, 2, 3, 4, 5)
    val sum = numbers.reduce(_ + _)

    println(s"Sum: $sum")
    println(s"Factorial of 5: ${factorial(5)}")
  }
}
```

---

## **Markdown (Meta!)**

```markdown
# This is a heading

This is **bold** and this is _italic_.

- List item 1
- List item 2

[Link](https://example.com)

> Blockquote
```

---

## **XML**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <database>
    <host>localhost</host>
    <port>5432</port>
    <name>mydb</name>
  </database>
  <features>
    <feature name="syntax-highlighting" enabled="true" />
    <feature name="auto-save" enabled="true" />
  </features>
</configuration>
```

---

## **Docker (Dockerfile)**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

## **Test Result**

✅ **All languages should now have syntax highlighting!**

**Before Fix:** Only 8 languages (Java, C++, Python, JavaScript, TypeScript, Rust, Go, SQL)
**After Fix:** 150+ languages automatically loaded on-demand

---

## **How It Works**

1. User types ` ```csharp` in markdown
2. Marked.js generates `<pre><code class="language-csharp">...</code></pre>`
3. PrismService detects `language-csharp` class
4. Checks if C# is loaded: `Prism.languages['csharp']`
5. If not loaded, Prism autoloader fetches it from CDN
6. PrismService retries highlighting after 200ms
7. C# code is now beautifully highlighted! 🎨
