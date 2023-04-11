import {Box, Button, TextField, Typography, styled} from '@mui/material'
import { useState, useContext, useEffect } from 'react';
import {API} from '../../service/api.js'
import { DataContext} from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.12), rgba(255,255,255,0.15));
    backdrop-filter: blur(50px); 
    border-radius:10px;
    margin: auto;
    box-shadow: 25px 25px 25px rgba(30,30,30,0.3);
    height: auto;
`;
const Image = styled('img')({
    width: '20rem',
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0',
});
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    & > div, & > button, & > p{
        margin-top:10px;
    }
`;

const Error = styled(Typography)`
 font-size: 10px;
 margin-top: 10px;
 line-height: 0;
 font-weight: 600;


`;

const StyledTextField = styled(TextField)`
    fontColor: #ffffff;
`;

const Text = styled(Typography) `

    color: #f913fa ;
    font-size: 16px;

`;

const LoginButton = styled(Button) `
  text-transform: none;
  background: transparent;
  height: 48px;
  border-radius: 10px;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));

  &:hover {
    background: #f913fa;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
  }
`;

const SignupButton = styled(Button) `
  text-transform: none;
  background: transparent;
  height: 48px;
  border-radius: 10px;
  transition: all 0.7s ease;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));

  &:hover {
    background: #f913fa;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
  }
`;
const signupInitialValues= {
    name: '' ,
    username: '' ,
    password: ''

};
const loginInitialValues = {
    username: '',
    password: ''
};


const Login = ({isUserAuthenticated}) => {
    const imageURL = '/blog-removebg.png'; 
    const [account, toggleAccount] = useState('login');
    const [login, setLogin] = useState(loginInitialValues)
    const [signup, setSignup] = useState(signupInitialValues);
    const [error , showError] = useState('');
    const {setAccount} = useContext(DataContext);
    const  navigate = useNavigate();
    
    useEffect(() => {
        showError(false);
    }, [login])

    const signupUser = async () => {
        console.log('signupUser called');
        try {
          let response = await API.userSignup(signup);
          console.log('API call made:', response);
          if (response.isSuccess) {   
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
          } else {
            showError('Something went wrong! please try again later');
          }
        } catch (error) {
          console.error(error);
        }
      }
      
    const toggleSignup=  () => {
        if (account === 'login'){
            toggleAccount('signup');
        }
        else {
            toggleAccount('login');
        }
        
    }
    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value});
    }

    const onValueChange =(e) => {
        setLogin({...login, [e.target.name]: e.target.value})

    }
    const loginUser = async () => {
        let response = await API.userLogin(login);
        if(response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`  );
            console.log(response.data);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            
            setAccount({ username: response.data.username, name: response.data.name})
            setLogin(loginInitialValues);
            isUserAuthenticated(true);
            navigate('/');

        } else {
            showError('Something went wrong please try again!');
        }
    }
    return (
        <Component >
            <Box>
                <Image src={imageURL} alt="login" />
                {
                account === 'login' ?

                    <Wrapper>
                        <StyledTextField variant='standard' value={login.username} onChange={(e)=> onValueChange(e)} name="username" label = 'Username' InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "#220056" } }}  color = "secondary"/>
                        <TextField type="password" variant='standard' value={login.password} onChange={(e)=> onValueChange(e)} name="password" label = 'Password'InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "#220056" } }}  color = "secondary" onKeyPress={(event) => {
                if (event.key === "Enter") {
                  loginUser();
                }
              }}/>
                        <LoginButton variant='contained' onClick={()=>loginUser()}>Login</LoginButton>
                        <Text style ={{textAlign: 'center'}}>OR</Text>
                        <SignupButton onClick={()=> toggleSignup()} variant='contained'>Create Account</SignupButton>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField variant='standard' value= {signup.name} onChange={(e)=> onInputChange(e)} name="name" label = 'Full Name'InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "#220056" } }}  color = "secondary"/>
                        <TextField variant='standard' value={signup.username} onChange={(e)=> onInputChange(e)} name="username"label = 'Create Username'InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "#220056" } }}  color = "secondary"/>
                        <TextField type = "password" variant='standard' value={signup.password} onChange={(e)=> onInputChange(e)} name= "password" label = 'Create Password'InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{ style: { color: "#220056" } }}  color = "secondary"/>
                        {error && <Error>{error}</Error>}
                        <SignupButton onClick={()=>signupUser()}  variant='contained'>Sign Up</SignupButton>
                        <Text style ={{textAlign: 'center'}}>OR</Text>
                        <LoginButton  onClick={()=> toggleSignup()} variant='contained'>Already Have an Account? </LoginButton>
                    </Wrapper>
                }
            </Box>
                
            
            
        </Component>
        
    )
}; 

export default Login;
