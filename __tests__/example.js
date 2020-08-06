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

//8.5 Functions as Namespaces
// Variables declared within a function are not visible outside of the function.
//  For this reason, it is sometimes useful to define a function simply to act as a
//  temporary namespace in which you can define variables without cluttering the global namespace.

function chunkNamespace(x) {
    // Chunk of code goes here
    // Any variables defined in the chunk are local to this function
    // instead of cluttering up the global namespace.

    return x;
}
test("8.5 Functions as Namespaces",()=>{expect(chunkNamespace(2)).toBe(2)}); // But don't forget to invoke the function!

(function() {  // chunkNamespace() function rewritten as an unnamed expression.
    // Chunk of code goes here
}());


//8.6 Closures
// Like most modern programming languages, JavaScript uses lexical scoping. This means that functions are executed using the
// variable scope that was in effect when they were defined, not the variable scope that is in effect when they are invoked.
//In order to implement lexical scoping, the internal state of a JavaScript function object must include not only the code
//of the function but also a reference to the scope  in which the function definition appears.
// This combination of a function object and a scope (a set of variable bindings) in which the function’s variables are resolved is called a closure in the computer science literature.


//The checkscope() function declares a local variable and then defines and invokes a function that returns the value of that variable.
// It should be clear to you why the call to checkscope() returns “local scope”.
let scope = "global scope";          // A global variable
function checkscope() {
    let scope = "local scope";       // A local variable
    function f() { return scope; }   // Return the value in scope here
    return f();
}
test("8.6 Closures-1",()=>{expect(
    checkscope() ).
toBe("local scope")}); // => "local scope"

//Now, let’s change the code just slightly.
//Instead of invoking the nested function and returning its result, checkscope() now just returns the nested function object itself.
// What happens when we invoke that nested function (with the second pair of parentheses in the last line of code)
// outside of the function in which it was defined?
let scope1 = "global scope";          // A global variable
function checkscope2() {
    let scope = "local scope";       // A local variable
    function f() { return scope; }   // Return the value in scope here
    return f;                        // REMOVED parentheses
}
             // What does this return?

test("8.6 Closures-2",()=>{expect(
    checkscope2()() ).  //Added namespaces.
toBe("local scope")}); // => "local scope"
//Remember the fundamental rule of lexical scoping:
// JavaScript functions are executed using the scope they were defined in.
// The nested function f() was defined in a scope where the variable scope was bound to the value “local scope”.
// That binding is still in effect when f is executed, no matter where it is executed from.
// So the last line of the preceding code example returns “local scope”, not “global scope”.
// This, in a nutshell, is the surprising and powerful nature of closures:
// they capture the local variable (and parameter) bindings of the outer function within which they are defined.

let temp = function uniqueInteger2() {
    let i = 0;
   return  function f() {
        return i++;
    }
}

test("8.6 Closures-3",()=>{expect(
    temp()()).  //Added namespaces.
    toBe(0)},
    ()=>{expect(temp()()).toBe(1)});



//Private variables need not be exclusive to a single closure: it is perfectly possible for two or more nested functions to be defined
// within the same outer function and share the same scope.

function counterTest() {
    let n = 0;
    return {
        count: function() { return n++; },
        reset: function() { n = 0; }
    };
}


test("8.6 Closures-4", () => {
        expect(
            counterTest().count()).  //Added namespaces.
            toBe(0)
    },
    () => {
        expect(counterTest().reset()).toBe(0)
    },

    () => {
        expect(counterTest().count()).toBe(1)
    },
);

function counter() {
    let n = 0;
    return {
        count: function() { return n++; },
        reset: function() { n = 0; }
    };
}
// c.count()                           // => 0
// d.count()                           // => 0: they count independently
// c.reset();                          // reset() and count() methods share state
// c.count()                           // => 0: because we reset c
// d.count()                           // => 1: d was not reset

let c = counter(), d = counter();
test("8.6 Closures-5", () => {
        console.log(c.count())
        console.log(d.count())
        expect(
            d.count()
            ).  //Added namespaces.
            toBe(2);}

);
//The counter() function returns a “counter” object. This object has two methods: count() returns the next integer,
// and reset() resets the internal state. The first thing to understand is that the two methods share access to the private variable n.
// The second thing to understand is that each invocation of counter() creates a new scope—independent of the scopes used by previous invocations—and
// a new private variable within that scope. So if you call counter() twice, you get two counter objects with different private variables. Calling count() or reset()
// on one counter object has no effect on the other.

//It is worth noting here that you can combine this closure technique with property getters and setters


function counterTemp(n) {  // Function argument n is the private variable
    return {
        // Property getter method returns and increments private counter var.
        get count() { return n++; },
        // Property setter doesn't allow the value of n to decrease
        set count(m) {
            if (m > n) n = m;
            else throw Error("count can only be set to a larger value");
        }
    };
}

test("8.6 Closures-6-setter and getters",()=>{
    let c = counterTemp(1000)
    expect(c.count).toBe(1000)
    expect(c.count).toBe(1000+1)

})

//6.10.6 Property Getters and Setters
//a getter and/or a setter. (Accessor properties are inherited)
// const random = {
//     dataProp: value,
//
//     // An accessor property defined as a pair of functions.
//     get accessorProp() { return this.dataProp; },
//     set accessorProp(value) { this.dataProp = value; }
// };

// this example shows that : when closures inadvertently share access to a variable that they should not share
// compare 2 example below:
//example 1.
function constFunc(v) {return () => v}


let funcTest =[];
for (var i = 0;i <10;i++){
funcTest[i]=constFunc(i);
}

test("testing closures haywire",()=>{
    expect(funcTest[5]()).toBe(5);
})


function constFunc2() {
    //This code creates 10 closures and stores them in an array.
    let funcTest = [];

    //he closures are all defined within the same invocation of the function, so they share access to the variable i
    for (var i = 0; i < 10; i++) {
        funcTest[i] = () => i;
    }
    return funcTest;
}

test("testing closures haywire",()=>{
    //When constfuncs2() returns, the value of the variable i is 10, and all 10 closures share this value.
    // Therefore, all the functions in the returned array of functions return the same value, which is not what we wanted at all.
    // It is important to remember that the scope associated with a closure is “live.”
    // Nested functions do not make private copies of the scope or make static snapshots of the variable bindings.
    expect(constFunc2()[5]()).toBe(10);

    //How to address this issue?
    //The code demonstrates a common category of bugs in ES5 and before, but the introduction of block-scoped variables in ES6 addresses the issue.
    //If we just replace the "var" with a let or a const, then the problem goes away. Because let and const are block scoped,
    //each iteration of the loop defines a scope that is independent of the scopes for all other iterations, and each of these scopes has its own independent binding of i.

})

//8.7 Function Properties, Methods, and Constructor
//Since functions are objects, they can have properties and methods, just like any other object
//8.7.1 The length Property: he number of parameters it declares in its parameter list, which is usually the number of arguments that the function expects. If a function has a rest parameter, that parameter is not counted for the purposes of this length property.
//8.7.2 The name Property: specifies the name that wasused when the function was defined, if it was defined with a name, orthe name of the variable or property that an unnamed function expressionwas assigned to when it was first created.
//8.7.3 The prototype Property: have a prototype property that refers to an object known as the prototype object. Every function has a different prototype object.
//8.7.4 The call() and apply() and bind() :
//8.7.6 The toString() Method: method return the complete source code for the function. Built-in functions typically return a string that includes something like “[native code]” as the function body
//8.7.7 The Function() Constructor:  Function() constructor creates anonymous functions.
//             const f = new Function("x", "y", "return x*y;"); is equivalent to  const f = function(x, y) { return x*y; };
//             The Function() constructor expects any number of string arguments. The last argument is the text of the function body; it can contain arbitrary JavaScript statements, separated from each other by semicolons.
//             very important point about the Function() constructor is that the functions it creates do not use lexical scoping; instead, they are always compiled as if they were top-level functions, as the following code demonstrates:
let scope = "global";
function constructFunction() {
    let scope = "local";
    return new Function("return scope");  // Doesn't capture local scope!
}
// This line returns "global" because the function returned by the
// Function() constructor does not use the local scope.
constructFunction()()  // => "global"
