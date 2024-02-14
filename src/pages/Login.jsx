import axios from 'axios'
import { Button } from 'flowbite-react'
import { useState } from 'react'

const Login = () => {

  const [details, setDetails] = useState({
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
      const res = axios.post("http://localhost:3000/auth/login", details)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Enter your email' name='email' value={details.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder='************' name='password' value={details.password} onChange={handleChange} />
        </div>
        <Button type='submit' outline>Log In</Button>
      </form>
    </div>
  )
}

export default Login