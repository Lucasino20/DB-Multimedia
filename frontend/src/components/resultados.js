import React from 'react';
import logoUtec from '../images/logo_utec.png';
import ImageMap from './imagemap';

const Resultados = ({ data, tiempo, original, error, n }) => {
  return (
    <div className="resultados-container">
      <div className="entry">
        <a className="logo" href="http://127.0.0.1:5050/">
          <img src={logoUtec} width="500" alt="Logo UTEC" />
        </a>
      </div>
      <div className="resultP">
        <h1 className="h1" style={{ marginLeft: '15px' }}>
          Resultados para
        </h1>
      </div>
      <br />
      <div className="queryRes">
        {error === '' ? (
          <React.Fragment>
            <h2 style={{ color: 'white' }}>Los resultados más parecidos son:</h2>
            <h4 style={{ color: 'white' }}>
              Número de resultados solicitados: {n}
            </h4>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h2 style={{ color: 'white' }}>{error}</h2>
            <br />
          </React.Fragment>
        )}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <img
                src={`/test_images/${original}`}
                className="card-img-top"
                alt={original}
              />
              <div className="card-body">
                <h5 className="card-title-dist">Tiempo: {tiempo} ms</h5>
              </div>
            </div>
          </div>
          {data?.map((item) => (
            <ImageMap key={item[1]} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resultados;
