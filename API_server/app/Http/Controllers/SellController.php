<?php

namespace App\Http\Controllers;

use App\Models\Sell;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class SellController extends Controller
{

    public function store(Request $request)
    {
        // Sell::create($request->all());
        $data = $request->all();

        try {
            $ids = [];
            foreach ($data as $row) {
                $row['created_at'] = now();
                $id = DB::table('sells')->insertGetId($row);
                $ids[] = $id;
            }
            return response()->json(['Mensaje' => $ids], 201);
        } catch (Exception $e) {
            return response()->json(['Mensaje' => $e], 200);
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
        $sell = Sell::find($id);
        if (is_null($sell)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }
        return response()->json($sell, 200);
    }

    public function update(Request $request, $id)
    {
        $sell = Sell::find($id);
        if (is_null($sell)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }

        $sell->update($request->all());
        return response()->json(['Mensaje' => 'Actualizado Correctamente'], 200);
    }

    public function destroy($id)
    {
        $sell = Sell::find($id);
        if (is_null($sell)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }
        $sell->delete();
        return response()->json(['Mensaje' => 'Eliminado Correctamente'], 200);
    }
}
