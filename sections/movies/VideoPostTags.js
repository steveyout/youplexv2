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

// components

// ----------------------------------------------------------------------

VideoPostTags.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default function VideoPostTags({ movie, setMovie }) {
  let { genres, episodes, seasons } = movie;
  const { query, pathname } = useRouter();
  const { id } = query;
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  //seasons menu
  const [selectedSeason, setSelectedSeason] = useState(seasons[0].name);
  const handleSeasonClick = (event, index) => {
    setSelectedSeason(event.target.value);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeEpisode = async (episodeId, index) => {
    try {
      if (id && episodeId) {
        setLoading(true);
        const response = await axios.get(`/api/episode/${id}`, {
          params: {
            id: id,
            episode: episodeId,
            type: pathname.includes('anime') ? 'anime' : 'movie',
          },
        });

        setMovie((prevState) => ({
          ...prevState,
          sources: response.data.sources,
          subtitles: response.data.subtitles,
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
          <Select value={selectedSeason} label="Season" onChange={handleSeasonClick}>
            {seasons.map((season, index) => (
              <MenuItem value={season.name}>{season.name}</MenuItem>
            ))}
          </Select>
          {episodes &&
            episodes
              .filter(
                (v, i, a) => a.findIndex((v2) => ['season'].every((k) => v2[k] === v[k])) === i
              )
              .map((e, index) => (
                <>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Season {e.season}
                  </Typography>
                  {episodes.map(
                    (episode, index) =>
                      episode.season === e.season && (
                        <Chip
                          key={episode.id}
                          label={episode.title ? episode.title : episode.id}
                          sx={{ m: 0.5 }}
                          color={active === index ? 'primary' : 'default'}
                          onClick={(e) => handleChangeEpisode(episode.id, index)}
                        />
                      )
                  )}
                </>
              ))}
        </Box>
      )}
    </>
  );
}
