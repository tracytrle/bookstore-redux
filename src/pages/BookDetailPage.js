import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../apiService";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { getDetailBook, addToReadingList } from "../components/book/bookSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const dispatch = useDispatch();
  const detailBook = useSelector((state) => state.book.bookDetail);
  const status = useSelector((state) => state.book.status);

  const params = useParams();
  const bookId = params.id;

  useEffect(() => {
    dispatch(getDetailBook(bookId));
  }, [bookId, dispatch]);

  return (
    <Container>
      {status ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {detailBook && (
              <img
                width="100%"
                src={`${BACKEND_API}/${detailBook.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {detailBook && (
              <Stack>
                <h2>{detailBook.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {detailBook.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {detailBook.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {detailBook.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {detailBook.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {detailBook.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => dispatch(addToReadingList(detailBook))}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
