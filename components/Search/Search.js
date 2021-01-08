import React from "react";
import { Results } from "./Results";
import styles from "./search.module.css";
import { searchRecipe } from "./searchRecipe";

export function Search() {

    const [query, setQuery] = React.useState("");
    const handleSetQuery = (input) => setQuery(input.target.value);

    const [results, setResults] = React.useState([]);
    const [focus, setFocus] = React.useState(false);

    const searchRef = React.useRef(null);

    React.useEffect(() => {

        if (query.length) {
            (async () => setResults(await searchRecipe(query)))()
        }

        if (!query.length && results.length) {
            setResults([]);
        }
    }, [query]);

    return (
        <div ref={searchRef} className={styles.search}>
            <input
                type="text"
                value={query}
                onChange={handleSetQuery}
                placeholder="Search"
                onFocus={() => setFocus(!focus)}
                className={styles.input} />
            <Results onFocus={focus} parent={searchRef} results={results} />
        </div>
    );
}