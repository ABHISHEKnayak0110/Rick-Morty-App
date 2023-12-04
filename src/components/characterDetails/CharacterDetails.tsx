import style from "./CharacterDetails.module.scss"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getByCharactersById } from "../../apiFunction/ApiHelper";


const CharacterDetails = () => {
  let { id } = useParams();
  let [fetchedData, setFetchedData] = useState<any>([]);
  let { name, location, origin, gender, image, status, species } = fetchedData;

 
 useEffect(
     () => {
        getByCharactersById(id)?.then(
            res => setFetchedData(res)
        ).catch(err => console.log(err))
     },[id]
 )

  return (
    <div className={style.cardDetailsWrapper}>
      <div className={style.mainDiv}>
        <h1 className={style.heading}>{name}</h1>

        <img className={style.img} src={image} alt="" />
        <div className={style.btn}>
        <div className={`${status == "Alive" ? style.btnAlive :  status=="Dead" ? style.btnDead : style.btnUnknown}`}>{status}</div>
        </div>
       
        <div className={style.contain}>
          <div className="">
            <span className={style.title}>Gender : </span>
            {gender}
          </div>
          <div className="">
            <span className={style.title}>Location: </span>
            {location?.name}
          </div>
          <div className="">
            <span className={style.title}>Origin: </span>
            {origin?.name}
          </div>
          <div className="">
            <span className={style.title}>Species: </span>
            {species}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;