// Packages:
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'


// Imports:
import {
  Building2,
  Calendar,
  CheckCircle,
  DollarSign,
  HelpCircle,
  Home,
  Key,
  Lock,
  Podcast,
  LocateFixed,
  Files
} from 'lucide-react' 
import { GiHamburgerMenu } from "react-icons/gi";

// Constants:
import COLORS from '../../../styles/colors'
import ROUTES from '../../../routes'

import { FLEX } from '../../../styles/snippets'
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { SiFiles } from "react-icons/si";
import { BiCurrentLocation } from "react-icons/bi";

// Functions:
const Sidebar = () => {
  // Constants:
  const [show, toggleShow] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log(screenWidth)
  const [showComponent, setShowComponent] = useState(window.innerWidth >= 990);
  const [menuItemClicked, setMenuItemClicked] = useState(false);

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    
      // Update the visibility of the component based on the screen width
      if (window.innerWidth < 992) {
        setShowComponent(false);
        
      } else {
        setShowComponent(true);
      }
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  const handleMenuItemClick = () => {
    if (screenWidth < 992) {
      setMenuItemClicked(true);
      setShowComponent(false);
    }
  };

  const location = useLocation()
  const navigate = useNavigate()
  const menuItems = [
    {
      route: ROUTES.HOME,
      node: <><Home />Home</>
    },
    {
      route: ROUTES.CASH_DIARY,
      node: <><Calendar />Lender/Borrower</>
    },
    {
      route: ROUTES.RETAILS_CASH,
      node: <><DollarSign />Retail Cash</>
    },
    {
      route: ROUTES.MILEAGE_TRACKING,
      node: <><Podcast />Mileage Tracking</>
    },
    {
      route: ROUTES.VAULT_RECEIPT,
      node: <><Files />  Receipts Vault</> 
    },
    {
      route: ROUTES.MY_LOCATIONS,
      node: <><LocateFixed /> My Locations</>
    },
    {
      route: ROUTES.REAL_ESTATE,
      node: <><Building2 />Real Estate</>
    },
    {
      route: ROUTES.PASSWORDS,
      node: <><Lock />Password List</>
    },
    {
      route: ROUTES.PIN_LIST,
      node: <><CheckCircle />PIN List</>
    },
    {
      route: ROUTES.LOCKERS,
      node: <><Key />Lockers</>
    },
  ]

  // Return:
  return (
    <>

     <BurgerButton onClick={() => [toggleShow(!show),toggleComponent() ]}>
          {show ? <GiHamburgerMenu/> : <GiHamburgerMenu/>}
        </BurgerButton>

   { showComponent && screenWidth  && (
      <Wrapper>
      {
        menuItems.map((menuItem, index) => (
          <MenuItem
            key={ `menu-item-${ index }` }
            isFocused={ location.pathname === menuItem.route }
            onClick={ () =>[ navigate(menuItem.route),  handleMenuItemClick()] }
          >{ menuItem.node }</MenuItem>
        ))
      }
    </Wrapper>
        )}
    </>
  )
}
// Exports:
export default Sidebar

 
// Styles:
const Wrapper = styled.div`
  position: absolute;
  top: 3.75rem;
  left: 0;
  width: 20vw;
  min-width: 200px;
  /* height: auto; */
  min-height: calc(99vh - 5rem); 
  background-color: ${ COLORS.PRIMARY };
  user-select: none;
  padding-bottom: 1rem;
  z-index: 9999999999;

`

const MenuItem = styled.div`
  ${ FLEX }
  justify-content: flex-start;
  gap: 1.25rem;
  width: 100%;
  height: 3.75rem;
  padding: 0 1rem;
  font-weight: 500;
  font-size: 1.1rem;
  color: ${ props => props.isFocused ? COLORS.PRIMARY : 'white' };
  background-color: ${ props => props.isFocused ? '#D9D9D9' : 'transparent' };
  user-select: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${ props => props.isFocused ? '#D9D9D9' : '#d9d9d926' };
  }

  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 1.1rem ;
    font-weight: 400; 
  }

  @media screen and (min-width: 576px) and (max-width: 768px) {
    font-size: 1.1rem ;
    font-weight: 400; 
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 1.1rem ;
    font-weight: 400; 
  }
`
const BurgerButton = styled.button`
  position: absolute;
  top:-0.3rem;
  left: 1rem;
  z-index: 99999999999999999999;
  border: none;
  background-color: #002758 ;
  color: white;
  font-size: 2.5rem;
  padding: 0;
  outline: none;

  &:hover{
    background-color: #112758;
  }
`