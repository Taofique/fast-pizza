import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import FloatingCart from '../cart/FloatingCart'; // import the floating cart

function Menu() {
  const menu = useLoaderData();

  return (
    <>
      <ul className="divide-y divide-stone-200 px-2">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>

      {/* Floating Cart only appears when cart has items */}
      <FloatingCart />
    </>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
