
import style from "./AllCharacters.module.scss"
import Card from "../../components/card/Card"
import { useNavigate} from "react-router-dom"
import Paginataion from "../pagination/Paginataion";


function AllCharacters(props: any) {
  const navigation = useNavigate();
  const handleClickCard =(id:number) => {
    if(props.page === "Character"){
      navigation(`/character/${id}`)
    }
  }
  const handleClickPagination =(page :number) => {
      props.handleChangePage(page)
  }
  return (
    <>
    <div className={style?.cardContainerDiv}>
      {
        props?.allData?.results?.map((details: any) => {
          return (
            <Card
              img={details?.image}
              title={details?.name}
              type={details?.species}
              gender={details?.gender}
              status ={details?.status}
              onClickCard ={() => handleClickCard(details?.id)}
            />
          )
        })
      }
    </div>
    <div className={style.paginationDiv}>
    {props?.allData?.info?.pages >1 &&   <Paginataion 
       totalPage ={props?.allData?.info?.pages} 
       pageNo={props.pageNumber} handleClickPageNo ={handleClickPagination}/>
    }
    </div>
    </>
  )
}

export default AllCharacters