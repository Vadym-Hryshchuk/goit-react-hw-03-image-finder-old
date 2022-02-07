import React from "react";
import PropTypes from "prop-types";
import { VscSearch } from "react-icons/vsc";
import { IconContext } from "react-icons";

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;
    if (searchQuery.trim() === "") {
      return alert("Введіть нормальний запит");
    }
    onSubmit(searchQuery);
    e.currentTarget.reset();
  };
  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <IconContext.Provider value={{ size: "1.1em" }}>
            <div>
              <VscSearch />
            </div>
          </IconContext.Provider>
        </button>

        <input
          className="input"
          name="query"
          type="text"
          autoComplete="false"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
