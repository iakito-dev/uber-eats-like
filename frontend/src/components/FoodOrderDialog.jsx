// src/components/FoodOrderDialog.jsx
import React from 'react';
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import styled from '@emotion/styled';

// components
import { SubText } from './StyledText';

// images
import OrderHeaderImage from '../images/order-header.png';

// --- styled components ---
const OrderHeader = styled('img')`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

const DescriptionWrapper = styled('div')`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

// --- component ---
export const FoodOrderDialog = ({ food, isOpen, onClose }) => {
  if (!food) return null; // safety guard

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>{food.name}</DialogTitle>

      <DialogContent>
        <DescriptionWrapper>
          <SubText>{food.description}</SubText>
        </DescriptionWrapper>
      </DialogContent>

      <DialogActions>
        {/* TODO: 数量操作ボタンや注文確定ボタンを追加予定 */}
      </DialogActions>
    </Dialog>
  );
};
