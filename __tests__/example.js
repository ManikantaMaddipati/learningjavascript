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





//
//we are running in node, window or document object present in node, jest framework provides it for us.
//to run explicitly in node only- use : npm t -- --env=node
// console.log(window);
