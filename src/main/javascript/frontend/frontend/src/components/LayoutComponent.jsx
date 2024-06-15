import React from 'react';
import Navbar from './NavbarComponent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const LayoutComponent = ({ children }) => {
    return (
        <Box>
            <Navbar />
            <Container style={styles.content}>
                {children}
            </Container>
        </Box>
    );
};

const styles = {
    content: {
        padding: '20px',
        marginTop: '10px',
    },
};

export default LayoutComponent;
