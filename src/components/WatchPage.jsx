import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utilites/appSlice";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
  const dispatch = useDispatch();
  // if it is normal parms useParms and if it is search parems  useSearchParms
  const [searchParms] = useSearchParams();
//  console.log(searchParms.get("v"));
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div>
      <iframe
        width="1200"
        height="600"
        src={"https://www.youtube.com/embed/" +searchParms.get("v")}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchPage;
