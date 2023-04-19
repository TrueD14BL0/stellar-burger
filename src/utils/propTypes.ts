import PropTypes from 'prop-types';

export const ingredientProps = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
}).isRequired;

export const ingridientsListProps = PropTypes.arrayOf(
  PropTypes.shape(ingredientProps.isRequired).isRequired
).isRequired;

export const constructorListProps = PropTypes.shape({
  bun: PropTypes.shape(ingredientProps.isRequired),
  content: PropTypes.arrayOf(
            PropTypes.shape(ingredientProps.isRequired)
          ).isRequired,
  sum: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
}).isRequired

export const burgerIngredientProps = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
}).isRequired;

export const orderProps = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired;
