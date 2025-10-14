// src/components/FoodOrderDialog.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import styled from '@emotion/styled';

// components
import { SubText } from './StyledText';
import { CountUpButton } from './Buttons/CountUpButton';
import { CountDownButton } from './Buttons/CountDownButton';
import { OrderButton } from './Buttons/OrderButton';

// images
import OrderHeaderImage from '../images/order-header.png';

// --- styled ---
const OrderHeader = styled('img')`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

const DescriptionWrapper = styled('div')`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled('div')`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
  align-items: center;
`;

const CountItem = styled('div')`
  margin: 0 8px;
`;

const CountNum = styled('div')`
  padding-top: 10px;
  min-width: 24px;
  text-align: center;
`;

const OrderTextWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const OrderButtonTextWrapper = styled('div')`
  width: 300px;
`;

const PriceWrapper = styled('div')`
  padding-top: 4px;
`;

// --- component ---
export const FoodOrderDialog = ({
  food,
  countNumber,
  isOpen,
  onClose,
  onClickCountUp,
  onClickCountDown,
  onClickOrder,
}) => {
  if (!food) return null; // 念のためガード

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <OrderHeader src={OrderHeaderImage} alt="order header" />

      <DialogTitle>{food.name}</DialogTitle>

      <DialogContent>
        <DescriptionWrapper>
          <SubText>{food.description}</SubText>
        </DescriptionWrapper>
      </DialogContent>

      <DialogActions sx={{ padding: '16px' }}>
        <CountersWrapper>
          <CountItem>
            <CountDownButton
              onClick={onClickCountDown}
              /* 数量が1以下だったら、カウントダウンさせない */
              isDisabled={countNumber <= 1}
            />
          </CountItem>

          <CountItem>
            <CountNum>{countNumber}</CountNum>
          </CountItem>

          <CountItem>
            <CountUpButton
              onClick={onClickCountUp}
              /* 数量が9以上だったら、カウントアップさせない */
              isDisabled={countNumber >= 9}
            />
          </CountItem>
        </CountersWrapper>

        <OrderButton onClick={onClickOrder}>
          <OrderTextWrapper>
            <OrderButtonTextWrapper>{`${countNumber}点を注文に追加`}</OrderButtonTextWrapper>
            <PriceWrapper>{`¥${(countNumber ?? 0) * (food.price ?? 0)}`}</PriceWrapper>
          </OrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  );
};
