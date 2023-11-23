import { useMemo, useState, useContext, useEffect } from "react";
import { Checkbox } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { PermisionModal } from "../modal/PermissionModal";
import { Rol } from "../../interfaces/rol";
import { filtrarPermisosPorEntidad } from "../../helpers/permisionEntitys";
import { checkPermission } from "../../helpers/xRender";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { formaterWords } from "../../helpers/formaterWords";
import { FormContext } from "../../context/FormContext";
import { extractEntityPermissions } from "../../helpers/extractEntityPermissions";
import { addPermissions } from "../../helpers/addPermisions";

const Table = ({ permision, roles }: { permision: string[]; roles: Rol[] }) => {
  const [dataRoles] = useState<Rol[]>(roles);

  const [entityAndPermisions, setEntityAndPermisions] = useState(
    extractEntityPermissions(dataRoles)
  );
  const { formFields } = useContext(FormContext);

  useEffect(() => {
    if (formFields.entity.length > 0) {
      const updatedEntityAndPermisions = addPermissions(
        formFields.entity,
        formFields.permision,
        entityAndPermisions
      );

      setEntityAndPermisions(updatedEntityAndPermisions);
    }
  }, [formFields.permision, formFields.entity]);

  const columns = useMemo<MRT_ColumnDef<Rol>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Rol",
        size: 200,

        Cell: ({ row }: any) => (
          <Box
            sx={{
              height: "40px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              position: "relative",
              "&:hover .checkbox": {
                display: "block",
              },
            }}
          >
            <Checkbox
              size="small"
              sx={{
                display: "none",
              }}
              className="checkbox"
            />
            <Box sx={{ cursor: "pointer" }}>{row.original.name}</Box>
            <DeleteIcon
              sx={{
                display: "none",
                position: "relative",
              }}
              className="checkbox"
            />
          </Box>
        ),
      },

      ...entityAndPermisions.map(({ entity }) => ({
        accessorKey: `${entity}`,
        header: `${entity}`,
        size: 300,
        Header: () => (
          <Box
            sx={{
              height: "40px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4rem",
              position: "relative",
              "&:hover .checkbox": {
                display: "block",
              },
            }}
          >
            <Checkbox
              size="small"
              sx={{
                display: "none",
              }}
              className="checkbox"
            />
            <Box sx={{ cursor: "pointer" }}>{formaterWords(entity)}</Box>
            <DeleteIcon sx={{ display: "none" }} className="checkbox" />
          </Box>
        ),

        columns: [
          ...filtrarPermisosPorEntidad(entity, entityAndPermisions).map(
            (permiso) => ({
              header: `${entity.slice(0, 3)}-${permiso}`,

              size: 250,
              Header: () => (
                <Box
                  sx={{
                    height: "40px",
                    width: "230px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    position: "relative",
                    "&:hover .checkbox": {
                      display: "block",
                    },
                  }}
                >
                  <Checkbox
                    size="small"
                    sx={{
                      display: "none",
                    }}
                    className="checkbox"
                  />
                  <Box sx={{ cursor: "pointer" }}>
                    {formaterWords(
                      `${entity.slice(0, 2)}-${permiso.replace("_", " ")}`
                    )}
                  </Box>
                  <DeleteIcon sx={{ display: "none" }} className="checkbox" />
                </Box>
              ),
              Cell: ({ row }: any) => {
                const name = row.original.name;

                return (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                      }}
                    >
                      {checkPermission(entity, permiso, roles, name) ? (
                        <CloseIcon sx={{ color: "red" }} />
                      ) : (
                        ""
                      )}
                    </Box>
                  </>
                );
              },
            })
          ),
        ],
      })),
      {
        header: "Add Permission",
        size: 150,
        Header: () => <PermisionModal permission={permision} />,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: dataRoles,
    enableColumnActions: false,
    enablePagination: false,
  });

  return (
    <>
      <MaterialReactTable table={table} />{" "}
    </>
  );
};

export default Table;
