import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'; // v4
import styled from '@emotion/styled'; 

import { OrderButton } from './Buttons/OrderButton';

export const NewOrderConfirmDialog = ({
  isOpen,
  onClose,
  existingRestaurantName,
  newRestaurantName,
  onClickSubmit,
}) => (
  <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle>新規注文を開始しますか？</DialogTitle>
    <DialogContent>
      <MessageText>
        ご注文に <b>{existingRestaurantName}</b> の商品が含まれています。<br />
        新規の注文を開始して <b>{newRestaurantName}</b> の商品を追加してください。
      </MessageText>

      <ButtonWrapper>
        <OrderButton onClick={onClickSubmit}>新規注文</OrderButton>
      </ButtonWrapper>
    </DialogContent>
  </Dialog>
);

const MessageText = styled('p')`
  line-height: 1.6;
  color: #333;
  margin-bottom: 24px;
`;

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;
