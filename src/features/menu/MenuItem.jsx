import { formatCurrency } from '../../utils/helpers';
import { pizzaImages } from './pizzaImages';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  const localImages = pizzaImages[id];

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      {/* Pizza Image */}
      <img
        src={localImages}
        alt={name}
        className={`h-24 w-24 flex-shrink-0 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />

      {/* Info */}
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>

        {/* Price + Controls */}
        <div className="mt-auto flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
          {/* Price */}
          {!soldOut ? (
            <p className="text-sm font-medium">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {/* Quantity & Delete */}
          {isInCart && (
            <div className="mt-1 flex items-center gap-2 sm:mt-0 sm:gap-6">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {/* Add to Cart Button */}
          {!soldOut && !isInCart && (
            <Button
              type="small"
              onClick={handleAddToCart}
              className="mt-1 sm:mt-0"
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
