function getFormattedValue(value, language = 'en-US') {
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6,
  });

  // Add back missing .0 in e.g. 12.0
  const match = value.match(/\.\d*?(0*)$/);

  if (match) {
    formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
  }
  return formattedValue;
}

//when accessing unknown propes in object we get undefined
function testingObjectProps(y) {
  let x = Object.create({a:1})
  return x.y
}

function tetsing_inheritance() {
  let o = {};
  o.x = 1;
  let p = Object.create(o);
  p.y=2;
  let q = Object.create(p);
  q.z=3;
  let f= q.toString();
  return q;
}

//6.3.3:Property Access Errors
function propertyAccessError() {
  let p = {};
  p.y=1;
  Object.defineProperty(p,'x',{ value:'1',writable:false})
  return p
}
//6.3.3:Property Access Errors :idiomatic expression works to prevent TypeError exceptions
function propertyAccessErrorIdiomatic(I) {
let Book = {"Name":"JavaScript","Rating":"5","AuthorFirstName":"David"}
return Book;
}

function testingSetValuetoInheritedProperty() {
 let m = {x:1,y:2};
 let n = Object.create(m);
 return Object.getPrototypeOf(n).x

 }

export {getFormattedValue,testingObjectProps,tetsing_inheritance,propertyAccessError,testingSetValuetoInheritedProperty,propertyAccessErrorIdiomatic};
