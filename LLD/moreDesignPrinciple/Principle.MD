# Other Important Design Principles (Beyond SOLID)

These are **core software design principles** frequently asked in **LLD / HLD interviews** and heavily used in real-world systems.

They help you write **clean, maintainable, scalable code**.

---

## 1. DRY – Don’t Repeat Yourself

### Meaning (simple)

> Do not write the same logic again and again.

### Why it exists

* Duplicate code = hard to maintain
* Bug fix in one place, forgotten in another

### Bad Example (violates DRY)

```java
int calculateDiscount(int price) {
    return price * 10 / 100;
}

int calculateOffer(int price) {
    return price * 10 / 100;
}
```

### Good Example (follows DRY)

```java
int discount(int price) {
    return price * 10 / 100;
}
```

### Interview Line

> DRY says every piece of knowledge should have a single, unambiguous representation.

---

## 2. KISS – Keep It Simple, Stupid

### Meaning

> Simpler solutions are better than complex ones.

### Bad Example

```java
if (isValid == true) {
    return true;
} else {
    return false;
}
```

### Good Example

```java
return isValid;
```

### Interview Line

> KISS encourages simple, readable solutions over clever code.

---

## 3. YAGNI – You Aren’t Gonna Need It

### Meaning

> Don’t build features until you actually need them.

### Why

* Overengineering
* Wasted time

### Example

❌ Adding payment gateway before product launch

### Interview Line

> YAGNI advises against implementing unused functionality.

---

## 4. Composition Over Inheritance

### Meaning

> Prefer HAS-A relationship over IS-A.

### Bad Example (Inheritance misuse)

```java
class Car extends Engine {}
```

### Good Example (Composition)

```java
class Car {
    private Engine engine;
}
```

### Why

* Avoids tight coupling
* Flexible design

---

## 5. Law of Demeter (Principle of Least Knowledge)

### Meaning

> Talk only to your immediate friends.

### Bad Example

```java
order.getCustomer().getAddress().getCity();
```

### Good Example

```java
order.getCustomerCity();
```

### Why

* Reduces coupling
* Easier refactoring

---

## 6. Separation of Concerns (SoC)

### Meaning

> Each module handles one concern.

### Example

* Controller → request handling
* Service → business logic
* Repository → database

---

## 7. High Cohesion, Low Coupling

### High Cohesion

* Class does closely related things

### Low Coupling

* Classes depend minimally on each other

### Goal

> Changes in one class should not break many others.

---

## 8. Fail Fast Principle

### Meaning

> Fail early if something is wrong.

### Example

```java
if (user == null) {
    throw new IllegalArgumentException("User cannot be null");
}
```

---

## 9. Encapsulation

### Meaning

> Hide internal details, expose only what is needed.

### Example

```java
class User {
    private String password;

    public void changePassword(String pwd) {
        this.password = pwd;
    }
}
```

---

## 10. Principle of Least Surprise

### Meaning

> Code should behave the way users expect.

### Example

A method named `getUser()` should not delete a user.

---

# Interview Master Summary

| Principle         | One Line                    |
| ----------------- | --------------------------- |
| DRY               | Avoid duplication           |
| KISS              | Keep solutions simple       |
| YAGNI             | Don’t build early           |
| Composition       | Prefer HAS-A                |
| Law of Demeter    | Avoid deep chains           |
| SoC               | Separate responsibilities   |
| Cohesion/Coupling | Focused & loosely connected |
| Fail Fast         | Detect errors early         |
| Encapsulation     | Hide internals              |

---

✅ These principles are **used everywhere**: Spring Boot, Microservices, System Design.
