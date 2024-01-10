import axios from "axios"
import { urls } from "../ApiRoutes"
const getByCharacters = async (params={}) => {
    try {
        const data = await axios(urls.GET_CHARACTERS ,{
            params : params
        })
        return data?.data
    } catch (error) {
         console.log(error)
    }
}
const getByLocations = async (params={}) => {
    try {
        const data = await axios(urls.GET_LOCATIONS , {
            params : params
        })
        return data?.data
    } catch (error) {
         console.log(error)
    }
}
const getByEpicode = async (params={}) => {
    try {
        const data = await axios(urls.GET_EPICODES , {
            params : params
        })

        return data?.data
    } catch (error) {
         console.log(error)
    }
}
const getByCharactersById = async (id) => {
    try {
        let url = `${urls.GET_CHARACTERS}/${id}`
        const data = await axios(url)

        return data?.data
    } catch (error) {
         console.log(error)
    }
}

const getByEpicodeMulti = async (id) => {
    try {
        let url = `${urls.GET_EPICODES}/${id}`
        const data = await axios(url)

        return data?.data
    } catch (error) {
         console.log(error)
    }
}
export {
    getByCharacters,
    getByLocations,
    getByEpicode,
    getByCharactersById,
    getByEpicodeMulti
}