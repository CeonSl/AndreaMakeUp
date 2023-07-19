<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Exception;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index()
    {
        try {
            return response()->json(Store::all(), 200);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function store(Request $request)
    {
        Store::create($request->all());
        return response()->json(['Mensaje' => 'Agregado Correctamente'], 201);
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
        $store = Store::find($id);
        if (is_null($store)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }
        return response()->json($store, 200);
    }

    public function update(Request $request, $id)
    {
        $store = Store::find($id);

        if (is_null($store)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }

        $store->update($request->all());
        return response()->json(['Mensaje' => 'Actualizado Correctamente'], 200);
    }

    public function destroy($id)
    {
        $store = Store::find($id);
        if (is_null($store)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }

        try {
            $store->delete();
            return response()->json(['Mensaje' => 'Eliminado Correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['Error' => 'No puedes eliminar una categoria que está en uso'], 403);
        }
    }
}
