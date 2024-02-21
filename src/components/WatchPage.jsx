import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utilites/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const dispatch = useDispatch();
  // if it is normal parms useParms and if it is search parems  useSearchParms
  const [searchParms] = useSearchParams();
//  console.log(searchParms.get("v"));
  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  return (
    <div className="flex flex-col w-full">
    <div className="px-5 flex w-full">
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
      <div className="w-full">
       <LiveChat />
      </div>
    </div>
    <CommentsContainer />
    </div>
  );
};

export default WatchPage;
