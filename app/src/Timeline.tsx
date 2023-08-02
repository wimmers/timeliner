import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

function Item({year, event}: any, onClick: () => void, isFirst=false) {
    return <TimelineItem key={event}>
        <TimelineOppositeContent color="textSecondary">
          {year}
        </TimelineOppositeContent>
        <TimelineSeparator>
          {/* {!isFirst && <TimelineDot />} */}
          <TimelineDot />
          <TimelineConnector
            onClick={onClick}
            sx={{'&:hover': {
                width: 10,
              }}}
          />
        </TimelineSeparator>
        <TimelineContent>{event}</TimelineContent>
      </TimelineItem>
}

export default function GameTimeline({events, onInsert}: any) {
    // console.log(events);
    const children = events.map((item: string, index: number) =>
        Item(
            item,
            () => {
                // console.log("Clicked:", index);
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
      {/* <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          09:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Eat</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="textSecondary">
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>Code</TimelineContent>
      </TimelineItem> */}
    </Timeline>
  );
}
