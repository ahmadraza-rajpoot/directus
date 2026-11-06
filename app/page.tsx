'use client';

import ProductCard from '@/components/Product';
import ProductForm, { ProductFormData } from '@/components/ProductForm';
import { createProduct } from '@/data/createProduct';
import { getProductData } from '@/data/getProduct';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export default function Home() {

  const queryClient = useQueryClient();

 
  const { data, error, isLoading } = useQuery({
    queryKey: ['product_data'],
    queryFn: getProductData,
  });

 
  const mutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product_data'],
      });
    },
  });

  async function handleSubmit(data: ProductFormData) {
    try {
      const result = await mutation.mutateAsync(data);

      console.log('Product created:', result);

    } catch (error) {
      console.error(error);
      alert('Something went wrong while creating the product.');
      throw error;
    }
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong.</div>;

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-12 dark:bg-black">

      <ProductForm onSubmit={handleSubmit} />

      <h1 className="mb-10 mt-10 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Products
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {data?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </main>
  );
}
