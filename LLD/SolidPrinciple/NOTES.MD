# SOLID Principles – Personal Notes (Java)

These notes summarize **all five SOLID principles** with simple intuition, interview-friendly definitions, and **Java examples**. Written in a beginner-friendly way, based on real confusion points.

---

## S – Single Responsibility Principle (SRP)

### What it means (simple words)

A class should have **only one reason to change**.

➡️ One class = one job

### Why we need it

If one class does many things, a change in one feature can break others.

### Bad Example (violates SRP)

```java
class UserService {
    void addUser() {
        // add user to DB
    }

    void sendEmail() {
        // send email
    }
}
```

❌ This class handles **user logic + email logic**.

### Good Example (follows SRP)

```java
class UserService {
    void addUser() {
        // add user to DB
    }
}

class EmailService {
    void sendEmail() {
        // send email
    }
}
```

✅ Each class has **one responsibility**.

### Interview Definition

> SRP states that a class should have only one reason to change.

---

## O – Open/Closed Principle (OCP)

### What it means (simple words)

Classes should be:

* **Open for extension**
* **Closed for modification**

➡️ Add new behavior **without changing existing code**.

### Real Example: Notification System

### Bad Example (violates OCP)

```java
class NotificationService {
    void send(String type) {
        if (type.equals("EMAIL")) {
            // send email
        } else if (type.equals("SMS")) {
            // send sms
        }
    }
}
```

❌ Every new notification type requires modifying this class.

### Good Example (follows OCP)

```java
interface Notification {
    void send();
}

class EmailNotification implements Notification {
    public void send() {
        System.out.println("Email sent");
    }
}

class SMSNotification implements Notification {
    public void send() {
        System.out.println("SMS sent");
    }
}
```

```java
class NotificationService {
    void send(Notification notification) {
        notification.send();
    }
}
```

✅ Add new notification types without touching existing code.

### Interview Definition

> OCP says software entities should be open for extension but closed for modification.

---

## L – Liskov Substitution Principle (LSP)

### What it means (very simple)

If **B is a child of A**, then we should be able to replace **A with B** without breaking the program.

➡️ Child class should **not surprise** parent class users.

### Core Intuition

If code works with a **parent class**, it must also work with **any child class**.

### Key Rule

Child classes must **not change the expected behavior** of parent classes.

### Interview Definition

> Objects of a superclass should be replaceable with objects of its subclasses without affecting correctness.

---

## I – Interface Segregation Principle (ISP)

### What it means (simple words)

Don't force a class to implement methods it **does not use**.

➡️ Many small interfaces > one big interface

### Bad Example (violates ISP)

```java
interface Machine {
    void print();
    void scan();
    void fax();
}
```

```java
class SimplePrinter implements Machine {
    public void print() {}
    public void scan() {}
    public void fax() {
        // not supported
    }
}
```

❌ Forced to implement `fax()`.

### Good Example (follows ISP)

```java
interface Printer {
    void print();
}

interface Scanner {
    void scan();
}

interface Fax {
    void fax();
}
```

```java
class SimplePrinter implements Printer, Scanner {
    public void print() {}
    public void scan() {}
}
```

✅ Class only implements what it needs.

### Interview Definition

> ISP states that no client should be forced to depend on methods it does not use.

---

## D – Dependency Inversion Principle (DIP)

### This is the HARDEST one – explained simply

### What it means

High-level modules should **not depend on low-level modules**.
Both should depend on **abstractions**.

➡️ Depend on **interfaces**, not concrete classes.

---

### Real Use Case: Notification System

#### Step 1: Abstraction

```java
interface Notification {
    void send(String message);
}
```

#### Step 2: Low-level modules

```java
class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SMSNotification implements Notification {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}
```

#### Step 3: High-level module

```java
class NotificationService {
    private Notification notification;

    public NotificationService(Notification notification) {
        this.notification = notification;
    }

    void notifyUser(String message) {
        notification.send(message);
    }
}
```

#### Step 4: Wiring (Main class)

```java
public class Main {
    public static void main(String[] args) {
        Notification email = new EmailNotification();
        NotificationService service1 = new NotificationService(email);
        service1.notifyUser("Hello Email");

        Notification sms = new SMSNotification();
        NotificationService service2 = new NotificationService(sms);
        service2.notifyUser("Hello SMS");
    }
}
```

### Why this is DIP

* High-level (`NotificationService`) depends on **Notification interface**
* Low-level (`Email`, `SMS`) also depend on the same interface
* Easy to add WhatsApp / Push later

### Interview Definition

> DIP states that high-level modules should not depend on low-level modules; both should depend on abstractions.

---

## Java Fundamentals Used in SOLID (Very Important)

This section explains **access modifiers**, **superclass usage**, and **interfaces vs classes** — concepts that are essential to truly understand SOLID.

---

## Access Modifiers in Java

Access modifiers control **who can access what**.

### Types of Access Modifiers

| Modifier             | Same Class | Same Package | Subclass (diff package) | Everywhere |
| -------------------- | ---------- | ------------ | ----------------------- | ---------- |
| public               | ✅          | ✅            | ✅                       | ✅          |
| protected            | ✅          | ✅            | ✅                       | ❌          |
| default (no keyword) | ✅          | ✅            | ❌                       | ❌          |
| private              | ✅          | ❌            | ❌                       | ❌          |

---

### Example

```java
package a;

public class Parent {
    public int a = 1;
    protected int b = 2;
    int c = 3;        // default
    private int d = 4;
}
```

```java
package a;

class SamePackage {
    void test() {
        Parent p = new Parent();
        p.a = 1; // ✅
        p.b = 2; // ✅
        p.c = 3; // ✅
        // p.d ❌ private
    }
}
```

```java
package b;

class Child extends Parent {
    void test() {
        a = 1; // ✅
        b = 2; // ✅ (protected works in subclass)
        // c ❌ default
        // d ❌ private
    }
}
```

### Interview Line

> `protected` is accessible within the same package and subclasses.

---

## What is a Superclass?

A **superclass** is a parent class from which another class inherits.

```java
class Vehicle {
    void move() {
        System.out.println("Vehicle moving");
    }
}

class Car extends Vehicle {
}
```

Here:

* `Vehicle` → superclass
* `Car` → subclass

---

## When to Use Inheritance (Superclass)

✅ Use when:

* IS-A relationship exists (Car IS-A Vehicle)
* Child truly behaves like parent (LSP)

❌ Do NOT use when:

* Behavior is different
* You only want code reuse

👉 Prefer **composition** over inheritance.

---

## What is `super` keyword?

Used to access **parent class constructor or methods**.

### Example

```java
class Animal {
    Animal(String name) {
        System.out.println(name);
    }
}

class Dog extends Animal {
    Dog() {
        super("Dog"); // calls parent constructor
    }
}
```

---

## Interface in Java

An **interface** defines WHAT a class should do, not HOW.

```java
interface Payment {
    void pay();
}
```

```java
class UpiPayment implements Payment {
    public void pay() {
        System.out.println("Paid via UPI");
    }
}
```

---

## Interface vs Class (VERY IMPORTANT)

| Feature              | Interface           | Class           |
| -------------------- | ------------------- | --------------- |
| Methods              | Abstract by default | Can be concrete |
| Fields               | public static final | Any access      |
| Multiple inheritance | ✅ allowed           | ❌ not allowed   |
| Constructor          | ❌ no                | ✅ yes           |
| Use case             | Abstraction         | Implementation  |

---

## Why Interfaces are Used in SOLID

* OCP → extend behavior
* ISP → split responsibilities
* DIP → depend on abstraction

Interfaces are the **backbone of SOLID**.

---

## Updated One-Line SOLID Summary (Interview Ready)

* **S** → One class, one job
* **O** → Add new code, don’t modify old code
* **L** → Child must not break parent expectations
* **I** → Small interfaces are better
* **D** → Depend on interfaces, not concrete classes

---

✅ These notes now include **SOLID + Java fundamentals**, exactly how interviewers expect.
