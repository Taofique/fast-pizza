import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCart } from './cartSlice';
import CartItem from './CartItem';

export default function FloatingCart() {
  const cart = useSelector(getCart);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const iconRef = useRef(null);
  const draggingRef = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const iconPos = useRef({ bottom: 24, right: 24 });

  if (!cart.length || location.pathname.startsWith('/order/new')) return null;

  const onDragStart = (e) => {
    draggingRef.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX, y: clientY };
  };

  const onDragMove = (e) => {
    if (!draggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startPos.current.x;
    const dy = clientY - startPos.current.y;

    const newBottom = Math.max(16, iconPos.current.bottom - dy);
    const newRight = Math.max(16, iconPos.current.right - dx);

    if (iconRef.current) {
      iconRef.current.style.bottom = `${newBottom}px`;
      iconRef.current.style.right = `${newRight}px`;
    }
  };

  const onDragEnd = () => {
    draggingRef.current = false;
    const style = iconRef.current?.style;
    if (style) {
      iconPos.current = {
        bottom: parseInt(style.bottom, 10),
        right: parseInt(style.right, 10),
      };
    }
  };

  return (
    <>
      {/* Floating Icon */}
      <div
        ref={iconRef}
        className="fixed z-[9999] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-yellow-400 text-stone-800 shadow-lg transition-colors hover:bg-yellow-300"
        style={{
          bottom: iconPos.current.bottom,
          right: iconPos.current.right,
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseDown={onDragStart}
        onMouseMove={onDragMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
      >
        🛒
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {cart.length}
        </span>
      </div>

      {/* Modal / Popover */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-[9999] w-72 max-w-xs rounded-lg border border-stone-200 bg-white p-4 shadow-lg sm:right-[24px] sm:w-96">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your cart</h3>
            {/* Close button */}
            <button
              className="font-bold text-stone-500 hover:text-stone-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <ul className="max-h-64 divide-y divide-stone-200 overflow-y-auto">
            {cart.map((item) => (
              <CartItem key={item.pizzaId} item={item} />
            ))}
          </ul>

          <button
            className="mt-4 w-full rounded bg-yellow-400 py-2 font-semibold text-stone-800 hover:bg-yellow-300"
            onClick={() => navigate('/order/new')}
          >
            Order Pizzas
          </button>
        </div>
      )}
    </>
  );
}
