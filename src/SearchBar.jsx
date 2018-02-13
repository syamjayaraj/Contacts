import React from 'react';

const SearchBar = ({onSearch}) => {
	const handleChange = (e) => {
		onSearch(e.target.value);
	}
	return(
            <div className=" input-group-lg">
              <input type="search" className="form-control" onChange = {handleChange} placeholder="Find Contacts" id="example-search-input" />
            </div>
    )
}

export default SearchBar;