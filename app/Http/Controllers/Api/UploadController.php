<?php

namespace App\Http\Controllers\Api; 

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UploadController extends Controller
{
    /**
     * Upload selected file.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function __invoke(Request $request)
    {
        $file = $request->file;         
        $filecontent = $file->openFile()->fread($file->getSize());  
        $filename = date('YmdHis') . $file->getClientOriginalName();  
        $file->move(public_path() . '/img/', $filename);  
        return '/img/' . $filename;    
    }

}
