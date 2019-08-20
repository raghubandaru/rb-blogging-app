// Demo Users
const users = [
  {
    id: "1",
    name: "Raghu",
    email: "raghu@example.com",
    age: 29,
  },
  {
    id: "2",
    name: "Pruthvi",
    email: "pruthvi@example.com",
  },
  {
    id: "3",
    name: "Prasad",
    email: "prasad@example.com",
  },
]

// Demo posts
const posts = [
  {
    id: "11",
    title: "GraphQL 101",
    body: "Learn GraphQL with GraphQL Yoga server",
    isPublished: true,
    author: "1",
  },
  {
    id: "12",
    title: "React Hooks 201",
    body: "Learn React hooks with reacttraining.com",
    isPublished: false,
    author: "1",
  },
  {
    id: "13",
    title: "JavaScript Closures 101",
    body: "Learn what closures are and how they work",
    isPublished: true,
    author: "2",
  },
]

// Demo comments
const comments = [
  {
    id: "101",
    text: "Great post",
    author: "3",
    post: "12",
  },
  {
    id: "102",
    text: "Need better analysis on the topic",
    author: "1",
    post: "13",
  },
  {
    id: "103",
    text: "Easily the best explanation about the topic on internet",
    author: "3",
    post: "11",
  },
  {
    id: "104",
    text: "Crisp and Sharp post",
    author: "2",
    post: "11",
  },
]

const db = {
  users,
  posts,
  comments,
}

export { db as default }
