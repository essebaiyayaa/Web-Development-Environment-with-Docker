
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/example', function () {
    return response()->json([
        'message' => 'Hello from Laravel',
        'status' => 'success'
    ]);
});

Route::get('/ping', function () {
    return response()->json(['status' => 'Laravel fonctionne ✅']);
});
