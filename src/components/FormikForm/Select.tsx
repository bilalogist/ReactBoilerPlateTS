import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, FormHelperText, SelectProps} from '@mui/material';
import {FieldProps, getIn} from 'formik';

//components
import CustomInputLabel from "./components/InputLabel";
import HelperTextRenderer from "./components/HelperTextRenderer";


interface CustomSelectProps {
    nested?: boolean;
    wrapperClasses?: string;
    helperText?: string;
    isRequired?: boolean;
    onSelect?: (e:any)=>void;
    options?: { key: string | number; value: string }[]
}

export default function SelectField({
                                        field,
                                        form,
                                        label=" ",
                                        nested = false, //is it formik array (field array)
                                        disabled = false,
                                        options,
                                        wrapperClasses,
                                        helperText,
                                        onSelect,
                                        isRequired,
                                        ...props
                                    }: FieldProps & SelectProps & CustomSelectProps) {
    const {touched, errors, status, setFieldValue } = form;

    let touch, err;

    if (nested) {
        touch = getIn(touched, field.name);
        err = getIn(errors, field.name);
    } else {
        touch = touched[field.name];
        err = errors[field.name];
    }


    if (isRequired) label = <CustomInputLabel text={label} />

    return (
        <div className={wrapperClasses}>
            <FormControl
                className={props.className}
                disabled={disabled}
                size="small"
                fullWidth
                // error={(touched[field.name] && errors[field.name]) || (status && status[field.name])}
                error={(touch && err) || (status && status[field.name])}
            >
                <InputLabel id={`select-label-${label}`}>{label}</InputLabel>

                <Select
                    // className={disabled ? 'muted-input' : ''}
                    name={field.name}
                    labelId={`select-label-${label}`}
                    id={`select-${label}`}
                    label={label}
                    value={field.value}
                    onChange={(e) => {
                        setFieldValue(field.name, e.target.value);
                        onSelect && onSelect(e);
                    }}
                    {...props}
                >
                    {options?.map((opt) => (
                        <MenuItem value={opt.key} key={opt.key}>
                            {opt.value}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {!err && helperText && (
                <HelperTextRenderer formField={field} helperText={helperText}/>
            )}
            {err && touch && <FormHelperText sx={{color: '#d32f2f'}}>{err}</FormHelperText>}
        </div>
    );
}

