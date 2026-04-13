import React, { useRef } from 'react';
import styled from 'styled-components';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const ItemContext = styled.div`
  display: flex;
  flex-direction: ${({ $isEven }) => ($isEven ? 'row-reverse' : 'row')};
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 25vh;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 60px;
    margin-bottom: 15vh;
    gap: 2rem;
  }
`;

const ContentCard = styled.div`
  width: 45%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }

  .marker {
    position: absolute;
    top: 24px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    
    ${({ $isEven, theme }) => 
      $isEven 
        ? `left: calc(-11.11% - 6px);` 
        : `right: calc(-11.11% - 6px);`
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: -46px;
      right: auto;
    }
  }

  .date {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    overflow: hidden;
    
    span {
      display: inline-block;
      transform: translateY(100%);
    }
  }

  .title {
    font-size: clamp(2rem, 4vw, 3.5rem);
    line-height: 1;
    margin-bottom: 1rem;
    overflow: hidden;

    span {
      display: inline-block;
      transform: translateY(100%);
    }
  }

  .desc {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
    margin-bottom: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    
    &.extended {
      font-size: 1rem;
      margin-bottom: 0;
    }
  }
`;

const ImageCard = styled.div`
  width: 45%;
  opacity: 0;
  transform: translateY(20px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.5s ease, transform 0.5s ease;
    
    &:hover {
      filter: grayscale(0%);
      transform: scale(1.02);
    }
  }
`;

const Milestone = ({ data, index }) => {
  const containerRef = useRef(null);
  const isEven = index % 2 === 0;

  useGSAP(() => {
    const el = containerRef.current;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(
      el.querySelector('.marker'),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
    )
    .to(el.querySelector('.date span'), {
      y: 0,
      duration: 0.8,
      ease: 'power4.out'
    }, "-=0.4")
    .to(el.querySelector('.title span'), {
      y: 0,
      duration: 1,
      ease: 'power4.out'
    }, "-=0.6")
    .to(el.querySelectorAll('.desc, .image-card'), {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    }, "-=0.7");

  }, { scope: containerRef });

  const formattedDate = new Date(data.date).toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <ItemContext ref={containerRef} $isEven={isEven}>
      <ContentCard $isEven={isEven}>
        <div className="marker" />
        <span className="date">
          <span>{formattedDate}</span>
        </span>
        <h3 className="title">
          <span>{data.title}</span>
        </h3>
        
        {data.description && <p className="desc">{data.description}</p>}
        {data.extendedInfo && <p className="desc extended">{data.extendedInfo}</p>}
      </ContentCard>
      
      {data.image && (
        <ImageCard className="image-card">
          <img src={data.image} alt={data.title} />
        </ImageCard>
      )}
    </ItemContext>
  );
};

export default Milestone;
