import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Truck, Shield, Headphones } from 'lucide-react';
import { Product, Category } from '../types';
import apiService from '../services/api';
import { useCart } from '../contexts/CartContext';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products
        const productsResponse = await apiService.getProducts({
          is_featured: true,
          per_page: 8,
        });
        
        if (productsResponse.success) {
          setFeaturedProducts(productsResponse.data.data);
        }

        // Fetch categories
        const categoriesResponse = await apiService.getCategories();
        if (categoriesResponse.success) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(price));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue dans Ma Boutique
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Découvrez nos produits de qualité à des prix exceptionnels
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Voir tous les produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/categories"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
              >
                Parcourir les catégories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison Gratuite</h3>
              <p className="text-gray-600">
                Livraison gratuite pour toute commande supérieure à 50€
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">
                Vos transactions sont protégées par un cryptage SSL
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support 24/7</h3>
              <p className="text-gray-600">
                Notre équipe est disponible pour vous aider à tout moment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Catégories
            </h2>
            <p className="text-lg text-gray-600">
              Explorez notre large gamme de produits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <span className="text-primary-600 text-4xl font-bold">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produits en Vedette
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez nos meilleures sélections
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:8000/storage/${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Pas d'image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.short_description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {product.sale_price ? (
                        <>
                          <span className="text-lg font-bold text-primary-600">
                            {formatPrice(product.sale_price)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                    >
                      Voir détails
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary-600 text-white px-3 py-2 rounded-md hover:bg-primary-700 transition-colors"
                      disabled={!product.in_stock}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              Voir tous les produits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
