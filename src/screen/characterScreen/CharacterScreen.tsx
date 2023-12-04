import React from 'react'
import CharacterDetails from '../../components/characterDetails/CharacterDetails'
import Header from '../../components/header/Header'
import style from "./CharacterScreen.module.scss"
function CharacterScreen() {
  return (
    <div className={style.characterScreenWrapper}>
        <div className={style.headerDiv}><Header /></div>
        <div>
            <CharacterDetails/>
        </div>
    </div>
  )
}

export default CharacterScreen