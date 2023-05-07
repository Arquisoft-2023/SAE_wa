import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
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
  return (
    <TableContainer component={Paper}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none"
    }}
    >
      <Table 
      sx={{
        maxWidth: 1000,
        minWidth: 700
      }} 
      aria-label="customized table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell align={column.align}>
              {column.headerName}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
        <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.id}>
            {columns.map((column) => (
              <StyledTableCell align={column.align} key={column.field}>
                {row[column.field]}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;