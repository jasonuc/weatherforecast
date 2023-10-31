import { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

export default function App() {

  const [location, setLocation] = useState("");

  return (
    <div className="w-screen min-h-screen">
      <Header />
      <NavBar location={location} setLocation={setLocation} />
    </div>
  )
}