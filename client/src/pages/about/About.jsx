import { Container, Typography, Box } from '@mui/material';
import ShoesVideo from '../../assets/shoes1.mp4';

const About = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our platform! We are dedicated to providing you with the best products and services. Our mission is to ensure that you have a seamless shopping experience and find exactly what you need. 
          Whether you're looking for the latest trends or timeless classics, we've got you covered.
        </Typography>
        <Typography variant="body1" paragraph>
          Explore our diverse range of products and find your perfect match. We are committed to delivering high-quality items and exceptional customer service. Thank you for choosing us!
        </Typography>
        <Box my={4}>
          <Typography variant="h6" gutterBottom>
            Check out this video about shoes:
          </Typography>
          <video width="100%" controls autoPlay>
            <source src={ShoesVideo} type="video/mp4" controls autoPlay loop playsInline/>
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>
    </Container>
  );
};

export default About;