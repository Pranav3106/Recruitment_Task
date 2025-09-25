import { useState } from "react";
import { Link } from "react-router-dom";

const CharacterDetails = ({ character, charactersToShow }) => {
    const [showAllEpisodes, setShowAllEpisodes] = useState(false);

    if (charactersToShow.length === 0) return;
    if (!character) return <p className="text-gray-500 p-3">Select a character to see details</p>;

    const episodesToShow = showAllEpisodes ? character.episode : character.episode.slice(0, 5);

    return (
        <div className="border border-gray-300 p-4 bg-white h-auto w-auto">
            <h2 className="text-xl font-semibold mb-3">{character.name}</h2>

            <div className="flex items-start mb-4">
                <div className="w-50 h-50 mr-4 border border-gray-400 rounded-sm overflow-hidden">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="text-sm leading-relaxed">
                    <p className="mb-3"><strong>Status:</strong> {character.status}</p>
                    <p className="mb-3"><strong>Species:</strong> {character.species}</p>
                    <p className="mb-3"><strong>Gender:</strong> {character.gender}</p>
                </div>
            </div>

            <div>
                <h3 className="text-base font-medium mb-2">Episodes</h3>
                <ul className="list-none p-0 m-0">
                    {episodesToShow.map((epUrl, idx) => {
                        const episodeId = epUrl.split("/").pop();
                        return (
                            <li key={idx} className="text-sm mb-1">
                                <Link
                                    to={`/episode/${episodeId}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Episode {episodeId}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {character.episode.length > 5 && (
                    <button
                        onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                        className="text-black font-medium text-sm mt-1 hover:underline cursor-pointer"
                    >
                        {showAllEpisodes ? "Show Less" : "Load More Episodes"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default CharacterDetails