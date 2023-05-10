import React, {useEffect, useState} from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    ":hover": {
      background:"LightGrey",
    }
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DataTable = ({rows,columns}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<[]>(rows);

  const handleChangePage = (_event: any, newPage: number) => {
    const startIndex = (newPage) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const visibleData = rows.slice(startIndex, endIndex)
    setPage(newPage);
    setData(visibleData)
  };

  const handleChangeRowsPerPage = (event: { target: { value: string | number; }; }) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    useEffect(() => {
      const fetchData = async () => {
        handleChangePage(null, 0)
        setData(rows)
      }
      fetchData();
  }, [rows]);

  return (
    <TableContainer component={Paper}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      border: "none",
      width: "100%",      
    }}
    className='ContainerTable'
    >
      <Table 
      sx={{
        maxWidth: 1200,
        minWidth: 1000,       
      }} 
      className='MasterTable'
      aria-label="customized table"
      >
      <TableHead className='HeadTable'>
        <TableRow className='RowTable'>
          {columns.map((column) => (
            <StyledTableCell align={column.align}>
              {column.headerName}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody className='Body1'>
        {data.length > 0 ? (
          data.map((row: any) => (
            <StyledTableRow key={row.id}>
              {columns.map((column) => (
                <StyledTableCell align={column.align}>
                  {row[column.field]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))
        ) : (
          <StyledTableRow>
            <StyledTableCell colSpan={columns.length} align="center">
              No se encontró ningún elemento
            </StyledTableCell>
          </StyledTableRow>
        )}
      </TableBody>
      </Table>
      <TableBody className='Body2'>
        <tr>
          <TablePagination
            className='Pagination'
            sx={{
              display: "flex",
              width: "100%",
              // backgroundColor: "#000"
            }} 
            rowsPerPageOptions={[10, 25, 50]}
            // component="div"
            labelRowsPerPage="Filas por página:"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> 
        </tr>
      </TableBody>
    </TableContainer>
  );
}

export default DataTable;