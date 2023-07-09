import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import logoUtec from '../images/logo_utec.png';
import defaultImage from '../images/default_image.png';
import Resultados from './resultados';

const CardPreview = ({ file }) => {
  return (
    <div className="prev-image">
      <img
        id="img-preview"
        src={file ? URL.createObjectURL(file) : defaultImage}
        alt="Vista previa"
      />
    </div>
  );
};

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [k, setK] = useState('');
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    // Generar la URL temporal para mostrar la imagen
    const imageUrl = event.target.files[0]
      ? URL.createObjectURL(event.target.files[0])
      : null;
    const imgPreview = document.getElementById('img-preview');
    imgPreview.src = imageUrl;
  };

  const handleKChange = (event) => {
    setK(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiUrl = 'http://localhost:5000'; // Reemplaza con la URL de tu backend Flask
    const uploadUrl = `${apiUrl}/upload`;

    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('K datos', k);
    formData.append('metodo', 'KNNSearch'); // Agrega el campo oculto "metodo" con el valor deseado

    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="text-center mb-4">
            <img src={logoUtec} alt="Logo UTEC" />
          </div>
          <Card className="text-center cardP">
            <Card.Body>
              <Card.Title>Búsqueda de imágenes con similitud</Card.Title>
              <CardPreview file={file} />
              <div className="separator"></div>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group controlId="formFile">
                  <Form.Label className="imgfile">Subir archivo</Form.Label>
                  <Form.Control
                    type="file"
                    name="archivo"
                    accept="image/png, .jpeg, .jpg"
                    required
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group controlId="formK">
                  <Form.Label>Cantidad de resultados</Form.Label>
                  <Form.Control
                    type="number"
                    name="K datos"
                    maxLength="1"
                    size="1"
                    value={k}
                    min="1"
                    onChange={handleKChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMetodo" style={{ display: 'none' }}>
                  <Form.Control type="text" name="metodo" value="knnsearch" readOnly />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
      {result && (
        <Resultados
          data={result.data}
          tiempo={result.tiempo}
          original={result.original}
          error={result.error}
          n={k}
        />
      )}
    </div>
  );
};

export default UploadForm;
