import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, IconButton, MenuItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import axios from "../../setups/custom_axios";
import { DataGrid, GridToolbar, GridRowModel } from "@mui/x-data-grid";
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const CreateListRevenue = ({ openModal, setOpenModal, listHouseHold, setListHouseHold }) => {
  const [dataHouseHold, setDataHouseHold] = useState([]);
  useEffect(
    async () => {
      try {
        const response = await axios.get(`/ho-khau/danh-sach-ho-khau`);
        console.log(response);
        var list = response.data.map((value) => {
          console.log(value.maHoKhau);
          return { maHoKhau: value.maHoKhau, dien: 0, nuoc: 0, internet: 0 };
        });
        setDataHouseHold(() => list);
      } catch (error) {
        console.log(error);
      }

      return
    }, []);

  const columns = useMemo(() => [
    { field: "maHoKhau", headerName: "Mã hộ khẩu", flex: 0.5 },
    {
      field: "dien",
      headerName: "Tiền điện",
      flex: 1,
      editable: true,
    },
    {
      field: "nuoc",
      headerName: "Tiền nước",
      flex: 1,
      editable: true,
    },
    {
      field: "internet",
      headerName: "Tiền internet",
      flex: 1,
      editable: true,
    },
  ]);

  const processRowUpdate = React.useCallback(async (newRow) => {
    console.log(newRow);
    setDataHouseHold(newRow);
    return newRow;
  }, [dataHouseHold]);
  return <Dialog open={openModal} maxWidth="md" style={{ backgroundColor: "transparent" }}>
    <DialogTitle>
      <div style={{ display: 'flex' }}>
        <Typography variant="h6" component="div" style={{ flexGrow: 1, fontSize: 20, fontWeight: "bold" }}>
          {"THÊM KHOẢN THU CÁC HỘ"}
        </Typography>
        <IconButton aria-label="close" onClick={() => {
          setOpenModal(!openModal)
        }}>
          <CloseIcon />
        </IconButton>
      </div>
    </DialogTitle>
    <DialogContent dividers>
      <Box m="20px" sx={{
        height: '50vh', width: 700,
        "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
          "margin-top": "1em",
          "margin-bottom": "1em"
        }
      }}>
        <DataGrid
          getRowId={(row) => row.maHoKhau}
          rows={dataHouseHold}
          columns={columns}
          processRowUpdate={processRowUpdate}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px" >
        <Button color="secondary" variant="contained" startIcon={<SaveAsIcon />}
          onClick={() => { console.log(dataHouseHold) }}>
          Lưu
        </Button>
      </Box>
    </DialogContent>
  </Dialog>;
}

export default CreateListRevenue;