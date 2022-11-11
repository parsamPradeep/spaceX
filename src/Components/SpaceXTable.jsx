import * as React from "react";
import uuid from "react-uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

let SpaceXTable = ({ tableData, onRowClick }) => {
  let getLaunchStatus = (status, upcoming) => {
    if (upcoming) {
      return <Chip label="Upcoming" color="warning" variant="filled" />;
    } else if (status) {
      return <Chip label="Success" color="success" variant="filled" />;
    } else {
      return <Chip label="Error" color="error" variant="filled" />;
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, height: "600px" }} aria-label="simple table">
        <TableHead style={{ backgroundColor: "lightgrey" }}>
          <TableRow>
            <TableCell>No:</TableCell>
            <TableCell align="right">Launched&nbsp;(UTC)</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Mission</TableCell>
            <TableCell align="right">Orbit</TableCell>
            <TableCell align="right">Launch Status</TableCell>
            <TableCell align="right">Rocket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length == 0 && (
            <div style={{ textAlign: "center" }}>
              No results found for the specified filter
            </div>
          )}
          {tableData.map((row) => (
            <TableRow
              key={uuid()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => onRowClick()}
            >
              <TableCell component="th" scope="row">
                {row.flightNumber}
              </TableCell>
              <TableCell align="right">
                {new Date(row.launched).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.mission}</TableCell>
              <TableCell align="right">{row.orbit}</TableCell>
              <TableCell align="center">
                {getLaunchStatus(row.launchStatus, row.upcoming)}
              </TableCell>
              <TableCell align="right">{row.rocket}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SpaceXTable;
