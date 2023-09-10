import React, { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardTab } from "react-icons/md";
import websiteData from "./website.json";

const SearchBar = () => {
  const [tabPressed, setTabPressed] = useState(false);
  const [websiteName, setWebsiteName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [colorTheme, setColorTheme] = useState("#8D9093");

  const inputRef = useRef(null);

  const getColorTheme = (websiteName) => {
    const website = websiteData.find(
      (site) => site.name.toLowerCase() === websiteName.toLowerCase()
    );

    if (website) {
      console.log(website.colorTheme);
      setColorTheme(website.colorTheme);
    } else {
      console.log("Website not found");
      setColorTheme("#8D9093");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      // e.preventDefault();
      getColorTheme(inputRef.current.value);
      setTabPressed(true);
    } else if (e.key === "Escape") {
      setTabPressed(false);
      setWebsiteName("");
      setColorTheme("#8D9093");
      inputRef.current.focus();
    } else if (e.key === "Enter") {
      redirectToWebsite();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
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

  return (
    <div
      className="w-screen h-screen flex justify-center items-center"
      name="main-screen-container"
    >
      <div
        className="w-[50rem] h-16 flex items-center bg-[#F9FAFA] rounded-[10px] "
        style={{
          boxShadow: `0 0 5px ${colorTheme}, 0 0 15px ${colorTheme}`,
        }}
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
                }}
                value={websiteName}
                onChange={(e) => {
                  setWebsiteName(e.target.value);
                  // getColorTheme(e.target.value);
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
              {/* <div
                className={`h-fit w-fit px-2 rounded-xl bg-[${colorTheme}] shadow-[0_0_5px_${colorTheme},0_0_15px_${colorTheme}] text-white`}
              > */}
              <div
                className="h-fit w-fit px-2 rounded-xl text-white"
                style={{
                  backgroundColor: colorTheme,
                  boxShadow: `0 0 5px ${colorTheme}, 0 0 15px ${colorTheme}`,
                }}
              >
                <span className=" first-letter:uppercase">{websiteName}</span>
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
