const {sum, substract} = require('../learningjavascript/math.js')

let result,expected;

test('sum tests', ()=>{
    result = sum(3,7)
    expected=10;
    expect(result).toBe(expected)
})

test('substarct tests', ()=>{
    result = substract(7,3)
    expected=10;
    expect(result).toBe(expected)
})

function  test(title,callback) {
    try{
        callback()
        console.log(`pass ${title}`)
    }catch (error) {
        console.log(`fail ${title}`)
    }

}

function expect(actual) {
  return {
      toBe(expected){
          if (result!==expected){
              throw  new Error(`${result} is not equal to ${expected}`)
          }
      }
  }
}