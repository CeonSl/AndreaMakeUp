<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sell;
use App\Models\SellProduct;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class SellProductController extends Controller
{
    public function index()
    {
        try {
            return response()->json([SellProduct::all(), Sell::all()], 200);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $dataProducts = Product::all();
        for($i = 0; $i < sizeof($data); $i++) {
            if($data[$i]['product_id'] == $dataProducts[$i]['id']) {
                $dataProducts[$i]['stock'] =  $dataProducts[$i]['stock'] - $data[$i]['quantity'];
                $dataProducts[$i]->save();
            }
        }
        try {
            DB::table('sell_products')->insert($data);
            return response()->json(['Mensaje' => 'Agregado Correctamente'], 201);
            return response()->json(['Mensaje' => 'Agregado Correctamente'], 201);
        } catch (Exception $e) {
            return response()->json(['Mensaje' => $e->getMessage()], 200);
        }
    }

    public function getCsrfToken(Request $request)
    {
        $token = csrf_token();

        $response = Response::make('', 200);
        $response->header('X-CSRF-TOKEN', $token);

        return $response;
    }

    public function getNewSellsByDate(Request $request) {
        $data = $request->all();
        // $month = $data['month'];
        // $year = $data['year'];
        return response()->json(['Mensaje' => 0], 200);
        // $dataSells = SellProduct::all();
        // for($i = 0; $i < sizeof($dataSells); $i++) {
        //     if($dataSells[$i]['created_at']->format('n') == $month) {
        //         return response()->json(['Mensaje' => 'Es correcto'], 200);
        //     }
        // }
        // return response()->json(['Mensaje' => 'NO es correcto'], 200);
    }

    public function show($id)
    {
        $sellProduct = SellProduct::find($id);
        $sellId = $sellProduct->sell_id;

        $sellSend = Sell::find($sellId);
        if (is_null($sellProduct)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }
        return response()->json([$sellProduct, $sellSend], 200);
    }

    public function update(Request $request, $id)
    {
        $sellProduct = SellProduct::find($id);
        if (is_null($sellProduct)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }

        $sellProduct->update($request->all());
        return response()->json(['Mensaje' => 'Actualizado Correctamente'], 200);
    }

    public function destroy($id)
    {
        $sellProduct = SellProduct::find($id);
        if (is_null($sellProduct)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }
        $productToChange = Product::find($sellProduct['product_id']); 
        $productToChange['stock'] += $sellProduct['quantity'];
        $productToChange->save();
        $sellProduct->delete();
        return response()->json(['Mensaje' => 'Eliminado Correctamente'], 200);
    }
}
