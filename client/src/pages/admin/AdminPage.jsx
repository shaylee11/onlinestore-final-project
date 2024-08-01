import React, { useContext, useEffect, useState } from 'react';
import { Container, Box, TextField, Button, Grid, Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
import { CardContext } from '../../context/cardContext';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';

const AdminPage = () => {
  const { cards, getAllCards, deleteProduct, addProduct, editProduct } = useContext(CardContext);
  const { user } = useContext(AuthContext);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '', category: '' });
  const [editingProduct, setEditingProduct] = useState(null); // Track which product is being edited

  useEffect(() => {
    getAllCards();
  }, [user]);

  const handleAddProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProductSubmit = async () => {
    const success = await addProduct(newProduct);
    if (success) {
      toast.success("Product added successfully");
      setNewProduct({ name: '', description: '', price: '', image: '', category: '' });
      getAllCards(); // Refresh the product list
    } else {
      toast.error("Failed to add product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    const success = await deleteProduct(productId);
    if (success) {
      toast.success("Product deleted successfully");
      getAllCards(); // Refresh the product list
    } else {
      toast.error("Failed to delete product");
    }
  };

  const handleEditProductChange = (event) => {
    const { name, value } = event.target;
    setEditingProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProductSubmit = async () => {
    const success = await editProduct(editingProduct._id, editingProduct);
    if (success) {
      toast.success("Product updated successfully");
      setEditingProduct(null);
      getAllCards();
    } else {
      toast.error("Failed to update product");
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  // Extract unique categories from cards
  const uniqueCategories = Array.from(new Set(cards.map(card => card.category)));

  return (
    <Container>
      <Box my={4}>
        {/* Add Product Form */}
        <Box mb={4}>
          <Typography variant="h5">Add New Product</Typography>
          <TextField
            name="name"
            label="Product Name"
            value={newProduct.name}
            onChange={handleAddProductChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={newProduct.description}
            onChange={handleAddProductChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={newProduct.price}
            onChange={handleAddProductChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            name="image"
            label="Image URL"
            value={newProduct.image}
            onChange={handleAddProductChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            name="category"
            label="Category"
            value={newProduct.category}
            onChange={handleAddProductChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddProductSubmit}>
            Add Product
          </Button>
        </Box>

        {/* Display Products */}
        <Grid container spacing={4}>
          {cards && cards.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  {editingProduct && editingProduct._id === product._id ? (
                    <Box>
                      <TextField
                        name="name"
                        label="Product Name"
                        value={editingProduct.name}
                        onChange={handleEditProductChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        name="description"
                        label="Description"
                        value={editingProduct.description}
                        onChange={handleEditProductChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        name="price"
                        label="Price"
                        type="number"
                        value={editingProduct.price}
                        onChange={handleEditProductChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        name="image"
                        label="Image URL"
                        value={editingProduct.image}
                        onChange={handleEditProductChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        name="category"
                        label="Category"
                        value={editingProduct.category}
                        onChange={handleEditProductChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <Button variant="contained" color="primary" onClick={handleEditProductSubmit}>
                        Save
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={cancelEditing}>
                        Cancel
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography variant="h6" component="div">
                        ${product.price.toFixed(2)}
                      </Typography>
                      <CardActions>
                        <Button size="small" color="error" onClick={() => handleDeleteProduct(product._id)}>
                          Delete
                        </Button>
                        <Button size="small" color="primary" onClick={() => startEditing(product)}>
                          Edit
                        </Button>
                      </CardActions>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminPage;