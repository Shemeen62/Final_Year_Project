import React, { useEffect, useState } from "react";
import Finnhub from "../apis/Finnhub";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

export const TickerDetails = ({ symbol }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Finnhub.get("/stock/profile2", {
          params: {
            symbol
          }
        });
        if (isMounted) {
          setStockData(responses.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [symbol]);

  if (!stockData) {
    return null; // Return null or loading indicator if stockData is not available yet
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#231f22",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "black",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#231f22",
      },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(title, middle ,content) {
    return { title, middle ,content };
  }

  const rows = [
    createData('Ticker', "    ", stockData.ticker),
    createData('Name', "    ", stockData.name),
    createData('Country', "    ", stockData.country),
    createData('Currency', "    ", stockData.currency),
    createData('Exchange', "    ", stockData.exchange),
    createData('Industry', "    ", stockData.finnhubIndustry),
    createData('IPO', "    ", stockData.ipo),
    createData('LOGO', "    ", stockData.logo),
    createData('Market Capitalization', "    ", stockData.marketCapitalization),
    createData('Share Outstanding', "    ", stockData.shareOutstanding),
    createData('URL', "    ", stockData.weburl)
  ];

  return (
    <div className="card-container-details">
    <h2>{symbol} Details</h2>
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <TableContainer component={Paper} sx={{ width: '85%', maxWidth: 1000 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  <Typography style={{fontFamily:"Poppins", fontWeight:"bold", paddingLeft:20, color: "white"}} variant="body1">{row.title}</Typography>
                </StyledTableCell>
                <StyledTableCell style={{fontFamily:"Poppins"}} align="left">{row.middle}</StyledTableCell>
                <StyledTableCell style={{fontFamily:"Poppins", paddingLeft:120, color: "white"}} align="left">{row.content}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
  );
};
