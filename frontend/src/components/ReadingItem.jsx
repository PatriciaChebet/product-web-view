import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export const ReadingItem = ({ book, removeFromReadingList }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 328,
        minWidth: { xs: "345", md: "345" },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={book.coverPhotoURL}
          alt="green iguana"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            gutterBottom
            sx={{ variant: { xs: "h5", sm: "subtitle7", md: "h5" } }}
            component="div"
          >
            {book.title}
          </Typography>
          <Typography variant="h7" color="text.secondary" component="div">
            Written by {book.author}
          </Typography>
          <Typography
            variant="h8"
            color="text.secondary"
            component="div"
            paddingTop={1}
          >
            Reading Level: {book.readingLevel}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="warning"
          variant="outlined"
          onClick={() => removeFromReadingList(book)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};
