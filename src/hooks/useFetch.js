
//Aqui realizamos el crud

import axios from "axios"
import { useState } from "react"

const useFetch = (baseUrl, callback) => {
    const [infoAppi, setInfoAppi] = useState()

    //READ
    const getApi = (path) => {
        const url = `${baseUrl}${path}/`
        axios.get(url)
            .then(res => setInfoAppi(res.data))
            .catch(err => console.log(err))
    }        
    //CREATE
    const postApi = (path, data) => {
        const url = `${baseUrl}${path}/`
        axios.post(url, data)
            .then(res => {
                console.log(res.data)
                setInfoAppi([...infoAppi, res.data])
                callback(true)
            })
            .catch(err => console.log(err))
    }
    //DELETE
    const deleteApi = (path, id) => {
        const url = `${baseUrl}${path}/${id}/`
        axios.delete(url)
        .then(res => {
            console.log(res.data)
            setInfoAppi(infoAppi.filter(e => e.id !== id))
        })
        .catch(err => console.log(err))
    }
    //UPDATE
    const updateApi = (path, id, data) => {
        const url = `${baseUrl}${path}/${id}/`
        axios.put(url, data)
            .then(res => {
                console.log(res.data)
                setInfoAppi(infoAppi.map(e => e.id === id ? res.data : e))
                callback(true)
            })
            .catch(err => console.log(err))
        }

    return [ infoAppi, getApi, postApi, deleteApi, updateApi]
 
}

export default useFetch