import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="video-player">
      <iframe
        width="100%"
        height="315"
        src={videoUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
