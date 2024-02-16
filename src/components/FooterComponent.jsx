import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterComponent = () => {
  return (
    <Footer container className=' border border-t-8 border-teal-500'>
      <div className=" max-w-7xl mx-auto w-full">
        <div className=" w-full grid justify-between sm:flex md:grid-cols-1">
          <div className=" w-[50px]">
            <Link className=" flex flex-col items-center">
              <img src="https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-1/309121665_441507861406175_2439695572051372297_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=596444&_nc_eui2=AeEc8UN1Cc40QutRo9LUYyBknM-f1qmQ1xWcz5_WqZDXFXVyGilXkXb3_NnydRgFU_SXjitqrGEPaLSu5d05L24b&_nc_ohc=1dV-5itHU6EAX93HQx9&_nc_ht=scontent.flos5-2.fna&oh=00_AfAf8eWpkw-86oa6xCCfrz-21ZqH-fShHUt8JCM5NhFAxA&oe=65D1B765" alt="logo" className=' w-9 h-9 rounded-full self-center' />
              <p className=' text-[10px] font-bold mt-1'>CITADEL</p>
            </Link>
          </div>
          <div className=" grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='/about' rel='noopener noreferrer' target='_blank'>
                  Our App
                </Footer.Link>
              </Footer.LinkGroup>
              <Footer.LinkGroup col>
                <Footer.Link href='/about' rel='noopener noreferrer' target='_blank'>
                  Services
                </Footer.Link>
              </Footer.LinkGroup>

            </div>
            <div>
              <Footer.Title title='Activites' />
              <Footer.LinkGroup col>
                <Footer.Link href='/activities'>
                  Upcomings
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>
                  Privacy
                </Footer.Link>
              </Footer.LinkGroup>
              <Footer.LinkGroup col>
                <Footer.Link href='#'>
                  Terms and Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className=" w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href='#' by="IDK Team" year={new Date().getFullYear()} />
          <p className=' mt-4 sm:mt-0 text-[12px] font-bold text-gray-700'>NO FAILURE, NO DEFEAT</p>
        </div>
      </div>
    </Footer>
  )
}

export default FooterComponent