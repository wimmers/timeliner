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

function Item({year, event}: any, onClick: () => void, isFirst=false) {
    return <TimelineItem key={event}>
        <TimelineOppositeContent color="textSecondary">
          {year}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector
            sx={{
              '&:hover': {
                width: 10,
              },
            }}
          >
            <Button onClick={onClick} sx={{left: -30, height: 40}}/>
          </TimelineConnector>
        </TimelineSeparator>
        <TimelineContent>{event}</TimelineContent>
      </TimelineItem>
}

export default function GameTimeline({events, onInsert}: any) {
    const children = events.map((item: string, index: number) =>
        Item(
            item,
            () => {
                onInsert(index);
            }
        )
    );
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {Item({year: "", event: ""}, () => onInsert(-1), true)}
      {children}
    </Timeline>
  );
}
