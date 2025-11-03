<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\ShopSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@ecommerce.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '+33123456789',
            'address' => '123 Admin Street',
            'city' => 'Paris',
            'postal_code' => '75001',
            'country' => 'France',
        ]);

        // Create test client
        User::create([
            'name' => 'Test Client',
            'email' => 'client@example.com',
            'password' => Hash::make('password'),
            'role' => 'client',
            'phone' => '+33987654321',
            'address' => '456 Client Avenue',
            'city' => 'Lyon',
            'postal_code' => '69001',
            'country' => 'France',
        ]);

        // Create categories
        $electronics = Category::create([
            'name' => 'Électronique',
            'slug' => 'electronique',
            'description' => 'Produits électroniques et high-tech',
            'is_active' => true,
            'sort_order' => 1,
        ]);

        $clothing = Category::create([
            'name' => 'Vêtements',
            'slug' => 'vetements',
            'description' => 'Mode et vêtements pour tous',
            'is_active' => true,
            'sort_order' => 2,
        ]);

        $books = Category::create([
            'name' => 'Livres',
            'slug' => 'livres',
            'description' => 'Livres et littérature',
            'is_active' => true,
            'sort_order' => 3,
        ]);

        // Create products
        Product::create([
            'name' => 'iPhone 15 Pro',
            'slug' => 'iphone-15-pro',
            'description' => 'Le dernier iPhone avec puce A17 Pro et appareil photo professionnel',
            'short_description' => 'iPhone 15 Pro - Titanium',
            'price' => 1229.00,
            'sale_price' => 1099.00,
            'sku' => 'IPHONE15PRO-128',
            'stock_quantity' => 50,
            'manage_stock' => true,
            'in_stock' => true,
            'category_id' => $electronics->id,
            'weight' => 0.187,
            'dimensions' => '146.6 x 70.6 x 8.25 mm',
            'is_featured' => true,
            'is_active' => true,
            'images' => ['products/iphone15pro.jpg'],
            'attributes' => [
                'color' => 'Titanium Naturel',
                'storage' => '128GB',
                'warranty' => '2 ans'
            ]
        ]);

        Product::create([
            'name' => 'MacBook Air M2',
            'slug' => 'macbook-air-m2',
            'description' => 'MacBook Air avec puce M2, écran Liquid Retina 13,6 pouces',
            'short_description' => 'MacBook Air M2 - 256GB',
            'price' => 1499.00,
            'sku' => 'MBA-M2-256',
            'stock_quantity' => 25,
            'manage_stock' => true,
            'in_stock' => true,
            'category_id' => $electronics->id,
            'weight' => 1.24,
            'dimensions' => '304 x 215 x 11.3 mm',
            'is_featured' => true,
            'is_active' => true,
            'images' => ['products/macbook-air-m2.jpg'],
            'attributes' => [
                'processor' => 'Apple M2',
                'memory' => '8GB',
                'storage' => '256GB SSD'
            ]
        ]);

        Product::create([
            'name' => 'T-shirt Premium Coton Bio',
            'slug' => 't-shirt-premium-coton-bio',
            'description' => 'T-shirt en coton biologique, coupe moderne et confortable',
            'short_description' => 'T-shirt coton bio - Noir',
            'price' => 29.99,
            'sale_price' => 24.99,
            'sku' => 'TSHIRT-BIO-001',
            'stock_quantity' => 100,
            'manage_stock' => true,
            'in_stock' => true,
            'category_id' => $clothing->id,
            'weight' => 0.15,
            'is_featured' => false,
            'is_active' => true,
            'images' => ['products/tshirt-bio.jpg'],
            'attributes' => [
                'material' => '100% Coton Bio',
                'sizes' => ['S', 'M', 'L', 'XL'],
                'colors' => ['Noir', 'Blanc', 'Gris']
            ]
        ]);

        Product::create([
            'name' => 'Le Petit Prince',
            'slug' => 'le-petit-prince',
            'description' => 'Le chef-d\'œuvre d\'Antoine de Saint-Exupéry',
            'short_description' => 'Roman classique français',
            'price' => 12.90,
            'sku' => 'BOOK-PP-001',
            'stock_quantity' => 200,
            'manage_stock' => true,
            'in_stock' => true,
            'category_id' => $books->id,
            'weight' => 0.12,
            'is_featured' => false,
            'is_active' => true,
            'images' => ['products/petit-prince.jpg'],
            'attributes' => [
                'author' => 'Antoine de Saint-Exupéry',
                'pages' => 96,
                'language' => 'Français',
                'publisher' => 'Gallimard'
            ]
        ]);

        // Create shop settings
        ShopSetting::create([
            'key' => 'shop_name',
            'value' => 'Ma Boutique E-commerce',
            'type' => 'text',
            'description' => 'Nom de la boutique'
        ]);

        ShopSetting::create([
            'key' => 'shop_description',
            'value' => 'Votre boutique en ligne moderne et intuitive',
            'type' => 'text',
            'description' => 'Description de la boutique'
        ]);

        ShopSetting::create([
            'key' => 'shop_email',
            'value' => 'contact@maboutique.com',
            'type' => 'text',
            'description' => 'Email de contact'
        ]);

        ShopSetting::create([
            'key' => 'shop_phone',
            'value' => '+33 1 23 45 67 89',
            'type' => 'text',
            'description' => 'Téléphone de contact'
        ]);

        ShopSetting::create([
            'key' => 'shop_address',
            'value' => json_encode([
                'street' => '123 Rue du Commerce',
                'city' => 'Paris',
                'postal_code' => '75001',
                'country' => 'France'
            ]),
            'type' => 'json',
            'description' => 'Adresse de la boutique'
        ]);

        ShopSetting::create([
            'key' => 'currency',
            'value' => 'EUR',
            'type' => 'text',
            'description' => 'Devise par défaut'
        ]);

        ShopSetting::create([
            'key' => 'tax_rate',
            'value' => '20',
            'type' => 'number',
            'description' => 'Taux de TVA en pourcentage'
        ]);

        ShopSetting::create([
            'key' => 'free_shipping_threshold',
            'value' => '50',
            'type' => 'number',
            'description' => 'Montant minimum pour la livraison gratuite'
        ]);
    }
}
