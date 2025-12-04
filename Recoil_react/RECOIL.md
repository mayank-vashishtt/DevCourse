# Recoil State Management - Complete Guide

## Table of Contents
1. [What is Atom?](#what-is-atom)
2. [Why Recoil over useState?](#why-recoil-over-usestate)
3. [Core Concepts](#core-concepts)
4. [Selectors](#selectors)
5. [Async Data Queries](#async-data-queries)
6. [Advanced Patterns](#advanced-patterns)
7. [Loading States & Skeletons](#loading-states--skeletons)

---

## What is Atom?

An **atom** is a unit of state in Recoil. Think of it as a piece of global state that any component can read from or write to.

```javascript
import { atom } from 'recoil';

const counterState = atom({
  key: 'counterState', // unique ID (must be unique across the app)
  default: 0,          // default value
});
```

**Key characteristics:**
- Each atom has a **unique key** (like an ID)
- Has a **default value**
- Can be used by multiple components
- When atom changes, all components using it re-render

---

## Why Recoil over useState?

### Problem with useState

```javascript
// Parent Component
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <ComponentA count={count} setCount={setCount} />
      <ComponentB count={count} />
      <ComponentC count={count} setCount={setCount} />
    </>
  );
}
```

**Issues:**
1. **Prop Drilling**: Pass props through many levels
2. **Unnecessary Re-renders**: Parent re-renders when state changes
3. **Complexity**: Hard to manage shared state across distant components

### Solution with Recoil

```javascript
// atom.js
import { atom } from 'recoil';

export const counterState = atom({
  key: 'counterState',
  default: 0,
});

// ComponentA.js
function ComponentA() {
  const [count, setCount] = useRecoilState(counterState);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// ComponentB.js
function ComponentB() {
  const count = useRecoilValue(counterState);
  return <div>Current count: {count}</div>;
}

// ComponentC.js
function ComponentC() {
  const setCount = useSetRecoilState(counterState);
  return <button onClick={() => setCount(0)}>Reset</button>;
}
```

**Benefits:**
- ✅ No prop drilling
- ✅ Only components using the atom re-render
- ✅ Clean and scalable
- ✅ Easy to share state globally

---

## Core Concepts

### 1. RecoilRoot

Wrap your app with `RecoilRoot` to enable Recoil:

```javascript
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <YourComponents />
    </RecoilRoot>
  );
}
```

**What it does:**
- Provides Recoil context to all child components
- Must be placed at the root of your component tree

---

### 2. Creating Atoms (atom.js)

```javascript
// atom.js
import { atom } from 'recoil';

// Simple atom
export const userState = atom({
  key: 'userState',
  default: {
    name: 'John',
    age: 25,
  },
});

// Array atom
export const todosState = atom({
  key: 'todosState',
  default: [],
});

// Boolean atom
export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});
```

---

### 3. useRecoilValue

**Read-only access** to atom value.

```javascript
import { useRecoilValue } from 'recoil';
import { userState } from './atom';

function UserProfile() {
  const user = useRecoilValue(userState);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
    </div>
  );
}
```

**When to use:** When you only need to **read** the value, not update it.

---

### 4. useRecoilState

**Read and write** access to atom (like useState).

```javascript
import { useRecoilState } from 'recoil';
import { counterState } from './atom';

function Counter() {
  const [count, setCount] = useRecoilState(counterState);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

**When to use:** When you need both **read and write** access.

---

### 5. useSetRecoilState

**Write-only access** to atom.

```javascript
import { useSetRecoilState } from 'recoil';
import { counterState } from './atom';

function ResetButton() {
  const setCount = useSetRecoilState(counterState);
  
  return (
    <button onClick={() => setCount(0)}>
      Reset Counter
    </button>
  );
}
```

**When to use:** When you only need to **update** the value, not read it.  
**Benefit:** Component won't re-render when atom value changes.

---

## Selectors

A **selector** is derived state. It computes a value based on atoms or other selectors.

### Basic Selector

```javascript
import { selector } from 'recoil';
import { counterState } from './atom';

export const doubleCountSelector = selector({
  key: 'doubleCountSelector',
  get: ({ get }) => {
    const count = get(counterState);
    return count * 2;
  },
});

// Usage
function DoubleCounter() {
  const doubleCount = useRecoilValue(doubleCountSelector);
  return <div>Double: {doubleCount}</div>;
}
```

### Why Selectors are Better than Normal Use?

**Without Selector (Manual Calculation):**

```javascript
function DoubleCounter() {
  const count = useRecoilValue(counterState);
  const doubleCount = count * 2; // Calculated in every component
  return <div>Double: {doubleCount}</div>;
}
```

**Problems:**
- Calculation repeated in multiple components
- No memoization (recalculates on every render)
- Hard to reuse logic

**With Selector:**

```javascript
// Calculated once, memoized, and reused everywhere
const doubleCount = useRecoilValue(doubleCountSelector);
```

**Benefits:**
- ✅ **Memoization**: Cached until dependencies change
- ✅ **Reusability**: Use in multiple components
- ✅ **Performance**: Avoids redundant calculations
- ✅ **Clean code**: Separation of concerns

---

### Complex Selector Example

```javascript
import { selector } from 'recoil';
import { todosState } from './atom';

export const todoStatsSelector = selector({
  key: 'todoStatsSelector',
  get: ({ get }) => {
    const todos = get(todosState);
    
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      percentComplete: todos.length === 0 
        ? 0 
        : (todos.filter(t => t.completed).length / todos.length) * 100,
    };
  },
});

// Usage
function TodoStats() {
  const stats = useRecoilValue(todoStatsSelector);
  
  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Pending: {stats.pending}</p>
      <p>Progress: {stats.percentComplete.toFixed(1)}%</p>
    </div>
  );
}
```

---

## Async Data Queries

Selectors can fetch data asynchronously!

### Async Selector Example

```javascript
import { selector } from 'recoil';

export const userDataSelector = selector({
  key: 'userDataSelector',
  get: async ({ get }) => {
    const response = await fetch('https://api.example.com/user');
    const data = await response.json();
    return data;
  },
});

// Usage with Suspense
function UserProfile() {
  const userData = useRecoilValue(userDataSelector);
  
  return (
    <div>
      <h1>{userData.name}</h1>
      <p>{userData.email}</p>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
      </Suspense>
    </RecoilRoot>
  );
}
```

### How Does Async Work in Selectors?

**Step-by-step:**

1. **Component reads selector** → Selector starts fetching
2. **Suspense catches the promise** → Shows fallback
3. **Data arrives** → Component renders with data

**Key Points:**
- Selector automatically handles promises
- Must wrap component in `<Suspense>`
- Result is cached until dependencies change

---

### Async Selector with Parameters

```javascript
import { selector, selectorFamily } from 'recoil';

export const userByIdSelector = selectorFamily({
  key: 'userByIdSelector',
  get: (userId) => async () => {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    return response.json();
  },
});

// Usage
function UserCard({ userId }) {
  const user = useRecoilValue(userByIdSelector(userId));
  return <div>{user.name}</div>;
}
```

---

### Async Selector Depending on Atom

```javascript
import { atom, selector } from 'recoil';

export const userIdState = atom({
  key: 'userIdState',
  default: 1,
});

export const currentUserSelector = selector({
  key: 'currentUserSelector',
  get: async ({ get }) => {
    const userId = get(userIdState); // Read from atom
    const response = await fetch(`https://api.example.com/users/${userId}`);
    return response.json();
  },
});

// When userIdState changes, selector refetches automatically!
function UserProfile() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const user = useRecoilValue(currentUserSelector);
  
  return (
    <div>
      <button onClick={() => setUserId(userId + 1)}>Next User</button>
      <h1>{user.name}</h1>
    </div>
  );
}
```

---

## Advanced Patterns

### atomFamily

Creates a **family of atoms** based on parameters. Useful for collections.

```javascript
import { atomFamily } from 'recoil';

export const todoItemState = atomFamily({
  key: 'todoItemState',
  default: (id) => ({
    id,
    text: '',
    completed: false,
  }),
});

// Usage
function TodoItem({ id }) {
  const [todo, setTodo] = useRecoilState(todoItemState(id));
  
  return (
    <div>
      <input
        value={todo.text}
        onChange={(e) => setTodo({ ...todo, text: e.target.value })}
      />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
    </div>
  );
}

// Render multiple todos
function TodoList() {
  return (
    <div>
      <TodoItem id={1} />
      <TodoItem id={2} />
      <TodoItem id={3} />
    </div>
  );
}
```

**Why atomFamily?**
- Each `id` gets its own independent atom
- Efficient: Only the changed item re-renders
- Clean: No need to manage arrays manually

---

### selectorFamily

Creates a **family of selectors** based on parameters.

```javascript
import { selectorFamily } from 'recoil';
import { todoItemState } from './atom';

export const todoWithStatusSelector = selectorFamily({
  key: 'todoWithStatusSelector',
  get: (id) => ({ get }) => {
    const todo = get(todoItemState(id));
    return {
      ...todo,
      status: todo.completed ? 'Done' : 'Pending',
      isUrgent: todo.text.includes('urgent'),
    };
  },
});

// Usage
function TodoItemEnhanced({ id }) {
  const todo = useRecoilValue(todoWithStatusSelector(id));
  
  return (
    <div>
      <p>{todo.text}</p>
      <span>Status: {todo.status}</span>
      {todo.isUrgent && <span>⚠️ URGENT</span>}
    </div>
  );
}
```

---

### Async selectorFamily

```javascript
import { selectorFamily } from 'recoil';

export const githubUserSelector = selectorFamily({
  key: 'githubUserSelector',
  get: (username) => async () => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    return response.json();
  },
});

// Usage
function GitHubProfile({ username }) {
  const user = useRecoilValue(githubUserSelector(username));
  
  return (
    <div>
      <img src={user.avatar_url} alt={user.login} />
      <h2>{user.name}</h2>
      <p>Followers: {user.followers}</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHubProfile username="torvalds" />
      <GitHubProfile username="gaearon" />
    </Suspense>
  );
}
```

---

## Loading States & Skeletons

### useRecoilValueLoadable

Gives you **manual control** over loading, error, and data states.

```javascript
import { useRecoilValueLoadable } from 'recoil';
import { userDataSelector } from './atom';

function UserProfile() {
  const userLoadable = useRecoilValueLoadable(userDataSelector);
  
  switch (userLoadable.state) {
    case 'loading':
      return <div>Loading user data...</div>;
      
    case 'hasError':
      return <div>Error: {userLoadable.contents.message}</div>;
      
    case 'hasValue':
      const user = userLoadable.contents;
      return (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      );
      
    default:
      return null;
  }
}
```

**States:**
- `loading`: Data is being fetched
- `hasValue`: Data is available
- `hasError`: An error occurred

---

### useRecoilStateLoadable

Like `useRecoilValueLoadable`, but also provides setter.

```javascript
import { useRecoilStateLoadable } from 'recoil';

function UserManager() {
  const [userLoadable, setUser] = useRecoilStateLoadable(userDataSelector);
  
  if (userLoadable.state === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (userLoadable.state === 'hasError') {
    return (
      <div>
        Error occurred!
        <button onClick={() => setUser({ name: 'Guest' })}>
          Use Default
        </button>
      </div>
    );
  }
  
  const user = userLoadable.contents;
  return <div>{user.name}</div>;
}
```

---

### Skeleton Loading Example

Replace `Loading...` text with beautiful skeleton UI:

```javascript
import { useRecoilValueLoadable } from 'recoil';

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
}

function UserProfile() {
  const userLoadable = useRecoilValueLoadable(userDataSelector);
  
  switch (userLoadable.state) {
    case 'loading':
      return <Skeleton />; // Show skeleton instead of text
      
    case 'hasError':
      return <ErrorMessage error={userLoadable.contents} />;
      
    case 'hasValue':
      return <UserCard user={userLoadable.contents} />;
      
    default:
      return null;
  }
}
```

---

### Multiple Skeletons Example

```javascript
function UserListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UserList() {
  const usersLoadable = useRecoilValueLoadable(usersSelector);
  
  if (usersLoadable.state === 'loading') {
    return <UserListSkeleton />;
  }
  
  if (usersLoadable.state === 'hasError') {
    return <div>Failed to load users</div>;
  }
  
  return usersLoadable.contents.map(user => (
    <UserCard key={user.id} user={user} />
  ));
}
```

---

## Complete Example: Todo App

```javascript
// atoms.js
import { atom, selector, atomFamily, selectorFamily } from 'recoil';

export const todoIdsState = atom({
  key: 'todoIdsState',
  default: [],
});

export const todoItemState = atomFamily({
  key: 'todoItemState',
  default: (id) => ({
    id,
    text: '',
    completed: false,
  }),
});

export const todoStatsSelector = selector({
  key: 'todoStatsSelector',
  get: ({ get }) => {
    const todoIds = get(todoIdsState);
    const todos = todoIds.map(id => get(todoItemState(id)));
    
    return {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
    };
  },
});

// Components
function TodoItem({ id }) {
  const [todo, setTodo] = useRecoilState(todoItemState(id));
  
  return (
    <div>
      <input
        value={todo.text}
        onChange={(e) => setTodo({ ...todo, text: e.target.value })}
      />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
    </div>
  );
}

function TodoList() {
  const todoIds = useRecoilValue(todoIdsState);
  const setTodoIds = useSetRecoilState(todoIdsState);
  
  const addTodo = () => {
    const newId = Date.now();
    setTodoIds([...todoIds, newId]);
  };
  
  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {todoIds.map(id => <TodoItem key={id} id={id} />)}
    </div>
  );
}

function TodoStats() {
  const stats = useRecoilValue(todoStatsSelector);
  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Pending: {stats.pending}</p>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <TodoList />
      <TodoStats />
    </RecoilRoot>
  );
}
```

---

## Summary Comparison

| Feature | useState | Recoil Atom |
|---------|----------|-------------|
| Scope | Local to component | Global state |
| Prop Drilling | Required | Not needed |
| Re-renders | Parent + children | Only subscribers |
| Computed Values | Manual | Selectors (memoized) |
| Async Data | Manual with useEffect | Built-in with selectors |
| Code Organization | Mixed in components | Separated in atoms.js |

---

## Best Practices

1. **Use unique keys** for all atoms and selectors
2. **Keep atoms small** - one piece of state per atom
3. **Use selectors for derived state** instead of calculating in components
4. **Use atomFamily** for collections of similar items
5. **Wrap async selectors** in Suspense or use Loadable hooks
6. **Use useRecoilValueLoadable** for skeleton loading states
7. **Don't overuse Recoil** - local state with useState is fine for component-specific data

---

## When to Use What?

- **useRecoilValue**: Read-only (displays, computed values)
- **useRecoilState**: Read + Write (forms, counters)
- **useSetRecoilState**: Write-only (actions, updates)
- **useRecoilValueLoadable**: Manual loading control with skeletons
- **Selector**: Derived/computed state
- **Async Selector**: Fetch data from APIs
- **atomFamily**: Collections (todos, users, items)
- **selectorFamily**: Derived state per item

---

