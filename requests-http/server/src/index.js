const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express(); //instanciar a app

/** Middleware..1 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: true}));
// const corsOptions = {
//   origin: '*',
//   optionSuccessStatus: 200
// };
// app.use(cors(corsOptions));
const multipartMiddleware = multipart( { uploadDir: './uploads'})

// POST -> UPLOAD de ARQUIVOS
app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

// GET -> DOWNLOAD EXCEL
app.get('/downloadExcel', (req, res) => {
  res.download('./uploads/report.xls');
});

// GET -> DOWNLOAD PDF
app.get('/downloadPdf', (req, res) => {
  res.download('./uploads/report.pdf');
});

/* caso ocorra algum erro*/
app.use((err, req, res, next) => {
  res.json({ error: err.message});
})

app.listen(8000, () => {
  console.log('Servidor porta 8000 rodando');
});

