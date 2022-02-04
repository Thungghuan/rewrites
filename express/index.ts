import express from './src/application'
// import express from 'express'

const app = express()

app.get('/', (req, res) => {
  console.log('Get /')
})

app.listen(3000, () => {
  console.log('Server listen on port 3000')
})
