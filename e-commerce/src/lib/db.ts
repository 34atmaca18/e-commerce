'use server'
import { sql } from '@vercel/postgres';
import {UserwithoutPassword,Productstype,cardProducts} from './types'
import { productValues } from '@/components/modals/AddProduct/AddProduct';

export async function fetchElectronicProducts(): Promise<Productstype[]> {
  try {
    const data = await sql<Productstype>`SELECT * FROM electronicproducts`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products');
  }
}

export const fetchCartProductsCount = async (user: UserwithoutPassword): Promise<number> => {
  try {
    const query = `
      SELECT COUNT(*) AS count
      FROM card_items
      WHERE user_id = $1;
    `;
    const result = await sql.query(query, [user.id]);
    return parseInt(result.rows[0].count, 10);
  } catch (error: any) {
    console.error('Failed to fetch cart products count:', error.message);
    return 0;
  }
};

export const fetchCardProducts = async (user: UserwithoutPassword): Promise<cardProducts[]> => {
  try {
    const query = `
      SELECT name, info, price, image, quantity
      FROM card_items
      WHERE user_id = $1
      ORDER BY name;
    `;
    const result = await sql.query(query, [user.id]);
    return result.rows as cardProducts[];
  } catch (error: any) {
    console.error('Failed to fetch card products:', error.message);
    return [];
  }
};

export const addLocalCartItemsToDb = async (user: UserwithoutPassword, localCartItems: cardProducts[]): Promise<void> => {
  try {
    for (const item of localCartItems) {
      const query = `
        INSERT INTO card_items (user_id, name, info, price, image, quantity, category)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (user_id, name, info, price, image)
        DO UPDATE SET quantity = card_items.quantity + EXCLUDED.quantity;
      `;
      await sql.query(query, [user.id, item.name, item.info, item.price, item.image, item.quantity, item.category]);
    }
    console.log('All local cart items added to database successfully');
  } catch (error:any) {
    console.error('Failed to add local cart items to database:', error.message);
    throw new Error('Failed to add local cart items to database');
  }
};



export const addProductToCart = async (user: UserwithoutPassword, product: Productstype): Promise<void> => {
  try {
    const query = `
      INSERT INTO card_items (user_id, name, info, price, image, quantity, category)
      VALUES ($1, $2, $3, $4, $5, 1, $6)
      ON CONFLICT (user_id, name, info, price, image)
      DO UPDATE SET quantity = card_items.quantity + 1;
    `;
    await sql.query(query, [user.id, product.name, product.info, product.price, product.image, product.category]);
    console.log('Product added to cart successfully');
  } catch (error: any) {
    console.error('Failed to add product to cart:', error.message);
  }
};

export const decreaseProductQuantity = async (user: UserwithoutPassword, product: cardProducts): Promise<void> => {
  try {
    const result = await sql.query('SELECT quantity FROM card_items WHERE user_id = $1 AND name = $2', [user.id, product.name]);
    if (result.rows.length > 0) {
      const currentQuantity = result.rows[0].quantity;

      if (currentQuantity > 1) {
        await sql.query('UPDATE card_items SET quantity = quantity - 1 WHERE user_id = $1 AND name = $2', [user.id, product.name]);
      } else {
        await sql.query('DELETE FROM card_items WHERE user_id = $1 AND name = $2', [user.id, product.name]);
      }
    }
  } catch (error) {
    console.error('Failed to decrease product quantity:', error);
    throw new Error('Failed to decrease product quantity');
  }
};

export const increaseProductQuantity = async (user: UserwithoutPassword, product: cardProducts): Promise<void> => {
  try {
    await sql.query('UPDATE card_items SET quantity = quantity + 1 WHERE user_id = $1 AND name = $2', [user.id, product.name]);
  } catch (error) {
    console.error('Failed to increase product quantity:', error);
    throw new Error('Failed to increase product quantity');
  }
};

export const deleteProductsFromCard = async (user:UserwithoutPassword): Promise<void> => {
  try {
    const query = `
      DELETE FROM card_items
      WHERE user_id = $1;
    `;
    await sql.query(query, [user.id]);
  } catch (error) {
    console.error('Failed to delete all products', error);
    throw new Error('Failed to delete all products');
  }
}

export const deleteSelectedProductsFromCard = async (user: UserwithoutPassword, product: cardProducts): Promise<void> => {
  try {
    const query = `
      DELETE FROM card_items
      WHERE user_id = $1 AND name = $2;
    `;
    await sql.query(query, [user.id, product.name]);
    console.log('Selected product deleted from cart successfully');
  } catch (error) {
    console.error('Failed to delete selected product', error);
    throw new Error('Failed to delete selected product');
  }
};

export async function fetchFoodProducts(): Promise<Productstype[]> {
  try {
    const data = await sql<Productstype>`SELECT * FROM foodproducts`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products');
  }
}

export const addProductToDb = async (product: productValues): Promise<void> => {
  const table = product.category === 'electronic' ? 'electronicproducts' : 'foodproducts';
  console.log('Selected table:', table);

  try {
    const query = `
      INSERT INTO ${table} (name, info, price, image)
      VALUES ($1, $2, $3, $4)
    `;
    await sql.query(query, [product.name, product.info, product.price, product.image]);
    console.log('Product added successfully');

  } catch (error: any) {
    console.error('Failed to add product:', error.message);
  }
};

export const deleteProductFromDb = async (name: string, category: string): Promise<void> => {
  console.log('Selected table:', category);

  try {
    const query = `
      DELETE FROM ${category} 
      WHERE name = $1
    `;
    const query2 = `
    DELETE FROM card_items
    WHERE name = $1
    `
    await sql.query(query, [name]);
    await sql.query(query2,[name])
    console.log('Product deleted successfully');
  } catch (error: any) {
    console.error('Failed to delete product:', error.message);
  }
};

export const addLiketoDb = async (user: UserwithoutPassword, product: Productstype): Promise<void> => {
  try {
    const query = `
      INSERT INTO liked_items (user_id, name, info, price, image, category)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id, name, info, price, image, category)
      DO NOTHING;
    `;
    await sql.query(query, [
      user.id,
      product.name,
      product.info,
      product.price,
      product.image,
      product.category,
    ]);
    console.log('Product added to liked items successfully');
  } catch (error: any) {
    console.error('Failed to add product to liked items:', error.message);
    throw new Error('Failed to add product to liked items');
  }
};

export const removeLikefromDb = async (user: UserwithoutPassword, product: Productstype): Promise<void> => {
  try {
    const query = `
      DELETE FROM liked_items
      WHERE user_id = $1 AND name = $2
    `;

    await sql.query(query, [
      user.id,
      product.name,
    ]);
    
    console.log('Product removed from liked items successfully');
  } catch (error: any) {
    console.error('Failed to remove product from liked items:', error.message);
    throw new Error('Failed to remove product from liked items');
  }
};

export const fetchLikedListFromDb = async (user: UserwithoutPassword): Promise<Productstype[]> => {
  try {
    const query = `
      SELECT user_id, id, name, info, price, image, category
      FROM liked_items
      WHERE user_id = $1;
    `;
    const result = await sql.query(query, [user.id]);
    return result.rows;
    
  } catch (error: any) {
    console.error('Failed to fetch liked items:', error.message);
    return []; 
  }
};