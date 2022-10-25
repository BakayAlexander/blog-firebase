import React from 'react';
import styles from './searchInput.module.css';

const SearchInput = ({ searchValue, setSearchValue, handleSearch }) => {
  return (
    <form
      className={styles.form}
      onSubmit={handleSearch}
    >
      <input
        className={styles.input}
        value={searchValue}
        onChange={e => {
          setSearchValue(e.target.value);
        }}
        type='text'
        placeholder='Search'
      />
      <button
        className={styles.searchButton}
        type='submit'
      >
        Find
      </button>
    </form>
  );
};

export default SearchInput;
