'use server'
import { sql } from '@vercel/postgres';
import {User,Productstype} from './types'
import bcrypt from 'bcrypt';
import { productValues } from '@/components/modals/AddProduct';

export async function fetchElectronicProducts(): Promise<Productstype[]> {
  try {
    const data = await sql<Productstype>`SELECT * FROM electronicproducts`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products');
  }
}

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
  const table = product.category === ('electronic' ? 'electronicproducts' : 'foodproducts');
  console.log('Selected table:', table);

  try {
    await sql<productValues>`
      INSERT INTO ${table}(name, info, price, image)
      VALUES (${product.name}, ${product.info}, ${product.price}, ${product.image})
    `;
    console.log('Product added successfully');
  } catch (error) {
    console.error('Failed to add product:', error);
    throw new Error('Failed to add product');
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