import {CartProvider} from '@/context/CartContext'

const GlobalProvider = ({ children }) => {
   return<CartProvider>{children}</CartProvider>
  };
  
export default GlobalProvider;  