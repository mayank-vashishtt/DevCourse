# PostgreSQL, SQL vs NoSQL, ACID vs BASE — Full Notes with Interview Q&A

---

## 🧩 What is a Transaction?

A **transaction** in PostgreSQL is a set of SQL operations executed together as one unit. It ensures **data reliability** — either all succeed or all fail.

### 🔹 ACID Properties

| Property        | Description                                               | Example                                     |
| --------------- | --------------------------------------------------------- | ------------------------------------------- |
| **Atomicity**   | All-or-nothing: if one part fails, everything rolls back. | Money transfer fails → no partial change.   |
| **Consistency** | Data must remain valid before and after.                  | No negative balances allowed.               |
| **Isolation**   | Transactions don’t interfere with each other.             | Two users can safely modify the same table. |
| **Durability**  | Once committed, data is safe (even after crash).          | Data survives restart.                      |

### 🧠 Example

```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 500 WHERE name = 'Bob';
COMMIT;
```

If any query fails → `ROLLBACK;` will undo all.

---

## ⚙️ Transaction Commands

| Command                 | Description                  |
| ----------------------- | ---------------------------- |
| `BEGIN`                 | Start a transaction          |
| `COMMIT`                | Save changes permanently     |
| `ROLLBACK`              | Undo all changes             |
| `SAVEPOINT`             | Mark a point to roll back to |
| `ROLLBACK TO SAVEPOINT` | Undo up to that savepoint    |

---

## 🔒 Locks in PostgreSQL

Locks prevent data corruption when multiple users access the same data.

### 1. Row-Level Lock

Lock specific rows during updates.

```sql
SELECT * FROM orders WHERE id = 1 FOR UPDATE;
```

* Prevents others from updating that row until commit.

### 2. Table-Level Lock

Locks the entire table (used rarely).

```sql
LOCK TABLE accounts IN ACCESS EXCLUSIVE MODE;
```

### 3. Advisory Lock

Used by applications to control access manually.

```sql
SELECT pg_advisory_lock(1234);
SELECT pg_advisory_unlock(1234);
```

---

## 🧠 Isolation Levels

| Level           | Description                              |
| --------------- | ---------------------------------------- |
| READ COMMITTED  | Default. Sees only committed data.       |
| REPEATABLE READ | Sees same snapshot during transaction.   |
| SERIALIZABLE    | Highest isolation, ensures serial order. |

---

## 🌐 SQL vs NoSQL

| Feature         | SQL Databases               | NoSQL Databases                   |
| --------------- | --------------------------- | --------------------------------- |
| **Structure**   | Tables (rows + columns)     | Documents / Key-value / Graphs    |
| **Schema**      | Fixed                       | Flexible                          |
| **Scalability** | Vertical                    | Horizontal                        |
| **Consistency** | Strong (ACID)               | Eventual (BASE)                   |
| **Best for**    | Structured, relational data | Unstructured or fast-scaling data |

### 💡 Use SQL When:

* You need complex joins and relationships.
* Data integrity is critical (finance, orders).

### 💡 Use NoSQL When:

* You handle unstructured or semi-structured data.
* You need high scalability and performance.

---

## ⚙️ BASE — The NoSQL Model

| Property                  | Description                               |
| ------------------------- | ----------------------------------------- |
| **Basically Available**   | System always responds, even if outdated. |
| **Soft State**            | Data can change over time.                |
| **Eventually Consistent** | Data becomes consistent after some time.  |

🧠 Example: Instagram likes may show delayed counts — performance prioritized over instant consistency.

---

## 🧾 Real-Life Comparison

| Scenario           | SQL                      | NoSQL      |
| ------------------ | ------------------------ | ---------- |
| Banking / Finance  | ✅                        | ❌          |
| Social Media Feed  | ⚠️ (possible but slower) | ✅          |
| Inventory System   | ✅                        | ⚠️         |
| Sensor Data (IoT)  | ❌                        | ✅          |
| E-commerce Catalog | ✅                        | ✅ (hybrid) |

---

## 💬 Interview Questions & Answers

### 🧱 Basic SQL & Transactions

**Q1. What is a transaction?**
A transaction is a sequence of SQL operations that execute as one unit — either all succeed or all fail.

**Q2. What is ACID?**
ACID stands for Atomicity, Consistency, Isolation, and Durability — properties that ensure reliable database transactions.

**Q3. What’s the difference between COMMIT and ROLLBACK?**

* `COMMIT` saves all changes permanently.
* `ROLLBACK` undoes all changes made in the transaction.

**Q4. What is a SAVEPOINT?**
A marker within a transaction that lets you roll back to that specific point without undoing everything.

**Q5. What is Isolation in databases?**
It defines how visible one transaction’s changes are to another. Controlled by isolation levels.

---

### ⚙️ Locks and Concurrency

**Q6. What are locks in PostgreSQL?**
Locks prevent multiple transactions from changing the same data simultaneously.

**Q7. Difference between row-level and table-level locks?**

* Row-level locks: affect specific rows.
* Table-level locks: affect the whole table.

**Q8. What is MVCC?**
Multi-Version Concurrency Control lets readers and writers work without blocking each other by creating data snapshots.

**Q9. How to detect blocking queries?**
Use:

```sql
SELECT * FROM pg_locks;
```

**Q10. Difference between `FOR UPDATE` and `FOR SHARE`?**

* `FOR UPDATE`: blocks both read and write by others.
* `FOR SHARE`: allows reading but blocks writing.

---

### 🌐 SQL vs NoSQL

**Q11. Key differences between SQL and NoSQL?**
SQL is relational and structured; NoSQL is flexible and non-relational.

**Q12. When to use SQL vs NoSQL?**

* SQL: financial, transaction-heavy systems.
* NoSQL: big data, fast-evolving apps (social networks).

**Q13. Can NoSQL databases be ACID?**
Yes, modern ones like MongoDB (v4+) and Cassandra (LWT) offer partial ACID support.

**Q14. Examples of NoSQL databases?**
MongoDB (document), Redis (key-value), Cassandra (column), Neo4j (graph).

---

### ⚡ ACID vs BASE

**Q15. What does BASE stand for?**
Basically Available, Soft state, Eventually consistent.

**Q16. ACID vs BASE difference?**

| Property     | ACID (SQL)       | BASE (NoSQL)         |
| ------------ | ---------------- | -------------------- |
| Focus        | Data correctness | Availability & speed |
| Consistency  | Strong           | Eventual             |
| Transactions | Strict           | Loose                |
| Example      | PostgreSQL       | MongoDB              |

**Q17. Why do NoSQL systems prefer BASE?**
Because it allows horizontal scaling and faster responses across distributed systems.

**Q18. Can one system follow both?**
Yes, hybrid databases like Google Spanner and CockroachDB combine both ACID and BASE principles.

---

## 🧠 Real-World Example: Safe Money Transfer

```sql
BEGIN;
SELECT * FROM accounts WHERE name IN ('Alice', 'Bob') FOR UPDATE;
UPDATE accounts SET balance = balance - 100 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 100 WHERE name = 'Bob';
COMMIT;
```

If something fails → `ROLLBACK;` restores previous state.

---

## 🧾 Summary Table

| Concept          | SQL      | NoSQL                 |
| ---------------- | -------- | --------------------- |
| **Data Model**   | Tables   | Documents / Key-value |
| **Consistency**  | Strong   | Eventual              |
| **Scalability**  | Vertical | Horizontal            |
| **Transactions** | ACID     | BASE                  |
| **Schema**       | Fixed    | Dynamic               |

---
