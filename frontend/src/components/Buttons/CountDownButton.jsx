// src/components/CountDownButton.jsx
import React from 'react';

// styles
import { RoundButton } from '../shared_style';

export const CountDownButton = ({ onClick, isDisabled }) => (
  <RoundButton onClick={onClick} disabled={isDisabled}>
    −
  </RoundButton>
);
