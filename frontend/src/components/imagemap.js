import React from 'react';

const ImageMap = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={`/dataset/${item[1]}`}
          className="card-img-top"
          alt={item[0]}
        />
        <div className="card-body">
          <h5 className="card-title-dist">Distance: {item[0]}</h5>
          <h5 className="card-title">File name: {item[1]}</h5>
        </div>
      </div>
    </div>
  );
};

export default ImageMap;
