import { Prisma } from "prisma-binding"
import { fragmentReplacements } from "./resolvers/index"

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "lara400",
  fragmentReplacements,
})

export { prisma as default }

// prisma.query.users(null, "{ id name email posts {id title} }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, "{ id text author { id name }}").then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "Prisma-Binding",
//         body: "",
//         published: false,
//         author: {
//           connect: {
//             id: "cjz9ekoff005y0a388lqcg7y3",
//           },
//         },
//       },
//     },
//     "{ id title body published }"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//     return prisma.query.users(null, "{ id name email posts {id title}}")
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   })

// prisma.mutation
//   .updatePost(
//     {
//       where: {
//         id: "cjz9k8f5800ni0a38xq9rtsjh",
//       },
//       data: {
//         body: "prisma-binding is so cool",
//         published: true,
//       },
//     },
//     "{id title body published author{ name }}"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//     return prisma.query.posts(null, "{ id title body published author{name}}")
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   })

// const createPostForUser = async (authorId, data) => {
//   // Check whether requested id actually exists
//   const userExists = await prisma.exists.User({ id: authorId })

//   // Doesn't exist
//   if (!userExists) {
//     throw new Error("User not found")
//   }

//   // continue with user
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     "{ author {id email name posts {id title published}} }"
//   )

//   return post.author
// }

// const updatePostForUser = async (postId, data) => {
//   // Check whether the requested post exists
//   const postExists = await prisma.exists.Post({
//     id: postId,
//   })

//   // Doesn't exist
//   if (!postExists) {
//     throw new Error("Post not found")
//   }

//   // continue with existing post
//   const post = await prisma.mutation.updatePost(
//     {
//       data,
//       where: {
//         id: postId,
//       },
//     },
//     "{ author {id email name posts {id title published}} }"
//   )

//   return post.author
// }

// createPostForUser("cjz9gdf2w00fv0a38vtvwuyb9", {
//   title: "Basic JavaScript",
//   body: "",
//   published: false,
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
//   })
//   .catch(error => console.log(error.message))

// updatePostForUser("cjz9lc5n000pg0a38l1mqsxwl", {
//   body: "Still in drafting phase, but publishing",
//   published: true,
// })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   })
//   .catch(error => console.log(error.message))
