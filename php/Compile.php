<?php 
//js.php
require 'jsmin.php';



$compileOrder=array(
    "Constants.js",
    "CollisionUtils.js",
    "Utils.js",
    "LayerList.js",
    "FrameIntervalImpl.js",
    "Game.js",
    "CanvasExt.js",
    "ModuleTools.js",
    "MessageContainer.js",
    "AssetManager.js",
    "SpriteSheet.js",
    "Animation.js",
    "FrameTimer.js",
    "iModule.js",
    "Object.js",
    "Clickable.js",
    "CursorMovable.js",
    "Image.js",
    "ObjectLayer.js",
    "LandscapeLayer.js",
    "Movement.js",
    "Collision.js",
    "LoadingScreen.js",
    "Rectangle.js",
    "Circle.js",
    "RectangleClick.js",
    "FirstPlayer.js",
    "Text.js",
    "CollisionBox.js",
    "fpsModule.js",
    "LayerHandler.js",
    "CollisionManager.js",
    "DebugModule.js",
);

compile($compileOrder,"game.compiled.js","../js/game","",true);


function checkCanGzip(){
    if (array_key_exists('HTTP_ACCEPT_ENCODING', $_SERVER)) {
        if (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip') !== false) return "gzip";
        if (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'x-gzip') !== false) return "x-gzip";
    }
    return false;
}

function gzDocOut($contents, $level=6){
    $return = array();
    $return[] = "\x1f\x8b\x08\x00\x00\x00\x00\x00";
    $size = strlen($contents);
    $crc = crc32($contents);
    $contents = gzcompress($contents,$level);
    $contents = substr($contents, 0, strlen($contents) - 4);
    $return[] = $contents;
    $return[] = pack('V',$crc);
    $return[] = pack('V',$size);
    return implode(null, $return);
}

/**
 * Funcion que recorre una ruta pasada como parámetro. En esa ruta se buscaran
 * todos los archivos .js, se unirán en uno solo y se intentarán minimizar.
 * 
 * El parámetro type especifica el tipo de salida: gz(comprimido), plain(plano). 
 * 
 * En caso de no recibir nada, se guardará en un directorio por defecto.
 */
function compile($compileOrder,$outputName,$path,$type="",$debug = false){

    foreach($compileOrder as $file) {

        $f = searchJsFile($file,$path,$debug);
        $fdata = "";
        while ( ! $f->eof()) {
                $fdata .= $f->fgets();
        }
        $buffer[] = $fdata;
    }

    $output = JSMin::minify(implode(";\n", $buffer));

    if ($type == "gz") {
        if($debug) echo "<br/>Writing gz file to: ../js/".$outputName.".gz";
        $file = fopen("../js/".$outputName.".gz","w");
        fwrite($file,gzDocOut($output));
    } elseif ($type == "plain") {
        if($debug) echo "<br/>Output generated file here:";
        echo $output;
    } else {
        if($debug) echo "<br/>Writing file to: ../js/".$outputName;
        $file = fopen("../js/".$outputName, 'w');
        fwrite($file,$output);
    }
}

function searchJsFile($name,$path,$debug){
    $ite = new RecursiveDirectoryIterator(dirname($path));
    foreach(new RecursiveIteratorIterator($ite) as $file => $fileInfo) {
        $fName = pathinfo($file, PATHINFO_FILENAME).".".pathinfo($file, PATHINFO_EXTENSION);

        if ($fName == $name) {
                if($debug) echo "Compiling: ".$fName."<br/>";
                return $fileInfo->openFile('r');
        }
    }
    return null;
}
?>
