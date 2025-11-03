<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'short_description',
        'price',
        'sale_price',
        'sku',
        'stock_quantity',
        'manage_stock',
        'in_stock',
        'images',
        'weight',
        'dimensions',
        'is_featured',
        'is_active',
        'category_id',
        'attributes',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'weight' => 'decimal:2',
        'stock_quantity' => 'integer',
        'manage_stock' => 'boolean',
        'in_stock' => 'boolean',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'images' => 'array',
        'attributes' => 'array',
    ];

    /**
     * Get the category that owns the product
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get order items for this product
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Scope for active products
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for featured products
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope for in stock products
     */
    public function scopeInStock($query)
    {
        return $query->where('in_stock', true);
    }

    /**
     * Get the current price (sale price if available, otherwise regular price)
     */
    public function getCurrentPrice()
    {
        return $this->sale_price ?? $this->price;
    }

    /**
     * Check if product is on sale
     */
    public function isOnSale()
    {
        return $this->sale_price !== null && $this->sale_price < $this->price;
    }

    /**
     * Get the main image
     */
    public function getMainImage()
    {
        return $this->images[0] ?? null;
    }
}
