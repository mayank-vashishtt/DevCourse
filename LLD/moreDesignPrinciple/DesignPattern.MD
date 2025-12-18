# Design Patterns – Personal Notes (Java)

These notes cover **important design patterns beyond SOLID**, explained in **very simple language**, with **real intuition**, **Java examples**, and **interview relevance**.

Design patterns are **proven solutions to common software design problems**.

---

## Types of Design Patterns

1. **Creational Patterns** – How objects are created
2. **Structural Patterns** – How classes/objects are composed
3. **Behavioral Patterns** – How objects interact

---

# 🟢 CREATIONAL DESIGN PATTERNS

---

## 1. Singleton Pattern

### What problem it solves

Ensure **only one instance** of a class exists.

### Real-world example

* Database connection
* Logger
* Configuration manager

### Simple Explanation

> "I want only ONE object for the entire application."

### Java Example

```java
class Singleton {
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

### Interview Notes

* Constructor is `private`
* Instance is `static`
* Global access point

---

## 2. Factory Method Pattern

### What problem it solves

Create objects **without exposing creation logic**.

### Real-world example

* Notification creation (Email / SMS)

### Simple Explanation

> "Let a factory decide which object to create."

### Java Example

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

class NotificationFactory {
    static Notification create(String type) {
        if (type.equals("EMAIL")) return new EmailNotification();
        if (type.equals("SMS")) return new SMSNotification();
        return null;
    }
}
```

---

## 3. Builder Pattern

### What problem it solves

Create **complex objects step by step**.

### Real-world example

* User profile
* HTTP request

### Java Example

```java
class User {
    private String name;
    private int age;

    private User(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
    }

    static class Builder {
        private String name;
        private int age;

        Builder setName(String name) {
            this.name = name;
            return this;
        }

        Builder setAge(int age) {
            this.age = age;
            return this;
        }

        User build() {
            return new User(this);
        }
    }
}
```

---

# 🟡 STRUCTURAL DESIGN PATTERNS

---

## 4. Adapter Pattern

### What problem it solves

Make **incompatible interfaces work together**.

### Real-world example

* Charger adapter

### Java Example

```java
interface Payment {
    void pay();
}

class OldPaymentSystem {
    void makePayment() {}
}

class PaymentAdapter implements Payment {
    private OldPaymentSystem old;

    PaymentAdapter(OldPaymentSystem old) {
        this.old = old;
    }

    public void pay() {
        old.makePayment();
    }
}
```

---

## 5. Decorator Pattern

### What problem it solves

Add **extra behavior** without modifying existing class.

### Real-world example

* Pizza toppings

### Java Example

```java
interface Coffee {
    int cost();
}

class SimpleCoffee implements Coffee {
    public int cost() { return 50; }
}

class MilkDecorator implements Coffee {
    private Coffee coffee;

    MilkDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    public int cost() {
        return coffee.cost() + 10;
    }
}
```

---

# 🔵 BEHAVIORAL DESIGN PATTERNS

---

## 6. Strategy Pattern

### What problem it solves

Change **algorithm at runtime**.

### Real-world example

* Payment methods

### Java Example

```java
interface PaymentStrategy {
    void pay();
}

class UpiPayment implements PaymentStrategy {
    public void pay() {
        System.out.println("Paid via UPI");
    }
}

class CreditCardPayment implements PaymentStrategy {
    public void pay() {
        System.out.println("Paid via Card");
    }
}

class PaymentService {
    private PaymentStrategy strategy;

    PaymentService(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    void pay() {
        strategy.pay();
    }
}
```

---

## 7. Observer Pattern

### What problem it solves

Notify multiple objects when **state changes**.

### Real-world example

* YouTube subscribers

### Java Example

```java
interface Observer {
    void update();
}

class User implements Observer {
    public void update() {
        System.out.println("Notified");
    }
}

class Channel {
    List<Observer> observers = new ArrayList<>();

    void subscribe(Observer o) {
        observers.add(o);
    }

    void notifyUsers() {
        for (Observer o : observers) o.update();
    }
}
```

---

## 8. Command Pattern

### What problem it solves

Encapsulate a request as an object.

### Real-world example

* Remote control

### Java Example

```java
interface Command {
    void execute();
}

class LightOnCommand implements Command {
    public void execute() {
        System.out.println("Light ON");
    }
}
```

---

# Interview Tips (VERY IMPORTANT)

* SOLID = principles (rules)
* Design Patterns = solutions (implementations)

👉 Patterns **use SOLID internally**.

---

## Must-Remember Patterns for Interviews

* Singleton
* Factory
* Builder
* Strategy
* Observer
* Decorator

---

✅ These notes are written for **clear understanding + interviews + LLD rounds**.
