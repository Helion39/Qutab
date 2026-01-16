import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  productType: string;
  typeBadgeColor: string;
  price: number;
  priceFormatted: string;
  shohibulQurban: string;
  quantity: number;
  weight: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateShohibulQurban: (id: string, name: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: (discount: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('qurban_cart');
    let parsedItems: CartItem[] = [];
    
    if (saved) {
      parsedItems = JSON.parse(saved);
    }
    
    // If cart is empty, use mock data for demonstration
    if (!parsedItems || parsedItems.length === 0) {
      return [
        {
          id: 'mock-1',
          productId: 2,
          productName: 'Kambing',
          productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC77I3-1OtvWdH2wGUjcQXUQTkNTnjEwx6qYbYPCyv2MbhiHixHIzdONsm9F4qvurREmgQNST84FVZJA6vy4szqPKkOo2kBHliP4EOoAhy2yMCTb1oXuZexVkXl5qXM0IHvLhCnXp8lHJ8vbKQpmGXqZAcL9mBn4B0vuf_vfmdVkdZLaBJYfQxwvS9yOumx9oPKgG8hep16JJZNhv_l4UgV67Uu83R5WGqizjgksxegpAkO2j4sXOgoKZ9BjGLK4mY5qD2Qa5DnRpM',
          productType: 'BERAT',
          typeBadgeColor: 'green',
          price: 1899000,
          priceFormatted: 'Rp 1.899.000',
          shohibulQurban: 'Ahmad Wijaya',
          quantity: 1,
          weight: '25-28 kg'
        },
        {
          id: 'mock-2',
          productId: 4,
          productName: 'Sapi 1/7',
          productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJYVFKvXtetjJKtBagYQW6k9cx3P5B6EgOHA8V5y7rlsdn1ytv9IwctM5C2QTIwUFovUOWwn6EqzYIPnDKuT6YMYGmN9bFiN4ca5eihHVYGFoTGDt8i-y-e5Mdo7mnMrSlSxYOcfFMNO_iPrpoCUB1ksGLab8-4pj5SvhMYPJsv9zol3tqBJL7wgGQguUfehW9vnw79zE4Xk0k0jR2LVtLHnWvW8UPdL54373aKEXb0-tkS2hdqZEtKGn7PP20nrjvp2lY5s-304',
          productType: 'BERAT',
          typeBadgeColor: 'green',
          price: 1899000,
          priceFormatted: 'Rp 1.899.000',
          shohibulQurban: 'Siti Rahma',
          quantity: 2,
          weight: '220-250 kg (Utuh)'
        },
        {
          id: 'mock-3',
          productId: 3,
          productName: 'Domba',
          productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmax_PeynDo-_WTUWPH79YoAKpNzA1Xqq8spVuPC5u3wJQP5AziOpwtTzZbNp90CSBdh9EhEM00vZTNZbcjdPDzRBMGAg8z9fBTr6-DVsGL4a3lqPwZscvspRJ_gIodPX7tU_hFSBGpg51ghx9qBGxfYacUAbSZda-YcydVPlseQ1AhyRir5u4bbdlKvkc0ixVlru_NbpU0e_MWKrgRw2e6llFC31GrO70RPfYiWj0522mPBZAbhdNMOLIZ_XA1vrohVWwMXPR830',
          productType: 'BERAT',
          typeBadgeColor: 'green',
          price: 1899000,
          priceFormatted: 'Rp 1.899.000',
          shohibulQurban: 'Budi Santoso',
          quantity: 1,
          weight: '28-32 kg'
        }
      ];
    }
    
    return parsedItems;
  });

  useEffect(() => {
    localStorage.setItem('qurban_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.productId}-${Date.now()}`,
      quantity: 1,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateShohibulQurban = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, shohibulQurban: name } : item))
    );
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotal = (discount: number = 0) => {
    return getSubtotal() - discount;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateShohibulQurban,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}