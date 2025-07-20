**Programming Language Basics in Elementary English**

This document explains important computer programming terms. These are the basic building blocks to understand how humans talk to computers.

---

### 1. **Machine Language (or Machine Code)**

* This is the language that a computer **actually understands**.
* It is written using **binary numbers**: 0s and 1s.
* Every instruction is just a series of 1s and 0s.
* **Example:** `10110000 01100001` — This could mean "Move the value 61 into the register B0" on some processors.
* It is very **hard for humans** to read or write.
* It works **super fast** because the computer doesn't need to translate anything.

---

### 2. **Assembly Language**

* This is **one level above machine language**.
* It uses **short words or codes** (called mnemonics) instead of binary.
* Easier for humans to understand than machine code.
* Still very close to the hardware.
* **Example:**

  ```assembly
  MOV AL, 61h
  OUT 21h, AL
  ```

  This means: Move value 61 (in hex) into the register AL, then send it to port 21.
* Each assembly command usually becomes **one machine code instruction**.
* Needs an **assembler** to convert it into machine code.

---

### 3. **Low-Level Language**

* These are programming languages **close to hardware**.
* Examples: **Machine Language** and **Assembly Language**.
* They give **more control** over how the computer works.
* But they are **hard to read, write, and understand**.
* They are used when **speed and performance** matter most.

---

### 4. **High-Level Language**

* These are languages **designed for humans** to write programs easily.
* They use **English-like words and symbols**.
* Example languages:

  * **C, C++** – Compiled high-level languages, close to hardware
  * **Java** – Compiled to bytecode, runs on JVM (Java Virtual Machine)
  * **Python** – Interpreted, very easy to read
  * **JavaScript** – Interpreted in browsers
  * **C#** – Compiled to .NET runtime
  * **Ruby, PHP** – Interpreted, used in web apps
  * **Swift, Kotlin** – Modern high-level languages for iOS/Android
* One line of high-level code can do **many things at once**.
* Need a **translator** (interpreter or compiler) to convert into machine code.
* Easy to learn, write, and fix (debug).

---

### 5. **Compiler**

* A compiler is a program that **translates the whole high-level program** into machine code **at once**.
* After compiling, you get an **executable file** (a file the computer can run directly).
* Example: `.exe` file in Windows.
* It is **fast at runtime**, because everything is translated before running.
* Example languages that use compilers: **C, C++, Java (to bytecode), Rust, Go**.

---

### 6. **Interpreter**

* An interpreter is a program that **reads and runs the code line-by-line**.
* It does **not create a separate file**.
* It is **slower** than a compiler because it translates **while running**.
* Easier for testing and fixing small problems.
* Example languages that use interpreters: **Python, JavaScript, Ruby, PHP**.

---

### 7. **Assembler**

* This is a program that **translates Assembly Language into Machine Language**.
* You need this to run any code written in Assembly.

---

### 8. **Source Code**

* This is the **original code** written by a programmer in any high-level or assembly language.
* Example: Python file `.py`, C file `.c`.

---

### 9. **Object Code**

* This is the **machine-level code** created by a compiler or assembler.
* It is **not human-readable**.
* It’s ready to be run by the computer.

---

### 10. **Executable File**

* This is the **final program** that can be run on a computer.
* Created after compiling source code.
* In Windows, these usually end with `.exe`.

---

### 11. **Syntax**

* Rules of writing a program in a particular language.
* Like grammar rules in English.
* If you break the syntax rules, the code won’t run.

---

### 12. **Debugging**

* The process of **finding and fixing mistakes (bugs)** in your code.
* Bugs are errors that make the program behave badly or crash.

---

### Summary Table:

| Term              | Human-Friendly? | Needs Translation?           | Example       |
| ----------------- | --------------- | ---------------------------- | ------------- |
| Machine Code      | ❌ No            | ❌ Already Machine            | `10110000`    |
| Assembly Language | 🚫 Barely       | ✅ Needs Assembler            | `MOV A, 5`    |
| High-Level Lang   | ✅ Yes           | ✅ Needs Compiler/Interpreter | `print("Hi")` |

---

This is the basic knowledge you need before learning any programming language!
