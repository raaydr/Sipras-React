import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie"
import TableBarang from "../components/TableBarang";
import FormBarang from "../components/FormBarang";


const BarangContent = () => {

    return (
        <div>
            <FormBarang/>
            <TableBarang/>
        </div>
    );
}

export default BarangContent;
