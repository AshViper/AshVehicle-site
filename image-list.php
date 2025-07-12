<?php
$dir = "./images/";

// ディレクトリが存在し、読み取れる場合のみ処理
if (is_dir($dir) && is_readable($dir)) {
    $files = array_values(array_filter(scandir($dir), function ($file) use ($dir) {
        return is_file($dir . $file) && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file);
    }));
} else {
    $files = []; // エラー時は空配列
}

// JSONとして出力
header('Content-Type: application/json');
echo json_encode($files);
?>