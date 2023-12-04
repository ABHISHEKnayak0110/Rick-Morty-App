import { useEffect, useState } from "react"
import { getByCharacters ,getByEpicode ,getByLocations } from "../../apiFunction/ApiHelper"
import AllCharacters from "../../components/allCharacters/AllCharacters"
import Card from "../../components/card/Card"
import Dropdown from "../../components/dropdown/Dropdown"
import FilterComponent from "../../components/filterComponent/FilterComponent"
import Header from "../../components/header/Header"
import SearchInputBox from "../../components/searchInputBox/SearchInputBox"
import { filterOption } from "../../constant"
import useDebounce from "../../customHook/useDebounce"
import style from "./BaseScreen.module.scss"


function BaseScreen() {
   const [allData , setAllData] = useState<any>([])
   const [selectedOption , setSelectedOption] = useState("Character")
   const [searchName , setSearchName] = useState("")
   const [filterDetials , setFilterDetails] = useState<any>({})
   const [error , setError] = useState("")
   const [page , setPage] = useState(1)

   const optionDropdown =["Character" ,"Location" , "Episode"]
   
   const placeHolderName :any = {
    "Character" : "Search By Character Name",
    "Location" : "Search By Location Name",
    "Episode" : "Search By Episode Name"
   }



   /**Api calls functions */
   const getByCharactersApi = (params ?: any) => {
    getByCharacters(params)?.then(res =>
        setAllData(res)
       ).catch((e:any) => console.log(e))
   }

   const getByLocationsApi = (params ?:any) => {
    getByLocations(params)?.then(res =>
        setAllData(res)
       ).catch((e:any) => console.log(e))
   }
   const getByEpicodesApi = (params ?:any) => {
    getByEpicode(params)?.then(res =>
        setAllData(res)
       ).catch((e:any) => console.log(e))
   }
  

 const apiCallFunction :any ={
    "Character" : getByCharactersApi,
    "Location" : getByLocationsApi,
    "Episode" : getByEpicodesApi
 }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
      setPage(1)
    setSearchName(e?.target?.value)
    const searchFunction = apiCallFunction[selectedOption]
    if(e?.target?.value?.length){
        let obj :any ={
            name : e?.target?.value,
            ...filterDetials,

          }
          searchFunction(obj)
    } 
    
    else{
         const obj = {...filterDetials}
        searchFunction(obj)
    }
    
}
 const debounceSearch = useDebounce(handleSearch , 500)
/**On change dropdown */   
 const handleChangeDropdown =(data :string) => {

    setSelectedOption(data)

 }
 const handleFiltername = (filterType :string, value :string) => {

    setPage(1)
     const filterName = filterType?.split(" ")?.[1]?.toLocaleLowerCase()
     let obj ={
        ...filterDetials,
        [filterName] : value, 
    }
    if(value ===null){
        delete obj[filterName]
    }
    setFilterDetails(obj)
    const filterFunction = apiCallFunction[selectedOption]
    if(searchName?.length >0){
        obj.name = searchName
    }
    filterFunction(obj)

 }

 const handlePagination =(page :any) => {
    setPage(page?.selected +1)
    let obj ={
       ...filterDetials,
       page : page?.selected+1
   }
   const filterFunction = apiCallFunction[selectedOption]
   if(searchName?.length >0){
       obj.name = searchName
   }
   filterFunction(obj)
 }

 /**on change options Api call */
      useEffect(
          () => {
         if(selectedOption === "Character"){
            getByCharactersApi()
         }
         else if(selectedOption === "Location"){
           getByLocationsApi()
         }
         else if(selectedOption === "Episode"){
           getByEpicodesApi()
         } 
        },[selectedOption]
    )
    return (
        <div className={style.baseSceenWrapper} >
            <div className={style.headerDiv}><Header /></div>
            <div className={style.mainContainer}>
                <div className={style.leftSide}>
                    {
                    filterOption?.map((filter :any , i:number) => {
                        return (
                           <div key={i} className={style.filterDiv}>  <FilterComponent
                            headingName={filter?.filterName}
                            data={ filter?.options}
                            handleChangeFilter={handleFiltername}
                        />
                        </div>
                        )
                    })

                    }
                  
                </div>
                <div className={style.rightSide}>
                    <div className={style.containerSearch}>
                        <div className={style.searchBoxDiv}>
                              <SearchInputBox
                               placeholder={placeHolderName[selectedOption]}
                              onChange={debounceSearch}
                               />
                        </div>
                        <div className={style.dropdownDiv}>
                             <Dropdown
                                optionList={optionDropdown}
                                setDataOutside={handleChangeDropdown}
                                defaultSelected={selectedOption}
                            />
                        </div>
                    </div>
                    <div className={style.cardContainer}>
                      {
                        allData?.results?.length > 0 ? 
                        <AllCharacters
                        allData ={allData}
                        page ={selectedOption}
                        pageNumber ={page-1}
                        handleChangePage ={handlePagination}
                      />
                      : 
                      <h3>No Data Found</h3>
                      }  
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BaseScreen