// src/containers/Restaurants.jsx
import React, { Fragment, useReducer, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// MUI (v5/v7) の Skeleton を使用（旧 @material-ui/lab は使わない）
import Skeleton from '@mui/material/Skeleton';

// apis
import { fetchRestaurants } from '../apis/restaurants';

// reducers
import {
  initialState,
  restaurantsActionTyps,
  restaurantsReducer,
} from '../reducers/restaurants';

// constants
import { REQUEST_STATE } from '../constants';

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';
import RestaurantImage from '../images/restaurant-image.jpg';

const HeaderWrapper = styled('div')`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled('img')`
  height: 90px;
`;

const MainCoverImageWrapper = styled('div')`
  text-align: center;
`;

const MainCover = styled('img')`
  height: 600px;
`;

const RestaurantsContentsList = styled('div')`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
  flex-wrap: wrap; /* 画面幅が狭い時の折返し */
  gap: 24px;
`;

const RestaurantsContentWrapper = styled('div')`
  width: 450px;
  height: 300px;
  padding: 48px;
  box-sizing: border-box;
`;

const RestaurantsImageNode = styled('img')`
  width: 100%;
  display: block;
`;

const MainText = styled('p')`
  color: black;
  font-size: 18px;
  margin: 8px 0 4px;
`;

const SubText = styled('p')`
  color: black;
  font-size: 12px;
  margin: 0;
`;

export const Restaurants = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    dispatch({ type: restaurantsActionTyps.FETCHING });
    fetchRestaurants().then((data) =>
      dispatch({
        type: restaurantsActionTyps.FETCH_SUCCESS,
        payload: { restaurants: data?.restaurants ?? [] },
      })
    );
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>

      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>

      <RestaurantsContentsList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            <Skeleton variant="rectangular" width={450} height={300} />
            <Skeleton variant="rectangular" width={450} height={300} />
            <Skeleton variant="rectangular" width={450} height={300} />
          </Fragment>
        ) : (
          (state.restaurantsList ?? []).map((item) => (
            <Link
              to={`/restaurants/${item.id}/foods`}
              key={item.id ?? item.name}
              style={{ textDecoration: 'none' }}
            >
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} alt={item.name} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料：${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          ))
        )}
      </RestaurantsContentsList>
    </Fragment>
  );
};
