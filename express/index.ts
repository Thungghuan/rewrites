import express from './src/application'

const app = express()

app.listen(3000, () => {
  console.log('Server listen on port 3000')
})
