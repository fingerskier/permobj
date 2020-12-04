const data = require('.')('data')

data.one = 1
data.two = '2'

console.log(data)

data.three = {
  first: '1',
  second: 2,
}

console.log(data)