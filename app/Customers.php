<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customers extends Model
{
    protected $table = "tb_customers";
    protected $fillable = ['name', 'phoneNumber', 'email'];
}
