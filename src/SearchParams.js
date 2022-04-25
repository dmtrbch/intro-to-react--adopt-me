import React, { useState, useEffect, useContext } from "react"; //useEffect replaces three lifecycle hooks componentDidMount, componentWillUnmount, componentDidUpdate
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";
import ThemeContext from "./ThemeContext";
// all hooks in React begin with 'use', this is how we have statefull logic with React

const SearchParams = () => {
  // never use hooks with if statements or for loops
  const [location, setLocation] = useState("Seattle, WA"); //location is the current state, setLocation is an updater for the location state, this is a destructuring, useState always return an array
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    // for example when using ajax requests
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      //destructuring breeds
      const breedStrings = apiBreeds.map(({ name }) => name); // equal to ({ breedObj }) => breedObj.name
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]); // if you only need to run the hook once empty array

  // everything in the return renders first before useEffect happens
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
