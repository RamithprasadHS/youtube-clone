import React, { useEffect, useState } from "react";
import { YOUTUBE_API } from "../utilites/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  // console.log(videos[0])
  useEffect(() => {
    getVideos();
  }, []);
  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    // console.log(json)
    setVideos(json.items);
  };
  return (
    <div className="flex flex-wrap">
      {videos &&
        videos.map((video) => 
        (
          <Link to={"/watch?v="+video.id} key={video.id}>  <VideoCard  info={video} /> </Link>
            ))}
    </div>
  );
};

export default VideoContainer;
