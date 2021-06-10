const listHelper = require('../utils/list_helper.js')
const blogs =listHelper.blogs
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
describe('total likes', () => {
      test('of empty list is 0', () => {
          const result=listHelper.totalLikes([])
        expect(result).toBe(0)
      })
    
      test('of a list with one item, is the number of likes for that item', () => {
          const result=listHelper.totalLikes([blogs[0]])
          expect(result).toBe(7)
      })
      test('of bigger list is calculated right', () => {
          const result=listHelper.totalLikes(blogs)
        expect(result).toBe(36)
      })
  })