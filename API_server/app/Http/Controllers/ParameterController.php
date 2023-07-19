<?php

namespace App\Http\Controllers;

use App\Models\Parameter;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;


class ParameterController extends Controller
{
    public function index()
    {
        try {
            return response()->json(Parameter::all(), 200);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    public function getCategoriesByProducts()
    {
        try {
            $categories = Parameter::where('type', 'Productos')->get();
            return response()->json($categories, 200);
        } catch (Exception $err) {
            return response()->json($err);
        }
    }

    public function store(Request $request)
    {
        Parameter::create($request->all());
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
        $parameter = Parameter::find($id);
        if (is_null($parameter)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }
        return response()->json($parameter, 200);
    }

    public function update(Request $request, $id)
    {
        $parameter = Parameter::find($id);
        $validateRequestType = $request->input('type');
        $productsUseParameter = Product::where('category_id', $id)->get();

        if ($validateRequestType != $parameter->type && count($productsUseParameter) > 0) {
            return response()->json(['Error' => 'No puedes editar el tipo de una categoria que está en uso'], 403);
        }

        if (is_null($parameter)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }

        $parameter->update($request->all());
        return response()->json(['Mensaje' => 'Actualizado Correctamente'], 200);
    }

    public function destroy($id)
    {
        $parameter = Parameter::find($id);
        if (is_null($parameter)) {
            return response()->json(['Mensaje' => 'Registro no encontrado'], 404);
        }

        try {
            $parameter->delete();
            return response()->json(['Mensaje' => 'Eliminado Correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['Error' => 'No puedes eliminar una categoria que está en uso'], 403);
        }
    }
}
