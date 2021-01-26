// Prototypes

// Object Property Delegation on failed lookup

// Old-school pre-ES6
function SuperHero(heroName,realName){
  let hero = Object.create(SuperHero.prototype)
    hero.heroName = heroName
    hero.realName = realName
    return hero
}

SuperHero.prototype.move = function(){
    console.log(`${this.heroName} is actually ${this.realName}!`)
    return
}

const deadPool = SuperHero('deadPool', 'Wade Wilson')

console.log(deadPool)
console.log(deadPool.move())

function NewSuperHero(heroName, realName){
    // Can omit delegation as it's inferred.
    this.heroName = heroName // Has to be this.
    this.realName = realName
    // Can omit return as it's inferred.
}


NewSuperHero.prototype.move = function(){
    console.log(`${this.heroName} is actually ${this.realName}!`)
    return
}

const cable = new NewSuperHero('Cable', 'Nathan Summers')

console.log(cable.move())

// New way (Syntactic Sugar for above)
class SuperHeroClass{
    constructor(heroName, realName){
        this.heroName = heroName
        this.realName = realName
    }
    move(){
         console.log(`${this.heroName} is actually ${this.realName}!`)
         return
    }
}


const batMan = new SuperHeroClass('BatMan', 'Bruce Wayne')

console.log(batMan.move())

// Can use Object.getPrototypeOf(Object) to retrieve the prototype
console.log(Object.getPrototypeOf(batMan))
console.log(Object.getPrototypeOf(batMan))
