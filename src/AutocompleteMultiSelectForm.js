import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const validationSchema = yup.object().shape({
    selectedOption: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required('Option is required'),
          value: yup.string().required('Option is required'),
        })
      )
      .min(1, 'Select at least one option')
      .required("Please select a option")
  });

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

function AutocompleteForm() {
  const formik = useFormik({
    initialValues: {
      selectedOption: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        id="selectedOption"
        options={options}
        getOptionLabel={(option) => option.label}
        onChange={(e, value) => formik.setFieldValue('selectedOption', value)}
        onBlur={formik.handleBlur}
        multiple
        value={formik.values.selectedOption}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select an option"
            variant="outlined"
            placeholder='placeholder'
            error={formik.touched.selectedOption && Boolean(formik.errors.selectedOption)}
            helperText={formik.touched.selectedOption && formik.errors.selectedOption}
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default AutocompleteForm;