import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [k, setK] = useState(1);
  const [method, setMethod] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleKChange = (event) => {
    setK(event.target.value);
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleSubmit = () => {
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
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>File Upload</h1>
      <div>
        <label htmlFor="file">Choose file:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <div>
        <label htmlFor="k">K:</label>
        <input type="number" id="k" value={k} onChange={handleKChange} />
      </div>
      <div>
        <label htmlFor="method">Method:</label>
        <select id="method" value={method} onChange={handleMethodChange}>
          <option value="knnsearch">knnsearch</option>
          <option value="knnrtree">knnrtree</option>
          <option value="knnkdtree">knnkdtree</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {loading && <p>Loading...</p>}
      {result && (
        <div>
          <h2>Result</h2>
          <p>{result.ok ? 'Success' : 'Error'}: {result.msg}</p>
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
                      <p>Score: {score}</p>
                      <p>Image Path: {imagePath}</p>
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
