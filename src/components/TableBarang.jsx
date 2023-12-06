import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import useAuthContext from "../context/AuthContext";

export default function TableBarang () {

    
const [data, setData] = useState([])
const [errors, setErrors] = useState({});
const [searchResults, setSearchResults] = useState([]);
const [search, setSearch] = useState({})
const [searchTerm, setSearchTerm] = useState("");
const [sortField, setSortField] = useState("");

const [sortConfig, setSortConfig] = useState({ key: null, direction: null,type:null });


const [searchNamaBarang, setsearchNamaBarang] = useState("");
const [searchKode, setsearchKode] = useState("");
const [searchTipeBarang, setsearchTipeBarang] = useState("");
const [searchJumlah, setsearchJumlah] = useState("");
const [searchRusak, setsearchRusak] = useState("");
const [searchCreated, setsearchCreated] = useState("");
const [searchEdited, setsearchEdited] = useState("");
const [searchStatus, setsearchStatus] = useState("");

const { 
  fetchStatus, setFetchStatus,
  navigate,deletedata, Rupiah, Platform,csrf
} = useAuthContext();

useEffect(() => {
  setFetchStatus(true)
}, [])


const fetchData = async () => {
    
    await csrf();
    const token = Cookies.get('tokenku')
    await axios.get("/api/data-barang",{ headers: {"Authorization" : `Bearer ${token}`} })
      .then((res) => {
        setData([...res.data.data])
        
      })
      .catch((error) => {
      })
    setFetchStatus(false)
  };

useEffect(() => {
  //fetch data dengan kondisi
  if (fetchStatus === true) {
    
    fetchData()
    
  }

}, [fetchStatus, setFetchStatus]) 

useEffect(() => {
  
  const results = data.filter(
    (item) =>
    (item.nama_barang && item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()))||
    (item.kode_barang && item.kode_barang.toLowerCase().includes(searchTerm.toLowerCase()))||
    (item.tipe_barang && item.tipe_barang.toLowerCase().includes(searchTerm.toLowerCase()))||
    ( item.jumlah.toString().includes(searchTerm.toLowerCase()))||//kalau nilainya mau termasuk 0
    ( item.rusak.toString().includes(searchTerm.toLowerCase()))
      

  );
  setSearchResults(results);
}, [searchTerm, data]);


useEffect(() => {
  // Fungsi untuk melakukan pencarian
  
}, [search, data]);


useEffect(() => {
  const results = data.filter(
    (item) =>
    (item.nama_barang && item.nama_barang.toLowerCase().includes(searchNamaBarang.toLowerCase()))&&
    (item.kode_barang && item.kode_barang.toLowerCase().includes(searchKode.toLowerCase()))&&
    (item.tipe_barang && item.tipe_barang.toLowerCase().includes(searchTipeBarang.toLowerCase()))&&
    (item.jumlah.toString().includes(searchJumlah))&&
    (item.rusak.toString().includes(searchRusak))
    
  );
  
  setSearchResults(results);
  // Sort the data when the sortConfig changes
  const sortedData = results.sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // You may need to customize this comparison based on the data type of the column
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      if(sortConfig.type === "number"){
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }else{
        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        
      }
      
    }
    return 0;
  });

  setSearchResults(sortedData);
}, [search, data, sortConfig]);

const handleSort = (key,type) => {
  let direction = 'asc';

  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }

  setSortConfig({ key, direction,type });
};

//handling input
const handleSearch = (search) => {
  // targetin variable buat dibidik 
  setSearch({ ...search, search})
  
}

const handleDelete = (event) => {
  let idData = parseInt(event.target.value)
  deletedata(idData)
  
  
}

const handleEdit = (event) => {
  let idData = parseInt(event.target.value)
  navigate(`/dashboard/list-job-vacancy/edit/${idData}`)
}


  return (
    <>
      <div className="container mx-auto">
        <div className="flex">
        <h5 className=" flex items-center text-xl font-bold dark:text-white m-5 ">List Data Table</h5>
        <input
              type="text"
              id="search"
              name="search"
              className="flex items-end text-center m-5 px-1 py-3 font-small  text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              placeholder="pencarian"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        
            
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-purple-500 dark:bg-purple-500 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                No
                
                </th>
                <th scope="col" className="px-6 py-3">
                <SortableHeader
                  columnKey="nama_barang"
                  columnType="string"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <input
                type="text"
                value={searchNamaBarang}
                onChange={(e) => {
                  setsearchNamaBarang(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Pekerjaan"
                
                />
                
                </th>
                <th scope="col" className="px-6 py-3">
                <SortableHeader
                  columnKey="kode_barang"
                  columnType="string"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <input
                type="text"
                value={searchKode}
                onChange={(e) => {
                  setsearchKode(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kode"
                
                />
                </th>
                <th scope="col" className="px-6 py-3">
                <SortableHeader
                  columnKey="tipe_barang"
                  columnType="string"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <input
                type="text"
                value={searchTipeBarang}
                onChange={(e) => {
                  setsearchTipeBarang(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tipe"
                
                />
                </th>
                <th scope="col" className="px-6 py-3">
                <SortableHeader
                  columnKey="jumlah"
                  columnType="number"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <input
                type="text"
                value={searchJumlah}
                onChange={(e) => {
                  setsearchJumlah(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Jumlah"
                
                />
                </th>
                <th scope="flex" className="px-6 py-3">
                <SortableHeader
                  columnKey="rusak"
                  columnType="number"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <input
                type="text"
                value={searchRusak}
                onChange={(e) => {
                  setsearchRusak(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rusak"
                
                />
                
                </th>
                <th scope="col" className="px-6 py-3">
                <SortableHeader
                  columnKey="user_name"
                  columnType="string"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <input
                type="text"
                value={searchCreated}
                onChange={(e) => {
                  setsearchCreated(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Created"
                
                />
                
                </th>
                <th scope="col" className="px-6 py-3">
                <SortableHeader
                  columnKey="editedBy_name"
                  columnType="string"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <input
                type="text"
                value={searchEdited}
                onChange={(e) => {
                  setsearchEdited(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="edited"
                
                />
                </th>
                <th scope="col" className="px-6 py-3">
                <SortableHeader
                  columnKey="status"
                  columnType="string"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <input
                type="text"
                value={searchStatus}
                onChange={(e) => {
                  setsearchStatus(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Status"
                
                />
                </th>
                
                <th scope="col" className="px-6 py-3">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
            {searchResults.length > 0 ? (
          // Menampilkan hasil pencarian jika ditemukan
          searchResults.map((res,Index) => (
            <tr key ={res.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {Index + 1}
                </th>
                <td className="px-6 py-4">
                {res.nama_barang }
                </td>
                <td className="px-6 py-4">
                {res.kode_barang}
                </td>
                <td className="px-6 py-4">
                {res.tipe_barang}
                </td>
                <td className="px-6 py-4">
                {res.jumlah}
                </td>
                <td className="px-6 py-4">
                {res.rusak }
                </td>
                <td className="px-6 py-4">
                {res.user_name}
                </td>
                <td className="px-6 py-4">
                {res.editedBy_name}
                </td>
                <td className="px-6 py-4">
                {res.status}
                </td>
                <td className="px-6 py-4">
                  <button onClick={handleEdit} value={res.id} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Edit</button>
                  <button onClick={handleDelete} value={res.id} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                </td>
              </tr>
              ))
            ) : (
              // Menampilkan pesan tidak ditemukan jika tidak ada hasil
              <tr className="flex items-center w-full px-1 py-3 text-base font-small">
                <td className="place-self-center">
                Pekerjaan tidak ditemukan.
                </td>
              </tr>

              
            )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

// SortableHeader component
const SortableHeader = ({columnKey,columnType, sortConfig, onSort }) => {
  const handleClick = () => {
    onSort(columnKey,columnType);
  };

  return (
    <button className="px-3 py-2 text-xs m-1 font-medium text-center focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 rounded-lg dark:focus:ring-green-900" onClick={handleClick}> sort
      {sortConfig.key === columnKey && sortConfig.type === columnType && ( sortConfig.direction === null ? 'sort' :
        sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
        
      )}
      
    </button>
  );
};

function WordWrap(sentence) {
  if(sentence != null){
      let panjang_kata = sentence.length;
      let wrap = sentence.substring(0,30);
      if(panjang_kata >= 30){
          return wrap +'...';
     } else{
         return sentence;
     }
  }else{

  }return "kosong";
  
  
}


