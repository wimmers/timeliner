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
import { event } from './Decks';

function Item(
  {event: { year, event }, onClick}: {event: event, onClick: () => void}
) {
  const isBig = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
  return <TimelineItem key={event}>
    <TimelineOppositeContent color="textSecondary">
      {year}
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot />
      <TimelineConnector
        sx={isBig ?
          {
            '&:hover': {
              width: 10,
            },
          }
          : {}
        }
      >
        <Button onClick={onClick} sx={{ left: -30, height: 40 }} />
      </TimelineConnector>
    </TimelineSeparator>
    <TimelineContent>{event}</TimelineContent>
  </TimelineItem>
}

export default function GameTimeline({ events, onInsert }: any) {
  const children = events.map((item: event, index: number) =>
    <Item
      event={item}
      onClick={() => onInsert(index)}
    />
  );
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
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
