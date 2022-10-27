import React from 'react';
import styles from './searchInput.module.css';

const SearchInput = ({ searchValue, setSearchValue, handleSearch }) => {
  return (
    <form
      className={styles.searchInput}
      onSubmit={handleSearch}
    >
      <input
        className={styles.searchInput__input}
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value);
        }}
        type='text'
        placeholder='Search'
      />
      <button
        className={styles.searchInput__button}
        type='submit'
      >
        Find
      </button>
    </form>
  );
};

export default SearchInput;
