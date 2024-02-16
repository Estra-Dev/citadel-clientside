import React from 'react'
import { Navbar, TextInput, Button } from "flowbite-react"
import { FaSearch } from "react-icons/fa";
import { LuMoonStar } from "react-icons/lu";
import {Link, useLocation} from "react-router-dom"

const NavBar = () => {

  const path = useLocation().pathname

  return (
    <Navbar className=' border-b-2'>
      <div className=" flex gap-4 items-center">
        <div className=" flex flex-col">
          <img src="https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-1/309121665_441507861406175_2439695572051372297_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=596444&_nc_eui2=AeEc8UN1Cc40QutRo9LUYyBknM-f1qmQ1xWcz5_WqZDXFXVyGilXkXb3_NnydRgFU_SXjitqrGEPaLSu5d05L24b&_nc_ohc=1dV-5itHU6EAX93HQx9&_nc_ht=scontent.flos5-2.fna&oh=00_AfAf8eWpkw-86oa6xCCfrz-21ZqH-fShHUt8JCM5NhFAxA&oe=65D1B765" alt="logo" className=' w-9 h-9 rounded-full self-center' />
          <p className=' text-[10px] font-bold mt-1'>CITADEL</p>
        </div>
        <form>
          <TextInput type='text' placeholder='Search...' rightIcon={FaSearch} className=' hidden md:inline'/>
        </form>
        <Button className=' md:hidden w-12 h-10' color='gray' pill>
          <FaSearch />
        </Button>
      </div>


      <div className=" flex gap-2 md:order-2">
        <Button className=' w-12 h-12 hidden sm:inline' color='gray' pill>
          <LuMoonStar />
        </Button>
        <Link to={"/login"}>
          <Button gradientDuoTone={"purpleToBlue"} outline>
            Login
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={'div'} active={path === '/'}>
          <Link to={'/'}>
            Feed
          </Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} active={path === '/activities'}>
          <Link to={'/activities'}>
            Activities
          </Link>
        </Navbar.Link>
        <Navbar.Link as={'div'} active={path === '/about'}>
          <Link to={'/about'}>
            About
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar