function Employee() {}
Employee.prototype.salary = () => "salary**"

function Supervisor() {}
// herda a instancia de employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"

function Manager(){}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// podemos chamar via prototype, mas se tentar chamar direto dá erro!
console.log('Manager.prototype.salary()', Manager.prototype.salary())
// console.log('Manager.prototype.salary()', Manager.salary())

//  se nao chamar o 'new', o primeiro __proto__ vai ser sempre 
// a instancia de Function, sem herdar nossas classes
// Para acessas as classes sem o new, pode acessar direto via prototype
console.log("Manager.prototype.__proto__ === Supervisor.prototype", Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

console.log('-----')

// quando chamamos com o 'new' o __proto__ recebe o prototype
console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)