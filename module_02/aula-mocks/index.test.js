const { rejects, deepEqual } = require("assert")
const { errors } = require("./src/constants")
const File = require("./src/file")

;(async () => {
  {
    const filepath = "../mocks/empty-file.csv"
    const rejection = new Error(errors.FILE_LENGTH_ERROR)
    const result = File.csvToJson(filepath)

    await rejects(result, rejection)
  }

  {
    const filepath = "../mocks/more-items.csv"
    const rejection = new Error(errors.FILE_LENGTH_ERROR)
    const result = File.csvToJson(filepath)

    await rejects(result, rejection)
  }
  {
    const filepath = "../mocks/invalid-header.csv"
    const rejection = new Error(errors.FILE_FIELDS_ERROR)
    const result = File.csvToJson(filepath)

    await rejects(result, rejection)
  }
  {
    const filepath = "../mocks/valid-items.csv"
    const result = await File.csvToJson(filepath)

    const expected = [
      {
        name: "Alexandro castro",
        id: 1,
        proession: "javascript dev",
        age: 26,
      },
      { name: "João", id: 1, proession: "javascript dev", age: 22 },
      {
        name: "Mariazinha",
        id: 1,
        proession: "javascript dev",
        age: 30,
      },
    ]
    await deepEqual(result, expected)
  }
})()
