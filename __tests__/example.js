import {getFormattedValue,testingObjectProps,tetsing_inheritance,propertyAccessError,testingSetValuetoInheritedProperty,propertyAccessErrorIdiomatic} from '../utils.js';

test('formats the value', () => {
    expect(getFormattedValue('1234.0')).toBe('1,234.0');
});

test('testing inheritance',()=>{
    let test_object = tetsing_inheritance();

    expect(test_object.x).toBe(1);
    expect(test_object.y).toBe(2);
    expect(test_object.z).toBe(3);
} )

test('testing Property access error which must be null when accessing  the property',()=>{
    expect(testingObjectProps(1)).toBe(undefined)
} )

test('xyz',()=>{
    let  i =propertyAccessError();
    expect(i.y).toBe(1);
    //property x is readOnly I want to assert that it must throw readOnly.
    //how to assert that Error is throw?
    expect(i.x=2).toThrowError(TypeError);
})

test('Testing inheritance by setting value on inherited Prop', ()=>{
    let w =  testingSetValuetoInheritedProperty();
    expect(w).toBe(1);
})

test ("testpropertyAccessError",()=>{
   // It is an error, however, to attempt to query a property of an object that does not exist
   // because the null and undefined values have no properties
   expect(()=>{propertyAccessErrorIdiomatic().AuthorLastName.length}).toThrow(TypeError);

   //To guard against this TypeError when querying null props use Idiomatic expressions
    expect(propertyAccessErrorIdiomatic() && propertyAccessErrorIdiomatic().AuthorLastName &&
        propertyAccessErrorIdiomatic().AuthorLastName.length).toBe(undefined);

})

//The rules that specify when a property assignment succeeds and when it fails
test("rules for prop assignment", () =>{
    //o has an own property p that is read-only: it is not possible to set read-only properties.
    let o={};
    Object.defineProperty(o,'x',{ value:'1',writable:false});
    expect(()=>{o.x=3}).toThrow(TypeError);

    //o has an inherited property p that is read-only: it is not possible to hide an
    // inherited read-only property with an own property of the same name.
    let a={};
    Object.defineProperty(a,'x',{ value:'1',writable:false});
    let b = Object.create(a)
    expect(()=>{b.x=3}).toThrow(TypeError);

    //o does not have an own property p; o does not inherit a property p with a setter method, and o’s extensible attributes is false.
    // then no new properties can be defined on it.
    let c={"y":1}
    Object.preventExtensions(c);
    expect(()=>{c.x = 3}).toThrow(TypeError);
})


test (
    "deleting Props from object" , ()=>{
        let fruits = {"a":"1","b":"1","c":"2"};
        delete fruits.c
        expect(fruits.c).toBe(undefined);

        //delete operator only deletes own properties, not inherited ones
        // delete expression evaluates to true if the delete succeeded or if the delete had no effect

        //every object has 3 flages : writable , enumerable , configurable
        //configurable : attribute specifies whether the property can be deleted and whether its attributes can be altered.
        //delete does not remove properties that have a configurable attribute of false
        let l = {"y":"1"}
        Object.defineProperty(l, "y", {
            configurable: false
        });
        expect(delete l.y ).toThrow(TypeError);
    }
)

//6.5 Testing Properties
test("Testing Properties",()=>{{
    let o ={x:1};
    //in return boolean
    expect("x" in o).toBe(true)
    //hasOwnProperty() return boolean
    expect(o.hasOwnProperty("x")).toBe(true)
    //propertyIsEnumerable() : property is an own property and its enumerable attribute is true
    expect(o.propertyIsEnumerable("x") ).toBe(true)
}})

//6.6 Enumerating Properties

test("6.6 Enumerating Properties" ,()=>{
    let cat = {x:1,r:2,f:3}
    for (let p in cat){
        console.log(p)
    }
    expect(cat.propertyIsEnumerable(cat.toString())).toBe(false);

    // Object.keys() returns an array of the names of the enumerable own properties of an object. It does not include non-enumerable properties, inherited properties, or properties whose name is a Symbol (see §6.10.3).
    //
    // Object.getOwnPropertyNames() works like Object.keys() but returns an array of the names of non-enumerable own properties as well, as long as their names are strings.
    //
    // Object.getOwnPropertySymbols() returns own properties whose names are Symbols, whether or not they are enumerable.
    //
    // Reflect.ownKeys() returns all own property names, both enumerable and non-enumerable, and both string and Symbol. (See §14.6.)
})

test("Extending Objects", ()=>{
    let target = {x: 1}, source = {y: 2, z: 3};

    Object.assign(target,source)
    console.log(target)

    //object override properties
    source = {x: 2, z: 3};
    Object.assign(target,source)
    console.log(target)

})

//6.8 Serializing Objects
test("Serializing Objects", ()=> {
    let o = {x: 1, y: {z: [false, null, ""]}};

    //JSON.stringify() : converts object to string  (JSON)
    let s = JSON.stringify(o)
    console.log(s);

    //JSON.parse()  : converts string (JSON) to Object
    let p = JSON.parse(s);
    console.log(p);
})

//6.9 Object Methods
test("6.9 Object Methods", ()=> {
    //toString
    //By default : we get "[object Object]" , which is not useful so we define costume one
    let o = {x: 1, y: {z: [false, null, ""]}}.toString();
    console.log(o)

    //adding costume tostring.
    let point = {
        x: 1,
        y: 2,
        toString: function() { return `(${this.x}, ${this.y})`; }
    };
    console.log(point.toString());


    //toLocaleString():  return a localized string representation of the object
    let pointlocal= {
        x: 1000,
        y: 2000,
        toString: function() { return `(${this.x}, ${this.y})`; },
        toLocaleString: function() {
            return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
        }
    };
    pointlocal.toString()        // => "(1000, 2000)"
    pointlocal.toLocaleString()  // => "(1,000, 2,000)": note thousands separators

    //The valueOf() method is much like the toString() method, but it is called when JavaScript needs to convert an object to some primitive type other than a string—typically, a number. JavaScript calls this method

})

//
//we are running in node, window or document object present in node, jest framework provides it for us.
//to run explicitly in node only- use : npm t -- --env=node
// console.log(window);

//Funtions:
//8.3 Function Arguments and Parameters
//JavaScript function definitions do not specify an expected type for the function parameters,
// and function invocations do not do any type checking on the argument values you pass
// JavaScript function invocations do not even check the number of arguments being passed.

//8.3.1 Optional Parameters and Defaults
function getPropertyNames(o, a) {
    if (a === undefined) a = [];  // If undefined, use a new array
    for(let property in o) a.push(property);
    return a;
}
test("8.3.1 Optional Parameters and Defaults",()=>{
    let o = {x: 1}, p = {y: 2, z: 3};  // Two objects for testing
    let a = getPropertyNames(o);
    expect(a[0]).toEqual("x");// a == ["x"]; get o's properties in a new array
    expect(getPropertyNames(p, a)).toEqual(["x","y","z"]); // a == ["x","y","z"]; add p's properties to it

    // Note that when designing functions with optional arguments, you should be sure to put the optional ones
    // at the end of the argument list so that they can be omitted.
    // The programmer who calls your function cannot omit the first argument and pass the second:
    // they would have to explicitly pass undefined as the first argument.
})

//In ES6 and later, you can define a default value for each of your function parameters
// directly in the parameter list of your function

function getPropertyNamesES6(o, a = []) { //see default in parameter list
    for(let property in o) a.push(property);
    return a;
}

test("8.3.1 Optional Parameters and Defaults in ES6",()=>{
    let o = {x: 1}, p = {y: 2, z: 3};  // Two objects for testing
    let a = getPropertyNamesES6(o);
    expect(a[0]).toEqual("x");
    expect(getPropertyNamesES6(p, a)).toEqual(["x","y","z"]);
})

//8.3.2 Rest Parameters and Variable-Length Argument Lists
// Parameter defaults enable us to write functions that can be invoked with fewer arguments than parameters.
// Rest parameters enable the opposite case: they allow us to write functions that can be invoked with
// arbitrarily more arguments than parameters

//A rest parameter is preceded by three periods, and it must be the lastparameter in a function declaration.
// When you invoke a function with a rest parameter, the arguments you pass are first assigned to the non-rest parameters,
// and then any remaining arguments (i.e., the “rest”of the arguments) are stored in an array that becomes the value of therest
// parameter. This last point is important: within the body of afunction,
// the value of a rest parameter will always be an array. The array may be empty, but a rest parameter will never be undefined.

// Don’t confuse the ... that defines a rest parameter in a function definition
// with the ... spread operator, described in §8.3.4, which can be used in function invocations.
function max(first=-Infinity, ...rest) {
    let maxValue = first; // Start by assuming the first arg is biggest
    // Then loop through the rest of the arguments, looking for bigger
    for(let n of rest) {
        if (n > maxValue) {
            maxValue = n;
        }
    }
    // Return the biggest
    return maxValue;
}

//8.3.4 The Spread Operator for Function Calls
// This function takes a function and returns a wrapped version
//The spread operator ... is used to unpack, or “spread out,” the elements of an array (or any other iterable object, such as strings)
//in a context where individual values are expected.
function add(x,y,z) {
return x+y+z;
}
test("8.3.4 The Spread Operator for Function Calls", ()=>{
    let toadd= [1,2,3]
    expect(add(...toadd)).toBe(6)
});

//8.3.5 Destructuring Function Arguments into Parameters
//
//

//8.3.6 Argument Types
//JavaScript method parameters have no declared types, and no type checking
// is performed on the values you pass to a function.

//JavaScript performs liberal type conversion as needed. So if you write a function that expects
// a string argument and then call that function with a value of some other type,
// the value you passed will simply be converted to a string when the function tries to use it as a string.
// All primitive types can be converted to strings,
// and all objects have toString() methods (if not necessarily useful ones), so an error never occurs in this case.

//This is not always true, however. Consider again the arraycopy() method shown earlier.
// So,it may be worth adding code to check the types of arguments like this

function sum(a) {
    let total = 0;
    for(let element of a) { // Throws TypeError if a is not iterable
        if (typeof element !== "number") {
            throw new TypeError("sum(): elements must be numbers");
        }
        total += element;
    }
    return total;
}
test("8.3.6 Argument Types",()=>{expect(sum([1,2,3])).toBe(6)  }) // => 6
test("8.3.6 Argument Types",()=>{expect(sum(1, 2, 3)).toThrowError(TypeError)});// !TypeError: 1 is not iterable
test("8.3.6 Argument Types",()=>{expect(sum([1,2,"3"])).toThrowError(TypeError)}); // !TypeError: 1 is not iterable

//8.4 Functions as Values
//The most important features of functions are that they can be defined and invoked.
//   Function definition and invocation are syntactic features of JavaScript and of most other programming languages
// In JavaScript, however, functions are not only syntax but also values, which means they can be assigned to variables,
// stored in the properties of objects or the elements of arrays, passed as arguments to functions, and so on

//The name of a function is really immaterial; it is simply the name of a variable that refers to the function object.
// The function can be assigned to another variable and still work the same way:

function square(x) { return x*x; }
let s = square;  // Now s refers to the same function that square does
console.log(square(4))     // => 16
console.log(s(4))             // => 16

//8.4.1 Defining Your Own Function Properties
//Functions are not primitive values in JavaScript, but a specialized kind of object,
// which means that functions can have properties.
// When a function needs a “static” variable whose value persists across invocations,
// it is often convenient to use a property of the function itself. For example,
// suppose you want to write a function that returns a unique integer whenever it is invoked.

// Initialize the counter property of the function object.
// Function declarations are hoisted so we really can
// do this assignment before the function declaration.
uniqueInteger.counter = 0;

// This function returns a different integer each time it is called.
// It uses a property of itself to remember the next value to be returned.
function uniqueInteger() {
    return uniqueInteger.counter++;  // Return and increment counter property
}
test("8.4.1 Defining Your Own Function Properties",()=>{expect(uniqueInteger()).toBe(0)});
test("8.4.1 Defining Your Own Function Properties",()=>{expect(uniqueInteger()).toBe(1)});