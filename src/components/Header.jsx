import { Button, Navbar } from "flowbite-react"
import { TextInput } from 'flowbite-react'
import { FaSearchengin } from "react-icons/fa6";
import { LuMoonStar } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

const Header = () => {

  const path = useLocation().pathname

  return (
    <Navbar className=" border-b-2 ">
      <Link className=" w-12 h-12 flex flex-col justify-center items-center">

        <img src="https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/309121665_441507861406175_2439695572051372297_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFmwUKmlVwGPosG0Q1yFAuunM-f1qmQ1xWcz5_WqZDXFXz3punYBmCizdsU-xmW7wcGQJThezJkQuWmURAvAe1D&_nc_ohc=x_vlnfUrqLoAX-bOYgJ&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&oh=00_AfBLZ09rFFiVHU34z_8bJcoH3W1SQahlwVqFY67heAhRjw&oe=65D107A3" alt="logo" className=" rounded-full" width={'30px'} />
        <span className=" text-sm">CTM</span>
      </Link>

      <form>
        <TextInput type="text" placeholder="Search..." rightIcon={FaSearchengin} className=" hidden md:flex"/>
      </form>
      <Button color="gray" className=" w-12 h-12 py-2 md:hidden" size={5}><FaSearchengin /></Button>

      <div className=" flex gap-2 md:order-last">
        <Button className=" w-12 h-12 hidden sm:flex" color="gray" pill ><LuMoonStar /></Button>
        <Link to={'/login'}>
          <Button gradientDuoTone={'purpleToBlue'} outline>Log In</Button>
        </Link>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link as={'div'} active={path === "/"}>
          <Link to={'/'}>
            Feed
          </Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} active={path === "/activities"}>
          <Link to={'/activities'}>
            Activities
          </Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} active={path === "/about"}>
          <Link to={'/about'}>
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>

      
    </Navbar>
  )
}

export default Header