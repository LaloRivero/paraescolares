const URL = ' https://app-paraescolares.herokuapp.com/api'

class API {
  static call = new API();

  wake = async () => {
    try {
      const request = await fetch(`${URL}/wake/`)
      const response = await request.json()
      return response
    } catch (err){
      return err
    }
  }

  getStudent = async data =>{
    const request = await fetch(`${URL}/students/${data}/`)
    const response = await request.json()
    return response
  }

  validate = async data => {
    const request = await fetch(`${URL}/select/validate/`,{
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    })
    const response = await request.json()
    return response
  }

  select = async data => {
    try {
      const request = await fetch(`${URL}/select/`,{
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      })
      const response = await request.json()
      return response
    } catch (err) {
      return err
    }
  }

  getParaescolares = async () => {
    try {
      const request = await fetch(`${URL}/paraescolares/getall/`)
      const response = await request.json()
      return response
    } catch (err) {
      return err
    }
  }
}

export default API