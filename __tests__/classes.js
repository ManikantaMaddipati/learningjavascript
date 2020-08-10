//Chapter 9. Classes:


//In JavaScript, classes use prototype-based inheritance:
//if two objects inherit properties (generally function-valued properties, or methods) from the same prototype,
//then we say that those objects are instances of the same class.

//6.2.3 Prototypes:
//Almost every JavaScript object has a second JavaScript object associated with it. This second object is known as a prototype, and the first object inherits properties from the prototype
//we can refer to this prototype object in JavaScript code as Object.prototype
//Objects created using the new keyword and a constructor invocation use the value of the prototype property of the constructor function as their prototype
//new Object() inherits from Object.prototype.
//new Array() uses Array.prototype as its prototype, and the object created by new Date() uses Date.prototype as its prototype.
//Remember: almost all objects have a prototype, but only a relatively small number of objects have a prototype property.
// It is these objects with prototype properties that define the prototypes for all the other objects.


// 6.3.2 Inheritance :
//JavaScript objects have a set of “own properties,” and they also inherit a set of properties from their prototype object.
//Suppose you query the property x in the object o. If o does not have an own property with that name, the prototype object of o1 is queried for the property x. If the prototype object does not have
// an own property by that name, but has a prototype itself, the query is performed on the prototype of the prototype. This continues until the property x is found or until an object with a null
// prototype is searched
//Property assignment examines the prototype chain only to determine whether the assignment is allowed. If o inherits a read-only property named x, for example, then the assignment is not allowed.
//If the assignment is allowed, however, it always creates or sets a property in the original object and never modifies objects in the prototype chain.
//There is one exception to the rule that a property assignment either fails or creates or sets a property in the original object:
//If o inherits the property x, and that property is an accessor property with a setter method (see §6.10.6), then that setter method is called rather than creating a new property x in o.
// Note, however, that the setter method is called on the object o, not on the prototype object that defines the property, so if the setter method defines any properties,
// it will do so on o, and it will again leave the prototype chain unmodified.

//2 styles of creating classes : Old way and new way:
// If you’re familiar with strongly typed object-oriented programming languages like Java or C++, you’ll notice that JavaScript classes are quite different from classes in those languages.
// There are some syntactic similarities, and you can emulate many features of “classical” classes in JavaScript, but it is best to understand
// up front that JavaScript’s classes and prototype-based inheritance mechanism are substantially different from the classes and class-based inheritance mechanism of Java and similar languages.

//9.1 Classes and Prototypes:
//In JavaScript,a class is a set of objects that inherit properties from the same prototype object.
//Object.create() function that returns a newly created object that inherits from a specified prototype object.
//if we define a prototype object and then use Object.create() to create objects that inherit from it, we have defined a JavaScript class.
//Usually, the instances of a class require further initialization, and it is common to define a function that creates and initializes the new object.
function range(from, to) {
    // Use Object.create() to create an object that inherits from the
    // prototype object defined below.  The prototype object is stored as
    // a property of this function, and defines the shared methods (behavior)
    // for all range objects.
    let r = Object.create(range.methods);

    // Store the start and end points (state) of this new range object.
    // These are noninherited properties that are unique to this object.
    r.from = from;
    r.to = to;

    // Finally return the new object
    return r;
}

range.methods = {
   toString()  {return "(" + this.from + "..." + this.to + ")";}
}
let r = range(1,3);
test("8.6 Closures-3",()=>{expect(
      r.toString()).
        toBe("(1...3)")},
    );

//This code defines a factory function range() for creating new Range objects.
//It uses the methods property of this range() function as a convenient place to store the prototype object that defines the class.
//The range.methods object uses the ES6 shorthand syntax for defining methods, which is why you don’t see the function keyword anywhere.
//range.methods all use thefrom and to properties that were initialized in the range()factory function. In order to refer to them, they use the
// this keyword to refer to the object through which they were invoked.


//9.2 Classes and Constructors
//Above example is without constructor.
//A constructor is a function designed for the initialization of newly created objects
//Constructors are invoked using the new keyword.
//Constructor invocations differ from regular function and method invocations in their handling of arguments, invocation context, and return value.
//The critical feature of constructor invocations is that the prototype property of the constructor is used as the prototype of the new object.
//almost all objects have a prototype, only a few objects have a prototype property ::: it is function objects that have a prototype property.
//This means that all objects created with the same constructor function inherit from the same object and are therefore members of the same class.

function Range(from, to){
    this.from=from;
    this.to=to;
}

Range.prototype={
    tgh: function() {
        return "(" + this.from + "..." + this.to +")";
    }
}
let x = new Range (2,4);
test("testing class",()=>{
    expect(x.tgh()).toBe("(2...4)")
})

//9.2.1 Constructors, Class Identity, and instanceof
//Two objects are instances of the same class if and only if they inherit from the same prototype object.
x instanceof Range   // => true: r inherits from Range.prototype
//The instanceof operator was described in §4.9.4. The lefthand operand should be the object that is being tested,
// and the righthand operand should be a constructor function that names a class.
//Technically speaking, in the previous code example, the instanceof operator is not checking whether r was actually initialized by the Range constructor.
// Instead, it is checking whether r inherits from Range.prototype. example
//If we define a function Strange() and set its prototype to be the same as Range.prototype,
//then objects created with new Strange() will count as Range objects as far as instanceof is concerned
function Strange(){

}
Strange.prototype=Range.prototype
let check= new Strange();
test ("testing instanceof",()=>{
    expect(check instanceof Range).toBe(true);
})

//9.3 Classes with the class Keyword.
//If your class does not need to do any initialization, you can omit the constructor keyword and its body, and an empty constructor function will be implicitly created for you
class HelloWorld {
    constructor() {
    }
    xyz(){
        return "Hello World"
    }
}

let h = new HelloWorld();
test ("testing class",()=>{
    expect(h.xyz()).toBe("Hello World");
})

//9.3.1 Static Methods
//Static methods are defined as properties of the constructor function rather than properties of the prototype object.
//example: Because static methods are invoked on the constructor rather than on any particular instance,
// it almost never makes sense to use the this keyword in a static method.

class SaticRange {
    constructor(from, to) {
        // Store the start and end points (state) of this new range object.
        // These are noninherited properties that are unique to this object.
        this.from = from;
        this.to = to;
    }
    static parse(s) {
        let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
        if (!matches) {
            throw new TypeError(`Cannot parse Range from "${s}".`)
        }
        return new SaticRange(parseInt(matches[1]), parseInt(matches[2]));
    }

    // Return true if x is in the range, false otherwise
    // This method works for textual and Date ranges as well as numeric.
    includes(x) { return this.from <= x && x <= this.to; }

    // A generator function that makes instances of the class iterable.
    // Note that it only works for numeric ranges.
    *[Symbol.iterator]() {
        for(let x = Math.ceil(this.from); x <= this.to; x++) yield x;
    }

    // Return a string representation of the range
    toString() { return `(${this.from}...${this.to})`; }
}

//9.3.2 Getters, Setters, and other Method Forms





























