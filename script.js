const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const app = express();

// Configurar Multer para procesar los datos del formulario
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf')
  }
})
const upload = multer({ storage: storage })

// Definir la ruta para procesar el formulario de CV
app.post('/procesar-cv', upload.single('archivo'), async (req, res) => {
  try {
    // Procesar el archivo PDF con pdf-parse
    const pdfData = await pdfParse(req.file.path);

    // Extraer los datos que desees del PDF (en este caso, extraemos el texto completo)
    const cvText = pdfData.text;

    // Aquí podrías procesar los datos del CV de acuerdo a tus requerimientos
    console.log(cvText);

    // Enviar una respuesta exitosa al cliente
    res.sendStatus(200);
  } catch (error) {
    // Enviar una respuesta de error al cliente
    console.error(error);
    res.sendStatus(500);
  }
});

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

