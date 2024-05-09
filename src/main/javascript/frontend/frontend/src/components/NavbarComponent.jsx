import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom'; // Link s MUI kompatibilní s React Routerem

const Navbar = () => {
    return (
        <AppBar position="fixed"> {/* Pevné umístění navbaru */}
            <Toolbar> {/* Uspořádání prvků v rámci navbaru */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}> {/* Název nebo logo */}
                    Moje Aplikace
                </Typography>
                {/* Odkazy do jiných částí aplikace */}
                <Button color="inherit" component={RouterLink} to="/">Domů</Button>
                <Button color="inherit" component={RouterLink} to="/products">Produkty</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
