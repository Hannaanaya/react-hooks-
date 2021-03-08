import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import Search from './Search';
import useCharacters from '../hooks/useCharacters';
import './styles/Characters.css';

const initialState = {
    favorites: [],
  };
  
  const API = "https://rickandmortyapi.com/api/character"
  
  const favoriteReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_FAVORITE":
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
  
      case "REMOVE_FROM_FAVORITE":
        return {
          ...state,
          favorites: [
            ...state.favorites.filter((favorite) => favorite !== action.payload),
          ],
        };
  
      default:
        return state;
    }
  };
  
  const Characters = () => {
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState('');
    const searchInput = useRef(null);
  
    const characters = useCharacters(API)
  
    const handleFavorite = (favorite) => {
      dispatch({
        type: !!isCharacterInFavorites(favorite)
          ? "REMOVE_FROM_FAVORITE"
          : "ADD_TO_FAVORITE",
        payload: favorite,
      });
    };
  
    const isCharacterInFavorites = (favorite) =>
      favorites.favorites.find((character) => character.id === favorite.id);
  
    const handleSearch = useCallback(() => {
      setSearch(searchInput.current.value)
    }, [])
  
    const filteredUsers = useMemo(() =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
      [characters, search]
    );
  
    var favIcon =
      "https://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/512/heart-icon.png";
    var delIcon =
      "https://icons.iconarchive.com/icons/matiasam/ios7-style/512/Clear-Tick-icon.png";
    console.log("Favorites: ", favorites);
  
    return (
      <>
        <div className="Favorites">
          <h2>
            {favorites.favorites.length === 0
              ? "Agrega aquí a tus personajes favoritos"
              : "Favorites:"}
          </h2>
          <img
            className="Icon"
            src={!!isCharacterInFavorites(favorites) ? delIcon : favIcon}
            alt=""
          />
  
          {favorites.favorites.map((favorite) => (
            <li key={favorite.id} className="FavList">
              {favorite.name}
            </li>
          ))}
        </div>
  
        <Search
          search={search}
          searchInput={searchInput}
          handleSearch={handleSearch}
        />
  
        <div className="Characters">
          {filteredUsers.map((character) => (
            <div className="Character" key={character.id}>
              <h2> {character.name} </h2>
  
              <img src={character.image} alt="Character" />

              <h4> Estado: {character.status}</h4>
              <h4> Type: {character.species} </h4>
              <h4> Gender: {character.gender} </h4>
              <h4> Origin: {character.origin.name} </h4>
              {/* <h4> Location: {character.location}</h4> */}

              <div className="FavoriteIcon">
              <button type="button" onClick={() => handleFavorite(character)}>
                <img
                  className="Icon"
                  src={!!isCharacterInFavorites(character) ? delIcon : favIcon}
                  alt=""
                />
              </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  

export default Characters;