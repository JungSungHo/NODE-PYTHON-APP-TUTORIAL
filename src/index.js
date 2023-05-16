const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let largeDataSet = []

  // case1. run of simple python script
  // -------------------------------------------------
  // spawn new child process to call the python script
  var python = spawn('python', ['./src/sample/sample1.py'])

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from 1st python script ...')
    largeDataSet.push(data.toString())
  })
  // -------------------------------------------------

  // case2. use to argment of python script
  // -------------------------------------------------
  // spawn new child process to call the python script
  python = spawn('python', ['./src/sample/sample2.py', 'Arg1', 'Arg2'])

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from 2nd python script ...')
    largeDataSet.push(data.toString())
  })
  // -------------------------------------------------

  // case3. use to json-data of python script
  // -------------------------------------------------
  // spawn new child process to call the python script
  python = spawn('python', ['./src/sample/sample3.py'])

  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from 3rd python script ...')
    largeDataSet.push(data)
  })
  // -------------------------------------------------

  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`)

    // send data to browser
    res.send(largeDataSet.join(''))
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
