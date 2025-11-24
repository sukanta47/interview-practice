import { useEffect, useState } from 'react';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;

  dimensions: {
    width: number;
    height: number;
    depth: number;
  };

  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;

  reviews: Review[];

  returnPolicy: string;
  minimumOrderQuantity: number;

  meta: {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
  };

  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

export const useProductFetch = (): Product[] | undefined => {
  const [data, setData] = useState<Product[]>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://dummyjson.com/products');
      const _data = await res.json();
      if (_data) {
        setData(_data.products);
      }
    };
    fetchData();
  }, []);
  return data;
};
