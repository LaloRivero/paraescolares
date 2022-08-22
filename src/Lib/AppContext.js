import { createContext, useState, useEffect } from "react"
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const API = process.env.REACT_APP_API_URL

const AppContext = createContext()
export default AppContext

export const AppProvider = ({ children }) => {
  const navigate = useNavigate()

  const [isValidate, setIsValidate] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectStudent, setSelectedStudent] = useState({})
  const [selectStudents, setSelectedStudents] = useState([])
  const [selectClassSucced, setSelectClassSucced] = useState(false)
  const [selectParaescolares, setSelectParaescolares] = useState([])
  const [selectStudentFormValues, setStudentFormValues] = useState({})
  const [selectParaescolaresList, setParaescolaresList] = useState([])
  const [selectGroupList, setGroupList] = useState([])
  const [requestError, setRequestError] = useState('')
  const [selectGroups, setSelectGroups] = useState([])
  const [authTokens, setAuthTokens] = useState(()=> (
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null))
  const [user, setUser] = useState(()=> (
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null)
)
  const doWakeUpServer = async () => {
    await fetch(`${API}/wake/`)
  }

  const doSetStudentIsNotValid = () => {
    setIsValidate(false)
  }

  const doValidateStudent = async data => {
    setIsLoading(true)
    const request =  await fetch(`${API}/select/validate/`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
    const response = await request.json()
    if (response.error) {
      setIsValidate(false)
      setRequestError(response.error)
    } else {
      setIsValidate(true)
      setStudentId(response.matricula)
      setSelectedStudent(response)
    }
    setIsLoading(false)
  }

  const doSaveStudentFormValues = values =>{
    setStudentFormValues(values)
  }

  const doStudentFetch = async () => {
    const request = await fetch(`${API}/students/${studentId}/`)
    const response = await request.json()
    if (response.error) {
      setRequestError(response.error)
    } else {
      setSelectedStudent(response)
    }
  }

  const doStudentsFetch = async () => {
    const request = await fetch(`${API}/students/`)
    const response = await request.json()
    if (response.error) {
      setRequestError(response.error)
    } else {
      setSelectedStudents(response)
    }
  }

  const doParaescolaresFetch = async () => {
    const request = await fetch(`${API}/paraescolares/getall/`)
    const response = await request.json()
    if (request.status === 200) {
      setSelectParaescolares(response)
    }else {
      throw Error(response)
    }
  }

  const doGroupsFetch = async () => {
    setIsLoading(true)
    const request = await fetch(`${API}/groups/`)
    const response = await request.json()
    if (response.error) {
      setIsLoading(false)
      throw Error(response)
    } else {
      setIsLoading(false)
      setSelectGroups(response)
    }
  }

  const doSelectClass = async data =>{
    const request = await fetch(`${API}/select/`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({...selectStudentFormValues, eleccion: data}),
    })
    const response = await request.json()
    if (response?.error) {
      return response
    } else {
      setSelectClassSucced(true)
    }
  }

  const doCreateNewClass = async data => {
    setIsLoading(true)
    await doCheckValidateToken()
    const request = await fetch(`${API}/paraescolares/make/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
    const response = await request.json()
    if (response.error) {
      setIsLoading(false)
      throw Error(response)
    } else {
      setIsLoading(false)
      return response
    }
  }

  const doDeleteClass = async (data) => {
    setIsLoading(true)
    await doCheckValidateToken()
    const request = await fetch(`${API}/paraescolares/delete/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      method: "DELETE",
      body: JSON.stringify(data),
    })
    const response = await request.json()
    if (response.error) {
      setIsLoading(false)
      throw Error(response)
    } else {
      setIsLoading(false)
      return response
    }
  }

  const doDownloadXlcs = async data => {
    await doCheckValidateToken()
    const saveAs = require('file-saver');
    const DOWNLOAD_URL = data.selectedOption === 'grupo' ? `${API}/csv/group/` : `${API}/csv/paraescolar/`
    const FILE_NAME = data.selectedOption === 'grupo' ? 'grupo' : 'paraescolar'
    const request = await fetch(DOWNLOAD_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      responseType: 'blob',
      method: "POST",
      body: JSON.stringify(data),
    })
    const response = await request.blob()
    await saveAs(response, `${FILE_NAME}.csv`)
  }

  const doFetchParaescolaresList = async data => {
    const request = await fetch(`${API}/list/paraescolar/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
    const response = await request.json()
    if (request.status === 200){
      setParaescolaresList(response)
    } else {
      throw Error(response)
    }
  }

  const doFetchGroupList = async data => {
    const request = await fetch(`${API}/list/group/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
    const response = await request.json()
    if (request.status === 200){
      setGroupList(response)
    } else {
      throw Error(response)
    }
  }

  const doClearRequestError = async () => {
    setRequestError(null)
  }

  const doSetRequestError = async (err) => {
    setRequestError(err)
  }

  const doLoginUser = async values => {
    const request = await fetch(`${API}/token/`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(values),
    })
    const response = await request.json()
    if(request.status === 200){
      setAuthTokens(response)
      setUser(jwt_decode(response.access))
      localStorage.setItem('authTokens', JSON.stringify(response))
      navigate('dashboard')
    }else{
      setRequestError('Correo o contraseña son incorrectos.')
    }
  }

  const doLogoutUser = async () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('login')
  }

  const doCheckValidateToken = async () => {
    const request = await fetch(`${API}/token/check/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      method: "POST",
    })

    if (request.status === 401) {
      await doLogoutUser()
    }

  }

  const doUpdateToken = async ()=> {
    const request = await fetch(`${API}/token/refresh/`, {
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({'refresh':authTokens?.refresh})
    })
    const response = await request.json()
    if (request.status === 200){
      setAuthTokens(response)
      setUser(jwt_decode(response.access))
      localStorage.setItem('authTokens', JSON.stringify(response))
    }else{
      doLogoutUser()
    }
  }

  const doCreateNewGroup = async(data) => {
    setIsLoading(true)
    const request = await fetch(`${API}/students/upload/a.csv`, {
      headers: {
        'Content-Type': 'text/csv',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      method: "PATCH",
      body: data,
    })
    const response = await request.json()
    if (response.error) {
      setIsLoading(false)
      throw Error(response)
    } else {
      setIsLoading(false)
      return true
    }
  }

  useEffect(() => {
    doWakeUpServer()
    doParaescolaresFetch()
  },[])

  const contextData = {
    isLoading: isLoading,
    isValidate: isValidate,
    requestError: requestError,
    studentId: studentId,
    user: user,
    doClearRequestError: doClearRequestError,
    doCreateNewClass: doCreateNewClass,
    doCreateNewGroup: doCreateNewGroup,
    doDeleteClass: doDeleteClass,
    doDownloadXlcs: doDownloadXlcs,
    doLoginUser: doLoginUser,
    doLogoutUser: doLogoutUser,
    doGroupsFetch: doGroupsFetch,
    doFetchGroupList: doFetchGroupList,
    doValidateStudent: doValidateStudent,
    doParaescolaresFetch: doParaescolaresFetch,
    doFetchParaescolaresList: doFetchParaescolaresList,
    doSaveStudentFormValues: doSaveStudentFormValues,
    doSetRequestError: doSetRequestError,
    doSelectClass: doSelectClass,
    doSetStudentIsNotValid: doSetStudentIsNotValid,
    doStudentFetch: doStudentFetch,
    doStudentsFetch: doStudentsFetch,
    doUpdateToken: doUpdateToken,
    doWakeUpServer: doWakeUpServer,
    selectClassSucced: selectClassSucced,
    selectParaescolares: selectParaescolares,
    selectParaescolaresList: selectParaescolaresList,
    selectStudent: selectStudent,
    selectStudentFormValues: selectStudentFormValues,
    selectStudents: selectStudents,
    selectGroups: selectGroups,
    selectGroupList: selectGroupList
  }

  return (
    <AppContext.Provider value={contextData}>
      {children}
    </AppContext.Provider>
  )
}