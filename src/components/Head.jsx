import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utilites/appSlice";
import { YOUTUBE_SEARCH_API_KEY } from "../utilites/constant";
import { casheResults } from "../utilites/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const searchCashe = useSelector((state) => state.search);
  useEffect(() => {
    //API Call
    const timer = setTimeout(() => {
      if (searchCashe[searchQuery]) {
        setSuggestions(searchCashe[searchQuery]);
      } else {
        getSearchSugsesstions(), 200;
      }
    });
    //make an api call after every ket press
    // but if the diffrence between 2 api calls is <200ms
    // decline the API call
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  const getSearchSugsesstions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API_KEY + searchQuery);
    const json = await data.json();
    //console.log(json);
    setSuggestions(json[1]);
    dispatch(
      casheResults({
        [searchQuery]: json[1],
      })
    );
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          className="h-8 cursor-pointer"
          alt="hamber-icon"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAADPz89LS0uWlpb5+fmFhYXHx8eSkpJnZ2ezs7Oqqqp3d3cWFhbk5OT19fU/Pz9aWlra2tqkpKTu7u4PDw+9vb1gYGB9fX0zMzMkJCQaGhqbm5s4ODjLy8tQUFACQSuFAAACZ0lEQVR4nO3d7VLCMBCF4VipfKMiAorI/d+lVmHQP7spyczObt/nCs4Za7RhSVICAAAAAAAAAAAAAAAAgAEYT6b3fkwn4371Nvs7f/ab/IIT67A3mmT2a4/WSW92bLMKLq1zFljmVHyzTlnkTS/4YJ2x0INWcGWdsNhKaTi1DlhsKhd8tM5XwaPYcGYdr4KZ2HBhHa+ChdjwyTpeBU9iw1freBW8ig2t01UhNny3TlfBu9jw2TpeBc9iw5F1vApGYsPGOl4FjdgwwGIqL6Upza0DFpsrDdPBOmGhg1Ywra0jFlqrDZ0/p+oz2nmxTlngJadgSmPrnDfL3hZufb5ELbL2Es82H942TY8fPba8z1aNH9r2EwAAAAAAAAAA8Kz9nI/8mH/2+dypsz1Zf5bU22nbo1/jc1zhoEzSXPkdZlfH2H/trHMW2OUU9PkJ94U8IPzD+6S3POX9rbVOWEz7s+F3lbnQVhvrfBXIBf0OC13JY0P+H1LtMb23jlfBSWzo+duVF0uxoXW6Kgb+M4z/exh/LY3/9zDCUiMXDPCYav+Xxn+3iP9+OIB3/AHs03hebTL32lJqfH5ZNn+/NMXf8+5E/9wCAAAAAAAAAAB4EvucqOhnfYU/r83v2FDmmXvhz00Mf/Zl/PNLfX6p60o9g9b3M9rRntPwZ0HHP8/b611Wf8lnssc/V9/nuNd/8t0I1umqEBv6X0q1xTT+PTM+X5v+k8eEvU95d+RJ7/h3dsW/d20Ad+c5HmP/lTHMHv4OywHcQxr/Ltnk9x0q9z7gNIA7nTvB7+UGAAAAAAAAAAAAAAAAAJ++ACLpVB+zWmM6AAAAAElFTkSuQmCC"
          onClick={toggleMenuHandler}
        />
        <img
          className="h-8 mx-2"
          alt="youtube-icon"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwGODoCWG12sFLdictA7wnOcoGgY0wjzZd9g&usqp=CAU"
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
          />
          <button className="border border-gray-400 p-2 rounded-r-full bg-gray-100">
            search
          </button>
        </div>
        {showSuggestion && (
          <div className="fixed top-[70px] bg-white py-2 px-2 w-[42rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions &&
                suggestions.map((suggestion) => (
                  <li
                    className="py-2 px-3 shadow-sm hover:bg-gray-100"
                    key={suggestion}
                  >
                    &#128269; {suggestion}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3wksm3opkFrzaOCjlGYwLvKytFXdtB5ukWQ&usqp=CAU"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Head;
