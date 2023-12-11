import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie"
import TableBarang from "../components/TableBarang";
import FormBarang from "../components/FormBarang";
import BarangModal from "../components/ModalBarang";
import useBarangContext from "../context/BarangContext";

const BarangContent = () => {
    const { 
        setFetchStatus
        
      } = useBarangContext();

    useEffect(() => {
    
        setFetchStatus(true)
        
      
      }, []) 
    return (
        <div>
            <BarangModal/>
            <TableBarang/>
        </div>
    );
}

export default BarangContent;
