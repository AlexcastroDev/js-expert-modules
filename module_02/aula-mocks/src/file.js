const { readFile } = require("fs/promises")
const { join } = require("path")
const { errors } = require("./constants")
const User = require("./User")

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
}

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    return File.parseCsvToJson(content)
  }

  static async parseCsvToJson(csvString) {
    const lines = csvString.split("\n")
    const firstLine = lines.shift()
    const header = firstLine.split(",")

    const users = lines.map((line) => {
      const columns = line.split(",")
      const user = {}
      for (const index in columns) {
        user[header[index]] = columns[index]
      }

      return new User(user)
    })

    return users
  }

  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath)
    return (await readFile(filename)).toString("utf8")
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const lines = csvString.split("\n")
    const [header, ...linesCsv] = lines
    const isHeaderValid = header === options.fields.join(",")
    const isValidLines =
      linesCsv.length > 0 && linesCsv.length <= options.maxLines

    if (!isHeaderValid) {
      return {
        error: errors.FILE_FIELDS_ERROR,
        isValid: false,
      }
    }

    if (!isValidLines) {
      return {
        error: errors.FILE_LENGTH_ERROR,
        isValid: false,
      }
    }

    return {
      isValid: true,
    }
  }
}

module.exports = File
