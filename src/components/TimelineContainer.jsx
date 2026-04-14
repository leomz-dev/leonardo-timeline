import React, { useRef } from 'react';
import styled from 'styled-components';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Milestone from './Milestone';

const Container = styled.section`
  position: relative;
  width: 100%;
`;

const ProgressBar = styled.div`
  position: fixed;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 30vh;
  background: rgba(255, 255, 255, 0.08);
  z-index: 100;
  border-radius: 2px;
  overflow: hidden;

  @media (max-width: 768px) {
    left: auto;
    right: 15px;
    height: 10vh;
    top: 20px;
    transform: none;
    opacity: 0.3;
  }
`;

const ProgressFill = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.accent};
  transform-origin: top;
  transform: scaleY(0);
  border-radius: 2px;
`;

const ProgressCounter = styled.div`
  position: fixed;
  left: 40px;
  top: calc(50% + 16vh + 10px);
  z-index: 100;
  font-size: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.15em;
  opacity: 0;

  @media (max-width: 768px) {
    left: auto;
    right: 15px;
    bottom: 20px;
    top: auto;
    font-size: 0.65rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 4px 8px;
    border-radius: 4px;
    backdrop-filter: blur(4px);
  }
`;

const TimelineContainer = ({ milestones }) => {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const counterRef = useRef(null);

  useGSAP(() => {
    // Progress bar fills as you scroll through all milestones
    gsap.to(progressRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });

    // Fade in the counter
    gsap.to(counterRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Update counter text based on scroll
    const total = milestones.length;
    milestones.forEach((_, i) => {
      const milestoneEl = containerRef.current.children[3 + i]; // offset for ProgressBar, ProgressFill, Counter
      if (!milestoneEl) return;
      
      gsap.to({}, {
        scrollTrigger: {
          trigger: milestoneEl,
          start: 'top center',
          onEnter: () => {
            if (counterRef.current) counterRef.current.textContent = `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
          },
          onEnterBack: () => {
            if (counterRef.current) counterRef.current.textContent = `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
          }
        }
      });
    });
  }, { scope: containerRef });

  return (
    <Container ref={containerRef}>
      <ProgressBar>
        <ProgressFill ref={progressRef} />
      </ProgressBar>
      <ProgressCounter ref={counterRef}>01 / {String(milestones.length).padStart(2, '0')}</ProgressCounter>
      {milestones.map((milestone, index) => (
        <Milestone 
          key={milestone.id} 
          data={milestone} 
          index={index}
          total={milestones.length}
        />
      ))}
    </Container>
  );
};

export default TimelineContainer;
