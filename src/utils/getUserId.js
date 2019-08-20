import jwt from "jsonwebtoken"

const getUserId = (request, requireAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization

  // return decoded user if header exists
  if (header) {
    const token = header.replace("Bearer ", "")
    const decoded = jwt.verify(token, "lara375")

    return decoded.userId
  }

  // throw an error if authentication is required
  if (requireAuth) {
    throw new Error("Authentication required")
  }

  return null
}

export { getUserId as default }
