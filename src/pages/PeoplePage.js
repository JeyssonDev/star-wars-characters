import { useState } from 'react';
import FilterChips from '../components/FilterChips';
import Search from '../components/Search';
import StarWarsCharacters from '../components/StarWarsCharacters';
import { useSwApi } from '../hooks/useSwApi';

export default function PeoplePage() {
    const [people, isLoading] = useSwApi('people');
    const [films] = useSwApi('films');

    const [searchTerm, setSearchTerm] = useState('');
    const [filmFilter, setFilmFilter] = useState('All');
    const [genderFilter, setGenderFilter] = useState('All');

    const FILM_FILTER_CATEGORIES = { All: () => true };
    films.forEach((film) => {
        FILM_FILTER_CATEGORIES[film.title] = (character) =>
            character.films.includes(film.url);
    });

    const GENDER_FILTER_CATEGORIES = { All: () => true };
    people
        .map((character) => character.gender)
        .forEach((sex) => {
            GENDER_FILTER_CATEGORIES[sex] = (character) =>
                character.gender === sex;
        });

    const FILM_FILTER_NAMES = Object.keys(FILM_FILTER_CATEGORIES);

    const GENDER_FILTER_NAMES = Object.keys(GENDER_FILTER_CATEGORIES);

    return (
        <>
            <img
                className="people__img"
                src="https://kameikay-starwars.netlify.app/images/logo.svg"
                alt="star wars"
            />
            {isLoading ? (
                <h2 className="people__sub-headline">Loading data...</h2>
            ) : (
                <>
                    <h2 className="people__subtitle">
                        Characters - <span>Star Wars</span>
                    </h2>
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <p className="people__text">
                        Filter by <span>film</span>.
                    </p>
                    <FilterChips
                        filter={filmFilter}
                        onFilter={(film) => setFilmFilter(film)}
                        filterNames={FILM_FILTER_NAMES}
                    />
                    <p className="people__text">
                        Filter by <span>gender</span>
                    </p>
                    <FilterChips
                        filter={genderFilter}
                        onFilter={(gender) => setGenderFilter(gender)}
                        filterNames={GENDER_FILTER_NAMES}
                    />
                    <StarWarsCharacters
                        people={people}
                        films={films}
                        searchTerm={searchTerm}
                        filmCategories={FILM_FILTER_CATEGORIES}
                        filmFilter={filmFilter}
                        genderCategories={GENDER_FILTER_CATEGORIES}
                        genderFilter={genderFilter}
                    />
                </>
            )}
        </>
    );
}
