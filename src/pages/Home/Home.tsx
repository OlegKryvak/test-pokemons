import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { PokeCard } from "../../components/PokeCard/PokeCard";
import usePokemonAPI from "../../hooks/usePokemon";
import styles from "./Home.module.scss";
import { Pagination } from "@mui/material";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";

const pageSize = 20;

const Home = () => {
  const [pokemonData, setPokemonData] = useState<any>([]);
  const [isDataFromFilter, setIsDataFromFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPages, setAllPages] = useState(0);
  const [loader, setLoader] = useState(true);
  const api = usePokemonAPI();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const typeQueryParam = queryParams.get("type");

  const handleDataFromFilter = async (data: any) => {
    setLoader(true)
    if (data === "all") {
      getPokemonsWithPagination();
      setIsDataFromFilter(false);
    } else {
      setIsDataFromFilter(true);
      setPokemonData(
        await Promise.all(
          data.pokemon.map(async (item: any) => {
            return await api.findPokemon(item.pokemon.name);
          })
        )
      );
    }
    setLoader(false)
  };

  const getPokemonsWithPagination = async () => {
    const offset: number = (currentPage - 1) * pageSize;
    const data = await api.findPokeList(pageSize, offset);
    setPokemonData(
      await Promise.all(
        data.results.map(async (item: any) => {
          return await api.findPokemon(item.name);
        })
      )
    );
    setAllPages(Math.ceil(data.count / 20));
  };

  useEffect(() => {
    if (!typeQueryParam) {
      setCurrentPage(location.state?.currentPage);
      getPokemonsWithPagination();

      const newLocation = {
        ...location,
        state: { ...location.state, currentPage: null },
      };
      window.history.replaceState(
        null,
        "",
        newLocation.pathname + newLocation.search
      );
    }
  }, []);

  useEffect(() => {
    console.log('here');
    setLoader(true);
    
    if (!typeQueryParam) {
      const fetchData = async () => {
        if (!isDataFromFilter) {
          const offset = (currentPage - 1) * pageSize;
          const data = await api.findPokeList(pageSize, offset);
          const pokemonDetails = await Promise.all(
            data.results.map(async (item: any) => {
              return await api.findPokemon(item.name);
            })
          );
          setPokemonData(pokemonDetails);
        }
      };

      fetchData();
      console.log('stop');
      
      

    }
    setLoader(false);
  }, [currentPage]);
  
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    setIsDataFromFilter(false);
  };

  return (
    <>
      <Header />
      <div className={styles.pokemonsContainer}>
        <div className={styles.header}>
          <Filter onDataReceived={handleDataFromFilter} />
        </div>
        {loader ? (
          <div className={styles.loader}>LOADING...</div>
        ) : (
          <div className={styles.pokeCards}>
            {pokemonData?.map((data: any, index: number) => (
              <PokeCard
                currentPage={currentPage}
                className={styles.pokeCard}
                key={index}
                data={data}
              />
            ))}
          </div>
        )}

        <div className={styles.pagination}>
          {isDataFromFilter ? null : (
            <Pagination
              count={allPages}
              variant="outlined"
              shape="rounded"
              size="large"
              color="primary"
              onChange={handlePageChange}
              page={currentPage ? currentPage : 1}
            />
          )}
        </div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
};

export default Home;
