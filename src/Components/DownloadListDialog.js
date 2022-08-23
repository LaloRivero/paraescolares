import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AppContext from '../Lib/AppContext'

import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core"

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const DownloadDialog = ({
  isOpen,
  onClose,
  doDownloadXlcs,
  paraescolaresNames,
  groups,
  isLoading
}) => {
  const classes = useStyles()
  const [clase, setClase] = useState('')
  const [claseTurno, setClaseTurno] = useState('')
  const [selectedOption, setSelectedOption] = useState('paraescolar')
  const handleSelectClass = event => setClase(event.target.value)
  const handleSelectClassTurno = event => setClaseTurno(event.target.value)
  const handleChangeOption = event => {
    setSelectedOption(event.target.value)
  }
  const handleDownload = async () => {
    let data = {}
    if (selectedOption === 'paraescolar'){
      data = {
        selectedOption,
        //nombre_paraescolar: clase,
        paraescolar: clase,
        turno: claseTurno
      }
    }

    if (selectedOption === 'grupo'){
      data = {
        selectedOption,
        grupo: clase,
      }
    }
    await doDownloadXlcs(data)
  }
  return(
    <div >
      <Dialog
        open={isOpen}
        onClose={onClose}
        className={classes.downloadDialog}
      >
        <DialogTitle>Descargar Listados</DialogTitle>
        <DialogContent className={classes.downloadDialogContent}>
          <FormControl
            component="fieldset"
            className={classes.selectTypeOfList}
          >
            <FormLabel component="legend">Selecciona el tipo de listado.</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              className={classes.typeOfListItems}
              value={selectedOption}
              onChange={handleChangeOption}
            >
            <FormControlLabel value="paraescolar" control={<Radio />} label="Paraescolar" />
            <FormControlLabel value="grupo" control={<Radio />} label="Grupo" />
            </RadioGroup>
          </FormControl>
          {selectedOption === 'paraescolar' && !isLoading ? (
            <>
              <InputLabel
                className={classes.selecInputLabel}
                id="demo-simple-select-label1"
              >
                Selecciona una paraescolar
              </InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                variant="outlined"
                className={classes.dialogSelectClass}
                value={clase}
                onChange={handleSelectClass}
                //onClick={() => doClearRequestError()}
                //error={option1Error}
              >
                { paraescolaresNames.map(clase => (
                  <MenuItem
                    className={classes.selectItem}
                    key={`${clase.nombre}-${clase.turno.toLowerCase()}`}
                    value={clase.nombre}
                  >
                    {clase.nombre}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel
                className={classes.selecInputLabel}
                id="demo-simple-select-label2"
              >
                Selecciona un turno
              </InputLabel>
              <Select
                labelId="demo-simple-select-label2"
                id="demo-simple-select2"
                variant="outlined"
                className={classes.dialogSelectClass}
                value={claseTurno}
                onChange={handleSelectClassTurno}
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
              </Select>
            </>
          ): null}
          { selectedOption === 'grupo' && !isLoading ? (
            <>
              <InputLabel
                className={classes.selecInputLabel}
                id="demo-simple-select-label1"
              >
                Selecciona un grupo
              </InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                variant="outlined"
                className={classes.dialogSelectClass}
                value={clase}
                onChange={handleSelectClass}
                //onClick={() => doClearRequestError()}
                //error={option1Error}
              >
                { groups.map(group => (
                  <MenuItem
                    className={classes.selectItem}
                    key={group}
                    value={group}
                  >
                    {group}
                  </MenuItem>
                ))}
              </Select>
            </>
          ) : null}
          {isLoading ? (
            <div className={classes.selectDialogLoader}>
              <CircularProgress
                size={100}
                color="inherit"
              />
            </div>
          ): null}
          <div  className={classes.downloadButtonGroup}>
            <Button
              className={classes.uploadButton}
              onClick={() => onClose()}
            >
              Cerrar
            </Button>
            <Button
              className={classes.uploadButton}
              onClick={() => handleDownload()}
            >
              Descargar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )

}

const Wrapped = ({
  downloadDialogOpen,
  setDownloadDialogOpen
}) => {
  const {
    selectParaescolares,
    selectGroups,
    doGroupsFetch,
    doDownloadXlcs,
    isLoading
  } = useContext(AppContext)
  const handleCloseDialog = () => setDownloadDialogOpen(false)
  const paraescolaresNames = selectParaescolares.map(
    paraescolar => ({nombre: paraescolar.nombre, turno: paraescolar.turno})
  )

  useEffect(() => {
    const doFetch = async () => await doGroupsFetch()
    doFetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DownloadDialog
      isOpen={downloadDialogOpen}
      onClose={handleCloseDialog}
      paraescolaresNames={paraescolaresNames}
      doDownloadXlcs={doDownloadXlcs}
      groups={selectGroups}
      isLoading={isLoading}
    />
  )
}

const Memoized = React.memo(Wrapped)
export default Memoized