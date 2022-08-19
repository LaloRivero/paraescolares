import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Field, Form, Formik } from "formik"
import { logo } from '../utils/constants'
import DataTable from "react-data-table-component"
import * as yup from 'yup'
import AppContext from '../Lib/AppContext'


import {
  Card,
  CardContent,
  CircularProgress,
  InputLabel,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
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
}) =>{
  const classes = useStyles()
  const [clase, setClase] = useState('')
  const [claseTurno, setClaseTurno] = useState('')
  const [selectedOption, setSelectedOption] = useState('paraescolar')
  const [tableData, setTableData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const handleSelectClass = event => setClase(event.target.value)
  const handleSelectClassTurno = event => setClaseTurno(event.target.value)
  const handleChangeOption = event => {
    setSelectedOption(event.target.value)
  }

  useEffect(()=>{
    setIsLoading(true)
    const doFetch = async () => {
      if (selectedOption === 'paraescolar') {
        await doFetchParaescolaresList({'nombre': clase, turno: claseTurno})
        setTableData(selectParaescolaresList)
      } else {
        await doFetchGroupList({'grupo':clase})
        setTableData(selectGroupList)
      }
      setIsLoading(false)
    }
    doFetch()
  }, [
    clase,
    claseTurno,
    selectedOption,
    selectParaescolaresList,
    selectGroupList,
    doFetchParaescolaresList,
    doFetchGroupList
  ])

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
        </CardContent>
      </Card>

      <Card className={classes.listCard}>
          <CardContent>
          <DataTable
            columns={selectedOption === 'paraescolar' ? paraescolarTableStructure : groupTableStructure}
            data={tableData}
            highlightOnHover={true}
            noDataComponent={"No hay información para mostrar"}
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
  } = useContext(AppContext)
  const paraescolaresNames = selectParaescolares.map(
    paraescolar => ({nombre: paraescolar.nombre, turno: paraescolar.turno})
  )
  useEffect(() => {
    const doFetch = async () => await doGroupsFetch()
    doFetch()
  }, []);

  return (
    <ClassesList
      doFetchGroupList={doFetchGroupList}
      doFetchParaescolaresList={doFetchParaescolaresList}
      selectGroupList={selectGroupList}
      selectParaescolaresList={selectParaescolaresList}
      paraescolaresNames={paraescolaresNames}
      groups={selectGroups}
    />
  )
}

const Memoized = React.memo(Wrapped)
export default Memoized