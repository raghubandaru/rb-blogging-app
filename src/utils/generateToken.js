import jwt from "jsonwebtoken"

const generateToken = userId => {
  return jwt.sign({ userId }, "lara375", { expiresIn: "2h" })
}

export { generateToken as default }
