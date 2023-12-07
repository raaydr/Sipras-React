import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import useAuthContext from "../context/AuthContext";
import { useParams  } from "react-router-dom";

const FormBarang = () => {
    const { 
        
        currentId, setCurrentId,
        errors, setErrors,createdata,editdata
      } = useAuthContext();
    
    const [nama_barang, setnama_barang]= useState("");
    const [kode_barang , setkode_barang ]= useState("");
    const [tipe_barang , settipe_barang ]= useState("");
    const [satuan_barang , setsatuan_barang ]= useState("");
    const [keterangan  , setketerangan  ]= useState("");
    
    
    

    //Ambil data buat ngedit
    useEffect(() => {
        //fetch data dengan kondisi
        if (currentId !== -1) {
        console.log(currentId)
        const token = Cookies.get('tokenku')
        axios.get(`/api/detail-barang/${currentId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
          .then((res) => {
            let data = res.data.data
            setnama_barang(data.nama_barang);
            setkode_barang(data.kode_barang);
            settipe_barang(data.tipe_barang);
            setsatuan_barang(data.satuan_barang);
            setketerangan(data.keterangan);
            
            
          })
        
        }
    }, [currentId]) 

    // Ini cuma buat validate form kalau kosong atau gk sesuai
    const clearform = () => {
        setCurrentId(-1)// ini buat ngepost baru
        setnama_barang("");
        setkode_barang("");
        settipe_barang("");
        setsatuan_barang("");
        setketerangan("");
        
    };
    const data = {nama_barang, kode_barang,tipe_barang,satuan_barang,keterangan};
    const HandleSubmit = (event) => {
      
      event.preventDefault()
      validateForm()
      // Lakukan aksi ketika formulir valid
      currentId === -1 ? createdata(data): editdata(data,currentId);
      
      clearform()
  
      
      
    }
    // Ini cuma buat validate form kalau kosong atau gk sesuai
    const validateForm = () => {
      let formErrors = {};
      let isValid = true;
  
      if (!data.nama_barang) {
      formErrors.nama_barang = 'Pekerjaan wajib diisi';
      isValid = false;
      }
  
      if (!data.kode_barang) {
      formErrors.kode_barang = 'Deskripsi Pekerjaan wajib diisi';
      isValid = false;
      }
      if (!data.tipe_barang) {
      formErrors.tipe_barang = 'Kualifikasi Pekerjaan wajib diisi';
      isValid = false;
      }
      if (!data.satuan_barang) {
      formErrors.satuan_barang = 'Tipe Pekerjaan wajib diisi';
      isValid = false;
      }
      if (!data.keterangan) {
      formErrors.keterangan = 'Masa Pekerjaan wajib diisi';
      isValid = false;
      }
      
      setErrors(formErrors);
      return isValid;
  };

    return (
        <div id="formulir" className="items-center block w-75 justify-center  m-5 px-5  dark:bg-gray-900">
            
        <h1 className="text-5xl font-extrabold dark:text-white mb-5">Form Data</h1>

        <button onClick={clearform} className="text-white bg-purple-500 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 " >Clear Form</button>

            {/* form data */}
            <form   onSubmit={HandleSubmit}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Pekerjaan</label>
                    <input type="text" id="nama_barang" onChange={(e)=>setnama_barang(e.target.value)} value={nama_barang} name='nama_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="WebDEV" required />
                    {errors.nama_barang && <span style={{ color: 'red' }}>{errors.nama_barang}</span>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">kode_barang</label>
                    <input type="text" id="kode_barang" onChange={(e)=>setkode_barang(e.target.value)} value={kode_barang} name='kode_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="WebDEV"  disabled={currentId !== -1} required={currentId !== -1} />
                    {errors.kode_barang && <span style={{ color: 'red' }}>{errors.kode_barang}</span>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">tipe_barang</label>
                    <input type="text" id="tipe_barang" onChange={(e)=>settipe_barang(e.target.value)} value={tipe_barang} name='tipe_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="WebDEV" required />
                    {errors.tipe_barang && <span style={{ color: 'red' }}>{errors.tipe_barang}</span>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">satuan_barang</label>
                    <input type="text" id="satuan_barang" onChange={(e)=>setsatuan_barang(e.target.value)} value={satuan_barang} name='satuan_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="WebDEV" required />
                    {errors.satuan_barang && <span style={{ color: 'red' }}>{errors.satuan_barang}</span>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">keterangan</label>
                    <textarea type="text" id="keterangan" onChange={(e)=>setketerangan(e.target.value)} value={keterangan} name='keterangan' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="WebDEV" required />
                    {errors.keterangan && <span style={{ color: 'red' }}>{errors.keterangan}</span>}
                </div>
                
                <button type={'submit'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " >Submit</button>
            </form>

      </div>
    );
}

export default FormBarang;
