import React, { useState, useEffect, useContext } from 'react';
import Finnhub from '../apis/Finnhub';
import { WatchListContext } from '../context/WatchListContext';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';

const AutoComplete = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const {addStock} = useContext(WatchListContext)

  const renderDropDown = () => {
    const dropDownClass = search ? 'show' : null;
    return (
      <ul
        style={{
          height: '500px',
          width: '580px',
          overflowY: 'scroll',
          overflowX: 'hidden',
          cursor: 'pointer',
        }}
        className={`dropdown-menu ${dropDownClass}`}
      >
        {results.map((result) => {
          return (
            <li style={{margin: '10px'}} 
              onClick={() => {
              addStock(result.symbol)
              setSearch("")
            }} key={result.symbol} className='dropdown-items'>
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await Finnhub.get(`/search`, {
          params: {
            q: search,
          },
        });

        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {}

      return () => (isMounted = false);
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [search]); // Include search as a dependency here

  return (
      <div className='w-50 p-5 rounded mx-auto'>
        <div className='form-floating dropdown'>
          <input
            style={{ backgroundColor: 'white' }}
            id='search'
            type='text'
            className='form-control'
            placeholder='Search Symbol'
            autoComplete='off'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={renderDropDown()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Symbol"
                      placeholder='Search Symbol'
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
              />
              )}
          /> */}

          <label htmlFor='search'>Search</label>
          {renderDropDown()} 
        </div>
      </div>
  );
};

export default AutoComplete;
