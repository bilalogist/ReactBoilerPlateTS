import { Formik, getIn, FieldProps} from "formik";
import { FormHelperText } from "@mui/material";

interface propType {
  formField: any;
  helperText: string;
}

const HelperTextRenderer = ({ formField, helperText = "" }: propType) => {
  const { field, form } = formField;
  //   const { touched, errors, status } = form;
  let text = helperText;
  let color = "#5BC0DE";
  if (form.status && form.status[field.name]) {
    text = form.status[field.name];
    color = "#d32f2f";
  }
  const textProps = { color, paddingLeft: "0.75rem", marginBottom: "0.5rem" };
  if (text) {
    return (
      <FormHelperText sx={textProps} style={{ marginLeft: "14px " }}>
        {text}
      </FormHelperText>
    );
  }
  return null;
};

export default HelperTextRenderer;
