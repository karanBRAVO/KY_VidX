"use client";

import * as React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { NotAuthenticated, Wait } from "@/ui/ComponentExporter";
import { useSession } from "next-auth/react";

// icons
import TableChartIcon from "@mui/icons-material/TableChart";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Studio = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Container className="min-h-screen mt-[130px]" maxWidth={false}>
        {status === "loading" ? (
          <>
            <div className="w-full flex items-center justify-center">
              <Wait />
            </div>
          </>
        ) : status === "authenticated" ? (
          <>
            <Typography
              variant="h4"
              component={"h1"}
              className="text-white my-3 p-1 flex flex-row items-center gap-3 justify-start w-full"
            >
              <TableChartIcon className="text-white font-black text-4xl" />
              Studio
            </Typography>

            <TableContainer
              component={Paper}
              className="bg-black border-white border-[1px] border-solid"
            >
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
                className="bg-zinc-900 text-white"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className="text-white">Video ID</TableCell>
                    <TableCell align="right" className="text-white">
                      Visibility
                    </TableCell>
                    <TableCell align="right" className="text-white">
                      Views
                    </TableCell>
                    <TableCell align="right" className="text-white">
                      Likes
                    </TableCell>
                    <TableCell align="right" className="text-white">
                      Upload Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="text-zinc-200">
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="text-zinc-200 hover:bg-zinc-950"
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className="text-zinc-300"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right" className="text-zinc-300">
                        {row.calories}
                      </TableCell>
                      <TableCell align="right" className="text-zinc-300">
                        {row.fat}
                      </TableCell>
                      <TableCell align="right" className="text-zinc-300">
                        {row.carbs}
                      </TableCell>
                      <TableCell align="right" className="text-zinc-300">
                        {row.protein}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <>
            <div className="w-full flex items-center justify-center">
              <NotAuthenticated />
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Studio;
