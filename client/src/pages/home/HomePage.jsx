import { useContext, useEffect, useState } from 'react';
import { Container, Box, Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, MenuItem, FormControl, Select, InputLabel, TextField } from '@mui/material';
import { CardContext } from '../../context/cardContext';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';

const priceRanges = [
  { label: '0-100', min: 0, max: 100 },
  { label: '100-200', min: 100, max: 200 },
  { label: '200-400', min: 200, max: 400 },
  { label: '400-1000', min: 400, max: 1000 },
  { label: 'Above 1000', min: 1000, max: Infinity }
];

const HomePage = () => {
  const { cards, getAllCards, searchCardsByName, addToCart, error } = useContext(CardContext);
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllCards();
  }, [user]);

  const handleAddToCart = async (productId) => {
    const success = await addToCart(productId);
    if(success) toast.success("card added successfully");
    if(!success) toast.error(error || "Failed to add card");
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    const priceRange = priceRanges.find(range => range.label === selectedPriceRange);
    getAllCards(category, priceRange ? priceRange.min : '', priceRange ? priceRange.max : '');
  };

  const handlePriceRangeChange = (event) => {
    const priceRangeLabel = event.target.value;
    setSelectedPriceRange(priceRangeLabel);
    const priceRange = priceRanges.find(range => range.label === priceRangeLabel);
    getAllCards(selectedCategory, priceRange ? priceRange.min : '', priceRange ? priceRange.max : '');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    searchCardsByName(event.target.value);
  };

  // Extract unique categories from cards
  const uniqueCategories = Array.from(new Set(cards.map(card => card.category)));

  return (
    <Container>
      <Box my={4}>
        <TextField
          label="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {uniqueCategories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="price-range-label">Price Range</InputLabel>
          <Select
            labelId="price-range-label"
            id="price-range-select"
            value={selectedPriceRange}
            onChange={handlePriceRangeChange}
            label="Price Range"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {priceRanges.map((range, index) => (
              <MenuItem key={index} value={range.label}>
                {range.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={4}>
          {cards && cards.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card style={{ minWidth: 200 }}>
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
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleAddToCart(product._id)}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )} */}
      </Box>
    </Container>
  );
};

export default HomePage;