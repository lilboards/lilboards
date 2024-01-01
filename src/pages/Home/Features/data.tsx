import BoltIcon from '@mui/icons-material/Bolt';
import GitHubIcon from '@mui/icons-material/GitHub';
import LockIcon from '@mui/icons-material/Lock';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import MoodIcon from '@mui/icons-material/Mood';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Link from '@mui/material/Link';

export const features = [
  {
    icon: MoneyOffIcon,
    heading: 'Free',
    description: 'Free for personal or commercial use.',
  },

  {
    icon: BoltIcon,
    heading: 'Fast',
    description: 'Work in real-time with others—online and offline.',
  },

  {
    icon: MoodIcon,
    heading: 'Fun',
    description: 'Collaborate in a delightful and accessible interface.',
  },

  {
    icon: ShowChartIcon,
    heading: 'Scalable',
    description:
      'Create unlimited boards, columns, and items. Connect with up to 100 participants.',
  },

  {
    icon: LockIcon,
    heading: 'Reliable',
    description: 'Data is encrypted in transit and stored securely.',
  },

  {
    icon: GitHubIcon,
    heading: 'Transparent',
    description: (
      <>
        <Link
          href="https://b.remarkabl.org/lilboards"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open sourced
        </Link>{' '}
        under the MIT license.
      </>
    ),
  },
];
