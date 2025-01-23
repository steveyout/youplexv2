import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography, CardContent, Link, Stack } from '@mui/material';
import Avatar from '@/components/Avatar';
// routes
import { PATH_PAGE } from '@/routes/paths';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { useRouter } from 'next/router';
// utils
import { fDate } from '@/utils/formatTime';
import { fShortenNumber } from '@/utils/formatNumber';
// components
import Image from '@/components/Image';
import Iconify from '@/components/Iconify';
import TextMaxLine from '@/components/TextMaxLine';
import SvgIconStyle from '@/components/SvgIconStyle';
import TextIconLabel from '@/components/TextIconLabel';
import stc from 'string-to-color';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import createAvatar from '@/utils/createAvatar';
import useAuth from '@/hooks/useAuth';
import Label from '@/components/Label';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

VideoPostCard.propTypes = {
  movie: PropTypes.object.isRequired,
  index: PropTypes.number,
  status: PropTypes.string,
};

export default function VideoPostCard({ movie, index }) {
  const isDesktop = useResponsive('up', 'md');
  const {  adult,
    backdrop_path,
    name,
    belongs_to_collection,
    budget,
    genres,
    homepage,
    id,
    imdb_id,
    origin_country,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    status,
    tagline,
    title,
    video,
    vote_average,
    vote_count } = movie;

  const latestPost = index === 0 || index === 1 || index === 2 || index === 3;

  if (isDesktop && latestPost) {
    return (
      <Card>
        <Avatar
          alt={title}
          src={process.env.TMDB_URL+backdrop_path}
          sx={{
            zIndex: 9,
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            position: 'absolute',
          }}
        />
        <PostContent
          title={title!==undefined?title:name}
          voteAverage={vote_average}
          voteCount={vote_count}
          popularity={popularity}
          createdAt={release_date}
          type={title!==undefined?'movie':'tv'}
          id={id}
          index={index}
        />
        <OverlayStyle />
        <Image alt="cover" src={process.env.TMDB_URL+poster_path} sx={{ height: 360 }} />
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'live' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <SvgIconStyle
          src="/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={title}
          src={process.env.TMDB_URL+backdrop_path}
          color={process.env.TMDB_URL+backdrop_path ? 'default' : createAvatar(title).color}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
        <Image alt="cover" src={process.env.TMDB_URL+poster_path} ratio="4/3" />
      </Box>

      <PostContent
        title={title!==undefined?title:name}
        voteAverage={vote_average}
        voteCount={vote_count}
        popularity={popularity}
        createdAt={release_date}
        index={index}
        type={title!==undefined?'movie':'tv'}
        id={id}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  voteAverage: PropTypes.number,
  id: PropTypes.number,
  createdAt: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
  type: PropTypes.string,
  voteCount: PropTypes.number,
  popularity: PropTypes.number,
};

export function PostContent({ title, voteAverage, voteCount,popularity, createdAt, index, id,type }) {
  const isDesktop = useResponsive('up', 'md');
  console.log(type);
  const linkTo =type==='movie'?PATH_PAGE.movie(paramCase(title)+'?id='+id):PATH_PAGE.tv(paramCase(title)+'?id='+id);
  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2 || index === 3;

  const POST_INFO = [
    { number: voteAverage, icon: 'material-symbols:star-rate' },
    { number: voteCount, icon: 'solar:like-bold-duotone' },
    { number: popularity, icon: 'solar:fire-bold' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {createdAt}
      </Typography>

      <NextLink href={linkTo} passHref>
        <Link color="inherit">
          <TextMaxLine
            variant={'subtitle2'}
            line={2}
            persistent
          >
            {title}
          </TextMaxLine>
        </Link>
      </NextLink>
      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="space-evenly"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}
