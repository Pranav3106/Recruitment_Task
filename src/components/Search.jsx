import { FaSearch } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx";


const Search = ({ searchParam, setSearchParam }) => {

    const handleChange = (e) => {
        const value = e.target.value;
        if (value) {
            setSearchParam({ name: value });
        } else {
            setSearchParam({});
        }
    }

    return (
        <div className="flex items-center w-100 px-3 py-2 border border-gray-300 rounded-full bg-white">
            <FaSearch className="text-gray-600 text-lg mr-2" />
            <input
                value={searchParam.get("name") || ""}
                type="text"
                placeholder="Search characters..."
                onChange={handleChange}
                className="flex-1 outline-none border-none bg-transparent text-gray-800 placeholder-gray-400 text-base"
            />
            <RxCross2 onClick={() => setSearchParam({})} className="text-gray-600 text-lg ml-2 cursor-pointer" />
        </div>
    )
}

export default Search