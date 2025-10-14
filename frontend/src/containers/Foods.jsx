// src/containers/Foods.jsx
import React, { Fragment, useReducer, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// components
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { FoodWrapper } from '../components/FoodWrapper';
import Skeleton from '@mui/material/Skeleton';
import { FoodOrderDialog } from '../components/FoodOrderDialog';

// reducers
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

// constants
import { COLORS } from '../style_constants';
import { REQUEST_STATE } from '../constants';

// --- styled ---
const HeaderWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled('div')`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled('img')`
  height: 90px;
`;

const FoodsList = styled('div')`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled('div')`
  margin: 16px;
`;

// --- component ---
export const Foods = ({ match }) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  // UI用のローカルステート
  const dialogInitialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
  };
  const [state, setState] = useState(dialogInitialState);

  const restaurantId = match.params.restaurantId;

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantId)
      .then((data) => {
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: { foods: data?.foods ?? [] },
        });
      })
      .catch(() => {
        dispatch({ type: foodsActionTypes.FETCH_FAILED });
      });
  }, [restaurantId]);

  // カードクリックでダイアログを開く
  const handleClickFood = (food) => {
    setState({
      ...state,
      isOpenOrderDialog: true,
      selectedFood: food,
      selectedFoodCount: 1,
    });
  };

  // 仮注文（後でAPI実装予定）
  const submitOrder = () => {
    console.log('登録ボタンが押された！');
    // TODO: 仮注文API連携
  };

  return (
    <Fragment>
      {/* Header */}
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>

      {/* Foods List */}
      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton variant="rectangular" width={450} height={180} />
              </ItemWrapper>
            ))}
          </Fragment>
        ) : (
          (foodsState.foodsList ?? []).map((food) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={handleClickFood}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>

      {/* Order Dialog */}
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          isOpen={state.isOpenOrderDialog}
          food={state.selectedFood}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: Math.min(9, state.selectedFoodCount + 1),
            })
          }
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: Math.max(1, state.selectedFoodCount - 1),
            })
          }
          onClickOrder={() => submitOrder()}
          onClose={() =>
            setState({
              ...dialogInitialState,
            })
          }
        />
      )}
    </Fragment>
  );
};
