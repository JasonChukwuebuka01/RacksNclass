import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
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

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesome
        key={index}
        name={index < Math.floor(rating) ? 'star' : 'star-o'}
        size={20}
        color={index < Math.floor(rating) ? '#FFD700' : '#BDC3C7'}
        className="mr-1"
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

  if (!product) {
    return (
      <View className="flex-1">
        <Text className="text-lg text-red-500 text-center mt-5">Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
      <View className="bg-white p-5 items-center rounded-b-3xl shadow-md">
        <Image source={{ uri: product.image }} className="w-full h-[300px] resize-contain" />
      </View>
      
      <View className="p-5">
        <Text className="text-sm text-blue-500 mb-2 font-semibold">
          {product.category.toUpperCase()}
        </Text>
        <Text className="text-2xl font-bold text-gray-800 mb-4">{product.title}</Text>
        
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-3xl font-bold text-blue-500">${product.price}</Text>
          <View className="flex-row items-center">
            {renderStars(product.rating.rate)}
            <Text className="ml-2 text-sm text-gray-400">
              ({product.rating.count} reviews)
            </Text>
          </View>
        </View>

        <Text className="text-lg font-semibold text-gray-800 mb-2">Description</Text>
        <Text className="text-base text-gray-800 leading-6 mb-6">{product.description}</Text>

        <TouchableOpacity 
          className="bg-blue-500 flex-row items-center justify-center p-4 rounded-xl shadow-lg"
          onPress={() => {
            // TODO: Implement add to cart functionality
            router.push('/cart');
          }}
        >
          <FontAwesome name="shopping-cart" size={20} color="white" className="mr-2" />
          <Text className="text-white text-lg font-bold">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}