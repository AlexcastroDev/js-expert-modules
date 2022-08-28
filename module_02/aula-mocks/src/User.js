class User {
  constructor({ name, id, profession, age }) {
    this.name = name
    this.id = Number(id)
    this.proession = profession.trim()
    this.age = Number(age)
  }
}

module.exports = User
