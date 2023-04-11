import { Box, FormControl, InputBase, styled, Button, TextareaAutosize } from '@mui/material';
import { useState ,useEffect, useContext } from 'react';
import { AddCircle as Add} from '@mui/icons-material';
import { useLocation, useNavigate} from 'react-router-dom';
import {DataContext} from '../../context/DataProvider';
import { API } from '../../service/api';





const Container = styled(Box)`
    margin: 50px 100px
`;


const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    height: '50vh'
}); 

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;

`;

const InputTextField = styled(InputBase)`
flex: 1;
margin: 0 30px;
font-size: 25px;
color: #ffffff ;
backdrop-filter: blur(50px); 
border-radius: 7px;
  box-shadow: 10px 10px 10px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.15), rgba(255,255,255,0.15));

  &:hover {
    border: 1px solid #f913fa;
    background: transparent;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0.3));
  }
`;

const PublishButton = styled(Button)`
text-transform: none;
  background: transparent;
  height: 48px;
  color: #FFFFFF;
  border-radius: 7px;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(255,255,255,0.2));
  transition: all 0.2s ease;

    &:hover {
        box-shadow: 5px 5px 5px rgb(249, 19, 250,0.3);
        transform: scale(1.05);
        background-image:linear-gradient(to bottom right, rgba(249, 19, 250,0.7), rgba(255,255,255,0));
      }
`;

const StyledAdd = styled(Add)`
&:hover {
  box-shadow: 5px 5px 5px rgb(249, 19, 250,0.3);
 border-radius: 10px;
  transform: scale(1.05);
  background-image:linear-gradient(to bottom right, rgba(249, 19, 250,0.7), rgba(255,255,255,0));
}

`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 18px;
  border: none;
  backdrop-filter: blur(50px); 
  background: transparent;
  box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
  background-image:linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.1));
  color: #ffffff ;
  &:hover {
    border: 1px solid #f913fa;
    background: transparent;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0.3));
  }

  &:focus-visible {
    outline: none
  }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createDate: new Date()
}


const CreatePost = () => {

    const[post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');

    const location = useLocation();

    const {account} = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        const getImage = async() => {
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                console.log("IMAGE API BEFORE");
                const response = await API.uploadFile(data);
                console.log("IMAGE API AFTER");
                post.picture = response.data;
            }
          }
            getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file]);
    
    const handleChange =(e) => {
        setPost({ ...post, [e.target.name]: e.target.value})
    }
    const url = post.picture ? post.picture:'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    

    const savePost = async() => {
       let response = await API.createPost(post);
       if(response.isSuccess) {
          navigate('/');
       }
    }

    return (
       <Container>
        <Image src ={url} alt = 'banner'/>

        <StyledFormControl>
            <label htmlFor='fileinput'>
                <StyledAdd fontSize="large" color="secondary" />
            </label>
            <input type = 'file' 
                id="fileinput"
                style={{display: "none"}}
                onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name = 'title' />
                <PublishButton variant="standard" onClick={() => savePost()}>Publish</PublishButton>
        </StyledFormControl>

        <Textarea 
            minRows={5}
            placeholder='Tell your story...'n 
            name='description'
            onChange={(e) => handleChange(e)}
            />

       </Container>
    )
}


export default CreatePost;

