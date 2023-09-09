import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardTab } from "react-icons/md";
import websiteData from "./website.json";

const SearchBar = () => {
  const [tabPressed, setTabPressed] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [colorTheme, setColorTheme] = useState("#8D9093");
  const [colorThemebg, setColorThemebg] = useState("");

  //   useEffect(() => {
  //     console.log("websiteName");
  //     // var e = new KeyboardEvent("keydown", { keyCode: 32, which: 32 });
  //   }, [websiteName]);
  const getColorTheme = (websiteName) => {
    // console.log(websiteName);
    const website = websiteData.find(
      (site) => site.name.toLowerCase() === websiteName.toLowerCase()
    );
    console.log(website);

    if (website) {
      setColorTheme(`''${website.colorTheme}''`);
      console.log();
      console.log("Website found");
    } else {
      setColorTheme("");
      console.log("No website found");
    }
  };
  //   const colorTheme = "#FF0000";
  //   const colorThemebg = "[#FF0000]";

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      setTabPressed(true);
      submitRef.current.click();
    } else if (e.key === "Escape") {
      setTabPressed(false);
    } else if (e.key === "Enter") {
      redirectToWebsite();
    }
  };

  const inputRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    // console.log(inputRef.current)
  }, []);

  //url handling

  const constructURL = (url, searchQuery) => {
    const website = websiteData.find(
      (site) => site.name.toLowerCase() === url.toLowerCase()
    );

    if (website) {
      return website.url + searchQuery;
    } else {
      return "https://www.google.com/search?q=" + websiteName + searchQuery;
    }
  };

  const isValidWebsiteName = (name) => {
    return name.trim() !== "";
  };

  const redirectToWebsite = () => {
    if (isValidWebsiteName(websiteName)) {
      const url = constructURL(websiteName, searchQuery);
      window.open(url, "_blank");
    } else {
      console.error("Invalid website name");
    }
  };

  //   console.log(websiteName);
  //   console.log(colorTheme);

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      name="main-screen-container"
    >
      <div
        className={`w-[50rem] h-16 flex items-center bg-[#F9FAFA] rounded-[10px] shadow-[0_0_5px_${colorTheme},0_0_15px_${colorTheme}]`}
        name="main-container"
      >
        {!tabPressed && (
          <>
            <div className="h-full flex items-center ml-4" name="div.1">
              <IoSearch />
            </div>

            <div className="flex-1 ml-4" name="div.2">
              <input
                type="text"
                placeholder="Search site"
                className="bg-[#F9FAFA] w-full"
                onKeyDown={handleKeyDown}
                name="input.1"
                ref={(input) => {
                  inputRef.current = input;
                  submitRef.current = input;
                }}
                value={websiteName}
                onChange={(e) => {
                  setWebsiteName(e.target.value);
                  getColorTheme(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>

            <div className="h-full flex items-center mr-4" name="div.3">
              <span className={"mr-2"}>Switch to Tab</span>
              <div>
                <MdOutlineKeyboardTab />
              </div>
            </div>
          </>
        )}

        {tabPressed && (
          <>
            <div className="h-full flex items-center ml-4" name="div.1">
              <IoSearch />
            </div>

            <div
              className="flex justify-center items-center w-fit h-full ml-4"
              name="div.2"
            >
              <div
                className={`h-fit w-fit px-2 rounded-xl bg-${colorThemebg} shadow-[0_0_5px_${colorTheme},0_0_15px_${colorTheme}] text-white`}
              >
                <span>{websiteName}</span>
              </div>
            </div>

            <div className="ml-4 w-full">
              <input
                type="text"
                placeholder={`Search ${websiteName}`}
                className="bg-[#F9FAFA] w-full"
                onKeyDown={handleKeyDown}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                name="input.2"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
