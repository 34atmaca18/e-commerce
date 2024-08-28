'use client'
import React,{createContext,useContext,useState,useEffect,useCallback} from 'react'
import { cardProducts, Productstype,User } from '@/lib/types';
import { fetchElectronicProducts,fetchFoodProducts,fetchCardProducts,addProductToCart,addLiketoDb,fetchLikedListFromDb,removeLikefromDb } from '@/lib/db'

interface ProductContextType {
    electronicproducts: Productstype[];
    foodproducts: Productstype[];
    likedList: Productstype[];
    productStates: { [key: string]: { loading: boolean; added: boolean } };
    localCartItems: cardProducts[];
    userCartItems: cardProducts[];
    fetchProducts: () => Promise<void>;
    handleAddToCart: (currentUser: User, product: Productstype) => Promise<void>;
    handleAddLike: (user: User, product: Productstype) => Promise<void>;
    handleRemoveLike: (user: User, product: Productstype) => Promise<void>;
    fetchUpdate: (user: User) => Promise<void>;
    handleAddToCartWithState: (productId: number,product: Productstype,user:User) => Promise<void>;
    handleAddtoLocalCart: (productId: number,product: Productstype) => Promise<void>;
    updateLocalCartItems: () => void;
    clearLocalCart: () => void;
    increaseLocalProductQuantity: (productId: number) => void;
    decreaseLocalProductQuantity: (productId: number) => void;
    removeProductFromLocalCart: (productId: number) => void;
    updateCartItems: (user:User) => void
  }

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [electronicproducts, setElectronicProducts] = useState<Productstype[]>([]);
  const [foodproducts, setFoodProducts] = useState<Productstype[]>([]);
  const [likedList, setLikedList] = useState<Productstype[]>([])
  const [localCartItems, setLocalCartItems] = useState<cardProducts[]>([]); 
  const [updatedCurrentUser, setUpdatedCurrentUser] = useState<User | null>(null);
  const [productStates, setProductStates] = useState<{ [key: string]: { loading: boolean, added: boolean } }>({})
  const [userCartItems,setuserCartItems] = useState<cardProducts[]>([]);

  useEffect(() => {
    fetchProducts();
      if(updatedCurrentUser){
        fetchLikedList(updatedCurrentUser);
      }
    }, [updatedCurrentUser])

  useEffect(() => {
    updateLocalCartItems();
  },[])

  const updateCartItems = useCallback(async(user:User) => {
    const newItems = await fetchCardProducts(user);
    setuserCartItems(newItems)
  },[])


  const clearLocalCart = () => {
    localStorage.removeItem('localCart');
    setLocalCartItems([]);
  };

  const removeProductFromLocalCart = (productId: number) => {
    const updatedCart = localCartItems.filter(item => item.id !== productId);
    setLocalCartItems(updatedCart);
    localStorage.setItem('localCart', JSON.stringify(updatedCart));
};

  const increaseLocalProductQuantity = (productId: number) => {
    const localCart: Productstype[] = JSON.parse(localStorage.getItem('localCart') || '[]');
    const productIndex = localCart.findIndex(item => item.id === productId);
    if (productIndex >= 0) {
      localCart[productIndex].quantity = (localCart[productIndex].quantity || 1) + 1;
      localStorage.setItem('localCart', JSON.stringify(localCart));
      updateLocalCartItems();
    }
  };

  const decreaseLocalProductQuantity = (productId: number) => {
    const localCart: Productstype[] = JSON.parse(localStorage.getItem('localCart') || '[]');
    const productIndex = localCart.findIndex(item => item.id === productId);
    if (productIndex >= 0) {
      if (localCart[productIndex].quantity && localCart[productIndex].quantity > 1) {
        localCart[productIndex].quantity -= 1;
      } else {
        localCart.splice(productIndex, 1);
      }
      localStorage.setItem('localCart', JSON.stringify(localCart));
      updateLocalCartItems();
    }
  };

  const updateLocalCartItems = useCallback(() => {
    const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    setLocalCartItems(localCart);
  }, []);

  const handleAddToCartWithState = async (productId: number, product: Productstype,user:User) => {
    setProductStates(prevState => ({
      ...prevState,
      [productId]: { loading: true, added: false }
    }));
    
    try {
      await handleAddToCart(user, product);
      setProductStates(prevState => ({
        ...prevState,
        [productId]: { loading: false, added: true }
      }));
    } catch (error: any) {
      console.error('Failed while adding to cart', error.message);
      setProductStates(prevState => ({
        ...prevState,
        [productId]: { loading: false, added: false }
      }));
    }
  }

  const handleAddtoLocalCart = async (productId: number, product: Productstype) => {
    setProductStates(prevState => ({
        ...prevState,
        [productId]: { loading: true, added: false }
    }));
    try {
        const localCart:Productstype[] = JSON.parse(localStorage.getItem('localCart') || '[]');
        const existingProductIndex = localCart.findIndex(item => item.id === productId);
        if (existingProductIndex >= 0) {
          const existingProduct = localCart[existingProductIndex];
          if (existingProduct) {
              existingProduct.quantity = (existingProduct.quantity || 1) + 1;
          }
      } else {
          localCart.push({
              ...product,
              quantity: 1
          });
      }
        localStorage.setItem('localCart', JSON.stringify(localCart));
        setLocalCartItems(localCart);
        console.log('product added to localcart:',product)
        setProductStates(prevState => ({
            ...prevState,
            [productId]: { loading: false, added: true }
        }));
    } catch (error: any) {
        console.error('Failed while adding to local cart', error.message);
        setProductStates(prevState => ({
            ...prevState,
            [productId]: { loading: false, added: false }
        }));
    }
}

      
const fetchUpdate = useCallback(async (user: User) => {
  try {
      await fetchProducts();
      if (user) {
          setUpdatedCurrentUser(user); 
          await fetchLikedList(user); 
      }
  } catch (error) {
      console.error('Error in fetchUpdate:', error);
  }
}, []); 

const fetchProducts = useCallback(async () => {
  try {
    const electronicData = await fetchElectronicProducts();
    const foodData = await fetchFoodProducts();
    const electronicProductsWithCategory = electronicData.map(product => ({
      ...product,
      category: 'electronicproducts' as const
    }));

    const foodProductsWithCategory = foodData.map(product => ({
      ...product,
      category: 'foodproducts' as const
    }));

    setElectronicProducts(electronicProductsWithCategory);
    setFoodProducts(foodProductsWithCategory);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}, []);

  const handleAddToCart = async(currentUser:User,product:Productstype) => {
    try {
      await addProductToCart(currentUser,product);
      updateCartItems(currentUser);
    } catch (error:any) {
      console.error('failed while adding to cart',error.message)
    }
  }
          

  
const fetchLikedList = useCallback(async (user: User) => {
  try {
    const likedList = await fetchLikedListFromDb(user);
    setLikedList(likedList);
  } catch (error) {
    console.error('Failed while fetching liked list:', error);
  }
}, []);

  const handleAddLike = async(user:User,product:Productstype) => {
    try {
      await addLiketoDb(user,product);
      if(user){
        fetchLikedList(user);
      }
    } catch (error:any) {
      console.error('Error..',error.message)
    }
  }
    
  const handleRemoveLike = async (user: User, product: Productstype) => {
    try {
      await removeLikefromDb(user, product);
      if (user) {
        fetchLikedList(user);
      }
    } catch (error: any) {
      console.error('Error removing like:', error.message);
    }
  };

  return (
    <ProductContext.Provider value={{ electronicproducts,foodproducts,likedList,
    fetchProducts,handleAddToCart,handleAddLike,handleRemoveLike,fetchUpdate,
    productStates,handleAddToCartWithState,handleAddtoLocalCart,localCartItems,updateLocalCartItems,
    clearLocalCart,increaseLocalProductQuantity,decreaseLocalProductQuantity,removeProductFromLocalCart,userCartItems,
    updateCartItems}}>
      {children}
    </ProductContext.Provider>
  );
  };
    
  export const useProduct = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (context === undefined) {
      throw new Error('error');
    }
    return context;
  };

export default ProductContext
