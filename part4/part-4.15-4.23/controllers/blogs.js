const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/',async (request, response) => {
  const blogs=await Blog
  .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs).Pretty
})

blogRouter.get('/:id',async (request, response, next) => {
  const blog=await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
})

blogRouter.post('/',async (request, response, next) => {
  const body = request.body
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }
  const user = await User.findById(request.decodedToken.id)
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes || 0,
    user: user._id

  })
  const savedBlog=await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogRouter.delete('/:id',async (request, response, next) => {
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

  const blog = await Blog.findById(request.params.id)
  const userId = request.decodedToken.id

  if (blog.user.toString() !== userId.toString()) {
    response.status(400).end()
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title:body.title,
    author:body.author,
    url:body.url,
    likes:body.likes
  })

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter
