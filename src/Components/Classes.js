import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Field, Form, Formik } from "formik"
import { logo } from '../utils/constants'
import DataTable from "react-data-table-component"
import * as yup from 'yup'
import AppContext from '../Lib/AppContext'


import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  InputLabel,
  Typography,
  TextField,
  Select,
  MenuItem
} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const DeleteButton = (data) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const classes = useStyles()
  const {
    doDeleteClass,
    doParaescolaresFetch,
    isLoading
  } = useContext(AppContext)
  const handleDeleteClass = async () => {
    await doDeleteClass({nombre: data.nombre, turno: data.turno})
    await doParaescolaresFetch()
    setDialogOpen(false)
  }
  const handleClose = () => {
    setDialogOpen(false)
  }
  return (
    <>
      {isDialogOpen ? (
        <Dialog
          open={isDialogOpen}
          aria-labelledby='dialog-title'
          onClose={handleClose}
        >
          <DialogTitle>
            {`Estas seguro de eliminar la paraescolar ${data.nombre} del turno ${data.turno.toLowerCase()}?`}
          </DialogTitle>
          {isLoading ? (
            <div className={classes.selectDialogLoader}>
              <CircularProgress
                size={100}
                color="inherit"
              />
            </div>
          ) : null}
          {!isLoading ? (
            <DialogActions>
            <Button onClick={() => handleClose()}>Cancelar</Button>
              <Button
                className={classes.actionButton}
                autoFocus
                onClick={() => handleDeleteClass()}
              >
                Sí, Eliminar
              </Button>
            </DialogActions>
          ) : null}
        </Dialog>
      ): null }
      <Button onClick={() => setDialogOpen(true)}>
        <DeleteIcon color="inherit" />
      </Button>
    </>
  )
}

const columns =[
  {
    name: 'Nombre',
    selector: (row) => row.nombre,
    sortable: true,
    center: true
  },
  {
    name: 'Turno',
    selector: (row) => row.turno,
    sortable: true,
    center: true
  },
  {
    name: 'Alumnos inscritos',
    selector: (row) => row.alumnos_inscritos,
    sortable: true,
    center: true
  },
  {
    name: 'Capacidad maxima de alumnos',
    selector: (row) => row.cupo_total,
    sortable: true,
    center: true
  },
  {
    name:'',
    selector: (row) => (DeleteButton(row)),
    width: '10%'
  }
]

const Classes = ({
  doClearRequestError,
  doCreateNewClass,
  doParaescolaresFetch,
  selectParaescolares,
  isLoading
}) => {
  const classes = useStyles()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const validationSchema = yup.object({
    nombre: yup.string().required('Nombre es un campo requerido.'),
    turno: yup.string().required('Selecciona un turno.'),
    cupo_total: yup.string().required('Ingresa la cantidad máxima de alumnos permitidos.')
  })
  const initialValues = {
    nombre: '',
    turno: '',
    cupo_total:''
  }
  const handleClose = () => {
    setDialogOpen(false)
  }
  const handleSubmit = async values => {
    const response = await doCreateNewClass(values)
    await doParaescolaresFetch()
    if (response.message) {
      setDialogOpen(false)
    }
  }

  const CustomizedSelectForFormik = ({ children, form, field }) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    return (
      <Select
        className={classes.formCustomClassInput}
        name={name}
        value={value}
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };


  return (
    <div className={classes.classesContainer}>
      <div className={classes.createClassContainer}>
        <Button
          type="submit"
          className={classes.createClassButton}
          variant="contained"
          color="inherit"
          onClick={() => setDialogOpen(true)}
        >
          <Typography>Agregar una Paraescolar</Typography>
        </Button>
      </div>
      <div>
        <Card className={classes.classCard}>
          <CardContent>
          <DataTable
            columns={columns}
            data={selectParaescolares}
            highlightOnHover={true}
            noDataComponent={isLoading ? (
              <div className={classes.selectDialogLoader}>
                <CircularProgress
                  size={100}
                  color="inherit"
                />
              </div>
            ) : "No hay paraescolares registradas"}
            pagination
          />
          </CardContent>
        </Card>
        {isDialogOpen ? (
          <Dialog
          open={isDialogOpen}
          aria-labelledby='dialog-title'
          onClose={handleClose}
          >
          <img className={classes.formClassFullLogo} src={logo} alt="logo"/>
          <DialogContent className={classes.createClassContainerDialog}>
          {isLoading ? (
            <div className={classes.selectDialogLoader}>
              <CircularProgress
                size={100}
                color="inherit"
              />
            </div>
          ) : null}
          {!isLoading ? (
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
                  <Form className={classes.formClassContainer}>
                    <DialogContentText id='dialog-description' className={classes.formClassDialogContentText}>
                      Agrega una paraescolar
                    </DialogContentText>
                    <Field
                      id="nombre"
                      label="Nombre de la Paraescolar"
                      variant="filled"
                      value={values.nombre || ''}
                      className={classes.formClassInput}
                      sx={{width: '80%'}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onClick={() => doClearRequestError()}
                      component={TextField}
                      error={Boolean(errors.nombre && touched.nombre && errors.nombre)}
                      helperText={errors.nombre && touched.nombre && errors.nombre}
                    />
                    <InputLabel id="demo-simple-select-label1" className={classes.formClassInput}>Selecciona un turno</InputLabel>
                    <Field
                      name="turno"
                      label="Selecciona un turno"
                      variant="filled"
                      value={values.turno || ''}
                      className={classes.formClassInput}
                      sx={{width: '80%'}}
                      onClick={() => doClearRequestError()}
                      component={CustomizedSelectForFormik}
                      error={Boolean(errors.turno && touched.turno && errors.turno)}
                    >
                      <MenuItem
                        className={classes.selectItem}
                        value={'MATUTINO'}
                      >
                        Matutino
                      </MenuItem>
                      <MenuItem
                        className={classes.selectItem}
                        value={'VESPERTINO'}
                      >
                        Vespertino
                      </MenuItem>
                    </Field>
                    <Field
                      id="cupo_total"
                      label="Cantidad de alumnos permitidos"
                      variant="filled"
                      value={values.cupo_total || ''}
                      className={classes.formClassInput}
                      sx={{width: '80%'}}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onClick={() => doClearRequestError()}
                      component={TextField}
                      error={Boolean(errors.cupo_total && touched.cupo_total && errors.cupo_total)}
                      helperText={errors.cupo_total && touched.cupo_total && errors.cupo_total}
                    />
                    <div className={classes.selectActionButtons}>
                      <Button
                        className={classes.actionCancelButton}
                        disabled={isSubmitting}
                        variant="contained"
                        color="inherit"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className={classes.actionButton}
                        disabled={isSubmitting}
                        variant="contained"
                        color="inherit"
                      >
                        Guardar
                      </Button>
                    </div>
                  </Form>
                  )
                }}
              </Formik>
          ) : null}
            </DialogContent>
        </Dialog>

        ) : null}
      </div>
    </div>
  )
}

const Wrapped = () => {
  const {
    doClearRequestError,
    doCreateNewClass,
    doParaescolaresFetch,
    selectParaescolares,
  } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const doFetch = async () =>{
      setIsLoading(true)
      await doParaescolaresFetch()
      setIsLoading(false)
    }
    doFetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <>
      <Classes
        doClearRequestError={doClearRequestError}
        doCreateNewClass={doCreateNewClass}
        selectParaescolares={selectParaescolares}
        doParaescolaresFetch={doParaescolaresFetch}
        isLoading={isLoading}
      />
    </>
  )
}

const Memoized = React.memo(Wrapped)
export default Memoized