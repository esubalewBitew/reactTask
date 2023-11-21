import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
// import { create, update, deleteTag } from './api';
import { useQuery, useMutation, useQueryClient, QueryClientProvider, QueryClient } from 'react-query';
import useStore from './store/store';

//api
import getAutocompleteSuggestions from './api/featch';

function App() {
  const [input, setInput] = useState('');
  const { addTag, editTag, removeTag, calculate, tags } = useStore();
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [inputs, setInputs] = useState(['']);
  const queryClient = new QueryClient();

  const { data: autocompleteSuggestions, isLoading, isError } = useQuery(['autocomplete', input], () =>
    getAutocompleteSuggestions(input)
  );


  console.log('API Response Data:', autocompleteSuggestions);

  const handleTagClick = (tag) => {
    // Handle tag click, you can implement editing logic here
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;

    // If the last input is not empty, add a new empty input
    if (index === newInputs.length - 1 && value !== '') {
      newInputs.push('');
    }

    setInputs(newInputs);
  };

  const handleDeleteTag = (tag) => {
    removeTag(tag.id);
  };

  const handleAutocompleteSelect = (suggestion) => {
    addTag(suggestion);
    setInput('');
  };

  const handleCalculate = () => {

  };

  useEffect(() => {
    if (autocompleteSuggestions) {
      setAutocompleteData(autocompleteSuggestions);
    }
  }, [autocompleteSuggestions]);

  const handleInputFocus = (index) => {
    // Set suggestions for the corresponding input
    const currentSuggestions = autocompleteData.filter(
      (suggestion) => !inputs.includes(suggestion.name)
    );
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = {
        value: newInputs[index],
        suggestions: currentSuggestions,
      };
      return newInputs;
    });
  };

  const handleSuggestionClick = (index, suggestion) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = suggestion;
      if (index === newInputs.length - 1) {
        // Add a new empty input if the last input is filled
        newInputs.push('');
      }
      return newInputs;
    });
  };

  const MainContainer = () => {
    return (
      <div style={{ flex: 1 }}>
        <div>
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error fetching autocomplete suggestions</p>}
          {/* {autocompleteSuggestions && autocompleteSuggestions.map((suggestion) => (
            <div key={suggestion.id} onClick={() => handleAutocompleteSelect(suggestion)}>
              {suggestion.name}
            </div>
          ))} */}
        </div>
        <div className="container">
          {inputs.map((input, index) => (
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
              // onFocus={() => handleInputFocus(index)}
              style={{
                width: '100px', // Adjust width as needed
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
                margin: '10px 10px 0 0', // Adjust margin as needed
                minHeight: '30px', // Adjust height as needed
              }}
            />
          ))}
        </div>
        <div>
          {/* {tags?.map((tag) => (
            <div key={tag.id} onClick={() => handleTagClick(tag)}>
              {tag.name}
              <button onClick={() => handleDeleteTag(tag)}>Delete</button>
            </div>
          ))} */}
        </div>
      </div>
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
      <MainContainer />
    </QueryClientProvider>
  );
}

export default App;

const topView = {
  marginTop: 10,
  marginStart: 10,
  width: '90%'
};