<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use File;

class ProductController extends Controller
{
    public function index()
    {
        try {
            return response()->json(Product::all(), 200);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function store(Request $request)
    {
        //Recieve image
        $imgData = $request->input('img.data');

        $replace = substr($imgData, 0, strpos($imgData, ',') + 1);
        $image = str_replace($replace, '', $imgData);
        $image = str_replace(' ', '+', $image);
        $imageName = $request->input('img.filename');
        Storage::disk('public')->put($imageName, base64_decode($image));
        $path = 'storage/' . $imageName;

        // Store data
        $product = $request->all();
        $productSend = new Product();
        $productSend->name = $product['name'];
        $productSend->price = $product['price'];
        $productSend->state = $product['state'];
        $productSend->stock = $product['stock'];
        $productSend->store_id = $product['store_id'];
        $productSend->category_id = $product['category_id'];
        $productSend->img = $path;

        try {
            $productSend->save();
            return response()->json(['Mensaje' => 'Agregado Correctamente'], 201);
        } catch (Exception $err) {
            return response()->json($err->getMessage());
        }
    }

    public function getCsrfToken(Request $request)
    {
        $token = csrf_token();

        $response = Response::make('', 200);
        $response->header('X-CSRF-TOKEN', $token);

        return $response;
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (is_null($product)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }
        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
    {
        $productUpdate = Product::find($id);
        $product = $request->all();

        $imgSended = explode('/', $request->input('img.data'));
        $formatterImgName = array_pop($imgSended);
        $formatterImg = 'storage/' . $formatterImgName;

        if ($formatterImg != $productUpdate->img) {
            $imgData = $request->input('img.data');
            $replace = substr($imgData, 0, strpos($imgData, ',') + 1);
            $image = str_replace($replace, '', $imgData);
            $image = str_replace(' ', '+', $image);
            $imageName = $request->input('img.filename');
            Storage::disk('public')->put($imageName, base64_decode($image));
            $path = 'storage/' . $imageName;
            $productUpdate->img = $path;
        }
        // Store data
        $productUpdate->name = $product['name'];
        $productUpdate->price = $product['price'];
        $productUpdate->state = $product['state'];
        $productUpdate->stock = $product['stock'];
        $productUpdate->store_id = $product['store_id'];
        $productUpdate->category_id = $product['category_id'];

        if (is_null($productUpdate)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }

        try {
            $productUpdate->save();
            return response()->json(['Mensaje' => 'Actualizado Correctamente'], 200);
        } catch (Exception $err) {
            return response()->json($err->getMessage());
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (is_null($product)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }
        $imageName = $product->img;
        $imageName = explode('/', $imageName);
        $imgName = array_pop($imageName);
        Storage::disk('public')->delete($imgName);
        $product->delete();
        return response()->json(['Mensaje' => 'Eliminado Correctamente'], 200);
    }
}
