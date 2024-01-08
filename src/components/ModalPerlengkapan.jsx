/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect, useState } from "react";
import usePerlengkapanContext from "../context/PerlengkapanContext";
import axios from "../api/axios";
import Cookies from "js-cookie"
import { useToast, immediateToast } from "izitoast-react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


import { getMonth, getYear } from "date-fns";
import range from "lodash/range";

const PerlengkapanModal = () => {
    
    const {currentId, errors, setErrors,isMenuOpen, setMenuOpen,createdata,editdata,iziStatus, setiziStatus} = usePerlengkapanContext();
    
    const [nama_barang, setnama_barang]= useState("");
    const [kode , setkode ]= useState("");
    const [foto_perlengkapan , setfoto_perlengkapan ]= useState("");
    const [harga_perlengkapan , setharga_perlengkapan ]= useState(0);
    const [barang_id , setbarang_id ]= useState("");
    const [tipe_barang , settipe_barang ]= useState("");
    const [satuan_barang , setsatuan_barang ]= useState("");
    const [keterangan_perlengkapan  , setketerangan_perlengkapan  ]= useState("");
    const [jumlah_perlengkapan  , setjumlah_perlengkapan  ]= useState("");
    const [lokasi_perlengkapan  , setlokasi_perlengkapann  ]= useState("");
    const [departemen  , setdepartemen  ]= useState("");
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [barang, setBarang] = useState([])


    const [tanggal_pembelian, settanggal_pembelian] = useState("");
    
    const [startDate, setStartDate] = useState(new Date());

  const [isCheckedOne, setCheckedOne] = useState(false);
  const [isCheckedZero, setCheckedZero] = useState(false);
  const [kondisi_perlengkapan  , setkondisi_perlengkapan]= useState("");
  const [leandable_perlengkapan  , setleandable_perlengkapan]= useState("");

  const [bagus, setBagus] = useState(false);
  const [kurangbagus, setKurangBagus] = useState(false);
  const [rusak, setRusak] = useState(false);

  

  const handleCheckboxBagus = () => {
    setBagus(!bagus);
    setkondisi_perlengkapan(1);
    // Uncheck the other checkbox when this one is checked
    if (!bagus) {
      setKurangBagus(false);
      setRusak(false);
    }
  };

  const handleCheckboxKurangBagus = () => {
    setKurangBagus(!kurangbagus);
    setkondisi_perlengkapan(2);
    // Uncheck the other checkbox when this one is checked
    if (!kurangbagus) {
      setBagus(false);
      setRusak(false);
    }
  };

  const handleCheckboxRusak = () => {
    setRusak(!rusak);
    setkondisi_perlengkapan(3);
    // Uncheck the other checkbox when this one is checked
    if (!rusak) {
      setBagus(false);
      setKurangBagus(false);
    }
  };

  const handleCheckboxChangeOne = () => {
    setCheckedOne(!isCheckedOne);
    setleandable_perlengkapan(1);
    // Uncheck the other checkbox when this one is checked
    if (!isCheckedOne) {
      setCheckedZero(false);
    }
  };

  const handleCheckboxChangeZero = () => {
    setCheckedZero(!isCheckedZero);
    setleandable_perlengkapan(2);
    // Uncheck the other checkbox when this one is checked
    if (!isCheckedZero) {
      setCheckedOne(false);
    }
  };

    const fetchData =  () => {
        const token = Cookies.get('tokenku')
         axios.get("/api/data-barang",{ headers: {"Authorization" : `Bearer ${token}`} })
          .then((res) => {
            
            const indexData =  res.data.data.map((obj, index) => {
              return { no: index + 1, ...obj };
            });
            setBarang(indexData)
          })
          .catch((error) => {
          })
      };

      
    const handleSearch = (query) => {
      const filteredResults = barang.filter((item) =>
      (item.nama_barang && item.nama_barang.toLowerCase().includes(query.toLowerCase()))
      );
      console.log(filteredResults)
      setSearchResults(filteredResults);
      
    };
  
    const handleInputChange = (event) => {
      const query = event.target.value;
      setSearchTerm(query);
      if(query === ""){
        setkode(query);
        setbarang_id(query);
      }
      setShowDropdown(true);
      handleSearch(query);
    };
  
    const handleSelect = (result) => {
      setSearchTerm(result.nama_barang);
      setkode(result.kode_barang);
      setbarang_id(result.id);
      setShowDropdown(false);
    };
  

    const formatRupiah = (angka, prefix) => {
      var numberString = angka.replace(/[^,\d]/g, '').toString(),
        split = numberString.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
      if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }
  
      rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
      return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
    };
  
    const handleHargaPerlengkapanChange = (e) => {
      const formattedValue = formatRupiah(e.target.value, 'Rp. ');
      setharga_perlengkapan(formattedValue);
    };
    
    //Ambil data buat ngedit
    useEffect(() => {
        fetchData();
        //fetch data dengan kondisi
        if (currentId !== -1) {
            
        const token = Cookies.get('tokenku')
        axios.get(`/api/detail-barang/${currentId}`,{ headers: {"Authorization" : `Bearer ${token}`} })
          .then((res) => {
            let data = res.data.data
            setnama_barang(data.nama_barang);
            setkode(data.kode_barang);
            settipe_barang(data.tipe_barang);
            setsatuan_barang(data.satuan_barang);
            setketerangan_perlengkapan(data.keterangan_perlengkapan);
            
            
          })
        
        }else{
            setnama_barang("");
            setkode("");
            settipe_barang("");
            setsatuan_barang("");
            setketerangan_perlengkapan("");
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

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        //setfoto_perlengkapan(file);
      };
    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
      };
    
      const closeMenu = () => {
        
        setMenuOpen(false);
        
      };
      const data = {barang_id, jumlah_perlengkapan,harga_perlengkapan,keterangan_perlengkapan,kode,
        tanggal_pembelian,lokasi_perlengkapan,departemen,kondisi_perlengkapan,leandable_perlengkapan,
        foto_perlengkapan};
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
        
        if (!data.barang_id) {
        formErrors.barang_id = 'pilih barang';
        isValid = false;
        }
    
        if (!data.jumlah_perlengkapan) {
        formErrors.jumlah_perlengkapan = 'jumlah_perlengkapan wajib diisi';
        isValid = false;
        }
        if (!data.lokasi_perlengkapan) {
        formErrors.lokasi_perlengkapan = 'lokasi_perlengkapan wajib diisi';
        isValid = false;
        }
        if (!data.departemen) {
        formErrors.departemen = 'departemen wajib diisi';
        isValid = false;
        }
        if (!data.keterangan_perlengkapan) {
        formErrors.keterangan_perlengkapan = 'keterangan_perlengkapan wajib diisi';
        isValid = false;
        }
        if (!data.harga_perlengkapan) {
          formErrors.harga_perlengkapan = 'harga_perlengkapan wajib diisi';
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
                                        <input
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                        placeholder="Search..."
                                        />
                                        {showDropdown && (
                                          
                                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                            {searchResults.slice(0, 5).map((result, index) => (
                                                <li key={index} >
                                                  <button onClick={() => handleSelect(result)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{result.nama_barang}</button>
                                                </li>
                                            ))}
                                            </ul>
                                        )}
                                        <blockquote className="text-xs italic font-semibold text-start text-gray-900 dark:text-white">
                                            <p>"Harus memilih nama barang"</p>
                                        </blockquote>
                                        {errors.nama_barang && <span style={{ color: 'red' }}>{errors.nama_barang}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Barang</label>
                                        <input type="text" id="kode" onChange={(e)=>setkode(e.target.value)} value={kode} name='kode' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kode Barang" readOnly required />
                                        <input type="text" id="barang_id" onChange={(e)=>setbarang_id(e.target.value)} value={barang_id} name='barang_id'  hidden />
                                        {errors.kode && <span style={{ color: 'red' }}>{errors.kode}</span>}
                                        
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah</label>
                                        <input type="text" id="jumlah_perlengkapan" onChange={(e)=>setjumlah_perlengkapan(e.target.value)} value={jumlah_perlengkapan} name='nama_barang' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jumlah" required />
                                        {errors.jumlah_perlengkapan && <span style={{ color: 'red' }}>{errors.jumlah_perlengkapan}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Pembelian</label>
                                        <input type="text" id="harga_perlengkapan" onChange={handleHargaPerlengkapanChange} value={harga_perlengkapan} name='kode' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kode Barang" required />
                                        {errors.harga_perlengkapan && <span style={{ color: 'red' }}>{errors.harga_perlengkapan}</span>}
                                        
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">keterangan perlengkapan</label>
                                        <textarea type="text" id="keterangan_perlengkapan" onChange={(e)=>setketerangan_perlengkapan(e.target.value)} value={keterangan_perlengkapan} name='keterangan_perlengkapan' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keterangan" required />
                                        {errors.keterangan_perlengkapan && <span style={{ color: 'red' }}>{errors.keterangan_perlengkapan}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi</label>
                                        <input type="text" id="lokasi_perlengkapan" onChange={(e)=>setlokasi_perlengkapann(e.target.value)} value={lokasi_perlengkapan} name='lokasi_perlengkapan' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="lokasi" required />
                                        {errors.lokasi_perlengkapan && <span style={{ color: 'red' }}>{errors.lokasi_perlengkapan}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departemen</label>
                                        <input type="text" id="departemen" onChange={(e)=>setdepartemen(e.target.value)} value={departemen} name='departemen' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="departemen" required />
                                        {errors.departemen && <span style={{ color: 'red' }}>{errors.departemen}</span>}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Pembelian</label>
                                        <DatePicker   selected={tanggal_pembelian} onChange={(date) => settanggal_pembelian(date)} type="date" />
                                        
                                    </div>
                                    <div className="mb-6">
                                        
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Foto Perlengkapan</label>
                                      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="foto_perlengkapan" 
                                       onChange={handleImageChange} type="file"/>
                                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

                                        
                                    </div>
                                    
                                    <div className="mb-6">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">kondisi perlengkapan</label>
                                      <div className="inline-flex items-center m-2">
                                          <input id="bordered-checkbox-1" type="checkbox"  checked={kondisi_perlengkapan === 1 ?true : bagus} onChange={handleCheckboxBagus} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                          <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bagus</label>
                                      </div>
                                      <div className="inline-flex items-center m-2">
                                          <input defaultChecked id="bordered-checkbox-2" type="checkbox"  checked={kondisi_perlengkapan === 2 ?true : kurangbagus} onChange={handleCheckboxKurangBagus} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                          <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kurang Bagus</label>
                                      </div>
                                      <div className="inline-flex items-center m-2">
                                          <input defaultChecked id="bordered-checkbox-2" type="checkbox"  checked={kondisi_perlengkapan === 3 ?true : rusak} onChange={handleCheckboxRusak} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                          <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rusak</label>
                                      </div>
                                      {errors.kondisi_perlengkapan && <span style={{ color: 'red' }}>{errors.kondisi_perlengkapan}</span>}
                                  </div>
                                  <div className="mb-6">
                                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peminjaman perlengkapan</label>
                                      <div className="inline-flex items-center m-2">
                                          <input id="bordered-checkbox-1" type="checkbox"  checked={leandable_perlengkapan === 1 ?true : isCheckedOne} onChange={handleCheckboxChangeOne} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                          <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Boleh</label>
                                      </div>
                                      <div className="inline-flex items-center m-2">
                                          <input defaultChecked id="bordered-checkbox-2" type="checkbox"  checked={leandable_perlengkapan === 2 ?true : isCheckedZero} onChange={handleCheckboxChangeZero} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                          <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tidak Boleh</label>
                                      </div>
                                     
                                      {errors.leandable_perlengkapan && <span style={{ color: 'red' }}>{errors.leandable_perlengkapan}</span>}
                                  </div>
                                    <button type={'submit'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " >Submit</button>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
    );
}

export default PerlengkapanModal;
