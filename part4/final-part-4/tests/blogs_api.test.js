const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User=require('../models/user')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const testuser = await new User({
      username: 'manoj',
      passowrd: 'manoj2002',
    }).save()
  
    const testusernoblogs = await new User({
      username: 'noblog',
      passowrd: 'manoj2002',
    }).save()
  
    const userForToken = { username: testuser.username, id: testuser.id }
    token = jwt.sign(userForToken, process.env.SECRET)
  
    const testuserToken = {
      username: testusernoblogs.username,
      id: testusernoblogs.id,
    }
    noBlogsToken = jwt.sign(testuserToken, process.env.SECRET)
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})
describe('when there is initially some blogs saved', () => {
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
})
describe('Viewing a Specific Blog',() =>{
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
  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)
    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })
})
describe('addition of a new blog',() =>{
  
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
      .set('Authorization',`bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
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
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(response.body.likes).toBe(0)
  })
  test('cannot be added without url property', async () => {
    const newBlog = {
      title: 'No Url Bolg Post',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('cannot be added without title property', async () => {
  const newBlog = {
    url: 'http://www.titletest.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})
describe('deletion of a note', () => {
    test('cannot be deleted and  with status code 400 if not created by same user', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${noBlogsToken}`)
        .expect(400)
    })
  
    test('can be deleted and success with status code 204 if created by same user', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  
      const blogsIds = blogsAtEnd.map((b) => b.id)
      expect(blogsIds).not.toContain(blogToDelete.id)
    })
})
afterAll(() => mongoose.connection.close())  