import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import CharacterDetails from "./CharacterDetails";
import { useState } from "react";
import Search from "./Search";

const CharacterList = () => {
    const [searchParam, setSearchParam] = useSearchParams();
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const searchTerm = searchParam.get("name")?.toLowerCase() || "";
    const [showAll, setShowAll] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['characters'],
        queryFn: async () => {
            const res = await fetch(`https://rickandmortyapi.com/api/character`);
            if (!res.ok) {
                throw new Error(`Failed to fetch characters`);
            }
            return res.json().then(data => data.results);
        }
    });

    const filteredCharacters =
        data?.filter((character) =>
            character.name.toLowerCase().includes(searchTerm)
        ) || [];

    const handleSelectedCharacter = (character) => {
        setSelectedCharacter(character);
    }

    const charactersToShow = showAll ? filteredCharacters : filteredCharacters.slice(0, 6);

    return (
        <div className="p-4">
            <Search searchParam={searchParam} setSearchParam={setSearchParam} />

            {isLoading ? <p className="text-gray-500 p-3">Loading...</p> : error ? <p className="text-red-500 p-3">{error.message}</p> :
                <div className="flex flex-col md:flex-row mt-5 gap-5">
                    <div>
                        {charactersToShow.length > 0 ? (
                            <ul className="w-full lg:w-100 border border-gray-300 list-none p-0 m-0">
                                {charactersToShow.map((character) => (
                                    <li
                                        key={character.id}
                                        onClick={() => handleSelectedCharacter(character)}
                                        className={`flex items-center p-2 border-b border-gray-300 cursor-pointer last:border-b-0 hover:bg-gray-100 ${selectedCharacter?.id === character.id ? "bg-gray-200" : ""}`}
                                    >
                                        <span className="w-15 h-15 mr-3 border border-gray-400 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={character.image}
                                                alt={character.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </span>
                                        <span className="text-md font-medium">{character.name}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 p-3">No characters found</p>
                        )}

                        {filteredCharacters.length > 6 && (
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="my-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {showAll ? "Show Less" : "Load More"}
                            </button>
                        )}
                    </div>

                    <div className="flex-1">
                        <CharacterDetails character={selectedCharacter} charactersToShow={charactersToShow} />
                    </div>
                </div>
            }
        </div>
    )
}

export default CharacterList