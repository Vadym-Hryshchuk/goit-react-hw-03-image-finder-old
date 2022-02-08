import React from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { FcSearch } from "react-icons/fc";
import { ReactComponent as Pixabay } from "./pixabay.svg";
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.query.value;
    if (searchQuery.trim() === "") {
      return toast.error("The search cannot be performed without a query");
    }
    onSubmit(searchQuery);
    e.currentTarget.reset();
  };
  return (
    <Header>
      <Pixabay width="250" fill="rgb(184 215 228)" />
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          <FcSearch size={"2em"} />
        </SearchFormButton>

        <SearchFormInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
