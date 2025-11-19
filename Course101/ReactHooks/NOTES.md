# Complete React Hooks Guide: Beginner to Advanced

## Table of Contents
1. [What are Hooks?](#what-are-hooks)
2. [Rules of Hooks](#rules-of-hooks)
3. [useState Hook](#usestate-hook)
4. [useEffect Hook](#useeffect-hook)
5. [useContext Hook](#usecontext-hook)
6. [useRef Hook](#useref-hook)
7. [useReducer Hook](#usereducer-hook)
8. [useLayoutEffect Hook](#uselayouteffect-hook)
9. [useMemo Hook](#usememo-hook)
10. [useCallback Hook](#usecallback-hook)
11. [Custom Hooks](#custom-hooks)
12. [Interview Questions](#interview-questions)

---

## What are Hooks?

**Hooks** are special functions that let you "hook into" React features in functional components. They were introduced in React 16.8 to allow you to use state and other React features without writing class components.

### What was used before Hooks?

Before Hooks, developers used **Class Components** to manage state and lifecycle methods.

**Class Component Example:**
```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
```

**Same with Hooks (Functional Component):**
```javascript
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## Rules of Hooks

1. **Only call Hooks at the top level** - Don't call Hooks inside loops, conditions, or nested functions
2. **Only call Hooks from React functions** - Call them from functional components or custom Hooks
3. **Hooks must be called in the same order** - React relies on the order of Hook calls

---

## useState Hook

### What is useState?

`useState` is a Hook that allows you to add state to functional components. It returns an array with two elements:
1. **Current state value**
2. **Function to update the state**

### Basic Syntax

```javascript
const [state, setState] = useState(initialValue);
```

### Array Destructuring in useState

```javascript
// This is array destructuring
const [counter, setCounter] = useState(0);

// Behind the scenes, useState returns an array like this:
// [0, function]

// You can name them whatever you want:
const [count, updateCount] = useState(0);
const [name, changeName] = useState("John");
```

### What happens if we console.log useState?

```javascript
console.log(useState(0));
// Output: [0, ƒ]
// It's an array with value at index 0 and function at index 1
```

### Basic Counter Example

```javascript
import { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const reset = () => {
    setCounter(0);
  };

  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### useState with Input

```javascript
function InputExample() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={handleChange} 
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
    </div>
  );
}
```

### Multiple States in Single State Variable

Instead of multiple useState calls, you can use an object:

```javascript
function Form() {
  // Multiple individual states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  // OR - Single state object
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, // Spread existing values
      [e.target.name]: e.target.value // Update specific field
    });
  };

  return (
    <form>
      <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Name"
      />
      <input 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email"
      />
      <input 
        name="age" 
        type="number"
        value={formData.age} 
        onChange={handleChange} 
        placeholder="Age"
      />
    </form>
  );
}
```

### Important useState Concepts

**1. State updates are asynchronous:**
```javascript
const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1);
  console.log(count); // Still shows old value!
};
```

**2. Functional updates for complex logic:**
```javascript
const increment = () => {
  setCount(prevCount => prevCount + 1); // Better approach
};
```

**3. State updates trigger re-renders**

---

## useEffect Hook

### What is useEffect?

`useEffect` allows you to perform **side effects** in functional components. Side effects are operations that interact with the outside world.

### What are Side Effects?

**Side effects** are actions performed outside the component that may affect other components or the outside world.

### Common Side Effects

| Side Effect | Explanation |
|-------------|-------------|
| **Data Fetching** | Making API calls to fetch data from servers |
| **Subscriptions** | Setting up WebSocket connections or event listeners |
| **DOM Manipulation** | Directly changing the DOM (though rarely needed in React) |
| **Timers** | Setting up `setTimeout` or `setInterval` |
| **Logging** | Console logging or analytics tracking |
| **Local Storage** | Reading/writing to browser storage |

### useEffect Arguments

```javascript
useEffect(callback, dependencies);
```

- **callback**: Function containing the side effect logic (what to run)
- **dependencies**: Array that determines when to run the effect (when to run)

### 1. Without Dependencies - Runs on Every Render

```javascript
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Runs after every render');
  }); // No dependency array

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### 2. Empty Array [] - Runs Once on Mount

```javascript
function Component() {
  useEffect(() => {
    console.log('Runs only once when component mounts');
    
    // Example: Fetch data on component mount
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => console.log(data));
  }, []); // Empty dependency array

  return <div>Component</div>;
}
```

### 3. With Dependencies - Runs When Dependencies Change

```javascript
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Runs when count changes');
    document.title = `Count: ${count}`;
  }, [count]); // Only re-runs if count changes

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
```

### Cleanup Function

Used to clean up side effects (unsubscribe, clear timers, etc.) when component unmounts or before effect re-runs.

```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function - runs when component unmounts
    return () => {
      clearInterval(interval);
      console.log('Cleanup: Timer stopped');
    };
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

### Real-World Example: Data Fetching

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false; // For cleanup

    setLoading(true);
    
    fetch(`https://api.example.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!isCancelled) {
          setUser(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup function
    return () => {
      isCancelled = true; // Cancel fetch if component unmounts
    };
  }, [userId]); // Re-fetch if userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>User: {user?.name}</div>;
}
```

---

## useContext Hook

### What is useContext?

`useContext` allows you to access **global data** without passing props through every level of the component tree. It solves the "prop drilling" problem.

### Problem: Prop Drilling

```javascript
// Without Context - Props passed through multiple levels
function App() {
  const user = { name: 'John', role: 'Admin' };
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  return <div>{user.name}</div>;
}
```

### Solution: useContext

**Step 1: Create a Context**

```javascript
import { createContext } from 'react';

const UserContext = createContext();
```

**Step 2: Provide the Context**

```javascript
function App() {
  const user = { name: 'John', role: 'Admin' };

  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}
```

**Step 3: Consume the Context**

```javascript
import { useContext } from 'react';

function GrandChild() {
  const user = useContext(UserContext);
  
  return <div>{user.name}</div>;
}
```

### Complete Example with Theme Switcher

```javascript
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Hook for easier access
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Usage in Components
function App() {
  return (
    <ThemeProvider>
      <Toolbar />
    </ThemeProvider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff'
      }}
    >
      Current Theme: {theme}
    </button>
  );
}
```

### Structure for useContext

```
1. Create Context → createContext()
2. Wrap components with Provider → <Context.Provider value={data}>
3. Consume context in child components → useContext(Context)
```

---

## useRef Hook

### What is useRef?

`useRef` returns a **mutable object** that persists across renders and does **NOT trigger re-renders** when changed.

### Use Cases

1. **Accessing DOM elements directly**
2. **Storing mutable values** that don't cause re-renders
3. **Keeping track of previous values**
4. **Storing timers/intervals**

### 1. Accessing DOM Elements

```javascript
import { useRef } from 'react';

function InputFocus() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus(); // Direct DOM manipulation
    inputRef.current.style.backgroundColor = 'yellow';
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

### 2. Storing Mutable Values

```javascript
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

### 3. Tracking Previous Values

```javascript
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Difference from useState and useEffect

| Feature | useState | useRef | useEffect |
|---------|----------|--------|-----------|
| Triggers re-render | ✅ Yes | ❌ No | ❌ No (but runs after render) |
| Mutable | ❌ No | ✅ Yes | N/A |
| Persists across renders | ✅ Yes | ✅ Yes | N/A |
| Use case | UI state | DOM refs, mutable values | Side effects |

---

## useReducer Hook

### What is useReducer?

`useReducer` is an alternative to `useState` for managing **complex state logic**. It's similar to Redux reducers.

### When to Use?

- Multiple state values that depend on each other
- Complex state transitions
- State logic involves multiple sub-values
- Next state depends on previous state

### Basic Syntax

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### Example: Counter

```javascript
import { useReducer } from 'react';

// 1. Define initial state
const initialState = { count: 0 };

// 2. Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error('Unknown action');
  }
}

// 3. Use in component
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

### Complex Example: Todo List

```javascript
const initialState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <span 
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## useLayoutEffect Hook

### What is useLayoutEffect?

`useLayoutEffect` is identical to `useEffect` but runs **synchronously** after all DOM mutations but **before the browser paints**.

### Difference from useEffect

| Feature | useEffect | useLayoutEffect |
|---------|-----------|-----------------|
| Timing | After browser paint (asynchronous) | Before browser paint (synchronous) |
| Blocks rendering | No | Yes |
| Use case | Most side effects | DOM measurements, visual updates |

### When to Use?

- Measuring DOM elements
- Preventing visual flickering
- Synchronous DOM updates

### Example: Measuring Element Size

```javascript
import { useLayoutEffect, useRef, useState } from 'react';

function MeasureElement() {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // Runs before browser paints
    const element = divRef.current;
    setHeight(element.getBoundingClientRect().height);
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ padding: '20px', background: 'lightblue' }}>
        This is a measured element
      </div>
      <p>Height: {height}px</p>
    </div>
  );
}
```

### Visual Flickering Example

```javascript
// ❌ With useEffect - causes flicker
function BadTooltip() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Runs after paint - user sees jump
    setPosition({ x: 100, y: 100 });
  }, []);

  return <div style={{ position: 'absolute', left: position.x, top: position.y }}>Tooltip</div>;
}

// ✅ With useLayoutEffect - no flicker
function GoodTooltip() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    // Runs before paint - smooth
    setPosition({ x: 100, y: 100 });
  }, []);

  return <div style={{ position: 'absolute', left: position.x, top: position.y }}>Tooltip</div>;
}
```

---

## useMemo Hook

### What is useMemo?

`useMemo` **memoizes** (caches) the result of expensive calculations and only recalculates when dependencies change.

### What is Memoization?

**Memoization** is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again.

### Why Use useMemo?

- **Improve performance** by avoiding expensive recalculations
- Prevent unnecessary re-renders
- Optimize rendering of large lists or complex computations

### Syntax

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### Example: Expensive Calculation

```javascript
function ExpensiveComponent({ number }) {
  const [count, setCount] = useState(0);

  // ❌ Without useMemo - recalculates on every render
  const expensiveResult = calculateFactorial(number);

  // ✅ With useMemo - only recalculates when number changes
  const memoizedResult = useMemo(() => {
    console.log('Calculating...');
    return calculateFactorial(number);
  }, [number]);

  return (
    <div>
      <p>Result: {memoizedResult}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
}

function calculateFactorial(n) {
  // Expensive operation
  if (n <= 1) return 1;
  return n * calculateFactorial(n - 1);
}
```

### Difference Between useEffect and useMemo

| Feature | useEffect | useMemo |
|---------|-----------|---------|
| Purpose | Side effects | Memoize computed values |
| Returns | Nothing (cleanup function optional) | Memoized value |
| When it runs | After render | During render |
| Use case | API calls, subscriptions | Expensive calculations |

---

## useCallback Hook

### What is useCallback?

`useCallback` **memoizes a function** itself rather than its result. It returns the same function instance between re-renders unless dependencies change.

### Why Use useCallback?

- Prevent unnecessary re-renders of child components
- Optimize performance when passing callbacks to child components
- Useful with `React.memo()`

### Syntax

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Example: Preventing Child Re-renders

```javascript
import { useState, useCallback, memo } from 'react';

// Child component wrapped with React.memo
const Button = memo(({ onClick, children }) => {
  console.log('Button rendered:', children);
  return <button onClick={onClick}>{children}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // ❌ Without useCallback - new function on every render
  const handleClick = () => {
    setCount(count + 1);
  };

  // ✅ With useCallback - same function instance
  const handleClickMemo = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // No dependencies - function never changes

  return (
    <div>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <Button onClick={handleClickMemo}>Increment Count</Button>
      <button onClick={() => setOther(other + 1)}>Increment Other</button>
    </div>
  );
}
```

### Difference Between useMemo and useCallback

| Feature | useMemo | useCallback |
|---------|---------|-------------|
| Memoizes | Result of a function | Function itself |
| Syntax | `useMemo(() => fn(), [deps])` | `useCallback(fn, [deps])` |
| Returns | Computed value | Function |
| Use case | Expensive calculations | Callback functions |

**Equivalent Code:**
```javascript
// These are equivalent:
useCallback(fn, deps);
useMemo(() => fn, deps);
```

---

## Custom Hooks

### What are Custom Hooks?

Custom Hooks are **reusable functions** that contain stateful logic. They let you extract component logic into reusable functions.

### Rules for Custom Hooks

1. Name must start with `use`
2. Can call other Hooks
3. Can be used in multiple components
4. Don't share state between components (each gets its own instance)

### Example 1: useFetch

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`https://api.example.com/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>User: {user.name}</div>;
}
```

### Example 2: useLocalStorage

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      placeholder="Your name persists!"
    />
  );
}
```

### Example 3: useToggle

```javascript
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle];
}

// Usage
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={toggleOpen}>Close</button>
        </div>
      )}
    </div>
  );
}
```

### Example 4: useDebounce

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      console.log('Searching for:', debouncedSearch);
      // Perform API call here
    }
  }, [debouncedSearch]);

  return (
    <input 
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

## Interview Questions

### Easy Level

**Q1: What are React Hooks?**
> Hooks are functions that let you use React features like state and lifecycle methods in functional components.

**Q2: Why were Hooks introduced?**
> To allow functional components to use state and other React features without writing class components, making code more reusable and easier to understand.

**Q3: What does useState return?**
> An array with two elements: [currentState, setState function]

**Q4: What happens if you call setState multiple times synchronously?**
```javascript
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// Only increments once! Use functional updates:
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// Now increments three times
```

**Q5: What are the rules of Hooks?**
> 1. Only call at the top level
> 2. Only call from React functions
> 3. Must be called in the same order

---

### Medium Level

**Q6: Explain useEffect cleanup function**
> The cleanup function runs before the component unmounts or before the effect re-runs. Used to cancel subscriptions, clear timers, or clean up resources.

```javascript
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

**Q7: Difference between useEffect and useLayoutEffect?**
> - `useEffect`: Runs asynchronously after browser paint
> - `useLayoutEffect`: Runs synchronously before browser paint, blocks rendering

**Q8: When should you use useReducer instead of useState?**
> When state logic is complex, involves multiple sub-values, or when next state depends on the previous state.

**Q9: What is the difference between useCallback and useMemo?**
> - `useCallback`: Memoizes the function itself
> - `useMemo`: Memoizes the result of the function

**Q10: Can you call Hooks conditionally?**
```javascript
// ❌ Wrong
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ Correct
const [state, setState] = useState(0);
if (condition) {
  // Use state here
}
```
> No! Hooks must be called at the top level to ensure they're called in the same order on every render.

**Q11: What is prop drilling and how does useContext solve it?**
> Prop drilling is passing props through multiple intermediate components. useContext allows direct access to values without passing props through every level.

**Q12: Explain the dependency array in useEffect**
```javascript
useEffect(() => {}, []); // Runs once on mount
useEffect(() => {}); // Runs on every render
useEffect(() => {}, [dep]); // Runs when dep changes
```

---

### Hard Level

**Q13: What are stale closures in Hooks and how do you avoid them?**
```javascript
// ❌ Stale closure problem
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // 'count' is stale!
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty deps - count never updates

  return <div>{count}</div>;
}

// ✅ Solution: Use functional update
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1); // Always has latest value
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
```

**Q14: How do you optimize performance with React.memo and useCallback?**
```javascript
// Child component
const ExpensiveChild = React.memo(({ onClick, data }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>{data}</button>;
});

// Parent component
function Parent() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Memoize callback
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  // Memoize data
  const data = useMemo(() => {
    return `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <ExpensiveChild onClick={handleClick} data={data} />
      <button onClick={() => setOther(other + 1)}>Other</button>
    </div>
  );
}
```

**Q15: Explain the difference between useRef and useState**
```javascript
function Comparison() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  const incrementState = () => {
    setStateCount(stateCount + 1); // Triggers re-render
  };

  const incrementRef = () => {
    refCount.current += 1; // Does NOT trigger re-render
    console.log('Ref:', refCount.current);
  };

  console.log('Component rendered');

  return (
    <div>
      <p>State: {stateCount}</p>
      <p>Ref: {refCount.current}</p>
      <button onClick={incrementState}>State +1</button>
      <button onClick={incrementRef}>Ref +1</button>
    </div>
  );
}
```

**Q16: How do you handle race conditions in useEffect?**
```javascript
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let ignore = false; // Race condition flag

    async function fetchResults() {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      
      if (!ignore) {
        setResults(data); // Only update if not cancelled
      }
    }

    fetchResults();

    // Cleanup: set flag to ignore outdated requests
    return () => {
      ignore = true;
    };
  }, [query]);

  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>;
}
```

**Q17: What is the useReducer + useContext pattern?**
```javascript
// 1. Create context
const AppContext = createContext();

// 2. Create reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

// 3. Provider component
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, { user: null });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 4. Custom hook
function useApp() {
  return useContext(AppContext);
}

// 5. Usage
function LoginButton() {
  const { dispatch } = useApp();
  
  return (
    <button onClick={() => dispatch({ type: 'LOGIN', payload: { name: 'John' } })}>
      Login
    </button>
  );
}
```

**Q18: How do you create a custom hook for window resize?**
```javascript
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage
function Component() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
```

**Q19: Explain batching in React 18 with useState**
```javascript
// React 18: Automatic batching
function Counter() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // Both updates are batched - only 1 re-render
    setCount(c => c + 1);
    setFlag(f => !f);
  }

  // Even in async code (React 18+)
  async function handleClickAsync() {
    await fetch('/api');
    // Still batched in React 18!
    setCount(c => c + 1);
    setFlag(f => !f);
  }

  console.log('Rendered'); // Only logs once per click

  return <button onClick={handleClick}>Click</button>;
}
```

**Q20: How do you implement useEffect with async/await?**
```javascript
// ❌ Wrong - can't make useEffect callback async
useEffect(async () => {
  const data = await fetchData();
}, []);

// ✅ Correct - define async function inside
useEffect(() => {
  async function loadData() {
    try {
      const data = await fetchData();
      setData(data);
    } catch (error) {
      setError(error);
    }
  }
  
  loadData();
}, []);

// ✅ Alternative - IIFE
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

---

## Advanced Patterns and Best Practices

### 1. Custom Hook for Form Handling

```javascript
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (callback, validate) => (e) => {
    e.preventDefault();
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length === 0) {
        callback(values);
      }
    } else {
      callback(values);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset
  };
}

// Usage
function LoginForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    email: '',
    password: ''
  });

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    if (!values.password) errors.password = 'Required';
    return errors;
  };

  const onSubmit = (values) => {
    console.log('Submitting:', values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, validate)}>
      <input 
        name="email" 
        value={values.email} 
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}
      
      <input 
        name="password" 
        type="password"
        value={values.password} 
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### 2. Custom Hook for API with Caching

```javascript
function useAPI(url, options = {}) {
  const cache = useRef({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      // Check cache first
      if (cache.current[url]) {
        setData(cache.current[url]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!isCancelled) {
          cache.current[url] = result; // Cache the result
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
```

### 3. Custom Hook for Intersection Observer

```javascript
function useIntersectionObserver(ref, options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

// Usage: Lazy loading images
function LazyImage({ src, alt }) {
  const imgRef = useRef();
  const isVisible = useIntersectionObserver(imgRef, { threshold: 0.1 });

  return (
    <img 
      ref={imgRef}
      src={isVisible ? src : ''} 
      alt={alt}
      style={{ minHeight: '200px' }}
    />
  );
}
```

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Infinite Loop with useEffect

```javascript
// ❌ Wrong - infinite loop
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Triggers re-render, runs again!
  }); // No dependency array

  return <div>{count}</div>;
}

// ✅ Correct
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []); // Empty array - runs once
}
```

### Mistake 2: Not Cleaning Up Subscriptions

```javascript
// ❌ Wrong - memory leak
function Component() {
  useEffect(() => {
    const subscription = subscribe();
    // No cleanup!
  }, []);
}

// ✅ Correct
function Component() {
  useEffect(() => {
    const subscription = subscribe();
    
    return () => {
      subscription.unsubscribe(); // Cleanup
    };
  }, []);
}
```

### Mistake 3: Mutating State Directly

```javascript
// ❌ Wrong - mutating state
function Component() {
  const [user, setUser] = useState({ name: 'John', age: 30 });

  const updateAge = () => {
    user.age = 31; // Direct mutation!
    setUser(user);
  };
}

// ✅ Correct
function Component() {
  const [user, setUser] = useState({ name: 'John', age: 30 });

  const updateAge = () => {
    setUser({ ...user, age: 31 }); // Create new object
  };
}
```

### Mistake 4: Over-optimizing with useMemo/useCallback

```javascript
// ❌ Unnecessary optimization
function Component() {
  const simple = useMemo(() => 2 + 2, []); // Overkill!
  
  const onClick = useCallback(() => {
    console.log('clicked');
  }, []); // Not passed as prop - unnecessary
}

// ✅ Use only when needed
function Component() {
  const simple = 4; // Just use the value
  
  const onClick = () => {
    console.log('clicked'); // Simple handler - no memoization needed
  };
}
```

---

## Performance Optimization Checklist

1. ✅ Use `React.memo()` for expensive components
2. ✅ Use `useCallback` for functions passed as props
3. ✅ Use `useMemo` for expensive calculations
4. ✅ Use `lazy` and `Suspense` for code splitting
5. ✅ Avoid inline object/array creation in render
6. ✅ Use proper dependency arrays in useEffect
7. ✅ Implement virtualization for long lists (react-window)
8. ✅ Use `useTransition` for non-urgent updates (React 18)

---

## Hooks Mental Model

```
Component Lifecycle:
┌─────────────────────────────────────────┐
│ 1. Mount                                │
│    - Call useState (initialize)         │
│    - Render JSX                         │
│    - Update DOM                         │
│    - Run useEffect (empty deps [])      │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ 2. Update (state/props change)          │
│    - Re-render JSX                      │
│    - Update DOM                         │
│    - Run useEffect (with deps)          │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│ 3. Unmount                              │
│    - Run useEffect cleanup functions    │
└─────────────────────────────────────────┘
```

---

## Quick Reference Table

| Hook | Purpose | When to Use |
|------|---------|-------------|
| `useState` | Manage component state | Local component state |
| `useEffect` | Side effects | Data fetching, subscriptions |
| `useContext` | Access context | Avoid prop drilling |
| `useRef` | Reference DOM/values | DOM access, persist values |
| `useReducer` | Complex state logic | Multiple related state values |
| `useCallback` | Memoize functions | Pass to memoized children |
| `useMemo` | Memoize values | Expensive calculations |
| `useLayoutEffect` | Synchronous effects | DOM measurements |
| Custom Hooks | Reusable logic | Share stateful logic |

---

## Summary

**Key Takeaways:**

1. **Hooks enable functional components** to use React features previously only available in class components

2. **useState** manages local state and triggers re-renders

3. **useEffect** handles side effects with cleanup

4. **useContext** solves prop drilling for global state

5. **useRef** accesses DOM and persists values without re-renders

6. **useReducer** manages complex state logic

7. **useMemo & useCallback** optimize performance through memoization

8. **Custom Hooks** extract and reuse stateful logic

9. **Always follow the Rules of Hooks** for predictable behavior

10. **Performance optimization** should be done when needed, not prematurely

---

## Additional Resources

- [Official React Hooks Documentation](https://react.dev/reference/react)
- [React Hooks FAQ](https://react.dev/reference/react/hooks)
- [usehooks.com](https://usehooks.com) - Collection of custom hooks
- [React Hooks Playground](https://codesandbox.io/s/react-hooks)

---

