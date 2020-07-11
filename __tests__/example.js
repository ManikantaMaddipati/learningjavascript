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