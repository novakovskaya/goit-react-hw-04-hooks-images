import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";
import styles from "./Searchbar.module.scss";

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.error("Enter something");
    }

    onSubmit(searchQuery);
    setSearchQuery("");
  };

  const handleInput = (event) => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.Button}>
          <BsSearch style={{ width: 20, height: 20 }} />
        </button>

        <input
          className={styles.Input}
          type="text"
          value={searchQuery}
          onChange={handleInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
