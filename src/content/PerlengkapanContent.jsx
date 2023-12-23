import React from 'react'
import TablePerlengkapan from '../components/TablePerlengkapan';
import PerlengkapanModal from '../components/ModalPerlengkapan';
export default function PerlengkapanContent() {

  const dataArray = [
    { label: "No", key: "no", show: true, type: false},
    { label: "Nama Barang", key: "nama_barang", show: true, type: "string"},
    { label: "Kode Perlengkapan", key: "kode_perlengkapan", show: true, type: "string"},
    { label: "Tipe Barang", key: "tipe_barang", show: true, type: "string"},
    { label: "Jumlah", key: "jumlah_perlengkapan", show: true, type: "number"},
    { label: "Lokasi", key: "lokasi_perlengkapan", show: true, type: "string"},
    { label: "Departemen", key: "departemen", show: true, type: "string"},
    { label: "Kondisi", key: "kondisi_perlengkapan", show: true, type: "string"},
    { label: "Tanggal Pembelian", key: "tanggal_pembelian", show: true, type: "string"},
    { label: "User Name", key: "user_name", show: true, type: "string"},
    { label: "EditedBy Name", key: "editedBy_name", show: true, type: "string"},
    { label: "Action", key: "action", show: true, type: false},
    
  ];
  return (
    <div>
      <PerlengkapanModal/>
      <TablePerlengkapan dataArray={dataArray} url={"/api/data-perlengkapan"}/>
    </div>
  )
}
