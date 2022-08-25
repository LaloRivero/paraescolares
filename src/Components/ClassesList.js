import React, { useState, useEffect, useContext, useCallback } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import DataTable from "react-data-table-component"
import AppContext from '../Lib/AppContext'


import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputLabel,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem
} from "@material-ui/core"

import styles from '../Styles/styles'
const useStyles = makeStyles(styles)

const paraescolarTableStructure =[
  {
    name: 'Matricula',
    selector: (row) => row.matricula,
    sortable: true,
    center: true
  },
  {
    name: 'Alumno',
    selector: (row) => row.nombre_completo,
    sortable: true,
    center: true
  },
  {
    name: 'Turno',
    selector: (row) => row.turno,
    sortable: true,
    center: true
  },
]

const groupTableStructure =[
  {
    name: 'Matricula',
    selector: (row) => row.matricula,
    sortable: true,
    center: true
  },
  {
    name: 'Alumno',
    selector: (row) => row.nombre_completo,
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
    name: 'Paraescolar',
    selector: (row) => row.paraescolar,
    sortable: true,
    center: true
  }
]
const ClassesList = ({
  groups,
  paraescolaresNames,
  selectParaescolaresList,
  selectGroupList,
  doFetchGroupList,
  doFetchParaescolaresList,
  handleSearch,
  tableData,
  handleSelectClass,
  handleSelectClassTurno,
  handleChangeOption,
  selectedOption,
  clase,
  claseTurno,
  isLoading
}) =>{
  const classes = useStyles()
  return (
    <div className={classes.listBackground}>
      <Card className={classes.listCard}>
        <CardContent>
          <div className={classes.listCardContainer}>
            <div>
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
            </div>
            <div className={classes.listCardSideSelectors}>
            {selectedOption === 'paraescolar' ? (
              <>
                <div className={classes.listSelectorElements}>
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
                    className={classes.listSelectClass}
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
                </div>
                <div className={classes.listSelectorElements}>
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
                    className={classes.listSelectClass}
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
                </div>
              </>
            ): null}
            { selectedOption === 'grupo'? (
              <div className={classes.listSelectorElements}>
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
              </div>
            ) : null}
            </div>
          </div>
          <div className={classes.searchButtonContainer}>
            <Button
              onClick={() => handleSearch()}
              className={classes.searchButton}
            >
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className={classes.listCard}>
          <CardContent>
          <DataTable
            columns={selectedOption === 'paraescolar' ? paraescolarTableStructure : groupTableStructure}
            data={selectedOption === 'paraescolar' ? selectParaescolaresList : selectGroupList}
            highlightOnHover={true}
            noDataComponent={isLoading ?
              <div className={classes.selectDialogLoader}>
                <CircularProgress
                  size={100}
                  color="inherit"
                />
              </div> : "No hay información para mostrar"}
            pagination
          />
          </CardContent>
        </Card>
    </div>
  )

}

const Wrapped = () => {
  const {
    selectParaescolares,
    selectParaescolaresList,
    selectGroupList,
    selectGroups,
    doGroupsFetch,
    doFetchGroupList,
    doFetchParaescolaresList,
    isLoading
  } = useContext(AppContext)
  const [clase, setClase] = useState('')
  const [claseTurno, setClaseTurno] = useState('')
  const [selectedOption, setSelectedOption] = useState('paraescolar')
  const [tableData, setTableData] = useState([])
  const handleSelectClass = event => setClase(event.target.value)
  const handleSelectClassTurno = event => setClaseTurno(event.target.value)
  const handleChangeOption = event => {
    setSelectedOption(event.target.value)
  }

  const paraescolaresNames = selectParaescolares.map(
    paraescolar => ({nombre: paraescolar.nombre, turno: paraescolar.turno})
  )

  //const handleSearch = () =>{}

  const handleSearch = useCallback(() => {
    if (selectedOption === 'paraescolar') {
      doFetchParaescolaresList({'nombre': clase, turno: claseTurno})
    }
    if (selectedOption === 'grupo') {
      doFetchGroupList({'grupo':clase})
    }
  }, [
    clase,
    claseTurno,
    selectedOption,
    doFetchGroupList,
    doFetchParaescolaresList
  ])

  useEffect(() =>{
    setClase('')
    setClaseTurno('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption])

  useEffect(() => {
    doGroupsFetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ClassesList
      doFetchGroupList={doFetchGroupList}
      doFetchParaescolaresList={doFetchParaescolaresList}
      selectGroupList={selectGroupList}
      selectParaescolaresList={selectParaescolaresList}
      paraescolaresNames={paraescolaresNames}
      groups={selectGroups}
      handleSearch={handleSearch}
      tableData={tableData}
      handleSelectClass={handleSelectClass}
      handleSelectClassTurno={handleSelectClassTurno}
      handleChangeOption={handleChangeOption}
      selectedOption={selectedOption}
      clase={clase}
      claseTurno={claseTurno}
      isLoading={isLoading}
    />
  )
}

const Memoized = React.memo(Wrapped)
export default Memoized