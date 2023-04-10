
import { AppBar, Toolbar, styled, Avatar, Button } from '@mui/material'; 
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const Component = styled(AppBar)`
   background: transparent;
    color: #f913fa ;
    backdrop-filter: blur(20px) saturate(60%); 
  background-image:linear-gradient(to bottom right, rgba(0,0,0,0.2), rgba(0,0,0,0.5));

  height: auto ;  
`;

const Container = styled(Toolbar)`
    justify-content: left;
    padding: 0 16px;
    & > a {
        padding: 10px;
        font-size: 14px;
    }
`;



const StyleButton = styled(Button)`
    text-transform: none;
    background: transparent;
    height: 30px;
    border-radius: 5px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
    margin: 15px;
    backdrop-filter: blur(20px) grayscale(30%);
    background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5));
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 3px;
    font-family: 'Roboto', sans-serif;
    color: #FFFFFF;
    transition: all 0.7s ease;

    &:hover {
        background: #f913fa;
        backdrop-filter: blur(75px);
        background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
        box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
    }
`;



const Header = () => {

    // const navigate = useNavigate();

    // const logout = async () => navigate('/account');
        
    return (
        <Component>
            <Container>
                        <StyleButton component={Link} to="/">Home</StyleButton>
                        <StyleButton component={Link} to="/about">About</StyleButton>
                        <StyleButton component={Link} to="/contact">Connect</StyleButton>
                        <StyleButton component={Link} to="/account">Account</StyleButton>
                        <Avatar style={{ marginLeft: 'auto' }} src="/broken-image.jpg" />
            </Container>
        </Component>
    )
}

export default Header;