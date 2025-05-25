import { useState } from "react";
import SearchBar from "../components/Searchbar";
import Posts from "../components/Posts";

function HomePage() {

const [searchTerm, setSearchTerm] = useState("");

return(<>

<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
<Posts searchTerm={searchTerm}/>


</>)

}

export default HomePage;
