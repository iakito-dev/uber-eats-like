// src/components/CountUpButton.jsx
import React from 'react';

// styles
import { RoundButton } from '../shared_style';

export const CountUpButton = ({ onClick, isDisabled }) => (
  <RoundButton onClick={onClick} disabled={isDisabled}>
    ＋
  </RoundButton>
);
