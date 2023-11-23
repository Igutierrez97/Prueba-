import { useContext, useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { PermissionSelect } from "../select/PermissionSelect";
import { FormContext } from "../../context/FormContext";
import AlertsComponents from "../alert/AlertComponents";

export const PermissionForm = ({
  permission,
  onClose,
}: {
  permission: string[];
  onClose: () => void;
}) => {
  const { setFormFields } = useContext(FormContext);
  const [entityValue, setEntityValue] = useState("");
  const [selectedPermission, setSelectedPermission] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handlePermissionChange = (selectedOption: string) => {
    setSelectedPermission(selectedOption);
  };
  const handleSubmit = () => {
    const isEntityValueEmpty = entityValue.trim() === "";
    const isEntityValueLowerCase = entityValue !== entityValue.toUpperCase();
    const isPermissionSelected = selectedPermission === "";
    if (isEntityValueEmpty) {
      showAlertMessage("Entity value cannot be empty");
    } else if (isEntityValueLowerCase) {
      showAlertMessage("Entity value cannot be lower case");
    } else if (isPermissionSelected) {
      showAlertMessage("Select permission");
    } else {
      setFormFields((prevFormFields) => ({
        ...prevFormFields,
        entity: entityValue.toUpperCase(),
        permission: selectedPermission,
      }));
      onClose();
    }
  };
  const showAlertMessage = (message: string) => {
    setShowAlert(true);
    setAlertMessage(message);
  };
  return (
    <>
      <Box sx={{ marginY: "0.5rem" }}>
        {showAlert && (
          <AlertsComponents>
            <p>{`${alertMessage}`}</p>
          </AlertsComponents>
        )}
      </Box>

      <FormControl sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <PermissionSelect
          permission={permission}
          onChange={handlePermissionChange}
        />
        <TextField
          placeholder="Entity"
          variant="outlined"
          sx={{ flexGrow: 1, height: "100%", width: "100%" }}
          value={entityValue}
          onChange={(event) => setEntityValue(event.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Ok
        </Button>
      </FormControl>
    </>
  );
};
