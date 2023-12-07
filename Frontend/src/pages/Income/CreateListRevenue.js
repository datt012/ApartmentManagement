import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import axios from "../../setups/custom_axios";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from '@mui/icons-material/Close';
import SaveAsIcon from '@mui/icons-material/SaveAs';

const CreateListRevenue = ({ openModal, setOpenModal, dataHouseHold, setDataHouseHold }) => {
  useEffect(
    async () => {
      try {
        const response = await axios.get(`/ho-khau/danh-sach-ho-khau`);
        console.log(response);
        var list = response.data.map((value, index) => {
          return { id: index.toString(), maHoKhau: value.maHoKhau, dien: 0, nuoc: 0, internet: 0 };
        });
        setDataHouseHold(() => list);
        console.log(list);
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
      type: "number",
      editable: true,
    },
    {
      field: "nuoc",
      headerName: "Tiền nước",
      flex: 1,
      type: "number",
      editable: true,
    },
    {
      field: "internet",
      headerName: "Tiền internet",
      flex: 1,
      type: "number",
      editable: true,
    },
  ]);

  const processRowUpdate = (newRow) => {
    console.log(newRow);
    setDataHouseHold(dataHouseHold.map((item) => (item.id === newRow.id ? newRow : item)));
    return newRow;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    // setSnackbar({ children: error.message, severity: 'error' });
  }, []);

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
          getRowId={(row) => row.id}
          rows={dataHouseHold}
          columns={columns}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px" >
        <Button color="secondary" variant="contained" startIcon={<SaveAsIcon />}
          onClick={() => {
            if(window.confirm("Bạn chắc chắn muốn lưu?") == true) {
              setOpenModal(false);
            }
          }}>
          Lưu
        </Button>
      </Box>
    </DialogContent>
  </Dialog>;
}

export default CreateListRevenue;