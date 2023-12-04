import React from 'react'
import style from "./Card.module.scss"

interface CardProps {
    img: string;
    title: string;
    type: string
    gender: string
    status ?:string
    onClickCard ?: CallableFunction
}
function Card(props: CardProps) {
    return (
        <div className={`${style.cardWrapper}`} onClick= {() => props?.onClickCard && props.onClickCard()}>
            {props.status?.length ? <span className={style.status}>{props.status}</span> : ""}
            <img className={style.imgPoster} src={props.img}></img>
            <div className={style.title}>{props.title}</div>
            <div className={style.infoDiv}>
                <span className={style.styleDetails}>{props.gender}</span>
                <span className={style.styleDetails}>{props.type}</span>
            </div>
        </div>
    )
}

export default Card