import  { useContext, useEffect, useState } from 'react';
import { Container, Box, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, TextField } from '@mui/material';
import { CardContext } from '../../context/cardContext';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';

const MyCart = () => {
  const { user } = useContext(AuthContext);
  const { cartItems, getMyCartProducts, removeFromCart, updateCartQuantity } = useContext(CardContext);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getMyCartProducts();
  }, [user]);

  const handleRemoveFromCart = async (productId) => {
    const success = await removeFromCart(productId);
    if (success) {
      toast.success(`Product ${productId} removed from cart`);
    } else {
      toast.error(`Failed to remove product ${productId} from cart`);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };

  const handleUpdateQuantity = async (productId) => {
    const quantity = quantities[productId] || 1; // Default to 1 if no quantity is set
    const success = await updateCartQuantity(productId, quantity);
    if (success) {
      toast.success(`Quantity updated for product ${productId}`);
    } else {
      toast.error(`Failed to update quantity for product ${productId}`);
    }
  };

  const handleSubmit = () => {
    // Simulate reservation submission
    toast.success("The reservation done successfully");
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          My Cart
        </Typography>
        <Grid container spacing={4}>
          {cartItems && cartItems.length > 0 ? cartItems.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card style={{ minWidth: 200, margin: '0 auto' }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={product.image}
                  alt={product.name}
                  style={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" component="div">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={quantities[product._id] || product.quantity}
                    onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    size="small"
                    margin="normal"
                  />
                </CardContent>
                <CardActions>
                  <Button size="small" color="secondary" onClick={() => handleRemoveFromCart(product._id)}>
                    Remove from Cart
                  </Button>
                  <Button size="small" color="primary" onClick={() => handleUpdateQuantity(product._id)}>
                    Update Quantity
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        :
        <Typography gutterBottom variant="h5" component="div">
          No products in cart
        </Typography>
        }
        </Grid>
        <Box my={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Reservation
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MyCart;