import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
      setFeatured(response.data.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesome
        key={index}
        name={index < Math.floor(rating) ? 'star' : 'star-o'}
        size={16}
        color={index < Math.floor(rating) ? '#FFD700' : '#BDC3C7'}
        className="mr-0.5"
      />
    ));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View className="p-5 bg-blue-500 mb-5">
        <Text className="text-base text-white/80">Browse through our products and find your taste</Text>
      </View>

      {/* All Products */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">All Products</Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} asChild key={product.id}>
              <TouchableOpacity className="w-[47%] bg-white rounded-xl shadow-sm">
                <Image 
                  source={{ uri: product.image }} 
                  className="w-full h-[150px] rounded-t-xl resize-contain" 
                />
                <View className="p-3">
                  <Text className="text-sm font-semibold text-gray-800 mb-1" numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text className="text-base font-bold text-blue-500 mb-1">
                    ${product.price}
                  </Text>
                  <View className="flex-row items-center">
                    {renderStars(product.rating.rate)}
                    <Text className="ml-1 text-xs text-gray-400">
                      ({product.rating.count})
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
