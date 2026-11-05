'use client';

import { useState } from 'react';

export interface ProductFormData {
  name: string;
  description: string;
  stock: number;
  price: number;
  category: string;
  image: File | null;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => Promise<unknown>;
}

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    stock: 0,
    price: 0,
    category: '',
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stock'
          ? Number(value)
          : value,
    }));
  };

const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;

  try {
    await onSubmit(formData);

    // Reset React state
    setFormData({
      name: '',
      description: '',
      stock: 0,
      price: 0,
      category: '',
      image: null,
    });

    // Reset file input
    form.reset();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-5 rounded-xl border p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold">Add New Product</h2>

      {/* Product Name */}
      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          required
          rows={4}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block mb-1 font-medium">Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block mb-1 font-medium">Product Image</label>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              image: e.target.files?.[0] ?? null,
            }))
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
      >
        Create Product
      </button>
    </form>
  );
}