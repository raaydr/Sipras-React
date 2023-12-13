import React, { useState } from 'react';

const TableWithDropdown = ({ dataArray }) => {
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibility = {};
    dataArray.forEach(item => {
      initialVisibility[item.key] = true; // Semua kolom ditampilkan secara default
    });
    return initialVisibility;
  });

  const handleCheckboxChange = key => {
    setColumnVisibility(prevVisibility => ({
      ...prevVisibility,
      [key]: !prevVisibility[key],
    }));
  };

  const visibleColumns = dataArray.filter(item => columnVisibility[item.key]);

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Pilih Kolom:</label>
        {dataArray.map(item => (
          <label key={item.key} className="mr-2">
            <input
              type="checkbox"
              checked={columnVisibility[item.key]}
              onChange={() => handleCheckboxChange(item.key)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">{item.label}</span>
          </label>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            {visibleColumns.map(item => (
              <th key={item.key}>{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataArray.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {visibleColumns.map(column => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PerlengkapanContent = () => {
  const dataArray = [
    { label: "No", key: "no", show: true },
    { label: "Id", key: "id", show: true },
    { label: "Nama Barang", key: "nama_barang", show: true },
    // ... tambahkan kolom lainnya
  ];

  return (
    <div>
      <TableWithDropdown dataArray={dataArray} />
    </div>
  );
};

export default PerlengkapanContent;
