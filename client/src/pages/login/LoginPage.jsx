import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import validator from 'validator';

const LoginPage = () => {
    const { handleLogin, error } = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = form;
        // Validate form inputs
        if (email.trim() === '' || password.trim() === '') {
            setErrorMessage('Both fields are required.');
            toast.error(error)
        } else if (!validator.isEmail(email)) {
            setErrorMessage('Invalid email format.');
            toast.error(error)
        } else {
            setErrorMessage('');
            // Handle form submission
            const success = await handleLogin({ email, password });
            if (success) {
                toast.success("User logged in successfully");
                navigate("/home");
            }
            toast.error(error || "incorrect password")
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    {errorMessage && (
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                    <Box mt={2}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;