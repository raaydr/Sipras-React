import React, { useContext, useState } from 'react'
import {
    MaterialReactTable,
    createMRTColumnHelper,
    useMaterialReactTable,
  } from 'material-react-table';
  import { Box, Button,IconButton  } from '@mui/material';
  
  import FileDownloadIcon from '@mui/icons-material/FileDownload';
  import { jsPDF } from 'jspdf'; //or use your library of choice here
  import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
  import autoTable from 'jspdf-autotable';
  import { MenuItem } from '@mui/material';
  import { data } from './MakeData';
  
  
  const columnHelper = createMRTColumnHelper();
  
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      size: 40,
    }),
    columnHelper.accessor('firstName', {
      header: 'First Name',
      size: 120,
    }),
    columnHelper.accessor('lastName', {
      header: 'Last Name',
      size: 120,
    }),
    columnHelper.accessor('company', {
      header: 'Company',
      size: 300,
    }),
    columnHelper.accessor('city', {
      header: 'City',
    }),
    columnHelper.accessor('country', {
      header: 'Country',
      size: 220,
    }),
  ];

  
  const csvConfig = mkConfig({

    fieldSeparator: ',',
  
    decimalSeparator: '.',
  
    useKeysAsHeaders: true,
  
  });
  
  const PerlengkapanContent = () => {
    const [isCheckedOne, setCheckedOne] = useState(false);
  const [isCheckedZero, setCheckedZero] = useState(false);
  const [job_status  , setJob_status]= useState("");
  const handleCheckboxChangeOne = () => {
    setCheckedOne(!isCheckedOne);
    setJob_status(1);
    // Uncheck the other checkbox when this one is checked
    if (!isCheckedOne) {
      setCheckedZero(false);
    }
  };

  const handleCheckboxChangeZero = () => {
    setCheckedZero(!isCheckedZero);
    setJob_status(0);
    // Uncheck the other checkbox when this one is checked
    if (!isCheckedZero) {
      setCheckedOne(false);
    }
  };

    /**
     * 
     * const handleExportRows = (rows) => {
      const doc = new jsPDF();
      const tableData = rows.map((row) => Object.values(row.original));
      const tableHeaders = columns.map((c) => c.header);
  
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
      });
  
      doc.save('mrt-pdf-PerlengkapanContent.pdf');
    };
     */
    
    const handleExportRows = (rows) => {

        const rowData = rows.map((row) => row.original);
    
        const csv = generateCsv(csvConfig)(rowData);
    
        download(csvConfig)(csv);
    
      };
    
    
      const handleExportData = () => {
    
        const csv = generateCsv(csvConfig)(data);
    
        download(csvConfig)(csv);
    
      };
    
    
    const table = useMaterialReactTable({
      columns,
      data,
      enableRowSelection: true,
      columnFilterDisplayMode: 'popover',
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      enableRowActions: true,
      renderTopToolbarCustomActions: ({ table }) => (
        <MenuItem key="edit" onClick={() => console.info('Edit')}>

        Edit

      </MenuItem>,

      <MenuItem key="delete" onClick={() => console.info('Delete')}>

        Delete

      </MenuItem>,
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
          }}
        >
             <Button

            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)

            onClick={handleExportData}

            startIcon={<FileDownloadIcon />}

            >

            Export All Data

            </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Selected Rows
          </Button>
        </Box>
      ),
    });
  
    return <>
    <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">job_status</label>
                    <div className="inline-flex items-center m-2">
                        <input id="bordered-checkbox-1" type="checkbox"  checked={job_status === 1 ?true : isCheckedOne} onChange={handleCheckboxChangeOne} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hiring</label>
                    </div>
                    <div className="inline-flex items-center m-2">
                        <input defaultChecked id="bordered-checkbox-2" type="checkbox"  checked={job_status === 0 ?true : isCheckedZero} onChange={handleCheckboxChangeZero} name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="bordered-checkbox-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Closed</label>
                    </div>
                    
                </div>
    <MaterialReactTable table={table} />
    </>;
  };
  
  export default PerlengkapanContent;
  