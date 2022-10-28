import FilmList from './FilmList';
import PropTypes from 'prop-types';

StarWarsCharacters.propTypes = {
    people: PropTypes.array,
    planets: PropTypes.array,
    films: PropTypes.array,
    species: PropTypes.array,
    starships: PropTypes.array,
    vehicles: PropTypes.array,
    filmCategories: PropTypes.object,
    filmFilter: PropTypes.string,
    genderCategories: PropTypes.object,
    genderFilter: PropTypes.string,
    searchTerm: PropTypes.string,
};

export default function StarWarsCharacters({
    people,
    films,
    filmCategories,
    filmFilter,
    genderCategories,
    genderFilter,
    searchTerm,
}) {
    const filteredPeople =
        people &&
        people
            .filter((character) =>
                character.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((character) => filmCategories[filmFilter](character))
            .filter((character) => genderCategories[genderFilter](character));
    return (
        <>
            {!filteredPeople || filteredPeople.length === 0 ? (
                <p className="character__search">
                    Your search did not match any character.
                </p>
            ) : (
                <div className="character__container">
                    {filteredPeople.map((character) => (
                        <table key={character.url} className="character__table">
                            <thead>
                                <tr>
                                    <th colSpan={2}>{character.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Birth year</td>
                                    <td>{character.birth_year}</td>
                                </tr>

                                <tr>
                                    <td>Gender</td>
                                    <td>{character.gender}</td>
                                </tr>

                                <tr>
                                    <td>Height</td>
                                    <td>{character.height}</td>
                                </tr>
                                <tr>
                                    <td>Mass</td>
                                    <td>{character.mass}</td>
                                </tr>
                                <tr>
                                    <td>Films</td>
                                    {character.films.length > 0 ? (
                                        <td>
                                            <FilmList
                                                films={films}
                                                item={character}
                                            />
                                        </td>
                                    ) : (
                                        <td>no data</td>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            )}
        </>
    );
}
