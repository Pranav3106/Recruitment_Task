import { Route, Routes } from "react-router-dom"
import CharacterList from "./components/CharacterList"
import EpisodeDetails from "./components/EpisodeDetails"


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/episode/:id" element={<EpisodeDetails />} />
        </Routes>
    )
}

export default App