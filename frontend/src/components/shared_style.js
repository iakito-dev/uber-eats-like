// src/styles/shared_style.js
import styled from '@emotion/styled';

// constants
import { COLORS } from '../style_constants';

// ボタンの元となるコンポーネント
export const BaseButton = styled('button')`
  cursor: pointer;
  transition: opacity 0.2s ease;

  :hover {
    opacity: 0.7;
  }

  :focus {
    outline: 0;
  }
`;

// 角丸なボタン
// BaseButtonを継承していることに注意
export const RoundButton = styled(BaseButton)`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background-color: ${COLORS.SUB_BUTTON};
  display: flex;
  align-items: center;
  justify-content: center;
`;
