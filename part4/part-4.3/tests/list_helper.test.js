const listHelper = require('../utils/list_helper.js')
const blogs =listHelper.blogs
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
