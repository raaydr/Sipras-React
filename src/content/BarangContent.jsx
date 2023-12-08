import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie"
import TableBarang from "../components/TableBarang";
import FormBarang from "../components/FormBarang";
import BarangModal from "../components/ModalBarang";


const BarangContent = () => {

    return (
        <div>
            <BarangModal/>
            <TableBarang/>
        </div>
    );
}

export default BarangContent;
