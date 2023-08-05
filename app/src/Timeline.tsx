import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { event } from './Decks';

function Item(
  {event: { year, event, info, url, thumbnailUrl, misplaced }, onClick}:
  {event: event, onClick: () => void}
) {
  const isBig = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
  const headlineColor = misplaced ? 'error' : 'secondary';
  return <TimelineItem key={event}>
    <TimelineOppositeContent pl={{xs: 0, sm: 2}}>
      <Typography color="textSecondary">
        {year}
      </Typography>
      <Box mt={1} width={{xs: 120, sm: 150}}>
      {
        thumbnailUrl ?
        <img
          src={thumbnailUrl} alt={event}
          style={isBig ? {maxHeight: 100} : {maxHeight: 100, marginRight: -10, maxWidth: '100%'}}
        /> : undefined
      }
      </Box>
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot />
      <TimelineConnector
        sx={isBig ?
          {
            '&:hover': {
              width: 5,
            },
          }
          : {}
        }
      >
        <Button onClick={onClick} sx={{ left: -30, height: 1 }} />
      </TimelineConnector>
    </TimelineSeparator>
    <TimelineContent pr={{xs: 0, sm: 2}} sx={{ py: 0.5 }}>
      {url ?
        <Link
          variant='subtitle1' href={url} underline='hover' color={headlineColor}
          target='_blank' rel='noreferrer'
        >
          {event}
        </Link> :
        <Typography variant='subtitle1' color={headlineColor}>
          {event}
        </Typography>
      }
      <Typography>
        {info}
      </Typography>
    </TimelineContent>
  </TimelineItem>
}

export default function GameTimeline({ events, onInsert }: any) {
  const children = events.map((item: event, index: number) =>
    <Item
      event={item}
      onClick={() => onInsert(index)}
    />
  );
  const timelineStyle: any = {
    [`& .${timelineOppositeContentClasses.root}`]: {
      flex: 0.2,
    }
  };
  if (!useMediaQuery((theme: any) => theme.breakpoints.up('sm'))) {
    timelineStyle.px = 0
  }
  
  return (
    <Timeline
      sx={timelineStyle}
    >
      {
        <Item
          event={{ year: "", event: "", timestamp: Number.NEGATIVE_INFINITY }}
          onClick={() => onInsert(-1)}
        />
      }
      {children}
    </Timeline>
  );
}
