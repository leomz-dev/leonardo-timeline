import React from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import TimelineContainer from './components/TimelineContainer';

gsap.registerPlugin(ScrollTrigger);

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 4vw;
`;

const Intro = styled.section`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20vh;

  h1 {
    font-size: clamp(3rem, 8vw, 8rem);
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.04em;
    overflow: hidden;
    margin-bottom: 2rem;
    
    .line {
      display: block;
      transform: translateY(100%);
      opacity: 0;
    }
  }

  p {
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: ${({ theme }) => theme.colors.textMuted};
    max-width: 600px;
    opacity: 0;
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
      extendedInfo: 'Junto a mis compañeros del semillero de investigación, tuve la increíble oportunidad de viajar a Cali para la COP 16. Representar a Barranquilla en la cumbre de la biodiversidad fue una experiencia enormemente enriquecedora, donde pudimos conocer perspectivas y aportes medioambientales de todas partes.',
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

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to('.line', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.2
    })
      .to('p.intro-text', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, "-=0.5");
  }, []);

  return (
    <AppWrapper>
      <Intro>
        <h1>
          <span className="line">Leonardo Meza's</span>
          <span className="line">Timeline</span>
        </h1>
        <p className="intro-text">
          El trayecto histórico, los desafíos superados y las pasiones descubiertas que forjaron quien soy hoy.
        </p>
      </Intro>

      <TimelineContainer milestones={milestones} />
    </AppWrapper>
  );
}

export default App;
