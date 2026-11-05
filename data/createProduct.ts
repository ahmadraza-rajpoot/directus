'use server'

import { ProductFormData } from '@/components/ProductForm';
import { revalidatePath } from 'next/cache';

const DIRECTUS_URL = 'http://localhost:8055';

export async function createProduct(data: ProductFormData) {
  try {
    if (!data.image) {
      throw new Error('Please select a product image.');
    }

    // Step 1: Upload image
    const imageFormData = new FormData();
    imageFormData.append('file', data.image);

    const imageResponse = await fetch(`${DIRECTUS_URL}/files`, {
      method: 'POST',
      body: imageFormData,
    });

    if (!imageResponse.ok) {
      throw new Error('Image upload failed');
    }

    const imageResult = await imageResponse.json();

    // Step 2: Get image UUID
    const imageId = imageResult.data.id;

    // Step 3: Create product
    const productResponse = await fetch(
      `${DIRECTUS_URL}/items/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          stock: data.stock,
          price: data.price,
          category: data.category,
          image: imageId,
        }),
      }
    );

    if (!productResponse.ok) {
      throw new Error('Product creation failed');
    }

    const productResult = await productResponse.json();
    revalidatePath("/")
    return productResult.data;

  } catch (error) {
    console.error('Create product error:', error);
    throw error;
  }
}
