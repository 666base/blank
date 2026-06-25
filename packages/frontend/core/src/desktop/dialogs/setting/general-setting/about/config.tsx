import { getBlankGithubUrl } from '../../../../utils/blank-links';
import {
  DiscordIcon,
  GithubIcon,
  RedditIcon,
  TwitterIcon,
  YouTubeIcon,
} from './icons';

export const relatedLinks = [
  {
    icon: <GithubIcon />,
    title: 'GitHub',
    link: getBlankGithubUrl(),
  },
  {
    icon: <TwitterIcon />,
    title: 'X',
    link: getBlankGithubUrl(),
  },
  {
    icon: <DiscordIcon />,
    title: 'Discord',
    link: BUILD_CONFIG.discordUrl,
  },
  {
    icon: <YouTubeIcon />,
    title: 'YouTube',
    link: getBlankGithubUrl(),
  },
  {
    icon: <RedditIcon />,
    title: 'Reddit',
    link: getBlankGithubUrl(),
  },
];
