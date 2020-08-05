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