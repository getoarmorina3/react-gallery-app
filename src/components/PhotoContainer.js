import React from "react";
import NotFound from "./NotFound";
import Photo from "./Photo";

const PhotoContainer = (props) => {
  const images = props.data;
  let results = [];

  if (images.length > 0) {
    images.forEach((photo) => {
      results.push(
        <Photo
          src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          key={photo.id}
        />
      );
    });
  } else {
    results = <NotFound />;
  }

  return (
    <div className="photo-container">
      <h3>{props.title}</h3>
      <ul>{results}</ul>
    </div>
  );
};

export default PhotoContainer;
