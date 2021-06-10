const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})
describe('Blogs', () => {
    test('are returned in JSON format', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('all Blogs are returned', async () => {
        const response = await api
        .get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('have a unique identifier named "id"', async () => {
        const response = await api
        .get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
    test('a specific note can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]
        const response = await api
          .get(`/api/blogs/${blogToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
          const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
          expect(response.body).toEqual(processedBlogToView)
    })
    test('can be added with a valid user token', async () => {
        const newBlog = {
          title: 'New Blog For Testing',
          author: 'manoj',
          url: 'http://www.newtesttblog.com',
          likes: 15,
        }
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const title = blogsAtEnd.map(n => n.title)
        expect(title).toContain(
          'New Blog For Testing'
        )
    })
    test('are assigned 0 likes if "likes" property is missing from request', async () => {
        const newBlog = {
          title: 'Example blog',
          author: 'manoj',
          url: 'http://www.blogexample.com',
        }
    
        const response = await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        expect(response.body.likes).toBe(0)
    })
    test('cannot be added without url property', async () => {
        const newBlog = {
          title: 'No Url Bolog Post',
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(400)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })
})
afterAll(() => mongoose.connection.close())  