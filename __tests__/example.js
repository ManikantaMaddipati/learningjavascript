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



//
//we are running in node, window or document object present in node, jest framework provides it for us.
//to run explicitly in node only- use : npm t -- --env=node
// console.log(window);