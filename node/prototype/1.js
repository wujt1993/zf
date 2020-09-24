
function Animal(name) {
    this.name = name
}

console.log(Animal.prototype)

Animal.prototype.type = "animal"


console.log(Animal.prototype)

let dog = new Animal("tomact");
dog.age = 1970
console.log(dog)