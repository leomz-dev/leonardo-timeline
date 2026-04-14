import React, { useRef } from 'react';
import styled from 'styled-components';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

/* Each milestone is a full-viewport "tunnel section" */
const TunnelSection = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 10vh 8vw;

  @media (max-width: 768px) {
    padding: 12vh 10vw 8vh;
    min-height: auto;
    height: auto;
    align-items: flex-start;
  }
  
  @media (max-width: 480px) {
    padding: 10vh 12vw 5vh;
  }
`;

/* The inner card that holds text + image side by side */
const CardInner = styled.div`
  display: flex;
  flex-direction: ${({ $hasImage, $isEven }) =>
    !$hasImage ? 'column' : ($isEven ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: center;
  gap: ${({ $hasImage }) => ($hasImage ? '6vw' : '0')};
  max-width: 1300px;
  width: 100%;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: flex-start;
  }
`;

const YearBadge = styled.div`
  position: absolute;
  top: 5vh;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
  opacity: 0;

  span {
    font-family: ${({ theme }) => theme.fonts.display};
    /* Ajustamos el tamaño para que los rangos (2020-2022) no se vean gigantes comparados con años solos */
    font-size: ${props => props.$isLong ? 'clamp(4rem, 11vw, 8rem)' : 'clamp(6rem, 18vw, 14rem)'};
    font-weight: 900;
    color: rgba(255, 255, 255, 0.12);
    letter-spacing: -0.05em;
    line-height: 1;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    top: 6vh;
    span {
      font-size: ${props => props.$isLong ? 'clamp(3rem, 15vw, 5rem)' : 'clamp(4rem, 25vw, 8rem)'};
      color: rgba(255, 255, 255, 0.08);
    }
  }
`;



const TextBlock = styled.div`
  flex: 1;
  max-width: ${({ $hasImage }) => ($hasImage ? '550px' : '700px')};
  text-align: ${({ $hasImage }) => ($hasImage ? 'left' : 'center')};
  display: flex;
  flex-direction: column;
  align-items: ${({ $hasImage }) => ($hasImage ? 'flex-start' : 'center')};
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: left;
    align-items: flex-start;
  }
`;

const DateLabel = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-bottom: 1.2rem;
  opacity: 0;
  transform: translateY(20px);
`;

const Title = styled.h3`
  font-size: clamp(1.8rem, 6vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 1.2rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 9vw, 2.2rem);
    line-height: 1.25;
    margin-bottom: 1rem;
  }

  span {
    display: inline-block;
    transform: translateY(110%);
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.2rem, 1.25rem);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  font-weight: 300;

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const ExtendedInfo = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  opacity: 0;
  transform: translateY(20px);
  padding: ${({ $hasImage }) => ($hasImage ? '0.5rem 0 0.5rem 1.5rem' : '1.5rem 0 0 0')};
  margin-top: ${({ $hasImage }) => ($hasImage ? '0' : '0.5rem')};

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 0 0 0;
    margin-top: 1rem;
  }
`;

const ImageBlock = styled.div`
  flex: 1;
  max-width: 580px;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  aspect-ratio: 4 / 3;
  opacity: 0;
  transform: scale(0.9);
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #111;
  z-index: 2;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 1rem;
    order: -1; /* Always image first on mobile stack */
  }

  .img-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 19px; /* Slightly smaller to fit inside border */
  }

  img {
    position: absolute;
    top: -12.5%; /* Correctly position to account for 125% height */
    left: 0;
    width: 100%;
    height: 125%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.1);
    will-change: transform, filter;
  }

  .img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.4));
    pointer-events: none;
  }
`;

/* Horizontal line divider between sections */
const SectionDivider = styled.div`
  width: 60px;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
`;

/* ===== DUAL MILESTONE (two side-by-side text blocks) ===== */
const DualCard = styled.div`
  display: flex;
  gap: 8vw;
  max-width: 1300px;
  width: 100%;
  align-items: flex-start;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const DualColumn = styled.div`
  flex: 1;
  z-index: 2;

  @media (max-width: 768px) {
    &:first-child {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 2rem;
    }
  }
`;

const DualDateLabel = styled(DateLabel)``;
const DualTitle = styled(Title)``;
const DualDescription = styled(Description)``;
const DualExtendedInfo = styled(ExtendedInfo)`
  border-left: 2px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  padding: 0 0 0 1.25rem;
  margin-top: 0;

  @media (max-width: 768px) {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 0 0 0;
    margin-top: 1rem;
  }
`;

/* ===== COMPONENT ===== */
const Milestone = ({ data, index, total }) => {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const isEven = index % 2 === 0;
  const hasImage = !!data.image;

  // Extract year for the giant background watermark
  const yearLabel = data.isDual
    ? `${data.left.date.substring(0, 4)}—${data.right.date.substring(0, 4)}`
    : data.date.substring(0, 4);
  const isLongYear = yearLabel.length > 5;

  useGSAP(() => {
    const el = sectionRef.current;

    /* --- Tunnel entry: content starts scaled down and far, then emerges --- */
    const entryTl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'top 20%',
        scrub: 1.2
      }
    });

    entryTl
      .fromTo(el.querySelector('.card-inner'), {
        scale: 0.7,
        opacity: 0,
        y: 80
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      })
      .fromTo(el.querySelector('.year-badge'), {
        scale: 0.8,
        opacity: 0,
        y: 20
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
      }, 0);

    /* --- Tunnel exit: content scales up and flies past camera --- */
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'bottom 70%',
        end: 'bottom -10%',
        scrub: 1.2
      }
    });

    exitTl.to(el.querySelector('.card-inner'), {
      scale: 1.15,
      opacity: 0,
      y: -60,
      ease: 'power2.in'
    });

    /* --- Inner element reveals (not scrubbed, plays once) --- */
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 55%',
        toggleActions: 'play none none reverse'
      }
    });

    revealTl
      .to(el.querySelectorAll('.date-label'), {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1
      })
      .to(el.querySelectorAll('.title-text'), {
        y: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1
      }, '-=0.5')
      .to(el.querySelectorAll('.desc-text'), {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.08
      }, '-=0.6')
      .to(el.querySelectorAll('.image-block'), {
        opacity: 1, scale: 1, duration: 1, ease: 'expo.out'
      }, '-=0.8')
      .to(el.querySelector('.section-divider'), {
        scaleX: 1, duration: 0.8, ease: 'power2.inOut'
      }, '-=0.5');

    /* --- Color reveal: B/W to Color while in view --- */
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        filter: 'grayscale(0%) contrast(1)',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          toggleActions: 'play reverse play reverse'
        }
      });
    }

    /* --- Parallax on the image --- */
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, {
        yPercent: -5
      }, {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, { scope: sectionRef });

  // Format dates
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  const formatShortDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' });

  /* ===== DUAL RENDER ===== */
  if (data.isDual) {
    return (
      <TunnelSection ref={sectionRef}>
        <YearBadge className="year-badge" $isLong={isLongYear}><span>{yearLabel}</span></YearBadge>
        <DualCard className="card-inner">
          <DualColumn>
            <DualDateLabel className="date-label">{formatShortDate(data.left.date)}</DualDateLabel>
            <DualTitle><span className="title-text">{data.left.title}</span></DualTitle>
            {data.left.description && <DualDescription className="desc-text">{data.left.description}</DualDescription>}
            {data.left.extendedInfo && <DualExtendedInfo className="desc-text" $hasImage={false}>{data.left.extendedInfo}</DualExtendedInfo>}
          </DualColumn>
          <DualColumn>
            <DualDateLabel className="date-label">{formatShortDate(data.right.date)}</DualDateLabel>
            <DualTitle><span className="title-text">{data.right.title}</span></DualTitle>
            {data.right.description && <DualDescription className="desc-text">{data.right.description}</DualDescription>}
            {data.right.extendedInfo && <DualExtendedInfo className="desc-text" $hasImage={false}>{data.right.extendedInfo}</DualExtendedInfo>}
          </DualColumn>
        </DualCard>
        <SectionDivider className="section-divider" />
      </TunnelSection>
    );
  }

  /* ===== STANDARD RENDER ===== */
  return (
    <TunnelSection ref={sectionRef}>
      <YearBadge className="year-badge" $isLong={isLongYear}><span>{yearLabel}</span></YearBadge>
      <CardInner className="card-inner" $hasImage={hasImage} $isEven={isEven}>
        <TextBlock $hasImage={hasImage}>
          <DateLabel className="date-label">{formatDate(data.date)}</DateLabel>
          <Title><span className="title-text">{data.title}</span></Title>
          {data.description && <Description className="desc-text">{data.description}</Description>}
          {data.extendedInfo && <ExtendedInfo className="desc-text" $hasImage={hasImage}>{data.extendedInfo}</ExtendedInfo>}
        </TextBlock>

        {hasImage && (
          <ImageBlock className="image-block">
            <div className="img-inner">
              <img ref={imgRef} src={data.image} alt={data.title} />
            </div>
            <div className="img-overlay" />
          </ImageBlock>
        )}
      </CardInner>
      <SectionDivider className="section-divider" />
    </TunnelSection>
  );
};

export default Milestone;
