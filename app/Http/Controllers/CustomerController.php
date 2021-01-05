<?php

namespace App\Http\Controllers;

use App\Customers;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customer = Customers::all();
        return response()->json($customer);
    }
    public function create(Request $request)
    {
        $data = $request->except('_token');
        $customer = Customers::create($data);
        return response()->json(['pesan' => true]);
    }
    public function edit($id)
    {
        $customer = Customers::findOrFail($id);
        return response()->json($customer);
    }
    public function update(Request $request, $id)
    {
        $pesan = [];
        $data = $request->except('_token');
        $customer = Customers::where('id', $id)->update($data);
        if ($customer) {
            $pesan['updated'] = true;
        } else {
            $pesan['updated'] = false;
        }
        return response()->json($pesan);
    }
    public function delete($id)
    {
        $customer = Customers::where('id', $id)->delete();
        return response()->json(['delete' => true]);
    }
}
