import React, { useState,useEffect,useRef } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import useBarangContext from "../context/BarangContext";
import { useToast, immediateToast } from "izitoast-react";
import { jsPDF } from 'jspdf'; //or use your library of choice here
import { CSVLink } from 'react-csv';



export default function TableBarang () {

const componentPDF = useRef()
const [data, setData] = useState([])
const [searchResults, setSearchResults] = useState([]);
const [search, setSearch] = useState({})
const [searchTerm, setSearchTerm] = useState("");

const [page, setPage] = useState(1);
const [pageData, setPageData] = useState(10);
const [dataPerPage, setDataPerPage] = useState("");
const [tableRange, setTableRange] = useState([]);
const [headers, setHeaders] = useState([]);
const [slice, setSlice] = useState([]);

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
  fetchStatus, setFetchStatus, setCurrentId,
  navigate,deletedata,isMenuOpen, setMenuOpen
} = useBarangContext();

const fetchData =  () => {
    const token = Cookies.get('tokenku')
     axios.get("/api/data-barang",{ headers: {"Authorization" : `Bearer ${token}`} })
      .then((res) => {
        setData([...res.data.data])
        
      })
      .catch((error) => {
      })
  };

useEffect(() => {
  //fetch data dengan kondisi
  
  
  if (fetchStatus === true) {
    
    fetchData()
    
  }
  setFetchStatus(false)

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
  const result = results.filter(
    (item) =>
    (item.nama_barang && item.nama_barang.toLowerCase().includes(searchNamaBarang.toLowerCase()))&&
    (item.kode_barang && item.kode_barang.toLowerCase().includes(searchKode.toLowerCase()))&&
    (item.tipe_barang && item.tipe_barang.toLowerCase().includes(searchTipeBarang.toLowerCase()))&&
    (item.jumlah.toString().includes(searchJumlah))&&
    (item.rusak.toString().includes(searchRusak))
    
  );
  
  setSearchResults(result);
  // Sort the data when the sortConfig changes
  const sortedData = result.sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // You may need to customize this comparison based on the data type of the column
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      
      if(sortConfig.type === "number"){
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }else{

        const regex = /(\d+)$/; // Regex untuk mengekstrak angka di belakang string

        const aMatch = aValue.match(regex);
        const bMatch = bValue.match(regex);

        // Pastikan kedua string memiliki format angka di belakangnya
        if (aMatch && bMatch) {
          const aNumber = parseInt(aMatch[0], 10);
          const bNumber = parseInt(bMatch[0], 10);

          return sortConfig.direction === 'asc' ? aNumber - bNumber : bNumber - aNumber;
        }

        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        
      }
      
    }
    return 0;
  });

  setSearchResults(sortedData);

  const headers = []
  const uniqueKeys = [...new Set(data.flatMap(item => Object.keys(item)))];
  for (let i = 0; i < uniqueKeys.length; i++) {
    headers.push({
      label: uniqueKeys[i].toUpperCase().replace(/ /g, '_'),
      key: uniqueKeys[i],
    });
  }

  
  setHeaders(headers)
  const range = calculateRange(sortedData,pageData);
  setTableRange([...range]);

  const slice = sliceData(sortedData, page, pageData);
  setSlice([...slice]);

  
}, [searchTerm, search, data, sortConfig,page,pageData]);

useEffect(() => {
  if (slice.length < 1 && page !== 1) {
    setPage(page - 1);
  }
}, [slice, page, setPage]);

const handleSort = (key,type) => {
  let direction = 'asc';

  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }

  setSortConfig({ key, direction,type });
};

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
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
  setMenuOpen(true);

  setCurrentId(idData)
}

const openMenu = () => {
    
  setMenuOpen(true);
  setCurrentId(-1)
};

const dataPage = (value) => {
  if(value !=="" && value !==null && value != 0){
    if (/^\d+$/.test(value)) {
      setPageData(value)
      setDataPerPage(value)
    }
  }else{
    setDataPerPage(value)
  }
};

const Halaman = () => {
  const min = parseInt(((page -1) * pageData)+1);
  const max = (parseInt(min) + 1)+ parseInt(pageData);
  
  const maxx = max > searchResults.length ? searchResults.length : max ;
  
  return(
      <>
        <span className="font-semibold text-gray-900 dark:text-white">{min+'-'+maxx}</span>
      </>)
};

const generatePDF =  () => {
  const doc = new jsPDF({ orientation: "landscape" });

  doc.autoTable({
    html: "#my-table",
  });

  

  doc.save("mypdf.pdf");
};

const Pagination = ({tableRange,page}) =>{
  const pagination = [];
  const visiblePages = 4;
  const totalPages = tableRange.length

  console.log(tableRange.length)
    if (tableRange.length <= visiblePages+1 ) {
      // Jika total halaman kurang dari atau sama dengan jumlah halaman yang terlihat
      return(
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {tableRange.map((el, index) => (
              
              <li key={el}>
                <button   onClick={() => setPage(el)} className="flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
                >{el}</button>
              </li>
              )
              )}
          </ul>
      )
    } else {
      // Menentukan posisi awal dan akhir halaman yang terlihat
      let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
      let endPage = Math.min(totalPages, startPage + visiblePages - 1);
  
      // Menambahkan titik-titik di sebelah kiri jika perlu
      if (startPage > 1) {
        pagination.push(1);
        if (startPage > 2) {
          pagination.push('...');
        }
      }
  
      // Menambahkan halaman yang terlihat
      for (let i = startPage; i <= endPage; i++) {
        pagination.push(i);
      }
  
      // Menambahkan titik-titik di sebelah kanan jika perlu
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pagination.push('...');
        }
        pagination.push(totalPages);
      }
    
      return(
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            {pagination.map((el, index) => (
              <li key={index}>
                 {el === '...' ? (
                    // Render the button without onClick for '...'
                    <button
                      
                      className="flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      {el}
                    </button>
                  ) : (
                    // Render the button with onClick for other page numbers
                    <button
                      onClick={() => setPage(el)}
                      className="flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      {el}
                    </button>
                  )}
              </li>
              )
              )}
        </ul>
      )
    }
  
    
}

  return (
    <>
      <div className="container mx-auto">
      <div className="flex items-center">
  <h5 className="text-xl font-bold dark:text-white m-5">List Barang</h5>
  
  <button
    type="button" onClick={openMenu}
    className="flex focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Create Barang
  </button>
  <button
    type="button" onClick={generatePDF}
    className="flex focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
  >
    PDF
  </button>
  <button
    type="button" 
    className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
  >
    <CSVLink data={searchResults} headers={headers} filename={'exported-data.csv'}>
          CSV
        </CSVLink>
  </button>
    
  <input
    type="text"
    id="search"
    name="search"
    className="flex-grow items-end text-center m-5 px-1 py-3 font-small text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
    placeholder="pencarian"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <div className="flex flex-col items-center flex-column" aria-label="Table navigation">
  <p className="text-xs font-bold dark:text-white">Data Per Page</p>
  <input
    type="text"
    id="search"
    name="search"
    className="items-end text-center m-1 px-1 py-1 font-small text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
    placeholder="data"
    value={dataPerPage}
    onChange={(e) => dataPage(e.target.value)}
  />
  </div>
  
</div>

        
            
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg"  ref={componentPDF}>
          <table id="my-table" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-purple-500 dark:bg-purple-500 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                No
                
                </th>
                <th scope="col" className="px-6 py-3">
                <input
                type="text"
                value={searchNamaBarang}
                onChange={(e) => {
                  setsearchNamaBarang(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                
                />
                <SortableHeader
                  columnKey="nama_barang"
                  columnType="string"
                  sortConfig={sortConfig}
                  name="Barang"
                  onSort={handleSort}
                />
                
                
                </th>
                <th scope="col" className="px-6 py-3">
                <input
                type="text"
                value={searchKode}
                onChange={(e) => {
                  setsearchKode(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search"
                
                />
                <SortableHeader
                  columnKey="kode_barang"
                  columnType="string"
                  sortConfig={sortConfig}
                  name="Kode"
                  onSort={handleSort}
                />
                
                </th>
                <th scope="col" className="px-6 py-3">
                <input
                type="text"
                value={searchTipeBarang}
                onChange={(e) => {
                  setsearchTipeBarang(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                
                />
                <SortableHeader
                  columnKey="tipe_barang"
                  columnType="string"
                  name="Tipe"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                
                </th>
                <th scope="col" className="px-6 py-3">
                <input
                type="text"
                value={searchJumlah}
                onChange={(e) => {
                  setsearchJumlah(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search"
                
                />
                <SortableHeader
                  columnKey="jumlah"
                  columnType="number"
                  name="Jumlah"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                
                </th>
                <th scope="flex" className="px-6 py-3">
                <input
                type="text"
                value={searchRusak}
                onChange={(e) => {
                  setsearchRusak(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search"
                
                />
                <SortableHeader
                  columnKey="rusak"
                  columnType="number"
                  name="Rusak"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                
                
                </th>
                <th scope="col" className="px-6 py-3">
                <input
                type="text"
                value={searchCreated}
                onChange={(e) => {
                  setsearchCreated(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search"
                
                />
                <SortableHeader
                  columnKey="user_name"
                  columnType="string"
                  name="Created"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                
                
                </th>
                <th scope="col" className="px-6 py-3">
                <input
                type="text"
                value={searchEdited}
                onChange={(e) => {
                  setsearchEdited(e.target.value)
                  handleSearch(e.target.value)
                  }
                }
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="search"
                
                />
                <SortableHeader
                  columnKey="editedBy_name"
                  columnType="string"
                  name="Edited"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                
                </th>
                
                <th scope="col" className="px-6 py-3">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
            {slice.length > 0 ? (
          // Menampilkan hasil pencarian jika ditemukan
          slice.map((res,Index) => (
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
                  <button onClick={handleEdit} value={res.id} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Edit</button>
                  <button onClick={handleDelete} value={res.id} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                </td>
              </tr>
              ))
            ) : (
              // Menampilkan pesan tidak ditemukan jika tidak ada hasil
              <tr className="flex-grow  items-center text-center justify-center w-full">
              <td colSpan="10" className="px-1 py-3 text-base font-small">
                Job Not Found
              </td>
            </tr>


              
            )}
            </tbody>
          </table>
          <div className="flex flex-col items-center flex-column px-6 py-5  justify-center pt-4" aria-label="Table navigation">
            <Pagination tableRange={tableRange} page={page}/>
            <span className="items-start justify-center pt-4 text-sm font-normal items-left text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <Halaman/> of <span className="font-semibold text-gray-900 dark:text-white">{searchResults.length}</span></span>
          </div>

        </div>
      </div>
    </>
  )
}

// SortableHeader component
const SortableHeader = ({columnKey,columnType, sortConfig, onSort,name }) => {
  const handleClick = () => {
    onSort(columnKey,columnType);
  };

  return (
    <button className=" py-3 text-base m-1 font-medium text-center focus:outline-none text-white  bg-purple-500 hover:bg-purple-500 focus:ring-4 focus:ring-purple-500 rounded-lg dark:focus:ring-green-900" onClick={handleClick}> {name}
      {sortConfig.key === columnKey && sortConfig.type === columnType && ( sortConfig.direction === null ? name :
        sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
        
      )}
      
    </button>
  );
};



