<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellProduct extends Model
{
    protected $fillable = ['quantity','sell_id','product_id', 'store_id'];
    use HasFactory;
}
