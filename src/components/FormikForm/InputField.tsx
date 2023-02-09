import {TextField} from "@mui/material";
import {getIn, FieldProps} from "formik";

import CustomInputLabel from "./components/InputLabel";
import HelperTextRenderer from "./components/HelperTextRenderer";

interface InputFieldProps {
    // field: FieldProps;
    // form: FieldInputProps<any>,
    type?: string;
    nested?: boolean;
    disabled?: boolean;
    onChange?: Function;
    onBlur?: Function;
    wrapperClasses?: string;
    helperText?: string;
    className?: string;
    isRequired?: boolean;
    label?: JSX.Element | string;
    fullWidth?: boolean;
}

export default function InputField({
                                       field,
                                       form,
                                       type = "text",
                                       nested = false, //is it formik array (field array)
                                       disabled = false,
                                       wrapperClasses,
                                       helperText,
                                       onChange,
                                       onBlur,
                                       className,
                                       label = "",
                                       isRequired,
                                       ...props
                                   }:FieldProps & InputFieldProps) {
    // const {field} = formField;
    const {touched, errors, status} = form;


    let touch, err;
    if (nested) {
        touch = getIn(touched, field.name);
        err = getIn(errors, field.name);
    } else {
        touch = touched[field.name];
        err = errors[field.name];
    }

    if (err && status && status[field.name]) {
        const {[field.name]: remove, ...rest} = status;
        form.setStatus(rest);
    }

    if (isRequired) label = <CustomInputLabel text={label}/>;

    return (
        <>
            <div className={wrapperClasses}>
                <TextField
                    className={className}
                    disabled={disabled}
                    size="small"
                    type={type}
                    {...field}
                    error={(touch && err) || (status && status[field.name])}
                    helperText={touch && err}
                    label={label}
                    onChange={(e) => {
                        if (onChange) {
                            field.onChange(e);
                            onChange(e);
                        } else field.onChange(e);
                    }}
                    onBlur={(e) => {
                        if (onBlur) {
                            field.onBlur(e);
                            onBlur(e);
                        } else field.onBlur(e);
                    }}
                    {...props}

                />

                {!err && helperText && (
                    <HelperTextRenderer formField={field} helperText={helperText}/>
                )}
            </div>
        </>
    );
}
