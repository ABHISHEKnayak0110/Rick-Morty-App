
import {
    Routes,
    Route,
  } from "react-router-dom";
import CharacterDetails from "../components/characterDetails/CharacterDetails";
import Header from "../components/header/Header";
import BaseScreen from "../screen/baseScreen/BaseScreen";
import CharacterScreen from "../screen/characterScreen/CharacterScreen";


function Routers() {
  return (
    <Routes>
    <Route path="/" element={<BaseScreen/>}/>
    <Route path="/character/:id" element={<CharacterScreen/>} />
   </Routes>
  )
}

export default Routers