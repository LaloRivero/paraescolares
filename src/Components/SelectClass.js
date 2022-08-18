import React, { useState, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AppContext from '../Lib/AppContext'

import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@material-ui/core"

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const SelectClass = () => {
  const {
    selectParaescolares,
    selectStudent,
    doParaescolaresFetch,
    doClearRequestError,
    doSetRequestError,
    doSetStudentIsNotValid,
    doSelectClass
  } = useContext(AppContext)

  const classes = useStyles()
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option1Error, setOption1Error] = useState(null)
  const [option2Error, setOption2Error] = useState(null)
  const [option3Error, setOption3Error] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSucced, setSelectedSucced] = useState(false)

  const paraescolaresPorTurno = selectParaescolares.filter(clase => clase.turno === selectStudent.turno)
    .filter(clase => clase.cupo_total !== clase.alumnos_inscritos)

  const errorLabel = "Selecciona una opción de la lista"

  const handleSendData = () => {
    if (!option1) {
      setOption1Error(true)
    }
    if (!option2) {
      setOption2Error(true)
    }
    if (!option3) {
      setOption3Error(true)
    }
    if (option1 && option2 && option3) {
      setDialogOpen(true)
    }

  }
  const handleChangeOption1 = (event) => {
    setOption1(event.target.value)
    setOption1Error(false)
  }
  const handleChangeOption2 = (event) => {
    setOption2(event.target.value)
    setOption2Error(false)
  }
  const handleChangeOption3 = (event) => {
    setOption3(event.target.value)
    setOption3Error(false)
  }
  const handleClose = () => {
    setDialogOpen(false)
    doClearRequestError()
  }

  const handleSelectClass = async () => {
    setIsLoading(true)
    const selectOption1 = await doSelectClass(option1)
    const selectOption2 = await doSelectClass(option2)
    const selectOption3 = await doSelectClass(option3)
    const hasError = Boolean(selectOption1?.error && selectOption2?.error && selectOption3?.error)
    if (hasError) {
      doSetRequestError(selectOption1?.error)
      setOption1('')
      setOption2('')
      setOption3('')
      await doParaescolaresFetch()
    } else {
      setSelectedSucced(true)
      doSetRequestError(null)
    }
    setDialogOpen(false)
    setIsLoading(false)
  }

  return (
    <>
      {isDialogOpen ? (
        <Dialog
          open={isDialogOpen}
          aria-labelledby='dialog-title'
          onClose={handleClose}
        >
          <DialogTitle id='dialog-title'> ¿Estas seguro de tu selección de paraescolares? </DialogTitle>
          <DialogContent>
          {isLoading ? (
            <div className={classes.selectDialogLoader}>
              <CircularProgress
                size={100}
                color="inherit"
              />
            </div>
          ) : null}
          {!isLoading ? (
            <ul>
              <li>
                <DialogContentText id='dialog-description'>
                {`Opción 1: ${option1}`}
                </DialogContentText>
              </li>
              <li>
                <DialogContentText id='dialog-description'>
                {`Opción 2: ${option2}`}
                </DialogContentText>
              </li>
              <li>
                <DialogContentText id='dialog-description'>
                {`Opción 3: ${option3}`}
                </DialogContentText>
              </li>
            </ul>
          ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()}>Cancelar</Button>
            <Button
              autoFocus
              onClick={() => handleSelectClass()}
            >
              Sí, Enviar
            </Button>
          </DialogActions>

        </Dialog>
      ): null}
      {selectedSucced ? (
        <>
          <h2 className={classes.succedText}>{`El alumno ${selectStudent.nombre_completo} a sido inscrito en la paraescolar de ${selectStudent.paraescolar} con éxito.`}</h2>
        </>
      ) : (
      <>
        <FormControl className={classes.formContainer}>
          <InputLabel
            className={classes.selecInputLabel}
            id="demo-simple-select-label1"
          >
            Selecciona tu opción #1 de paraescolar
          </InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            variant="outlined"
            className={classes.selectClass}
            value={option1}
            onChange={handleChangeOption1}
            onClick={() => doClearRequestError()}
            error={option1Error}
          >
            { paraescolaresPorTurno.filter(clase => clase.nombre!==option2 && clase.nombre!==option3)
                .map( clase => (
                  <MenuItem
                    className={classes.selectItem}
                    key={clase.id}
                    value={clase.nombre}
                  >
                    {clase.nombre}
                  </MenuItem>
            ))}
          </Select>
          {option1Error ? <p className={classes.selectErrorLabel}>{errorLabel}</p> : null}
        </FormControl>
        <FormControl className={classes.formContainer}>
          <InputLabel
            className={classes.selecInputLabel}
            id="demo-simple-select-label2"
          >
            Selecciona tu opción #2 de paraescolar
          </InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            variant="outlined"
            className={classes.selectClass}
            onChange={handleChangeOption2}
            onClick={() => doClearRequestError()}
            error={option2Error}
            value={option2}
          >
            { paraescolaresPorTurno.filter(clase => clase.nombre!==option1 && clase.nombre!==option3)
                .map( clase => (
                  <MenuItem
                    className={classes.selectItem}
                    key={clase.id}
                    value={clase.nombre}
                  >
                    {clase.nombre}
                  </MenuItem>
            ))}
          </Select>
          {option2Error ? <p className={classes.selectErrorLabel}>{errorLabel}</p> : null}
        </FormControl>
        <FormControl className={classes.formContainer}>
          <InputLabel
            className={classes.selecInputLabel}
            id="demo-simple-select-label3"
          >
            Selecciona tu opción #3 de paraescolar
          </InputLabel>
          <Select
            labelId="demo-simple-select-label3"
            id="demo-simple-select3"
            variant="outlined"
            className={classes.selectClass}
            value={option3}
            onChange={handleChangeOption3}
            onClick={() => doClearRequestError()}
            error={option3Error}
          >
            { paraescolaresPorTurno.filter(clase => clase.nombre!==option1 && clase.nombre!==option2)
                .map( clase => (
                  <MenuItem
                    className={classes.selectItem}
                    key={clase.id}
                    value={clase.nombre}
                  >
                    {clase.nombre}
                  </MenuItem>
            ))}
          </Select>
          {option3Error ? <p className={classes.selectErrorLabel}>{errorLabel}</p> : null}
        </FormControl>
        <div className={classes.selectActionButtons}>
          <Button
            className={classes.actionCancelButton}
            variant="contained"
            onClick={() => {
              doSetStudentIsNotValid()
              doClearRequestError()
            }}
          >
            Cancelar
          </Button>
          <Button
            className={classes.actionButton}
            variant="contained"
            color="inherit"
            onClick={() => handleSendData()}
          >
            Enviar
          </Button>
        </div>
      </>
      )}
    </>
  )
}

const Memoized = React.memo(SelectClass)
export default Memoized