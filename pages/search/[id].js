import orderBy from 'lodash/orderBy';
import { m } from 'framer-motion';
import { useEffect, useCallback, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Button, Container, Stack, Box, Alert, AlertTitle } from '@mui/material';
// hooks
import useSettings from '@/hooks/useSettings';
import useIsMountedRef from '@/hooks/useIsMountedRef';
// utils
import axios from 'axios';
// routes
import { PATH_PAGE, PATH_DASHBOARD } from '@/routes/paths';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import { SkeletonPostItem } from '@/components/skeleton';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
// sections
import { VideoPostCard, VideoPostsSort, VideoPostsSearch } from '@/sections/movies';
import EmptyContent from '@/components/EmptyContent';
import InfiniteScroll from 'react-infinite-scroller';
import { varFade } from '@/components/animate';
import { SearchForm } from "@/sections/forms";

//movies
import { MovieDb } from 'moviedb-promise';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

movies.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};
export default function movies({ search,pages }) {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();
  const { query } = useRouter();

  const { id } = query;

  const [movies, setMovies] = useState(search);
  const [loading, setLoading] = useState(movies.length === 0);
  let [page, setPage] = useState(1);


  const getAllMovies = useCallback(async () => {
    try {
      setLoading(true)
      if (movies && !movies.length) {
        const response = await axios.get(`/api/search/`, {
          params: {query: id},
        });

        if (isMountedRef.current) {
          setMovies(response.movies);
          setLoading(false);
          setPage(page++);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);


  ///more
  const handleLoadMore = useCallback(async () => {
    try {
      if (page>=pages) return;
      if (page===1){
        setPage(page++);
      }
      const response = await axios.get(`/api/search/`, {
        params: {query: id,page:page},
      });

      if (isMountedRef.current) {
        setMovies((prev) => [...prev, ...response.movies]);
        setPage(page++);
      }
    } catch (error) {
      console.error(error);
    }
  }, [page, id, isMountedRef.current]);

  ////////////structured data
  const list=[]
  movies&&movies.map((movie,index)=>{
    list.push({
      "@type": "ListItem",
      "position": index,
      "item": {
        "@type": "Movie",
        "url": PATH_PAGE.movie(movie.title),
        "name": movie.title,
        "image": process.env.TMDB_URL+movie.poster_path,
        "dateCreated": movie.release_date,
      }
    })
  })
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": list
  };

  return (
    <Page title="Youplex movies" structuredData={structuredData}>
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Movies"
            links={[{ name: 'Home', href: '/' }, { name: 'Movies',href: PATH_PAGE.movies },{ name: id,href:PATH_PAGE.filter(id) }]}
          />
          <Stack
            sx={{
              width: '100%',
              position: 'relative',
              zIndex: 10,
            }}
            spacing={2}
            mb={5}
          >
            <m.div variants={varFade().inRight}>
              <Alert variant="filled" severity="info">
                <AlertTitle>Important</AlertTitle>
                Sharing is caring,Remember to spread the word and help others.Join our{' '}
                <a
                  href={'https://t.me/youplexannouncments'}
                  style={{ textDecoration: 'underline', color: 'blue' }}
                >
                  Telegram
                </a>{' '}
                channel for more updates
              </Alert>
            </m.div>
          </Stack>

          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={page>=pages}
            threshold={2500}
            loader={
              <Grid container spacing={3} mt={1}>
                {[...Array(8)].map((post, index) =>
                  post ? (
                    <Grid key={post.id} item xs={12} sm={6} md={3}>
                      <VideoPostCard movie={post} index={index} />
                    </Grid>
                  ) : (
                    <SkeletonPostItem key={index} />
                  )
                )}
              </Grid>
            }
          >
            <Grid container spacing={3}>
              {loading ? (
                [...Array(12)].map((post, index) =>
                  post ? (
                    <Grid key={post.id} item xs={12} sm={6} md={3}>
                      <VideoPostCard movie={post} index={index} />
                    </Grid>
                  ) : (
                    <SkeletonPostItem key={index} />
                  )
                )
              ) : !loading && movies.length === 0 ? (
                <Grid item xs={12} sm={12} md={12}>
                <Box sx={{ width:'100%', margin: 'auto', textAlign: 'center' }}>
                  <EmptyContent
                    title={'No results'}
                    img={'/images/empty.jpg'}
                    description={'Try again'}
                  />
                </Box>
                <Box sx={{margin:2}}>
                <SearchForm />
                </Box>
                </Grid>
              ) : (
                movies.map((post, index) => (
                  <Grid key={post.id} item xs={12} sm={6} md={3}>
                    <VideoPostCard movie={post} index={index} />
                  </Grid>
                ))
              )}
            </Grid>
          </InfiniteScroll>
        </Container>
      </RootStyle>
    </Page>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const moviedb = new MovieDb(process.env.TMDB_API_KEY);
    const search=await moviedb.searchMulti({query:id});
    const pages=search.total_pages;
    const movies=search.results.filter( (item) => item.media_type !== "person");
    return {
      props: {
        search: JSON.parse(JSON.stringify(movies)),
        pages:pages
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.error('error loading data');
    return {
      props: {
        movies: [],
      }, // will be passed to the page component as props
    };
  }
}
