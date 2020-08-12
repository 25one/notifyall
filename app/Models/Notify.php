<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notify extends Model
{
    protected $fillable = [
        'name',
        'address',
        'email',
        'phone',
        'attachments_name',  
    ];    
}
