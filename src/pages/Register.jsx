import { Button } from 'flowbite-react'
import { useState } from 'react'
import axios from "axios"

const Register = () => {

  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  })

  const handleChange = (ev) => {
    ev.preventDefault()
    const { name, value } = ev.target
    setDetails({...details, [name]:value})
  }

  console.log(details)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    try {
      const res = axios.post("http://localhost:3000/auth/register", details)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">Firstname</label>
          <input type="text" placeholder='Enter your Firstname' name='firstname' value={details.firstname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="lastname">Lastname</label>
          <input type="text" placeholder='Enter your lastname' name='lastname' value={details.lastname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Enter your email' name='email' value={details.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='************' name='password' value={details.password} onChange={handleChange} />
        </div>
        <Button type='submit' outline>Register</Button>
      </form>
    </div>
  )
}

export default Register