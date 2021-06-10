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
describe('Favorite blog', () => {
    test('of empty list is null', () => {
        const result=listHelper.favoriteBlog([])
      expect(result).toEqual(null)
    })
  
    test('of list with one item, is that item', () => {
      const expectedans = {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 7,
      }
      const result=listHelper.favoriteBlog([blogs[0]])
      expect(result).toEqual(expectedans)
    })
    test('of a large list returns the correct blog', () => {
        const expectedans = {
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          likes: 12,
        }
        const result=listHelper.favoriteBlog(blogs)
        expect(result).toEqual(expectedans)
      })
})
  