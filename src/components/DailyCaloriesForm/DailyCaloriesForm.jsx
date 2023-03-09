import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuthRecommendations,
  getRecommendations,
} from 'redux/dailyRate/dailyRateOperations';
import css from './DailyCaloriesForm.module.scss';
import {
  selectDailyCalories,
  selectNotAllowedProducts,
} from 'redux/dailyRate/dailyRateSelectors';
import { selectId, selectIsLoggedIn } from 'redux/auth/authSelectors';

export const DailyCaloriesForm = ({ handleOpenModal }) => {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [bloodType, setBloodType] = useState(1);

  const dispatch = useDispatch();

  const calories = useSelector(selectDailyCalories);
  const noProducts = useSelector(selectNotAllowedProducts);
  const userId = useSelector(selectId);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    switch (name) {
      case 'height':
        setHeight(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'desiredWeight':
        setDesiredWeight(value);
        break;
      case 'bloodType':
        setBloodType(Number(value));
        break;
      default:
        break;
    }
  };

  const userParams = {
    height,
    age,
    weight,
    desiredWeight,
    bloodType,
    //userId,
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(userParams);
    if (!isLoggedIn) {
      // console.log(isLoggedIn);
      handleOpenModal();
      dispatch(getRecommendations(userParams));

      // console.log('userParams', userParams);
    } else {
      dispatch(getAuthRecommendations({ ...userParams, userId }));
    }

    console.log('userId', userId);
    console.log(userParams);
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>
        Calculate your daily calorie intake right now
      </h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="height"
          value={height}
          onChange={handleInputChange}
          placeholder="Height *"
          autoFocus
          required
        />

        <input
          type="number"
          name="age"
          value={age}
          onChange={handleInputChange}
          placeholder="Age *"
          required
        />

        <input
          type="number"
          name="weight"
          value={weight}
          onChange={handleInputChange}
          placeholder="Current weight *"
          required
        />

        <input
          type="number"
          name="desiredWeight"
          value={desiredWeight}
          onChange={handleInputChange}
          placeholder="Desired weight *"
          required
        />

        <p>Blood type *</p>
        <label>
          <input
            type="radio"
            name="bloodType"
            value={1}
            onChange={handleInputChange}
            checked={bloodType === 1}
            required
          />
          1
        </label>
        <label>
          <input
            type="radio"
            name="bloodType"
            value={2}
            onChange={handleInputChange}
            checked={bloodType === 2}
            required
          />
          2
        </label>
        <label>
          <input
            type="radio"
            name="bloodType"
            value={3}
            onChange={handleInputChange}
            checked={bloodType === 3}
            required
          />
          3
        </label>
        <label>
          <input
            type="radio"
            name="bloodType"
            value={4}
            onChange={handleInputChange}
            checked={bloodType === 4}
            required
          />
          4
        </label>
        <p>{calories}</p>
        {/* <p>{noProducts}</p> */}
        <button type="submit">Start losing weight</button>
      </form>
    </div>
  );
};
