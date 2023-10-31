import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

export default function App() {

  const [location, setLocation] = useState("");

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      <SearchBar location={location} setLocation={setLocation} />
      <div className="flex-grow border-solid border-2 bg-[#c1d5e9] bg-cloud-2 bg-right bg-opacity-40 bg-blend-overlay lg:bg-no-repeat lg:bg-cover lg:bg-bottom">

      </div>
    </div>
  )
}