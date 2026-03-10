// ─── QUESTION BANK ────────────────────────────────────────────────────────────
// Add more questions here at any time. The app will pick them up automatically.

export const QUESTIONS = [
  // ── Algorithms ──────────────────────────────────────────────────────────────
  { id: 1,  category: 'Algorithms',       question: 'What is the time complexity of binary search, and why?' },
  { id: 2,  category: 'Algorithms',       question: 'Explain the difference between BFS and DFS. When would you use each?' },
  { id: 3,  category: 'Algorithms',       question: 'What is dynamic programming? Give a real-world example.' },
  { id: 4,  category: 'Algorithms',       question: 'How does quicksort work? What is its average and worst-case complexity?' },
  { id: 5,  category: 'Algorithms',       question: 'Explain the two-pointer technique and when it\'s useful.' },
  { id: 6,  category: 'Algorithms',       question: 'What is a greedy algorithm? When does it fail to produce the optimal solution?' },
  { id: 7,  category: 'Algorithms',       question: 'How would you detect a cycle in a linked list?' },
  { id: 8,  category: 'Algorithms',       question: 'What is memoization and how does it differ from tabulation?' },
  { id: 9,  category: 'Algorithms',       question: 'Explain merge sort. Why might you choose it over quicksort?' },
  { id: 10, category: 'Algorithms',       question: 'What is the sliding window technique? Give an example problem it solves.' },

  // ── Data Structures ──────────────────────────────────────────────────────────
  { id: 11, category: 'Data Structures',  question: 'What are the differences between a stack and a queue? Give use cases for each.' },
  { id: 12, category: 'Data Structures',  question: 'When would you use a hash map over an array?' },
  { id: 13, category: 'Data Structures',  question: 'What is a balanced binary search tree? Why does balance matter?' },
  { id: 14, category: 'Data Structures',  question: 'Explain how a heap works and where it is commonly used.' },
  { id: 15, category: 'Data Structures',  question: 'What is the difference between an array and a linked list in terms of memory and access?' },
  { id: 16, category: 'Data Structures',  question: 'When would you use a trie? What are its advantages over a hash map?' },
  { id: 17, category: 'Data Structures',  question: 'Explain how a hash table handles collisions. Name two strategies.' },
  { id: 18, category: 'Data Structures',  question: 'What is a graph? Explain the difference between directed and undirected graphs.' },
  { id: 19, category: 'Data Structures',  question: 'What is a deque? When is it more useful than a regular queue?' },

  // ── Web Development ──────────────────────────────────────────────────────────
  { id: 20, category: 'Web Development',  question: 'What is the difference between `==` and `===` in JavaScript?' },
  { id: 21, category: 'Web Development',  question: 'Explain event bubbling and event capturing in the DOM.' },
  { id: 22, category: 'Web Development',  question: 'What are React hooks? Name three and explain when to use each.' },
  { id: 23, category: 'Web Development',  question: 'What is the virtual DOM and why does React use it?' },
  { id: 24, category: 'Web Development',  question: 'Explain the difference between async/await and Promises.' },
  { id: 25, category: 'Web Development',  question: 'What is CORS? Why does it exist and how do you handle it?' },
  { id: 26, category: 'Web Development',  question: 'What is the difference between localStorage, sessionStorage, and cookies?' },
  { id: 27, category: 'Web Development',  question: 'Explain CSS specificity and how it affects styling conflicts.' },
  { id: 28, category: 'Web Development',  question: 'What is a closure in JavaScript? Give a practical example.' },
  { id: 29, category: 'Web Development',  question: 'What is the event loop in JavaScript? How does it handle async code?' },
  { id: 30, category: 'Web Development',  question: 'Explain the difference between PUT and PATCH in REST APIs.' },
  { id: 31, category: 'Web Development',  question: 'What is debouncing and throttling? When would you use each?' },

  // ── Databases ────────────────────────────────────────────────────────────────
  { id: 32, category: 'Databases',        question: 'What is the difference between SQL and NoSQL databases? When would you choose each?' },
  { id: 33, category: 'Databases',        question: 'Explain database normalization. When might you intentionally denormalize?' },
  { id: 34, category: 'Databases',        question: 'What is an index in a database? When should you add one, and when does it hurt?' },
  { id: 35, category: 'Databases',        question: 'Explain the ACID properties in database transactions.' },
  { id: 36, category: 'Databases',        question: 'What is the N+1 query problem and how do you solve it?' },
  { id: 37, category: 'Databases',        question: 'Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN.' },
  { id: 38, category: 'Databases',        question: 'What is a database transaction? Why are they important?' },
  { id: 39, category: 'Databases',        question: 'What is a foreign key? How does it enforce referential integrity?' },

  // ── OOP ──────────────────────────────────────────────────────────────────────
  { id: 40, category: 'OOP',              question: 'Explain the four pillars of OOP: encapsulation, inheritance, polymorphism, and abstraction.' },
  { id: 41, category: 'OOP',              question: 'What is the difference between a class and an interface?' },
  { id: 42, category: 'OOP',              question: 'Explain the SOLID principles. Which one do you think is most important and why?' },
  { id: 43, category: 'OOP',              question: 'What is composition over inheritance? When would you prefer one over the other?' },
  { id: 44, category: 'OOP',              question: 'What is a design pattern? Describe the Singleton pattern and its trade-offs.' },
  { id: 45, category: 'OOP',              question: 'Explain the Observer pattern and describe a real-world use case.' },
  { id: 46, category: 'OOP',              question: 'What is the Factory pattern? How does it improve code maintainability?' },

  // ── System Design ────────────────────────────────────────────────────────────
  { id: 47, category: 'System Design',    question: 'How would you design a URL shortener like bit.ly? Walk me through your approach.' },
  { id: 48, category: 'System Design',    question: 'Explain the difference between horizontal and vertical scaling.' },
  { id: 49, category: 'System Design',    question: 'What is a load balancer and why is it important in distributed systems?' },
  { id: 50, category: 'System Design',    question: 'How does caching work? What are common cache invalidation strategies?' },
  { id: 51, category: 'System Design',    question: 'What is a CDN and when would you use one?' },
  { id: 52, category: 'System Design',    question: 'How would you design a real-time chat application?' },
  { id: 53, category: 'System Design',    question: 'Explain microservices vs monolithic architecture. What are the trade-offs?' },
  { id: 54, category: 'System Design',    question: 'What is eventual consistency? When is it acceptable vs when must you use strong consistency?' },
  { id: 55, category: 'System Design',    question: 'How would you design a notification system that handles millions of users?' },
]

export const CATEGORIES = [
  'All',
  'Algorithms',
  'Data Structures',
  'Web Development',
  'Databases',
  'OOP',
  'System Design',
]

export const CATEGORY_META = {
  'Algorithms':      { emoji: '🔁', accent: '#6c8eff', light: '#6c8eff1a' },
  'Data Structures': { emoji: '🌲', accent: '#4caf7d', light: '#4caf7d1a' },
  'Web Development': { emoji: '🌐', accent: '#e06fff', light: '#e06fff1a' },
  'Databases':       { emoji: '🗄️', accent: '#ffb347', light: '#ffb3471a' },
  'OOP':             { emoji: '📦', accent: '#47e0e0', light: '#47e0e01a' },
  'System Design':   { emoji: '🏗️', accent: '#ff6b6b', light: '#ff6b6b1a' },
}
