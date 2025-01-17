import bcrypt from "bcryptjs"

const hashPassword = password => {
  if (password.length < 8) {
    throw new Error("Password length must be 8 characters or longer")
  }

  // password, salt
  return bcrypt.hash(password, 10)
}

export { hashPassword as default }
