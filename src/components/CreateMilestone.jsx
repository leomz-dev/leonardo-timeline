import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const Wrapper = styled.section`
  padding: 15vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Header = styled.h2`
  font-size: clamp(2rem, 5vw, 4rem);
  text-transform: uppercase;
  margin-bottom: 4rem;
  letter-spacing: -0.02em;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: 2.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 0.5rem;
  }

  input, textarea {
    background: transparent;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;
    padding: 0.5rem 0;
    transition: border-color 0.3s ease;
    resize: none;

    &:focus {
      border-bottom-color: ${({ theme }) => theme.colors.accent};
      outline: none;
    }
    
    &::placeholder {
      color: #333;
    }
  }

  input[type="file"] {
    font-size: 1rem;
    border: none;
    cursor: pointer;
    
    &::-webkit-file-upload-button {
      visibility: hidden;
      width: 0;
    }
    
    &::before {
      content: 'SELECCIONAR FOTO';
      display: inline-block;
      background: transparent;
      border: 1px solid ${({ theme }) => theme.colors.textMuted};
      color: ${({ theme }) => theme.colors.textMuted};
      border-radius: 50px;
      padding: 8px 16px;
      outline: none;
      white-space: nowrap;
      cursor: pointer;
      font-size: 0.7rem;
      letter-spacing: 1px;
      transition: all 0.3s;
    }

    &:hover::before {
      border-color: ${({ theme }) => theme.colors.text};
      color: ${({ theme }) => theme.colors.text};
    }
  }

  textarea.extended {
    min-height: 150px;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const SubmitBtn = styled.button`
  align-self: flex-start;
  margin-top: 1rem;
  padding: 1.5rem 3rem;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 100px;
  position: relative;
  overflow: hidden;

  .text {
    position: relative;
    z-index: 2;
  }
`;

const CreateMilestone = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    extendedInfo: '',
    image: null
  });

  const buttonRef = useRef(null);

  useEffect(() => {
    // Magnetic hover effect
    const btn = buttonRef.current;
    
    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    if(btn) {
      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if(btn) {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      }
    }
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result }); // Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
    
    onAdd({
      id: Date.now().toString(),
      ...formData
    });

    setFormData({ title: '', date: '', description: '', extendedInfo: '', image: null });
  };

  return (
    <Wrapper>
      <Header>Añadir Capítulo</Header>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <label>Título del Evento</label>
          <input 
            type="text" 
            placeholder="Ej. Mi primer viaje a Japón"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <label>Fecha</label>
          <input 
            type="date" 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </InputGroup>

        <InputGroup>
          <label>Resumen Corto</label>
          <input 
            type="text"
            placeholder="Un vistazo rápido..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </InputGroup>

        <InputGroup>
          <label>Historia Completa (se muestra al expandir)</label>
          <textarea 
            className="extended"
            placeholder="Cuenta todos los detalles memorables..."
            value={formData.extendedInfo}
            onChange={(e) => setFormData({...formData, extendedInfo: e.target.value})}
          />
        </InputGroup>

        <InputGroup>
          <label>Fotografía de recuerdo</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImage}
          />
        </InputGroup>

        <SubmitBtn ref={buttonRef} type="submit">
          <span className="text">Inmortalizar</span>
        </SubmitBtn>
      </Form>
    </Wrapper>
  );
};

export default CreateMilestone;
