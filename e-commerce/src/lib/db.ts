'use server'
import { sql } from '@vercel/postgres';
import {User,Productstype,cardProducts} from './types'
import bcrypt from 'bcrypt';
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

export const fetchCardProducts = async (user: User): Promise<cardProducts[]> => {
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

export const addLocalCartItemsToDb = async (user: User, localCartItems: cardProducts[]): Promise<void> => {
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



export const addProductToCart = async (user: User, product: Productstype): Promise<void> => {
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

export const decreaseProductQuantity = async (user: User, product: cardProducts): Promise<void> => {
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

export const increaseProductQuantity = async (user: User, product: cardProducts): Promise<void> => {
  try {
    await sql.query('UPDATE card_items SET quantity = quantity + 1 WHERE user_id = $1 AND name = $2', [user.id, product.name]);
  } catch (error) {
    console.error('Failed to increase product quantity:', error);
    throw new Error('Failed to increase product quantity');
  }
};

export const deleteProductsFromCard = async (user:User): Promise<void> => {
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

export const deleteSelectedProductsFromCard = async (user: User, product: cardProducts): Promise<void> => {
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


/* 
products page inde handleAddtoCart burdaki fonksiyonu tetiklicek sonrasında db'e 
cart_items tablosuna product infolar user_id ile birlikte eklenecek. bu işlemi yaptıktan sonra
aynı user id'ye sahip olan ürünlerin sayısını bulabilmemiz için de bir fetch fonksiyonu yazıcaz buraya 
bu bize navbarda sepette var olan ürün sayısını verecek currentuser için. shopping card'a gittiğimizde
burdaki fonksiyon tetiklenicek ve sepete eklenen ürünler aynı currentuser id için fetch edilecek.
*/

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

export const addLiketoDb = async (user: User, product: Productstype): Promise<void> => {
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

export const removeLikefromDb = async (user: User, product: Productstype): Promise<void> => {
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
export const fetchLikedListFromDb = async (user: User): Promise<Productstype[]> => {
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

export async function registerUser(data: { name: string, email: string, password: string, country: string }): Promise<{ user: User | null, error?: string }> {
  try {
    const existingUser = await sql<User>`SELECT * FROM users WHERE email = ${data.email}`;

    if (existingUser.rows.length > 0) {
      return { user: null, error: 'This email address is already in use.' };
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const result = await sql<User>`INSERT INTO users (name, email, password, country) 
    VALUES (${data.name}, ${data.email}, ${hashedPassword}, ${data.country}) RETURNING *;`;

    return { user: result.rows[0] || null };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { user: null, error: 'An error occurred while creating the user.' };
  }
}

export async function loginUser(email: string, password: string): Promise<{ user: User | null, error?: string }> {
  try {
    const result = await sql<User>`
      SELECT * FROM users WHERE email = ${email}`;
    
      const user = result.rows[0];
    if (!user) {
      return { user: null, error: 'No account found with this email.' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { user: null, error: 'Invalid password.' };
    }

    
    return { user };
  } catch (error) {
    console.error("Failed to authenticate user:", error);
    return { user: null, error: 'An error occurred during authentication.' };
  }
}