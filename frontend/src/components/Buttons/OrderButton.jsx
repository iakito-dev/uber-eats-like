// src/components/OrderButton.jsx
import styled from '@emotion/styled';

// components
import { BaseButton } from '../shared_style';

// constants
import { FONT_SIZE } from '../../style_constants';

// --- styled component ---
export const OrderButton = styled(BaseButton)`
  width: 390px;
  background-color: black;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: ${FONT_SIZE.BODY1};
  border-radius: 4px;
  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.8;
  }
`;
