# React State Management & Frameworks - Complete Guide

## Table of Contents
1. [Library vs Framework](#library-vs-framework)
2. [Prop Drilling](#prop-drilling)
3. [Context API](#context-api)
4. [Redux](#redux)
5. [React vs Next.js](#react-vs-nextjs)
6. [When to Use What](#when-to-use-what)
7. [Interview Questions](#interview-questions)

---

## Library vs Framework

### Library
**Definition**: A library is a collection of pre-written code that you can call when needed.

**Characteristics**:
- **You are in control** - You decide when and where to use it
- Provides specific functionality
- Can be easily replaced
- Examples: React, Lodash, Axios, jQuery

**Analogy**: Like a toolbox - you pick the tools you need

### Framework
**Definition**: A framework is a complete structure that dictates the architecture of your application.

**Characteristics**:
- **Framework is in control** - You fill in the blanks
- Provides complete structure and rules
- Harder to replace
- Examples: Next.js, Angular, Vue.js, Django

**Analogy**: Like a house blueprint - you must follow the structure

### Key Difference
```
Library: "Call us, we'll help you"
Framework: "Don't call us, we'll call you" (Inversion of Control)
```

**React is a Library**: You choose how to structure your app, routing, state management, etc.

**Next.js is a Framework**: Built on React, but provides structure for routing, rendering, and deployment.

---

## Prop Drilling

### What is Prop Drilling?

Prop drilling is the process of passing data from a parent component down through multiple levels of child components, even when intermediate components don't need that data.

### Example Problem

```jsx
// ❌ Prop Drilling Problem
function App() {
  const [user, setUser] = useState({ name: "John", role: "Admin" });
  
  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  // Dashboard doesn't use 'user', just passes it down
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  // Sidebar doesn't use 'user', just passes it down
  return <Profile user={user} />;
}

function Profile({ user }) {
  // Finally uses 'user'
  return <div>{user.name} - {user.role}</div>;
}
```

### Problems with Prop Drilling

1. **Maintenance Nightmare**: Changing prop names requires updates in multiple files
2. **Code Clutter**: Components receive props they don't use
3. **Hard to Debug**: Tracking data flow through many layers is difficult
4. **Reduces Reusability**: Components become tightly coupled
5. **Performance Issues**: Unnecessary re-renders in intermediate components

### When Prop Drilling is Acceptable

- **2-3 levels deep**: Not a problem for shallow component trees
- **Small applications**: Overhead of solutions may not be worth it
- **Props actually used**: When intermediate components need the data

---

## Context API

### What is Context API?

Context API is React's built-in solution for sharing data across the component tree without manually passing props at every level.

### When to Use Context API

✅ **Good for**:
- Theme data (dark mode, colors)
- User authentication data
- Language/locale preferences
- UI state (modals, notifications)
- Infrequently updated data

❌ **Not ideal for**:
- Highly frequent updates (causes re-renders)
- Large-scale state management
- Complex state logic

### Basic Implementation

```jsx
// 1. Create Context
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// 2. Create Provider Component
export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "John", role: "Admin" });
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Create Custom Hook (optional but recommended)
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 4. Wrap App with Provider
function App() {
  return (
    <UserProvider>
      <Dashboard />
    </UserProvider>
  );
}

// 5. Use Anywhere in the Tree
function Profile() {
  const { user, setUser } = useUser();
  
  return <div>{user.name} - {user.role}</div>;
}
```

### Advanced Pattern: Multiple Contexts

```jsx
// Separate contexts for different concerns
const ThemeContext = createContext();
const AuthContext = createContext();
const NotificationContext = createContext();

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <YourApp />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### Context with useReducer (Advanced)

```jsx
const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
```

### Performance Optimization

```jsx
// ⚠️ Problem: All consumers re-render on any change
<UserContext.Provider value={{ user, settings, theme }}>

// ✅ Solution 1: Split contexts
<UserContext.Provider value={user}>
  <SettingsContext.Provider value={settings}>
    <ThemeContext.Provider value={theme}>

// ✅ Solution 2: Memoize value
const value = useMemo(() => ({ user, settings }), [user, settings]);
<UserContext.Provider value={value}>
```

---

## Redux

### What is Redux?

Redux is a **predictable state container** for JavaScript applications. It's a popular state management library based on Flux architecture.

### Core Concepts

#### 1. Store
Single source of truth for your entire application state.

```jsx
import { createStore } from 'redux';

const store = createStore(reducer);
```

#### 2. Actions
Plain JavaScript objects describing "what happened".

```jsx
// Action Types (constants)
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Action Creators (functions that return actions)
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});
```

#### 3. Reducers
Pure functions that take previous state and action, return new state.

```jsx
const initialState = {
  todos: []
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
}
```

#### 4. Dispatch
Method to send actions to the store.

```jsx
store.dispatch(addTodo('Learn Redux'));
```

### Redux with React (React-Redux)

```jsx
// store.js
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// App.js
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <YourApp />
    </Provider>
  );
}

// Component.js
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from './actions';

function TodoList() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  const handleAdd = () => {
    dispatch(addTodo('New Todo'));
  };
  
  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };
  
  return (
    <div>
      <button onClick={handleAdd}>Add Todo</button>
      {todos.map(todo => (
        <div key={todo.id} onClick={() => handleToggle(todo.id)}>
          {todo.text} - {todo.completed ? '✓' : '○'}
        </div>
      ))}
    </div>
  );
}
```

### Redux Toolkit (Modern Approach)

Redux Toolkit (RTK) is the official recommended way to write Redux logic.

```jsx
// store.js
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});

// todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // Redux Toolkit uses Immer, so we can "mutate" state
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;

// Component.js
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from './todosSlice';

function TodoList() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(addTodo('New Todo'))}>
        Add Todo
      </button>
      {todos.map(todo => (
        <div key={todo.id} onClick={() => dispatch(toggleTodo(todo.id))}>
          {todo.text}
        </div>
      ))}
    </div>
  );
}
```

### Redux Middleware (Async Actions)

```jsx
// Using Redux Thunk
const fetchTodos = () => async (dispatch) => {
  dispatch({ type: 'FETCH_TODOS_REQUEST' });
  
  try {
    const response = await fetch('/api/todos');
    const data = await response.json();
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message });
  }
};

// Using Redux Toolkit's createAsyncThunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});
```

### Redux Principles

1. **Single Source of Truth**: One store for entire app
2. **State is Read-Only**: Only way to change state is dispatching actions
3. **Changes via Pure Functions**: Reducers must be pure functions

---

## React vs Next.js

### React

**What it is**: A JavaScript library for building user interfaces.

**Characteristics**:
- **Client-Side Rendering (CSR)** by default
- You choose your own routing (React Router)
- You choose your own tooling
- Flexible and unopinionated
- Requires configuration for production optimization

**Typical Use Case**:
```jsx
// Create React App structure
src/
  components/
  App.js
  index.js
```

### Next.js

**What it is**: A React framework for production with built-in features.

**Characteristics**:
- **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)**
- Built-in file-based routing
- API routes built-in
- Automatic code splitting
- Image optimization
- Built-in CSS/Sass support
- Optimized for production out of the box

**File-Based Routing**:
```
pages/
  index.js          → /
  about.js          → /about
  blog/
    [slug].js       → /blog/:slug
  api/
    users.js        → /api/users
```

### Key Differences

| Feature | React | Next.js |
|---------|-------|---------|
| **Rendering** | Client-Side (CSR) | SSR, SSG, CSR, ISR |
| **Routing** | Needs React Router | Built-in file-based |
| **SEO** | Challenging (CSR issues) | Excellent (SSR/SSG) |
| **API Routes** | Need separate backend | Built-in API routes |
| **Configuration** | Manual setup | Zero config defaults |
| **Image Optimization** | Manual | Built-in `<Image>` |
| **Code Splitting** | Manual | Automatic |
| **Performance** | Requires optimization | Optimized by default |
| **Learning Curve** | Lower | Higher (more concepts) |

### Rendering Strategies in Next.js

#### 1. Static Site Generation (SSG)
Pre-renders pages at build time.

```jsx
// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    props: { post },
    revalidate: 60 // ISR: Revalidate every 60 seconds
  };
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: 'blocking'
  };
}

export default function BlogPost({ post }) {
  return <article>{post.title}</article>;
}
```

#### 2. Server-Side Rendering (SSR)
Renders on each request.

```jsx
export async function getServerSideProps(context) {
  const data = await fetchData();
  
  return {
    props: { data }
  };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}
```

#### 3. Client-Side Rendering (CSR)
Renders in browser (like React).

```jsx
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data}</div>;
}
```

#### 4. Incremental Static Regeneration (ISR)
Update static pages after build without rebuilding entire site.

```jsx
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 10 // Regenerate page every 10 seconds
  };
}
```

### Next.js 13+ App Router

```jsx
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// app/page.js (Server Component by default)
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}

// app/client-component.js
'use client'; // Client Component

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## When to Use What

### Use Prop Drilling When:
- ✅ Only 2-3 component levels deep
- ✅ Small, simple applications
- ✅ Props are actually used by intermediate components
- ✅ Data doesn't change frequently

### Use Context API When:
- ✅ Theme data, auth state, locale
- ✅ Data doesn't update very frequently
- ✅ Medium-sized applications
- ✅ Avoiding prop drilling for deeply nested components
- ✅ Shared UI state (modals, notifications)

### Use Redux When:
- ✅ Large-scale applications
- ✅ Complex state logic with many interactions
- ✅ State needs to be shared across many components
- ✅ Need predictable state changes and time-travel debugging
- ✅ Team needs strict patterns and structure
- ✅ Frequently updated global state

### Use React When:
- ✅ Building SPAs with heavy client-side interaction
- ✅ SEO is not critical
- ✅ Need maximum flexibility
- ✅ Building internal dashboards, admin panels
- ✅ Real-time applications (chat, collaborative tools)

### Use Next.js When:
- ✅ SEO is critical (blogs, e-commerce, marketing sites)
- ✅ Need fast initial page loads
- ✅ Content-heavy websites
- ✅ Want built-in API routes
- ✅ Need multiple rendering strategies
- ✅ Want production optimizations out of the box

### Decision Tree

```
Need state management?
├── Yes
│   ├── How complex?
│   │   ├── Simple (theme, auth) → Context API
│   │   ├── Medium (some global state) → Context API + useReducer
│   │   └── Complex (lots of interactions) → Redux Toolkit
│   └── How deep is component tree?
│       ├── 2-3 levels → Prop Drilling (fine)
│       └── Deep nesting → Context API or Redux
│
Need framework features?
├── Yes
│   ├── SEO important? → Next.js (SSR/SSG)
│   ├── Want API routes? → Next.js
│   └── Want file-based routing? → Next.js
└── No
    └── Maximum flexibility needed → React (CRA or Vite)
```

---

## Interview Questions

### Beginner Level

#### Prop Drilling
1. **Q: What is prop drilling?**
   - A: Passing props through multiple component levels where intermediate components don't need the data.

2. **Q: What are the problems with prop drilling?**
   - A: Hard to maintain, clutters code, makes refactoring difficult, reduces component reusability.

3. **Q: When is prop drilling acceptable?**
   - A: For 2-3 levels deep, small apps, or when intermediate components actually use the props.

#### Context API
4. **Q: What is Context API?**
   - A: React's built-in solution for sharing data across component tree without prop drilling.

5. **Q: How do you create a context?**
   - A: `const MyContext = createContext(defaultValue);`

6. **Q: What are the three steps to use Context?**
   - A: 1) Create context, 2) Provide value with Provider, 3) Consume with useContext

#### Redux
7. **Q: What is Redux?**
   - A: A predictable state container for JavaScript apps with centralized state management.

8. **Q: What are the three principles of Redux?**
   - A: Single source of truth, state is read-only, changes via pure functions.

9. **Q: What is an action in Redux?**
   - A: Plain JavaScript object with a `type` property describing what happened.

10. **Q: What is a reducer?**
    - A: Pure function that takes previous state and action, returns new state.

#### Library vs Framework
11. **Q: What's the difference between library and framework?**
    - A: Library: you control the flow. Framework: framework controls the flow (IoC).

12. **Q: Is React a library or framework?**
    - A: Library - you choose routing, state management, etc.

#### React vs Next.js
13. **Q: What is Next.js?**
    - A: React framework with built-in SSR, routing, and production optimizations.

14. **Q: What is SSR?**
    - A: Server-Side Rendering - HTML generated on server for each request.

15. **Q: What is the main advantage of Next.js over React?**
    - A: Better SEO, faster initial load, built-in routing and optimizations.

---

### Intermediate Level

#### Context API
16. **Q: What's the performance issue with Context API?**
    - A: All consumers re-render when context value changes, even if they don't use the changed part.

17. **Q: How can you optimize Context re-renders?**
    - A: Split contexts, memoize values with useMemo, split provider values.

18. **Q: Can you use multiple contexts in one app?**
    - A: Yes, you can nest multiple providers and consume them separately.

19. **Q: Context API vs Redux - when to use which?**
    - A: Context for simple, infrequent updates (theme, auth). Redux for complex state with frequent updates.

#### Redux
20. **Q: What is Redux Toolkit and why use it?**
    - A: Official recommended way to write Redux with less boilerplate, built-in best practices.

21. **Q: What is a slice in Redux Toolkit?**
    - A: Collection of reducer logic and actions for a single feature/domain.

22. **Q: How do you handle async operations in Redux?**
    - A: Use middleware like Redux Thunk or createAsyncThunk in RTK.

23. **Q: What is the purpose of Redux DevTools?**
    - A: Debug Redux state changes, time-travel debugging, inspect actions/state.

24. **Q: What is an action creator?**
    - A: Function that creates and returns an action object.

25. **Q: Explain Redux data flow.**
    - A: Component dispatches action → Reducer creates new state → Store updates → Component re-renders.

#### Next.js
26. **Q: Explain SSG vs SSR vs CSR.**
    - A: SSG: built at build time. SSR: rendered per request. CSR: rendered in browser.

27. **Q: What is getStaticProps?**
    - A: Function to fetch data at build time for SSG.

28. **Q: What is getServerSideProps?**
    - A: Function to fetch data on each request for SSR.

29. **Q: What is ISR (Incremental Static Regeneration)?**
    - A: Update static pages after build without rebuilding entire site using `revalidate`.

30. **Q: How does routing work in Next.js?**
    - A: File-based routing - files in pages/ directory automatically become routes.

---

### Advanced Level

#### Context API
31. **Q: How would you implement a theme system with Context that avoids unnecessary re-renders?**
    - A: Split theme data and theme updater into separate contexts, use React.memo on consumers.

32. **Q: Explain how to combine useReducer with Context for complex state.**
    - A: Create reducer function, use useReducer in provider, pass dispatch via context.

#### Redux
33. **Q: Explain how Redux middleware works.**
    - A: Sits between dispatch and reducer, can intercept actions for logging, async ops, etc.

34. **Q: What is the difference between Redux Thunk and Redux Saga?**
    - A: Thunk uses functions/promises (simpler). Saga uses generators (more powerful, complex).

35. **Q: How do you structure a large Redux application?**
    - A: Feature-based folders (ducks pattern), use Redux Toolkit, normalize state shape.

36. **Q: What is the purpose of combineReducers?**
    - A: Combines multiple reducers into single root reducer for the store.

37. **Q: Explain selector pattern and reselect library.**
    - A: Selectors extract data from state. Reselect memoizes selectors for performance.

38. **Q: How would you handle form state - Context, Redux, or local state?**
    - A: Local state for simple forms, Redux for forms affecting global state, libraries like Formik for complex.

#### Next.js
39. **Q: Explain Next.js 13 App Router vs Pages Router.**
    - A: App Router uses React Server Components, nested layouts, new data fetching. Pages uses traditional routing.

40. **Q: What are React Server Components in Next.js 13+?**
    - A: Components that render on server by default, can directly access backend resources.

41. **Q: How does Next.js handle code splitting?**
    - A: Automatic code splitting per page, dynamic imports for components.

42. **Q: Explain the benefits of Next.js Image component.**
    - A: Automatic optimization, lazy loading, responsive images, WebP format.

43. **Q: How do you implement middleware in Next.js?**
    - A: Create middleware.js in root, runs before request is completed, useful for auth/redirects.

44. **Q: What is the difference between dynamic and static imports?**
    - A: Dynamic imports load code on-demand (code splitting), static imports load at bundle time.

45. **Q: How would you optimize a Next.js app for performance?**
    - A: Use SSG where possible, implement ISR, optimize images, use dynamic imports, enable compression, use CDN.

#### Architecture & Best Practices
46. **Q: How would you design state management for a large e-commerce app?**
    - A: Redux for cart/products, Context for theme/auth, local state for UI, consider server state (React Query).

47. **Q: Explain the trade-offs between Redux and React Query.**
    - A: Redux for client state, complex logic. React Query for server state, caching, automatic refetching.

48. **Q: When would you use Zustand or Jotai instead of Redux?**
    - A: Simpler apps needing less boilerplate, don't need Redux DevTools, want hooks-first API.

49. **Q: How do you prevent prop drilling without Context/Redux?**
    - A: Component composition, render props, HOCs, custom hooks with local storage.

50. **Q: Design a real-time collaborative app - what rendering and state strategy?**
    - A: WebSocket connections, optimistic updates, CRDT/OT for conflict resolution, possibly Context + useReducer or Zustand, consider SSR for initial load.

---

## Best Practices Summary

### State Management
1. Start with local state, lift only when needed
2. Use Context for infrequent, simple shared state
3. Use Redux for complex, frequently updated global state
4. Consider React Query/SWR for server state
5. Avoid storing derived state

### React
1. Keep components small and focused
2. Use composition over inheritance
3. Avoid inline function definitions in JSX
4. Use keys properly in lists
5. Implement error boundaries

### Next.js
1. Use SSG for static content (blogs, docs)
2. Use SSR for personalized/dynamic content
3. Use ISR for best of both worlds
4. Optimize images with Image component
5. Implement proper meta tags for SEO
6. Use API routes for simple backends

### General
1. Keep business logic separate from UI
2. Write tests for critical paths
3. Use TypeScript for large projects
4. Document complex state flows
5. Monitor bundle size and performance

---

## Resources for Further Learning

- **React Docs**: https://react.dev
- **Redux Toolkit**: https://redux-toolkit.js.org
- **Next.js Docs**: https://nextjs.org/docs
- **Kent C. Dodds Blog**: https://kentcdodds.com
- **React Query**: https://tanstack.com/query
- **State Management Comparison**: Choose based on needs, not hype

---
