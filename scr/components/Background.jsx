import { useEffect } from 'react';
import { Video } from 'react-video';

const VideoBackground = () => {
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    const video = document.querySelector('video');
    setVideoRef(video);
  }, []);

  return (
    <Video
      ref={videoRef}
      url="../../img/original-8c84d58757f2307620c18a5cd36e250f.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
  );
};

export default VideoBackground;
