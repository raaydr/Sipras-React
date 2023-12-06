import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie"
import TableBarang from "../components/TableBarang";


const BarangContent = () => {

    return (
        <div>
            <TableBarang/>
        </div>
    );
}

export default BarangContent;
