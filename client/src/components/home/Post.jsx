
import { styled, Box, Typography } from '@mui/material';

import { addEllipsis } from '../../utils/common-utils';


const Container = styled(Box)`
    border: 5px solid transparent;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
    backdrop-filter: blur(50px); 
    border-radius:10px;
    transition: all 0.3s ease;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
    &:hover {

        background: #f913fa;
        box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
        background-image:linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
      }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    

    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    )
}

export default Post;