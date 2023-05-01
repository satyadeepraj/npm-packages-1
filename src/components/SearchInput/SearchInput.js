import React, { useEffect, useState } from "react";
import "./SearchInput.css";
import { Button } from "@mui/material";
export default function SearchInput({ placeholder }) {
  const [packageName, setPackageName] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [inputFavorite, setInputFavorite] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    fetch("https://api.npms.io/v2/search?q=reactjs")
      .then((data) => data.json())
      .then((finalData) => {
        setPackageName(finalData.results);
      });
  }, []);

  function handleFilter(e) {
    const searchName = e.target.value;
    const filteredValue = packageName.filter((value) =>
      value.package.name.toLowerCase().includes(searchName.toLowerCase())
    );
    // console.log(filteredValue)
    if (searchName === "") {
      setFilteredData([]);
    } else {
      setFilteredData(filteredValue);
    }
  }

  function handleRadio(e) {
    setSelectedValue(e.target.value);

  }

  function handleFavorite(e) {
    setInputFavorite(e.target.value);
    setDisabled(false)
  }

  const storedData = JSON.parse(localStorage.getItem("listData")) || [];

  const existPackage = storedData.find((data) => data.name === selectedValue);
  const addData = {
    name: selectedValue,
    message: inputFavorite,
  };
  const newData = [...storedData, addData];

  function handleSubmit() {
    if(inputFavorite.length === 0){
        alert('Please tells, why is this your favorite? ')
    }else{
    if(existPackage){
        alert('This package is already in your favorite list')
    } else{
        const confirmation = window.confirm('Do you want to add this package in your favorite list?')
        if(confirmation) {
            localStorage.setItem("listData", JSON.stringify(newData));
            setInputFavorite("");
        }
        
    }
}
    
   
  }

  return (
    <div>
      <div>
        <input
          className="inputBox"
          type="text"
          placeholder={placeholder}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length !== 0 && (
        <div className="result">
          
          <h3>Results</h3>

          <div className="mapBox">
            {filteredData.map((item, index) => (
              <div className="resultbox" key={index}>
                <input
                  type="radio"
                  id={item.package.name}
                  value={item.package.name}
                  checked={selectedValue === item.package.name}
                  onChange={handleRadio}
                />

                <label htmlFor={item.package.name}>{item.package.name}</label>
              </div>
            ))}
          </div>
          
          {selectedValue && (
            <div>
              <div className="textArea">
                <h3>Why is this your favorite? </h3>
                <textarea
                  type="text"
                  rows="8"
                  cols="100"
                  value={inputFavorite}
                  onChange={handleFavorite}
                />
              </div>
              
              <Button variant="contained"  disabled={disabled} className="btn" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
