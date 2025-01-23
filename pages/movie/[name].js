import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Container, Stack, Tooltip, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '@/routes/paths';
// hooks
import useSettings from '@/hooks/useSettings';
import useIsMountedRef from '@/hooks/useIsMountedRef';
// utils
import axios from '@/utils/axios';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import { SkeletonPost } from '@/components/skeleton';
// sections
import { VideoPostHero, VideoPostTags, VideoPostRecent, VidstackPlayer } from '@/sections/movies';
import Iconify from '@/components/Iconify';
import { useSnackbar } from 'notistack';
//movies
import { MovieDb } from 'moviedb-promise';
import { servers } from '@/utils/servers';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

MoviePage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MoviePage({ data }) {
  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { query } = useRouter();

  const { id } = query;
  const [movie, setMovie] = useState(data);
  const [loading, setLoading] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState(null);
  const [server, setCurrentServer] = useState({
    server: 'VidSrc',
    isChanging: false,
  });

  const getMovie = useCallback(
    async (server, isChanging) => {
      try {
        if (!movie || isChanging) {
          setLoading(true);
          const response = await axios.get(`/api/movie/${id}`, { params: { server: server } });

          if (isMountedRef.current) {
            setMovie(response.data);
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        enqueueSnackbar('Oops! Something went wrong,Please try again later', { variant: 'error' });
      }
    },
    [isMountedRef]
  );

  //get movie embed url

  useEffect(() => {
    getMovie(server.server, server.isChanging);
  }, [getMovie, server]);

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Movie',
    'name': movie ? sentenceCase(movie.title) : sentenceCase(id),
    'productionCompany': {
      '@type': 'Organization',
      'name': movie && movie.production,
    },
    'countryOfOrigin': {
      '@type': 'Country',
      'name': movie && movie.country,
    },
  };
  return (
    <Page
      title={movie ? sentenceCase(movie.title) : sentenceCase(id)}
      meta={
        <>
          <meta name="description" content={movie ? movie.description : id} />
          <meta
            name="keywords"
            content={movie ? `${movie.tags} ${movie.genres} ${movie.casts}` : ''}
          />
        </>
      }
      structuredData={structuredData}
    >
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Movie"
            links={[
              { name: 'Home', href: '/' },
              { name: 'Movies', href: PATH_PAGE.movies },
              { name: movie ? sentenceCase(movie.title) : sentenceCase(id) },
            ]}
          />

          {!loading && (
            <Card>
              <iframe src={movie.embedUrl} />

              <Box sx={{ p: { xs: 3, md: 5 } }}>
                <Stack flexWrap="wrap" direction="row" justifyContent="space-between">
                  <Typography variant="h6" sx={{ mb: 5 }}>
                    {movie.title}
                  </Typography>

                  <Box>
                    <Tooltip title={`Join Telegram channel`}>
                      <NextLink href={'https://t.me/youplexannouncments'} passHref>
                        <Button variant="contained" startIcon={<Iconify icon={'la:telegram'} />}>
                          Telegram
                        </Button>
                      </NextLink>
                    </Tooltip>
                    <Box sx={{ m: 3 }} />
                    <Tooltip title={`Join Our Discord`}>
                      <NextLink href={'https://discord.gg/5eWu9Vz6tQ'} passHref>
                        <Button
                          variant="contained"
                          color={'secondary'}
                          startIcon={<Iconify icon={'iconoir:discord'} />}
                        >
                          Discord
                        </Button>
                      </NextLink>
                    </Tooltip>
                  </Box>
                </Stack>
                <Box>
                  <VideoPostTags movie={movie} />
                </Box>
                {movie.overview}
              </Box>
            </Card>
          )}

          {loading && !error && <SkeletonPost />}

          {error && <Typography variant="h6">404 {error}!</Typography>}

          {!loading && <VideoPostRecent posts={movie.recommended} />}
        </Container>
      </RootStyle>
    </Page>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.query.id;
    const server = servers.find((server) => server.name === 'VidSrc');
    const moviedb = new MovieDb(process.env.TMDB_API_KEY);
    const movie = await moviedb.movieInfo({ id: id });
    const similar = await moviedb.movieSimilar({ id: id });
    movie.recommended = await similar.results;
    movie.embedUrl = `${server.url}/${id}`;
    console.log(movie);

    return {
      props: {
        data: movie,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: null,
      }, // will be passed to the page component as props
    };
  }
}
