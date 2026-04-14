import React, { useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

import TimelineContainer from './components/TimelineContainer';
import Background3D from './components/Background3D';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const Intro = styled.section`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto 10vh;
  max-width: 1400px;
  width: 100%;
  position: relative;
  padding: 0 10vw;

  @media (max-width: 768px) {
    height: 80vh;
    padding: 0 10vw;
    margin-bottom: 8vh;
  }

  @media (max-width: 480px) {
    padding: 0 12vw;
  }

  h1 {
    font-size: clamp(2.5rem, 12vw, 9rem);
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.05em;
    overflow: hidden;
    margin-bottom: 2rem;
    font-weight: 900;
    
    .line {
      display: block;
      transform: translateY(110%);
      opacity: 0;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    @media (max-width: 480px) {
      font-size: clamp(2rem, 15vw, 4rem);
      line-height: 1;
    }
  }

  p {
    font-size: clamp(1rem, 4vw, 1.8rem);
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 700px;
    line-height: 1.5;
    font-weight: 300;

    @media (max-width: 480px) {
      font-size: 1.1rem;
    }

    .word {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 5vh;
  left: 8vw;
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0;

  @media (max-width: 768px) {
    left: 6vw;
  }
  
  .line {
    width: 40px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    transform-origin: left;
    transform: scaleX(0);
  }
  
  span {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

function App() {
  const milestones = [
    {
      id: '2018',
      title: 'Un Nuevo Comienzo Escolar',
      date: '2018-02-01',
      description: 'Ingreso a 4º grado en la IED Técnico Bilingüe Jorge Nicolás Abello',
      extendedInfo: 'El inicio de una gran transición. Entrar a un colegio bilingüe representó no solo un reto académico y el enfrentarme a un mundo de nuevos idiomas, sino adquirir una perspectiva mucho más amplia que empezó a moldear todo mi futuro y forma de pensar.',
      image: '/images/2018.png'
    },
    {
      id: '2020-2022',
      isDual: true,
      left: {
        title: 'El Mundo en Pausa',
        date: '2020-03-20',
        description: 'Pandemia y re-adaptación a la clase virtual.',
        extendedInfo: 'Adaptarme a las clases 100% virtuales me enseñó resiliencia, muchísima disciplina y a conectar con mis compañeros y profesores a través de una pantalla durante un largo periodo de incertidumbre mundial.'
      },
      right: {
        title: 'El Retorno a Clases',
        date: '2022-02-01',
        description: 'Vuelta a la presencialidad, ya cursando el bachillerato en 7º grado.',
        extendedInfo: 'Volver a pisar las aulas se sintió literalmente como una segunda "primera vez". Ya en bachillerato, el reencuentro con el entorno trajo consigo un renovado sentido de pertenencia, hambre por aprender y la interacción humana que tanto faltaba.'
      }
    },
    {
      id: '2022-2',
      title: 'Liderazgo y Servicio',
      date: '2022-02-15',
      description: 'Ingreso al programa de Campamentos Juveniles.',
      extendedInfo: 'Al integrarme a el programa Campamentos Juveniles, descubrí vocaciones de servicio y fuertes aptitudes de liderazgo en mí, siendo un factor clave para salir de mi zona de confort y formarme personal y socialmente.',
      image: '/images/2022-2.png'
    },
    {
      id: '2022-3',
      title: 'El Valor del Auto-Estudio',
      date: '2022-11-01',
      description: 'Comienzo a estudiar de forma completamente autodidacta.',
      extendedInfo: 'En noviembre comprendí el profundo valor del estudio autodidacta. Comencé a buscar mis propias fuentes de conocimiento, creando mi propia ruta de aprendizaje más allá de la malla curricular tradicional del colegio. Esto con el objetivo de adelantar mi conocimiento, a temas universitarios.',
      image: '/images/2022-3.png'
    },
    {
      id: '2022-4',
      title: 'Mis Primeros Pasos Laborales',
      date: '2022-12-01',
      description: 'Empiezo a trabajar de manera formal.',
      extendedInfo: 'Empecé a trabajar en una empresa de ebanistería, lijando madera de todo tipo. El pago era poco, pero era la primera vez que estaba recibiendo dinero por mi esfuerzo, así que tenía mucho valor para mí.'
    },
    {
      id: '2023',
      title: 'Explorando Nuevos Horizontes',
      date: '2023-06-01',
      description: 'Mi primer viaje solo, representando a mi ciudad en campamento Nacional en Bogotá.',
      extendedInfo: 'Comenzar a viajar solo puso a prueba y fortaleció mi independencia. Tuve el honor de representar a mi ciudad en diversos campamentos juveniles, liderar a mi delegacion, con solo 15 años lideraba un grupo con chicos de 20-25 años, tambien empece a crear una gran red de amigos a nivel nacional que expandió mi perspectiva sobre el entorno colombiano.',
      image: '/images/2023.png'
    },
    {
      id: '2024',
      title: 'El Arte de Investigar',
      date: '2024-03-01',
      description: 'Me uno al semillero de investigación del colegio; me transformo en orador.',
      extendedInfo: 'El semillero de investigación encendió mi pasión por indagar más allá de lo superficial y defender con firmeza la lógica de mis ideas. Me pulí para convertirme en un buen orador y comencé a cimentar las bases para estructurar y presentar mis primeros proyectos formales.',
      image: '/images/2024.png'
    },
    {
      id: '2024-2',
      title: 'Cumbre de la Biodiversidad: COP 16',
      date: '2024-10-01',
      description: 'Viaje a Cali a la COP 16 representando a Barranquilla.',
      extendedInfo: 'Junto a mis compañeros del semillero de investigación, tuve la increíble oportunidad de viajar a Cali para la COP 16. Representar a Barranquilla en la cumbre de la biodiversidad fue una experiencia enormemente enriquecerora, donde pudimos conocer perspectivas y aportes medioambientales de todas partes.',
      image: '/images/2024-2.png'
    },
    {
      id: '2025-1',
      title: 'Trabajo en Recreación',
      date: '2025-04-01',
      description: 'Comienzo a trabajar formalmente en el área de recreación.',
      extendedInfo: 'Mi vida profesional temprana tomó otro rumbo acelerado al empezar a trabajar en recreación. Exigía muchísima energía y trato directo con todo tipo de público, lo cual me ayudó a desarrollar aún más mis habilidades de comunicación y empatía.',
      image: '/images/2025-1.png'
    },
    {
      id: '2025-2',
      title: 'Representación en Campamentos',
      date: '2025-08-01',
      description: 'Viaje de representación juvenil a nivel Nacional.',
      extendedInfo: 'Tuve la oportunidad y responsabilidad de viajar a Paipa, Boyacá para representar al distrito de Barranquilla en el campamento nacional 2025. Allí puse a prueba todas mis capacidades de liderazgo y trabajo en equipo.',
      image: '/images/2025-2.png'
    },
    {
      id: '2025-3',
      title: 'Exposición Nacional e Internacional',
      date: '2025-10-25',
      description: 'Presentación personal de mi proyecto de investigación e innovación: "FluxDirve". en Bogotá.',
      extendedInfo: 'Mi faceta investigativa rindió su fruto más grande a la fecha. A finales de octubre, viajé a la ciudad de Bogotá para presentar y defender personalmente mi proyecto de investigación, en ENISI (ECUENTRO NACIONAL E INTERNACIONAL DE SEMILLEROS DE INVESTIGACIÓN) de la redColSi. Fue un hito que validó muchísimas horas de dedicación al semillero y al arte de la oratoria, obtuve puntuaciones de 98/100 y 95/100',
      image: '/images/2025-3.png'
    },
    {
      id: '2026',
      title: 'La Cima del Bachillerato',
      date: '2026-06-01',
      description: 'Último peldaño antes del gran paso: Entro a la Universidad.',
      extendedInfo: 'El clímax de esta etapa. Cerrar mis años formativos obligatorios para dar el paso definitivo e ingresar a la universidad. Este momento recoge todo el liderazgo, el estudio autónomo y las experiencias de campo, enfocándolos hacia la carrera de mis sueños.'
    }
  ];

  useEffect(() => {
    const lenis = new Lenis();
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const splitChars = (text) => {
    return text.split(' ').map((word, wordIndex, array) => (
      <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split('').map((char, i) => (
          <span key={i} className="char" style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
        {wordIndex < array.length - 1 && <span className="char" style={{ display: 'inline-block' }}>&nbsp;</span>}
      </span>
    ));
  };

  const splitWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word" style={{ display: 'inline-block', marginRight: '0.25em' }}>
        {word}
      </span>
    ));
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to('.line', {
      y: 0,
      opacity: 1,
      duration: 0.1,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.5
    })
    .fromTo('.char', {
      y: '100%',
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
      ease: 'back.out(1.7)'
    }, "-=0.2")
    .to('.word', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power2.out'
    }, "-=0.6")
    .to('.scroll-indicator', {
      opacity: 1,
      duration: 1
    }, "-=0.4")
    .to('.scroll-indicator .line', {
      scaleX: 1,
      duration: 1,
      ease: 'power2.inOut'
    }, "-=1");
  }, []);

  return (
    <AppWrapper>
      <CustomCursor />
      <Background3D />
      
      <Intro>
        <h1>
          <span className="line">{splitChars("Leonardo Meza's")}</span>
          <span className="line">{splitChars("Timeline")}</span>
        </h1>
        <p className="intro-text">
          {splitWords("Un trayecto histórico de desafíos, aprendizajes y metas alcanzadas.")}
        </p>
        <ScrollIndicator className="scroll-indicator">
          <div className="line" />
          <span>Scroll to explore</span>
        </ScrollIndicator>
      </Intro>

      <TimelineContainer milestones={milestones} />
    </AppWrapper>
  );
}

export default App;

