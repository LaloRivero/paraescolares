import React, { useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import * as yup from 'yup'
import { Field, Form, Formik } from "formik"
import AppContext from '../Lib/AppContext'
import { logo } from '../utils/constants'

import {
  Button,
  TextField,
} from "@material-ui/core"

import {
  Card,
  CardContent,
  Container,
  Typography,
} from "@material-ui/core"

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const validationSchema = yup.object({
  username: yup.string().required('Ingresa un username válido'),
  password: yup.string().required('Ingresa una contraseña')
})

const Login = ({
  doLoginUser,
  requestError
}) => {
  const classes = useStyles()

  const initialValues = {
    username: '',
    password: '',
  }
  const handleSubmit = async (values, {resetForm}) =>{
    await doLoginUser(values)
    resetForm({...initialValues})
  }
  return (
    <div className={classes.appBackground}>
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
          <Card className={classes.loginCardContainer}>
            <CardContent className={classes.loginCardContent}>
              <img className={classes.formFullLogo} src={logo} alt="logo"/>
              <Form className={classes.formContainer}>
                <Typography className={classes.loginFormTitle}>Inicia Sesión</Typography>
                {requestError ? (
                  <Typography className={classes.validateError}>{`Lo sentimos, ${requestError.toLowerCase()}`}</Typography>
                ) : null}
                <Field
                  id="username"
                  label="Usuario"
                  variant="filled"
                  value={values.username || ''}
                  className={classes.formInput}
                  sx={{width: '80%'}}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //onClick={() => setError(null)}
                  component={TextField}
                  error={Boolean(errors.username && touched.username && errors.username)}
                  helperText={errors.username && touched.username && errors.username}
                />
                <Field
                  id="password"
                  type="password"
                  label="Contraseña"
                  variant="filled"
                  value={values.password || ''}
                  className={classes.formInput}
                  sx={{width: '80%'}}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  //onClick={() => setError(null)}
                  component={TextField}
                  error={Boolean(errors.password && touched.password && errors.password)}
                  helperText={errors.password && touched.password && errors.password}
                />
                <Button
                  type="submit"
                  className={classes.submitLoginFormButton}
                  disabled={isSubmitting}
                  variant="contained"
                  color="inherit"
                >
                  Iniciar Sesion
                </Button>
              </Form>
            </CardContent>
          </Card>
        )}}
      </Formik>
    </div>
  )
}

const Wrapped = () => {
  const {
    doLoginUser,
    requestError,
  } = useContext(AppContext)
  const classes = useStyles()
  return (
    <>
      <Container className={classes.selectionContainer}>
        <Login
          doLoginUser={doLoginUser}
          requestError={requestError}
        />
      </Container>
    </>
  )
}

const Memoized = React.memo(Wrapped)
export default Memoized