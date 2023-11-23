
import { createContext, useContext, useState } from "react";

interface Children{
  children: JSX.Element | JSX.Element[];
};

// Define los tipos para los campos del formulario
type FormFields = {
  permision: string;
  entity: string;
};

// Define el tipo para el contexto
type FormContextType = {
  formFields: FormFields;
  setFormFields: React.Dispatch<React.SetStateAction<FormFields>>;
};

// Crea el contexto
export const FormContext = createContext<FormContextType>({
  formFields: {
    permision: "",
    entity: "",
  },
  setFormFields: () => {},
});

// Crea el proveedor del contexto
export const FormProvider = ({ children }: Children) => {
  const [formFields, setFormFields] = useState<FormFields>({
    permision: "",
    entity: "",
  });

  console.log(formFields);
  return (
    <FormContext.Provider value={{ formFields, setFormFields }}>
      {children}
    </FormContext.Provider>
  );
};

// Crea un hook personalizado para acceder al contexto
export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext debe ser utilizado dentro de un FormProvider");
  }
  return context;
};