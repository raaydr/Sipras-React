import {createContext, useContext, useState, useEffect} from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const BarangContext = createContext({});

export const BarangProvider =({children}) => {
    
    const [errors, setErrors]= useState([]);
    //indikator
    const [fetchStatus, setFetchStatus] = useState(true)
    //indikator
    const [currentId, setCurrentId] = useState(-1)
    const [iziStatus, setiziStatus] = useState(null)
    const [isMenuOpen, setMenuOpen] = useState(false);
    
    const Rupiah = (angka) =>{
        if(angka == null|| angka === 0){
            return "Gratis";
        } else{
            let rupiah = angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
            return rupiah;
            
        }
    }

    const Platform = (params) => {
        if(params != null){
            if(params == 1) {
              return  <p className="text-blue-600">HIRING</p>;
              } else{
                 
                return  <p className="text-red-600">TUTUP</p>;
              }
          }
    }

    const createdata = async ({...data}) =>{
        
        try {
            
            const token = Cookies.get('tokenku')
            const response = await axios.post("/api/create-barang", data,{ headers: {"Authorization" : `Bearer ${token}`} })
            
            
            setCurrentId(-1);
            setiziStatus("success1")
            setFetchStatus(true)
            setMenuOpen(!isMenuOpen);
            
        } catch (e) {
            if(e.response.status === 422){
                setErrors(e.response.data.errors)

            } else if (e.response.status === 404){
                setErrors(e.response.data.data)
            }
            setiziStatus("error")
        }
    }
    const editdata = async ({...data},currentId) =>{
        
        try {
            const token = Cookies.get('tokenku')
            const response = await axios.patch(`/api/update-barang/${currentId}`, data,{ headers: {"Authorization" : `Bearer ${token}`} })
            setiziStatus("success2")
            setCurrentId(-1);
            setFetchStatus(true)
            setMenuOpen(!isMenuOpen);
            
        } catch (e) {
            if(e.response.status === 422){
                setErrors(e.response.data.errors)

            } else if (e.response.status === 404){
                setErrors(e.response.data.data)
            }
            setiziStatus("error")
        }
    }
    const deletedata = async (currentId) =>{
        
        try {
            const token = Cookies.get('tokenku')
            const response = await axios.delete(`/api/delete-barang/${currentId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
            setFetchStatus(true)
            
        } catch (e) {
            if(e.response.status === 422){
                setErrors(e.response.data.errors)

            } else if (e.response.status === 404){
                setErrors(e.response.data.data)
            }
        }
    }
    return <BarangContext.Provider value={{errors,setErrors,fetchStatus, setFetchStatus,currentId, setCurrentId,
        Rupiah,Platform,isMenuOpen, setMenuOpen, createdata, editdata, deletedata,
        iziStatus, setiziStatus
    }}>
        {children}
    </BarangContext.Provider>
}

export default function useBarangContext() {
    return useContext(BarangContext);
}