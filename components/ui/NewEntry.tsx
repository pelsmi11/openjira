import React, { ChangeEvent, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useEntriesContext, useUIContext } from "../../hooks";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useEntriesContext();
  const { setIsAddingEntry, isAddingEntry } = useUIContext();

  const onTextFieldChanges = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSave = () => {
    if (inputValue.trim().length === 0) return;

    addNewEntry(inputValue.trim());
    setInputValue("");
    setTouched(false);
    setIsAddingEntry(!isAddingEntry);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            error={inputValue.trim().length <= 0 && touched}
            value={inputValue}
            onBlur={() => setTouched(true)}
            onChange={onTextFieldChanges}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="text"
              onClick={() => setIsAddingEntry(!isAddingEntry)}
            >
              cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(!isAddingEntry)}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
