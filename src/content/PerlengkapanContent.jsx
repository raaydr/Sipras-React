import React from 'react'
import AutoTable from '../components/AutoTable'
export default function PerlengkapanContent() {

  const dataArray = [
    { label: "No", key: "no", show: true, type: false},
    { label: "Nama Barang", key: "nama_barang", show: true, type: "string"},
    { label: "Kode Barang", key: "kode_barang", show: true, type: "string"},
    { label: "Tipe Barang", key: "tipe_barang", show: true, type: "string"},
    { label: "Jumlah", key: "jumlah", show: true, type: "number"},
    { label: "Rusak", key: "rusak", show: true, type: "number"},
    { label: "User Name", key: "user_name", show: true, type: "string"},
    { label: "EditedBy Name", key: "editedBy_name", show: true, type: "string"},
    { label: "Action", key: "action", show: true, type: false},
    
  ];
  return (
    <div>
      <AutoTable dataArray={dataArray} url={"/api/data-barang"}/>
    </div>
  )
}
