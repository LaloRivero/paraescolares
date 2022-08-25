import React, { useContext } from 'react'
import {
  Button,
  TextField,
} from "@material-ui/core"
import { Field, Form, Formik } from "formik"
import * as yup from 'yup'
import { makeStyles } from "@material-ui/core/styles"
import AppContext from '../Lib/AppContext'

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const validationSchema = yup.object({
  nombres: yup.string().required('Nombres es un campo requerido'),
  apellido_paterno: yup.string().required('Apellido paterno es un campo requerido'),
  apellido_materno: yup.string(),
  matricula: yup.string(),
})

const StudentValidateForm = () => {
  const classes = useStyles()
  const {
    doClearRequestError,
    doValidateStudent,
    doSaveStudentFormValues
  } = useContext(AppContext)
  const initialValues = {
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    matricula: ''
  }
  const handleSubmit = async (values, { resetForm }) => {
    await doValidateStudent(values)
    doSaveStudentFormValues(values)
    resetForm({ ...initialValues })
  }

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting
      }) => {
        return (
          <Form className={classes.formContainer}>
            <Field
              id="nombres"
              label="Nombres"
              variant="filled"
              value={values.nombres || ''}
              className={classes.formInput}
              sx={{width: '80%'}}
              onChange={handleChange}
              onBlur={handleBlur}
              onClick={() => doClearRequestError()}
              component={TextField}
              error={Boolean(errors.nombres && touched.nombres && errors.nombres)}
              helperText={errors.nombres && touched.nombres && errors.nombres}
            />
            <Field
              id="apellido_paterno"
              label="Apellido Paterno"
              variant="filled"
              value={values.apellido_paterno || ''}
              className={classes.formInput}
              sx={{width: '80%'}}
              onChange={handleChange}
              onBlur={handleBlur}
              onClick={doClearRequestError}
              component={TextField}
              error={Boolean(errors.apellido_paterno && touched.apellido_paterno && errors.apellido_paterno)}
              helperText={errors.apellido_paterno && touched.apellido_paterno && errors.apellido_paterno}
            />
            <Field
              id="apellido_materno"
              label="Apellido Materno"
              variant="filled"
              value={values.apellido_materno || ''}
              className={classes.formInput}
              sx={{width: '80%'}}
              onChange={handleChange}
              onBlur={handleBlur}
              onClick={doClearRequestError}
              component={TextField}
              error={Boolean(errors.apellido_materno && touched.apellido_materno && errors.apellido_materno)}
              helperText={errors.apellido_materno && touched.apellido_materno && errors.apellido_materno}
            />
            <Field
              id="matricula"
              label="Matrícula"
              variant="filled"
              value={values.matricula || ''}
              className={classes.formInput}
              sx={{width: '80%'}}
              onChange={handleChange}
              onBlur={handleBlur}
              onClick={doClearRequestError}
              component={TextField}
              error={Boolean(errors.matricula && touched.matricula && errors.matricula)}
              helperText={errors.matricula && touched.matricula && errors.matricula}
            />
            <Button
              type="submit"
              className={classes.submitFormButton}
              disabled={isSubmitting}
              variant="contained"
              color="inherit"
            >
              Buscar
            </Button>
          </Form>
          )
        }}
      </Formik>
  )
}

const Memoized = React.memo(StudentValidateForm)
export default Memoized
