import PropTypes from 'prop-types';
// @mui
import { Box, Chip, Typography, LinearProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//movies
import { MovieDb } from 'moviedb-promise';
import { servers } from '@/utils/servers';
// components

// ----------------------------------------------------------------------

VideoPostTags.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default function VideoPostTags({ movie, setMovie }) {
  let { genres, seasons, external_ids } = movie;
  const { query, pathname } = useRouter();
  const { id } = query;
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState(movie.episodes);
  const { enqueueSnackbar } = useSnackbar();
  const moviedb = new MovieDb(process.env.TMDB_API_KEY);

  //seasons menu
  const [selectedSeason, setSelectedSeason] = useState(seasons ? seasons[0].name : 0);
  const handleSeasonClick = async (event, index) => {
    try {
      if (seasons) {
        await setLoading(true);
        await setSelectedSeason(event.target.value);
        const season = seasons.find((season) => season.name === event.target.value);
        const episodes = await moviedb.seasonInfo({
          id: id,
          season: season.season_number,
        });
        await setEpisodes(episodes);
        await setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar('Oops! Something went wrong', { variant: 'error' });
      console.log(error);
      setLoading(false);
    }
  };

  ///change episode
  const handleChangeEpisode = async (id, season, episode, episodeId, index) => {
    try {
      if (id && episodeId) {
        setLoading(true);
        const server = servers.find((server) => server.name === 'VidSrc');
        const embedUrl = `${server.url}/${id}/${season}-${episode}`;

        setMovie((prevState) => ({
          ...prevState,
          embedUrl: embedUrl,
        }));
        setActive(index);
        setLoading(false);
      }
    } catch (error) {
      enqueueSnackbar('Oops! Something went wrong', { variant: 'error' });
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography variant="h6" sx={{ mb: 5 }}>
          Genres
        </Typography>
        {genres &&
          genres.map((genre) => (
            <Chip key={genre.name} label={genre.name} sx={{ m: 0.5 }} variant={'outlined'} />
          ))}
      </Box>
      {['tv', 'anime'].some((el) => pathname.includes(el)) && (
        <Box sx={{ py: 3 }}>
          <Typography variant="h6" sx={{ mb: 5 }}>
            Seasons & Episodes
            {loading && <LinearProgress />}
          </Typography>
          <Select
            value={selectedSeason}
            label="Season"
            onChange={handleSeasonClick}
            variant={'outlined'}
          >
            {seasons.map((season, index) => (
              <MenuItem value={season.name}>{season.name}</MenuItem>
            ))}
          </Select>

          <Typography variant="subtitle1" sx={{ mb: 2, mt: 3 }}>
            {selectedSeason}
          </Typography>
          {episodes.episodes.map((episode, index) => (
            <Chip
              key={episode.id}
              label={episode.name}
              sx={{ m: 0.5 }}
              color={active === index ? 'primary' : 'default'}
              onClick={(e) =>
                handleChangeEpisode(
                  external_ids.imdb_id,
                  episode.season_number,
                  episode.episode_number,
                  episode.id,
                  index
                )
              }
            />
          ))}
        </Box>
      )}
    </>
  );
}
