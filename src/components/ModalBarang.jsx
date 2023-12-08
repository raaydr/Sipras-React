import React from 'react';
import { useEffect, useState } from "react";
import useBarangContext from "../context/BarangContext";
import axios from "../api/axios";
import Cookies from "js-cookie"
import { useToast, immediateToast } from "izitoast-react";
const BarangModal = () => {
    
    const {currentId, errors, setErrors,isMenuOpen, setMenuOpen,createdata,editdata,iziStatus, setiziStatus} = useBarangContext();
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
        
        }else{
            setnama_barang("");
            setkode_barang("");
            settipe_barang("");
            setsatuan_barang("");
            setketerangan("");
        }
    }, [currentId]) 

    useEffect(() => {
        // This will run after the component re-renders due to state changes
        if(iziStatus === "success1"){
            immediateToast('success', {
                title: "Sukses",
                message: "sukses membuat data",
                theme: "light",
                
              });
          }else if(iziStatus === "success2"){
            immediateToast('success', {
                title: "Sukses",
                message: "sukses mengubah data",
                theme: "light",
                
              });
          }
          else if (iziStatus === "error"){
            immediateToast('error', {
                title: "error",
                message: "periksa input",
                theme: "light",
                
              });
          }
    
        // You can perform additional actions based on iziStatus here
      }, [iziStatus]);
    
    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
      };
    
      const closeMenu = () => {
        console.log(isMenuOpen)
        setMenuOpen(false);
        console.log(isMenuOpen)
      };
      const data = {nama_barang, kode_barang,tipe_barang,satuan_barang,keterangan};
      const HandleSubmit = (event) => {
        
        event.preventDefault()
        if (validateForm()) {
            if(currentId === -1){
                createdata(data);
                
            }else{
                editdata(data,currentId);
                
            }
            
            
          }
          
          
          // Lakukan aksi ketika formulir valid
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
        <div  tabIndex={-1}  className={`${isMenuOpen ? 'flex justify-center items-center show' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] `}>
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="justify-center items-center bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Modal Barang
                                </h1>
                                <button type="button" onClick={closeMenu} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <form   onSubmit={HandleSubmit}>
                                
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                                        <input type="text" id="nama_barang" onChange={(e)=>setnama_barang(e.target.value)} value={nama_barang} name='nama_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Barang" required />
                                        {errors.nama_barang && <span style={{ color: 'red' }}>{errors.nama_barang}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Barang</label>
                                        <input type="text" id="kode_barang" onChange={(e)=>setkode_barang(e.target.value)} value={kode_barang} name='kode_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kode Barang"  required />
                                        <blockquote className="text-xs italic font-semibold text-start text-gray-900 dark:text-white">
                                            <p>"Kode barang harus unik(tidak boleh sama)"</p>
                                        </blockquote>
                                        {errors.kode_barang && <span style={{ color: 'red' }}>{errors.kode_barang}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe Barang</label>
                                        <input type="text" id="tipe_barang" onChange={(e)=>settipe_barang(e.target.value)} value={tipe_barang} name='tipe_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tipe Barang" required />
                                        {errors.tipe_barang && <span style={{ color: 'red' }}>{errors.tipe_barang}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Satuan Barang</label>
                                        <input type="text" id="satuan_barang" onChange={(e)=>setsatuan_barang(e.target.value)} value={satuan_barang} name='satuan_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Satuan Barang" required />
                                        {errors.satuan_barang && <span style={{ color: 'red' }}>{errors.satuan_barang}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Keterangan</label>
                                        <textarea type="text" id="keterangan" onChange={(e)=>setketerangan(e.target.value)} value={keterangan} name='keterangan' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keterangan" required />
                                        {errors.keterangan && <span style={{ color: 'red' }}>{errors.keterangan}</span>}
                                    </div>
                                    
                                    <button type={'submit'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " >Submit</button>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
    );
}

export default BarangModal;
