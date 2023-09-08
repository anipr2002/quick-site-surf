import React, { useState, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import { FaGoogle, FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaReddit } from 'react-icons/fa';

const websiteSuggestions = [
  'google',
  'facebook',
  'x',
  'linkedin',
  'youtube',
  'reddit',
];

const websiteIcons = {
  google: <FaGoogle size={40}/>,
  facebook: <FaFacebook size={40}/>,
  twitter: <FaTwitter size={40}/>,
  linkedin: <FaLinkedin size={40}/>,
  youtube: <FaYoutube size={40} />,
  reddit: <FaReddit size={40} />,
};


function AutocompleteComponent() {
  const [websiteName, setWebsiteName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedWebsiteIcon, setSelectedWebsiteIcon] = useState(null);
  const [logo, setLogo] = useState(false); // [1
  const searchQueryInputRef = useRef(null);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : websiteSuggestions.filter(
          (website) =>
            website.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onWebsiteNameChange = (event, { newValue }) => {
    setWebsiteName(newValue);
    setSelectedWebsiteIcon(websiteIcons[newValue]);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setWebsiteName(suggestionValue);
    setSelectedWebsiteIcon(websiteIcons[suggestionValue]);
    setLogo(true);
    searchQueryInputRef.current.focus();
  };

  const onSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const redirectToWebsite = () => {
    if (isValidWebsiteName(websiteName)) {
      const url = constructURL(websiteName, searchQuery);
      window.open(url, '_blank');
    } else {
      console.error('Invalid website name');
    }
  };

  const isValidWebsiteName = (name) => {
    return name.trim() !== '';
  };

  const constructURL = (website, query) => {
    return `https://www.${website}.com/search?q=${encodeURIComponent(query)}`;
  };

  const websiteInputProps = {
    placeholder: 'Enter website name',
    value: websiteName,
    onChange: onWebsiteNameChange,
  };

  return (
    <div className='flex h-screen w-screen justify-center items-center bg-[#EEEEEE]'>
      <div className=''>
        <div className={logo ? 'hidden' : 'border-t-4 border-b-4 border-l-4 border-r w-auto ml-10 p-2 rounded-lg bg-white text-teal-700'}>
          <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <div>{suggestion}</div>}
          inputProps={websiteInputProps}
          onSuggestionSelected={onSuggestionSelected}
          />
        </div>

        <div className={logo ? 'p-4 w-auto h-auto mt-5' : 'hidden'}>
            {selectedWebsiteIcon && (
            <div>
              {selectedWebsiteIcon}
              <br />
            </div>)}
        </div>


      </div>
      <input
        className='border-t-4 border-b-4 bg-[#176B87] text-white placeholder-style border-r-4 w-full p-2 mr-10 rounded-lg '
        type="text"
        ref={searchQueryInputRef}
        placeholder="Enter search query"
        value={searchQuery}
        onChange={onSearchQueryChange}
        onKeyDown={e => e.key === 'Enter' && redirectToWebsite()}
      />
      {/* <button onClick={redirectToWebsite}></button> */}
      
    </div>
  );
}

export default AutocompleteComponent;
