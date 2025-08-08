# Object-Oriented Programming (OOP) in JavaScript and Java

## Table of Contents
1. [Introduction to OOP](#introduction-to-oop)
2. [Classes and Objects](#classes-and-objects)
3. [Encapsulation](#encapsulation)
4. [Inheritance](#inheritance)
5. [Polymorphism](#polymorphism)
6. [Abstraction](#abstraction)
7. [Additional OOP Concepts](#additional-oop-concepts)

---

## Introduction to OOP

Object-Oriented Programming is a programming paradigm based on the concept of "objects" which contain data (attributes) and code (methods).

### Four Pillars of OOP:
1. **Encapsulation** - Bundling data and methods together
2. **Inheritance** - Creating new classes based on existing ones
3. **Polymorphism** - One interface, multiple implementations
4. **Abstraction** - Hiding complex implementation details

---

## Classes and Objects

### JavaScript

```javascript
// Class definition
class Car {
    // Constructor
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }
    
    // Methods
    start() {
        this.isRunning = true;
        console.log(`${this.brand} ${this.model} is now running`);
    }
    
    stop() {
        this.isRunning = false;
        console.log(`${this.brand} ${this.model} has stopped`);
    }
    
    getInfo() {
        return `${this.year} ${this.brand} ${this.model}`;
    }
}

// Creating objects
const car1 = new Car("Toyota", "Camry", 2023);
const car2 = new Car("Honda", "Civic", 2022);

// Using objects
car1.start(); // Toyota Camry is now running
console.log(car2.getInfo()); // 2022 Honda Civic
```

### Java

```java
// Class definition
public class Car {
    // Instance variables (attributes)
    private String brand;
    private String model;
    private int year;
    private boolean isRunning;
    
    // Constructor
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }
    
    // Methods
    public void start() {
        this.isRunning = true;
        System.out.println(this.brand + " " + this.model + " is now running");
    }
    
    public void stop() {
        this.isRunning = false;
        System.out.println(this.brand + " " + this.model + " has stopped");
    }
    
    public String getInfo() {
        return this.year + " " + this.brand + " " + this.model;
    }
    
    // Getters and Setters
    public String getBrand() {
        return brand;
    }
    
    public void setBrand(String brand) {
        this.brand = brand;
    }
}

// Creating and using objects
public class Main {
    public static void main(String[] args) {
        Car car1 = new Car("Toyota", "Camry", 2023);
        Car car2 = new Car("Honda", "Civic", 2022);
        
        car1.start(); // Toyota Camry is now running
        System.out.println(car2.getInfo()); // 2022 Honda Civic
    }
}
```

---

## Encapsulation

Encapsulation is about bundling data and methods together and controlling access to them.

### JavaScript

```javascript
class BankAccount {
    // Private fields (ES2022 feature)
    #balance;
    #accountNumber;
    
    constructor(accountNumber, initialBalance = 0) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
        this.accountHolder = ""; // Public property
    }
    
    // Public methods to access private data
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            console.log(`Deposited $${amount}. New balance: $${this.#balance}`);
        } else {
            console.log("Invalid deposit amount");
        }
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            console.log(`Withdrawn $${amount}. New balance: $${this.#balance}`);
        } else {
            console.log("Invalid withdrawal amount or insufficient funds");
        }
    }
    
    getBalance() {
        return this.#balance;
    }
    
    getAccountNumber() {
        return this.#accountNumber;
    }
}

// Usage
const account = new BankAccount("12345", 1000);
account.deposit(500); // Deposited $500. New balance: $1500
account.withdraw(200); // Withdrawn $200. New balance: $1300

// These won't work (private fields)
// console.log(account.#balance); // Error
// account.#balance = 5000; // Error
```

### Java

```java
public class BankAccount {
    // Private instance variables
    private double balance;
    private String accountNumber;
    private String accountHolder;
    
    // Constructor
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    // Public methods to access private data
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("Deposited $" + amount + ". New balance: $" + this.balance);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            System.out.println("Withdrawn $" + amount + ". New balance: $" + this.balance);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds");
        }
    }
    
    // Getter methods
    public double getBalance() {
        return balance;
    }
    
    public String getAccountNumber() {
        return accountNumber;
    }
    
    // Setter methods
    public void setAccountHolder(String accountHolder) {
        this.accountHolder = accountHolder;
    }
    
    public String getAccountHolder() {
        return accountHolder;
    }
}
```

---

## Inheritance

Inheritance allows a class to inherit properties and methods from another class.

### JavaScript

```javascript
// Parent class
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    makeSound() {
        console.log(`${this.name} makes a sound`);
    }
    
    eat() {
        console.log(`${this.name} is eating`);
    }
    
    sleep() {
        console.log(`${this.name} is sleeping`);
    }
}

// Child class
class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Canine"); // Call parent constructor
        this.breed = breed;
    }
    
    // Override parent method
    makeSound() {
        console.log(`${this.name} barks: Woof! Woof!`);
    }
    
    // New method specific to Dog
    fetch() {
        console.log(`${this.name} is fetching the ball`);
    }
}

// Another child class
class Cat extends Animal {
    constructor(name, breed) {
        super(name, "Feline");
        this.breed = breed;
    }
    
    // Override parent method
    makeSound() {
        console.log(`${this.name} meows: Meow! Meow!`);
    }
    
    // New method specific to Cat
    climb() {
        console.log(`${this.name} is climbing a tree`);
    }
}

// Usage
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Persian");

dog.makeSound(); // Buddy barks: Woof! Woof!
cat.makeSound(); // Whiskers meows: Meow! Meow!
dog.fetch(); // Buddy is fetching the ball
cat.climb(); // Whiskers is climbing a tree
```

### Java

```java
// Parent class
public class Animal {
    protected String name;
    protected String species;
    
    public Animal(String name, String species) {
        this.name = name;
        this.species = species;
    }
    
    public void makeSound() {
        System.out.println(this.name + " makes a sound");
    }
    
    public void eat() {
        System.out.println(this.name + " is eating");
    }
    
    public void sleep() {
        System.out.println(this.name + " is sleeping");
    }
}

// Child class
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name, "Canine"); // Call parent constructor
        this.breed = breed;
    }
    
    // Override parent method
    @Override
    public void makeSound() {
        System.out.println(this.name + " barks: Woof! Woof!");
    }
    
    // New method specific to Dog
    public void fetch() {
        System.out.println(this.name + " is fetching the ball");
    }
    
    public String getBreed() {
        return breed;
    }
}

// Another child class
public class Cat extends Animal {
    private String breed;
    
    public Cat(String name, String breed) {
        super(name, "Feline");
        this.breed = breed;
    }
    
    // Override parent method
    @Override
    public void makeSound() {
        System.out.println(this.name + " meows: Meow! Meow!");
    }
    
    // New method specific to Cat
    public void climb() {
        System.out.println(this.name + " is climbing a tree");
    }
}
```

---

## Polymorphism

Polymorphism allows objects of different types to be treated as instances of the same type through a common interface.

### JavaScript

```javascript
class Shape {
    constructor(name) {
        this.name = name;
    }
    
    area() {
        throw new Error("Area method must be implemented");
    }
    
    perimeter() {
        throw new Error("Perimeter method must be implemented");
    }
    
    display() {
        console.log(`Shape: ${this.name}`);
        console.log(`Area: ${this.area()}`);
        console.log(`Perimeter: ${this.perimeter()}`);
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
    
    perimeter() {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius * this.radius;
    }
    
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}

// Polymorphic behavior
function displayShapeInfo(shape) {
    shape.display(); // Same method call, different implementations
}

// Usage
const shapes = [
    new Rectangle(5, 3),
    new Circle(4),
    new Rectangle(2, 8)
];

shapes.forEach(shape => {
    displayShapeInfo(shape); // Polymorphism in action
    console.log("---");
});
```

### Java

```java
// Abstract parent class
public abstract class Shape {
    protected String name;
    
    public Shape(String name) {
        this.name = name;
    }
    
    // Abstract methods (must be implemented by child classes)
    public abstract double area();
    public abstract double perimeter();
    
    public void display() {
        System.out.println("Shape: " + this.name);
        System.out.println("Area: " + this.area());
        System.out.println("Perimeter: " + this.perimeter());
    }
}

public class Rectangle extends Shape {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double area() {
        return width * height;
    }
    
    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}

public class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}

// Polymorphic method
public static void displayShapeInfo(Shape shape) {
    shape.display(); // Same method call, different implementations
}

// Usage in main method
public static void main(String[] args) {
    Shape[] shapes = {
        new Rectangle(5, 3),
        new Circle(4),
        new Rectangle(2, 8)
    };
    
    for (Shape shape : shapes) {
        displayShapeInfo(shape); // Polymorphism in action
        System.out.println("---");
    }
}
```

---

## Abstraction

Abstraction hides the complex implementation details and shows only the necessary features.

### JavaScript

```javascript
// Abstract class simulation
class Vehicle {
    constructor(brand, model) {
        if (this.constructor === Vehicle) {
            throw new Error("Cannot instantiate abstract class");
        }
        this.brand = brand;
        this.model = model;
    }
    
    // Abstract methods (to be implemented by subclasses)
    start() {
        throw new Error("start() method must be implemented");
    }
    
    stop() {
        throw new Error("stop() method must be implemented");
    }
    
    // Concrete method
    getInfo() {
        return `${this.brand} ${this.model}`;
    }
}

class Car extends Vehicle {
    constructor(brand, model, fuelType) {
        super(brand, model);
        this.fuelType = fuelType;
    }
    
    start() {
        console.log(`${this.getInfo()} engine started with ${this.fuelType}`);
    }
    
    stop() {
        console.log(`${this.getInfo()} engine stopped`);
    }
}

class ElectricCar extends Vehicle {
    constructor(brand, model, batteryCapacity) {
        super(brand, model);
        this.batteryCapacity = batteryCapacity;
    }
    
    start() {
        console.log(`${this.getInfo()} electric motor started (${this.batteryCapacity}kWh battery)`);
    }
    
    stop() {
        console.log(`${this.getInfo()} electric motor stopped`);
    }
    
    charge() {
        console.log(`Charging ${this.getInfo()}`);
    }
}

// Usage
const car = new Car("Toyota", "Camry", "Gasoline");
const electricCar = new ElectricCar("Tesla", "Model 3", 75);

car.start(); // Toyota Camry engine started with Gasoline
electricCar.start(); // Tesla Model 3 electric motor started (75kWh battery)
electricCar.charge(); // Charging Tesla Model 3
```

### Java

```java
// Abstract class
public abstract class Vehicle {
    protected String brand;
    protected String model;
    
    public Vehicle(String brand, String model) {
        this.brand = brand;
        this.model = model;
    }
    
    // Abstract methods (must be implemented by subclasses)
    public abstract void start();
    public abstract void stop();
    
    // Concrete method
    public String getInfo() {
        return this.brand + " " + this.model;
    }
}

// Interface example
public interface Chargeable {
    void charge();
    int getBatteryLevel();
}

public class Car extends Vehicle {
    private String fuelType;
    
    public Car(String brand, String model, String fuelType) {
        super(brand, model);
        this.fuelType = fuelType;
    }
    
    @Override
    public void start() {
        System.out.println(getInfo() + " engine started with " + fuelType);
    }
    
    @Override
    public void stop() {
        System.out.println(getInfo() + " engine stopped");
    }
}

public class ElectricCar extends Vehicle implements Chargeable {
    private int batteryCapacity;
    private int currentBatteryLevel;
    
    public ElectricCar(String brand, String model, int batteryCapacity) {
        super(brand, model);
        this.batteryCapacity = batteryCapacity;
        this.currentBatteryLevel = 100; // Start with full battery
    }
    
    @Override
    public void start() {
        System.out.println(getInfo() + " electric motor started (" + 
                          batteryCapacity + "kWh battery)");
    }
    
    @Override
    public void stop() {
        System.out.println(getInfo() + " electric motor stopped");
    }
    
    @Override
    public void charge() {
        this.currentBatteryLevel = 100;
        System.out.println("Charging " + getInfo());
    }
    
    @Override
    public int getBatteryLevel() {
        return currentBatteryLevel;
    }
}
```

---

## Additional OOP Concepts

### Method Overloading (Java)

```java
public class Calculator {
    // Method overloading - same method name, different parameters
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public String add(String a, String b) {
        return a + b;
    }
}
```

### Static Methods and Variables

#### JavaScript

```javascript
class MathUtils {
    static PI = 3.14159;
    
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static circleArea(radius) {
        return this.PI * radius * radius;
    }
}

// Usage without creating instance
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.circleArea(5)); // 78.53975
```

#### Java

```java
public class MathUtils {
    public static final double PI = 3.14159;
    private static int operationCount = 0;
    
    public static int add(int a, int b) {
        operationCount++;
        return a + b;
    }
    
    public static int multiply(int a, int b) {
        operationCount++;
        return a * b;
    }
    
    public static double circleArea(double radius) {
        operationCount++;
        return PI * radius * radius;
    }
    
    public static int getOperationCount() {
        return operationCount;
    }
}

// Usage
int result = MathUtils.add(5, 3); // 8
double area = MathUtils.circleArea(5); // 78.53975
int count = MathUtils.getOperationCount(); // 2
```

### Composition vs Inheritance

#### JavaScript

```javascript
// Composition approach
class Engine {
    constructor(type, horsepower) {
        this.type = type;
        this.horsepower = horsepower;
    }
    
    start() {
        console.log(`${this.type} engine starting...`);
    }
    
    stop() {
        console.log(`${this.type} engine stopping...`);
    }
}

class Car {
    constructor(brand, model, engineType, horsepower) {
        this.brand = brand;
        this.model = model;
        this.engine = new Engine(engineType, horsepower); // Composition
    }
    
    start() {
        console.log(`Starting ${this.brand} ${this.model}`);
        this.engine.start();
    }
    
    stop() {
        console.log(`Stopping ${this.brand} ${this.model}`);
        this.engine.stop();
    }
}

const car = new Car("Toyota", "Camry", "V6", 301);
car.start();
// Output:
// Starting Toyota Camry
// V6 engine starting...
```

### Design Patterns

#### Singleton Pattern

```javascript
class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        
        this.connection = null;
        DatabaseConnection.instance = this;
    }
    
    connect() {
        if (!this.connection) {
            this.connection = "Connected to database";
            console.log("Database connection established");
        }
        return this.connection;
    }
    
    disconnect() {
        this.connection = null;
        console.log("Database connection closed");
    }
}

// Usage
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true - same instance
```

#### Factory Pattern

```javascript
class ShapeFactory {
    static createShape(type, ...args) {
        switch(type.toLowerCase()) {
            case 'circle':
                return new Circle(args[0]);
            case 'rectangle':
                return new Rectangle(args[0], args[1]);
            case 'square':
                return new Rectangle(args[0], args[0]);
            default:
                throw new Error(`Unknown shape type: ${type}`);
        }
    }
}

// Usage
const circle = ShapeFactory.createShape('circle', 5);
const rectangle = ShapeFactory.createShape('rectangle', 4, 6);
const square = ShapeFactory.createShape('square', 4);
```

---

## Key Differences Between JavaScript and Java OOP

| Feature | JavaScript | Java |
|---------|------------|------|
| **Class Declaration** | `class ClassName` | `public class ClassName` |
| **Access Modifiers** | Private fields with `#` (ES2022) | `private`, `protected`, `public` |
| **Inheritance** | `extends` keyword | `extends` keyword |
| **Interface** | No direct interface support | `interface` keyword |
| **Abstract Classes** | Manual implementation | `abstract` keyword |
| **Method Overloading** | Not supported | Supported |
| **Static Members** | `static` keyword | `static` keyword |
| **Constructor** | `constructor()` method | Method with class name |
| **Super** | `super()` call | `super()` call |

---

## Best Practices

### JavaScript OOP Best Practices

1. **Use ES6+ class syntax** for cleaner code
2. **Use private fields** (`#`) for encapsulation
3. **Implement proper error handling** in abstract methods
4. **Use composition over inheritance** when possible
5. **Follow naming conventions** (PascalCase for classes)

### Java OOP Best Practices

1. **Use proper access modifiers** for encapsulation
2. **Follow SOLID principles**
3. **Use interfaces** for contracts
4. **Implement proper toString(), equals(), and hashCode()** methods
5. **Use abstract classes and interfaces** appropriately
6. **Follow naming conventions** (PascalCase for classes, camelCase for methods/variables)

---
