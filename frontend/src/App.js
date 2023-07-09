import React, { useState } from 'react';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [k, setK] = useState(1);
  const [method, setMethod] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Mostrar la imagen seleccionada
    const imageUrl = URL.createObjectURL(selectedFile);
    setSelectedImage(imageUrl);
  };

  const handleKChange = (event) => {
    setK(event.target.value);
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleSubmit = () => {
    if (!file) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a file.',
        icon: 'error',
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('archivo', file);
    formData.append('K datos', k);
    formData.append('sm', method);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setLoading(false);

        if (data.ok) {
          Swal.fire({
            title: 'Success!',
            text: 'Processing completed successfully.',
            icon: 'success',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1 className="styled-title">Face Recognition</h1>
      <div className="form-group">
        <label htmlFor="file" className="file-label">
          <span className="file-label-text">Choose file:</span>
          <input type="file" id="file" className="file-input" onChange={handleFileChange} />
          <span className="file-input-button">Browse</span>
        </label>
      </div>
      {selectedImage && (
        <div className="selected-image">
          <h2>Selected Image</h2>
          <img className="selected-image-item" src={selectedImage} alt="Selected" />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="k">K:</label>
        <input type="number" id="k" value={k} onChange={handleKChange} className="styled-input" />
      </div>

      <div className="form-group">
        <label htmlFor="method">Method:</label>
        <select
          id="method"
          value={method}
          onChange={handleMethodChange}
          className="styled-select"
        >
          <option value="knnsearch">knnsearch</option>
          <option value="knnrtree">knnrtree</option>
          <option value="knnkdtree">knnkdtree</option>
        </select>
      </div>
      <button className="styled-button" onClick={handleSubmit}>
        Submit
      </button>
      {loading && <p>Loading...</p>}
      {result && (
        <div>
          <h2 className="styled-title">Result</h2>
          {result.data && result.data.length > 0 ? (
            <>
              <p>Data:</p>
              <div className="image-container">
                {result.data.map((item, index) => {
                  const [score, imagePath] = item;
                  return (
                    <div key={index} className="image-item">
                      <img
                        src={process.env.PUBLIC_URL + '/dataset/' + imagePath}
                        alt={`Image ${index + 1}`}
                      />
                      <p className="image-path">{imagePath}</p>
                      <p>Score: {score}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
          {result.time && <p>Time: {result.time}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
