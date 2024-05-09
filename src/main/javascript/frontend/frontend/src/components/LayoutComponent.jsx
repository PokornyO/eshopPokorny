import React from 'react';
import Navbar from './NavbarComponent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const LayoutComponent = ({ children }) => {
    return (
        <Box>
            <Navbar /> {/* Navbar nahoře */}
            <Container style={styles.content}> {/* Container pro obsah */}
                {children}
            </Container>
        </Box>
    );
};

const styles = {
    content: {
        padding: '20px', // Vloží trochu prostoru kolem obsahu
        marginTop: '10px', // Oddělí obsah od navbaru
    },
};

export default LayoutComponent;
