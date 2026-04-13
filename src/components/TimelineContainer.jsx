import React from 'react';
import styled from 'styled-components';
import Milestone from './Milestone';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 10vh 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    background: ${({ theme }) => theme.colors.border};
    transform: translateX(-50%);

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 20px;
    }
  }
`;

const TimelineContainer = ({ milestones }) => {
  return (
    <Container>
      {milestones.map((m, index) => (
        <Milestone key={m.id} data={m} index={index} />
      ))}
    </Container>
  );
};

export default TimelineContainer;
