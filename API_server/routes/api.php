<?php

use App\Http\Controllers\ParameterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellController;
use App\Http\Controllers\SellProductController;
use App\Http\Controllers\StoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('parameters', ParameterController::class);
Route::get('csrf/parameters', [ParameterController::class, 'getCsrfToken']);
Route::get('parameters-products', [ParameterController::class, 'getCategoriesByProducts']);

Route::resource('stores', StoreController::class);
Route::get('csrf/stores', [StoreController::class, 'getCsrfToken']);

Route::resource('products', ProductController::class);
Route::get('csrf/products', [ProductController::class, 'getCsrfToken']);

Route::resource('sells', SellController::class);
Route::get('csrf/sells', [SellController::class, 'getCsrfToken']);

Route::resource('sellproducts', SellProductController::class);
Route::get('csrf/sellproducts', [SellProductController::class, 'getCsrfToken']);
