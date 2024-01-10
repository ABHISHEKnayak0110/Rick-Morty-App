import style from "./CharacterDetails.module.scss"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getByCharactersById  ,  getByEpicodeMulti} from "../../apiFunction/ApiHelper";


const CharacterDetails = () => {
  let { id } = useParams();
  let [fetchedData, setFetchedData] = useState<any>([]);
  let { name, location, origin, gender, image, status, species } = fetchedData;
  const [epicodeList , setAllEpicodeList] = useState<any>([])

 
 useEffect(
     () => {
        getByCharactersById(id)?.then(
            res => setFetchedData(res)
        ).catch(err => console.log(err))
     },[id]
 )



 useEffect(
   () => {
  //   const number =fetchedData?.episode?.map((e:any )=> {
  //     const list = e?.split("/")
  //     return list[list.length-1]
  //  })
  //  let list = localStorage.getItem("list")
  //  console.log("list 1" , list)
  // if(number?.length){
  //   if(!list){
  //     localStorage.setItem("list" , JSON.stringify(number))
  //   }
  //   console.log("list 2" , number)
  


  //   getByEpicodeMulti(number)?.then(
  //     res => {
  //       localStorage.setItem("store" , JSON.stringify(res))
  //       setAllEpicodeList(res)
  //     }
  // ).catch(err => console.log(err))
  // }
  checkStorage()

   },[fetchedData?.episode]
 )



 async function checkStorage(){

  /**checking list of epicode number in Local storage   */
    let list:any = localStorage.getItem("list")
    list= JSON.parse(list) || []  // if no local data initial empty array 
   
    /**checking actual epicodes number list for character  */
    const numberActualList =fetchedData?.episode?.map((e:any )=> {
    const list = e?.split("/")
    return list[list.length-1]
   })

/**checking  data in Local storage of Epicodes */
 let store:any = localStorage.getItem("store")
 store = JSON.parse(store) || []  // if no local data initial empty array 
  
 /* Result is all Final result epicode List for Character We have to show  */
 let Result:any =[]  

 /** variable for Remaining Epicode Number Which is not in our data base */
 let remianingEpicodeNumber:any =[]

/**Looping for getting Result which is already there in data Store and epicode Number which we are missing  */
 numberActualList?.map((e:any) => {
    if(list?.includes(e)){
     const epi = store?.find((id :any) => id?.id == e)
     /*pushing result for already present in data base */
     Result.push(epi)
    }else{
      remianingEpicodeNumber.push(e)
    }
})

/**remainingResult is result which not in store so for this we have to make api call based on remaining Epicode Number **/
   let remainingResult:any =[]
 if( remianingEpicodeNumber?.length){

  /**Modifying our epicode list , now adding  remaining epicode number in list  */
  localStorage.setItem("list" , JSON.stringify([...list , ...remianingEpicodeNumber]))

  /**Making Api call waiting for remainingresult  */
  await getByEpicodeMulti(remianingEpicodeNumber)?.then(
    res => {
      /* checking result here if single result it is coming as object and multiple than its array */
      /*So storing as a array */
      remainingResult = res?.length >1 ? [...res] : [res]
      /**storing a remaing result in out data storage */
      localStorage.setItem("store" , JSON.stringify([...store , ...remainingResult]))
    }
  ).catch(err => console.log(err))
 }


 /**So Now Our Final Result for Character is result which is coming from storage and result coming from Api */
 Result =[...Result, ...remainingResult]

 /** storring in state */
 setAllEpicodeList(Result)
 /**To More Clearity Please Check Console  */
 console.log(
      `ALl Epicode List In Local Storage -> ` ,list, '\n',
    `All Epicode in Which The Character Worked  -> `,numberActualList , '\n',
     `All Epicode Details Which We have in Storage ->` , store, '\n',
    `All Remaining Epicode Number for which we have to hit Api` , remianingEpicodeNumber,'\n',
    `All Remaining Epicode Details Which we found By Api Call ->` , remainingResult,'\n',
    `Final Results on Screen To show ->` , Result,'\n',
  )

 }
 

  console.log("data" , epicodeList?.length )

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
      <ol>
        { 
          epicodeList?.map((epicode:any) => {
           return <li>{epicode?.name}</li>
          })
        }
      </ol>
    </div>
  );
};

export default CharacterDetails;