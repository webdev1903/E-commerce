import { Grid, Box, GridItem, Image, Text, Button } from "@chakra-ui/react";
import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useParams } from "react-router-dom";

const maintainPage = (value) => {
  value = +value;
  if (typeof value === "number" && value <= 0) {
    value = 1;
  }
  if (!value) {
    value = 1;
  }
  return value;
};

export default function Product() {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  let initPage = maintainPage(searchParams.get("page"));
  const [page, setPage] = useState(initPage);
  const totalPages = useRef(null);
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    handleData(page);
  }, [page]);

  useEffect(() => {
    setSearchParams({ page });
  }, [page]);

  const handleData = async (page = 1) => {
    const res = await axios.get(
      `http://localhost:2345/products?page=${page}&limit=8`
    );
    console.log(res);
    setData(res.data.products);
    totalPages.current = res.data.pages;
    // console.log(totalPages);
  };

  return (
    <Box>
      <Grid
        templateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(4,1fr)"]}
        align="center"
        justify="space-between"
      >
        {data.map((e) => (
          <GridItem key={e.id}>
            <ProductCard
              image={e.image}
              price={e.price}
              title={e.title}
              ratings={e.rating}
            />
          </GridItem>
        ))}
      </Grid>
      <Box>
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          PREV
        </Button>
        <Button>{page}</Button>
        <Button
          disabled={page === totalPages.current}
          onClick={() => setPage((prev) => prev + 1)}
        >
          NEXT
        </Button>
      </Box>
    </Box>
  );
}
