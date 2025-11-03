<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShopSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
    ];

    /**
     * Get setting value with proper casting
     */
    public function getValue()
    {
        switch ($this->type) {
            case 'boolean':
                return (bool) $this->value;
            case 'number':
                return (float) $this->value;
            case 'json':
                return json_decode($this->value, true);
            default:
                return $this->value;
        }
    }

    /**
     * Set setting value with proper casting
     */
    public function setValue($value)
    {
        switch ($this->type) {
            case 'boolean':
                $this->value = $value ? '1' : '0';
                break;
            case 'json':
                $this->value = json_encode($value);
                break;
            default:
                $this->value = (string) $value;
        }
    }

    /**
     * Get setting by key
     */
    public static function get($key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        return $setting ? $setting->getValue() : $default;
    }

    /**
     * Set setting by key
     */
    public static function set($key, $value, $type = 'text')
    {
        $setting = self::firstOrNew(['key' => $key]);
        $setting->type = $type;
        $setting->setValue($value);
        $setting->save();
        return $setting;
    }
}
