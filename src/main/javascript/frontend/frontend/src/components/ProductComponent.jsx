import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import {useAuth} from "../context/UseAuth.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {fixPropTypesSort} from "eslint-plugin-react/lib/util/propTypesSort.js";
import Cookies from "js-cookie";

const ProductComponent = (props) => {
    const { isAuthenticated, logout } = useAuth();
    const imageUrl = props.image
        ? `data:image/png;base64,${Buffer.from(props.image).toString("base64")}`
        : null;
    const isAdmin = () => {
        const roles = Cookies.get("userRoles");
        return roles != null && roles.includes("ROLE_ADMIN");
    };


    return (
        <Card style={styles.card}>
            {imageUrl && (
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={props.name}
                    style={styles.media}
                />
            )}
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Cena: {props.price} Kč
                </Typography>
                <Typography variant="body1" color="text.primary">
                    Skladem: {props.inStockCount} ks
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={styles.description}>
                    {props.description}
                </Typography>
                <div style={{ marginTop: '10px' }}>
                    {isAuthenticated && isAdmin && ( // Podmínka pro zobrazení tlačítek pouze pro admina
                        <div>
                            <Button variant="outlined" color="primary" size="small" sx={styles.adminButton}>
                                Upravit
                            </Button>
                        </div>
                    )}
                    {isAuthenticated && isAdmin && (
                        <div>
                            <Button variant="outlined" color="secondary" size="small" sx={styles.adminButton} onClick={props.onDelete}>
                                Odebrat
                            </Button>
                        </div>
                    )}
                </div>
                {isAuthenticated && (
                    <div>
                        <TextField
                            type="number"
                            label="Množství"
                            defaultValue="1"
                            InputProps={{ inputProps: { min: 1, max: props.inStockCount } }}
                            sx={{...styles.quantityInput, width: '80px'}}
                            size="small"
                        />
                        <Button variant="contained" color="primary" size="small" onClick={props.onDelete}>
                            Přidat do košíku
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

const styles = {
    card: {
        maxWidth: 345,
        margin: "10px",
        minHeight: 200,
    },
    media: {
        height: 140,
        objectFit: "cover",
    },
    quantityInput: {
        marginRight: "10px",
    },
    description: {
        marginBottom: '10px',
    },
};

export default ProductComponent;
