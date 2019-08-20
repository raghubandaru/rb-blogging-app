import bcrypt from "bcryptjs"

import getUserId from "../utils/getUserId"
import generateToken from "../utils/generateToken"
import hashPassword from "../utils/hashPassword"

const Mutation = {
  async login(parent, args, { prisma }, info) {
    const { email, password } = args

    const user = await prisma.query.user({ where: { email } })

    if (!user) {
      throw new Error("User not found")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error("Username/Password did not match")
    }

    return {
      user,
      token: generateToken(user.id),
    }
  },

  async createUser(parent, args, { prisma }, info) {
    const password = await hashPassword(args.data.password)

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    })

    return {
      user,
      token: generateToken(user.id),
    }
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    if (typeof args.data.password === "string") {
      args.data.password = await hashPassword(args.data.password)
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId,
        },
        data: args.data,
      },
      info
    )
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.mutation.deleteUser({
      where: {
        id: userId,
      },
    })
  },
  async createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    return prisma.mutation.createPost(
      {
        data: {
          ...args.data,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    )
  },
  async updatePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: { id: userId },
    })

    const postPublished = await prisma.exists.Post({
      id: args.id,
      author: { id: userId },
      published: true,
    })

    if (!postExists) {
      throw new Error("Unable to update post")
    }

    if (postPublished && !args.data.published) {
      await prisma.mutation.deleteManyComments({
        where: { post: { id: args.data.id } },
      })
    }

    return prisma.mutation.updatePost(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    )
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: { id: userId },
    })

    if (!postExists) {
      throw new Error("Unable to delete post")
    }

    return prisma.mutation.deletePost({ where: { id: args.id } }, info)
  },
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const postExists = await prisma.exists.Post({
      id: args.data.post,
      published: true,
    })

    if (!postExists) {
      throw new Error("Comment not created for unexisting or draft posts")
    }

    return prisma.mutation.createComment(
      {
        data: {
          ...args.data,
          author: {
            connect: {
              id: userId,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info
    )
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    })

    if (!commentExists) {
      throw new Error("Unable to update comment")
    }

    return prisma.mutation.updateComment(
      {
        where: {
          id: args.id,
        },
        data: args.data,
      },
      info
    )
  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({
      id: args.id,
      author: {
        id: userId,
      },
    })

    if (!commentExists) {
      throw new Error("Unable to delete comment")
    }
    return prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info
    )
  },
}

export { Mutation as default }
