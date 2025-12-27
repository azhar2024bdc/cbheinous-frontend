"use client"
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const morph = keyframes`
  0%, 100% { border-radius: 50% 50% 30% 70% / 60% 40% 60% 40%; }
  25% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  75% { border-radius: 40% 60% 70% 30% / 60% 50% 50% 40%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const colorShift = keyframes`
  0% { background: #ff7eb9; }
  25% { background: #ff65a3; }
  50% { background: #7afcff; }
  75% { background: #feff9c; }
  100% { background: #ff7eb9; }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Changed from 100% to 100vh */
  width: 100%;
  position: fixed; /* or absolute depending on your layout needs */
  top: 0;
  left: 0;
`;

const Blob = styled.div`
  width: 100px;
  height: 100px;
  background: #ff7eb9;
  animation: 
    ${morph} 8s ease-in-out infinite,
    ${float} 6s ease-in-out infinite,
    ${colorShift} 12s ease-in-out infinite;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

const Message = styled.div`
  margin-top: 30px;
  font-family: 'Arial', sans-serif;
  color: #555;
  font-size: 18px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '...';
    position: absolute;
    animation: dots 1.5s steps(5, end) infinite;
  }

  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
`;

const LoadingMessages = [
  "Preparing something amazing",
  "Almost there",
  "Just a moment longer",
  "Worth the wait",
  "Final touches"
];

const UniqueLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % LoadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LoaderContainer>
      <Blob />
      <Message>{LoadingMessages[messageIndex]}</Message>
    </LoaderContainer>
  );
};

export default UniqueLoader;