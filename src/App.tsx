import Table from "./components/permission-table/Table";
import {FormProvider} from "./context/FormContext";
import { permissions } from "./data/permision";
import { roles } from "./data/roles";

function App() {
  return (
    <>
      <FormProvider>
        <Table permision={permissions} roles={roles} />
      </FormProvider>
    </>
  );
}

export default App;
