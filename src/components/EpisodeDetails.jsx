import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const EpisodeDetails = () => {
    const { id } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ['episode', id],
        queryFn: async () => {
            const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch episode`);
            }
            return res.json();
        }
    });

    if (isLoading) return <p className="text-gray-500 p-3">Loading episode...</p>;
    if (error) return <p className="text-red-500 p-3">{error.message}</p>;

    return (
        <div className="border border-gray-300 p-4 bg-white">
            <h2 className="text-xl font-semibold mb-3">{data.name}</h2>
            <p className="mb-4"><strong>Air Date:</strong> {data.air_date}</p>
            <p className="mb-4"><strong>Episode:</strong> {data.episode}</p>
            <p><strong>Characters:</strong></p>
            <ul className="list-none p-0 m-0">
                {data.characters.map((charUrl, idx) => {
                    const charId = charUrl.split("/").pop();
                    return (
                        <li key={idx}>
                            Character {charId}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default EpisodeDetails;