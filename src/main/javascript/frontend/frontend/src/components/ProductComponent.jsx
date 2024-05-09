import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProductComponent = (props) => {
    const imageUrl = props.image
        ? `data:image/png;base64,${Buffer.from(props.image).toString("base64")}`
        : null;

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
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
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
};

export default ProductComponent;
