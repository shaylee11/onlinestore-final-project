import  { useContext, useState } from 'react';
import validator from 'validator';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const SignupPage = () => {
    const { handleSignup } = useContext(AuthContext);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        if (name === 'password') {
            if (validator.isStrongPassword(value)) {
                setPasswordError('');
            } else {
                setPasswordError('Password is not strong enough');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = form;
        if (validator.isStrongPassword(password) && validator.isEmail(email)) {
            const success = await handleSignup({ name, email, password });
            if (success) {
                toast.success("User signed up successfully");
                navigate("/login");
            }
        } else {
            if (!validator.isEmail(email)) {
                toast.error("Invalid email format");
            }
            if (!validator.isStrongPassword(password)) {
                setPasswordError('Password is not strong enough');
                toast.error("Password is not strong enough");
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Signup
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </Box>
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
                        {passwordError && (
                            <Typography variant="body2" color="error">
                                {passwordError}
                            </Typography>
                        )}
                    </Box>
                    <Box mt={2}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Signup
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default SignupPage;