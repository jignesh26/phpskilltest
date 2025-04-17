<?php
$dataFile = 'data.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productName = $_POST['productName'];
    $quantity = (int)$_POST['quantity'];
    $price = (float)$_POST['price'];
    $datetime = date('Y-m-d H:i:s');

    $data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

    if (isset($_POST['index'])) {
        $index = (int)$_POST['index'];
        $data[$index] = [
            'productName' => $productName,
            'quantity' => $quantity,
            'price' => $price,
            'datetime' => $datetime
        ];
    } else {
        $data[] = [
            'productName' => $productName,
            'quantity' => $quantity,
            'price' => $price,
            'datetime' => $datetime
        ];
    }

    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true]);
}