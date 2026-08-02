import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { VRHeadsetSVG } from './VRHeadsetSVG';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (headsetId: string, delta: number) => void;
  onRemoveItem: (headsetId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.headset.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full bg-[#090a0d] border-l border-[#FF5B00]/30 p-6 flex flex-col justify-between shadow-[-20px_0_50px_rgba(0,0,0,0.9)] text-white">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#FF5B00]" />
              <h2 className="font-orbitron font-bold text-xl text-white">
                Shopping Cart
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="py-20 text-center text-gray-400 flex flex-col items-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-gray-600 stroke-1" />
              <p className="font-chakra text-base">Your retail cart is currently empty.</p>
              <span className="text-xs text-gray-500">
                Select a VR headset model to pre-order.
              </span>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {cartItems.map(({ headset, quantity }) => (
                <div
                  key={headset.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3"
                >
                  <div className="w-16 h-16 shrink-0 bg-black/50 rounded-lg flex items-center justify-center border border-white/5">
                    <VRHeadsetSVG modelId={headset.id} size="sm" />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-orbitron font-bold text-sm text-white">
                      {headset.name}
                    </h4>
                    <span className="text-xs text-[#FF5B00] font-chakra block">
                      ${headset.price}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(headset.id, -1)}
                        className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(headset.id, 1)}
                        className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(headset.id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-orbitron font-bold text-lg text-white">
                ${totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Standard Retail Shipping</span>
              <span className="text-emerald-400 font-semibold">FREE</span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full clip-chamfer-cta bg-[#FF5B00] hover:bg-[#FF6E00] text-black font-chakra font-bold text-base py-3.5 flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_0_20px_#FF5B00]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
