import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashData = async (data) => {
    return bcrypt.hash(data, 10)
}

export const compareData = async (data, dataDB) => {
    return bcrypt.compare(data, dataDB)
}

export const cambiarCookies = (req, res, name, value) => {
    res.cookie(name, value, { overwrite: true })
  }