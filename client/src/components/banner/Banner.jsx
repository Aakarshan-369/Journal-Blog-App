
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://i.pinimg.com/originals/c0/9b/92/c09b92df282811f76db635f9bb15eac2.jpg) center/100% repeat-x #000;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
font-size: 70px;
color: #FFFFFF;
backdrop-filter: blur(5px); 
border-radius: 6px;
box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
background-image:linear-gradient(to bottom right, rgba(255,255,255,0), rgba(255,255,255,0));
line-height: 1;

`;

const SubHeading = styled(Typography)`
font-size: 20px;
color: white;       
backdrop-filter: blur(5px); 
border-radius: 6px;
box-shadow: 25px 25px 25px rgba(30, 30, 30, 0.3);
background-image:linear-gradient(to bottom right, rgba(255,255,255,0), rgba(255,255,255,0));
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>Blog and Journal </Heading>
            <SubHeading>Aakarshan</SubHeading>
        </Image>
    )
}

export default Banner;