<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT p.*, c.nom as categorie_nom 
          FROM plats p 
          JOIN categories c ON p.categorie_id = c.id 
          ORDER BY c.id, p.nom";

$stmt = $db->prepare($query);
$stmt->execute();

$menu = array();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $menu_item = array(
        "id" => $row['id'],
        "nom" => $row['nom'],
        "description" => $row['description'],
        "prix" => floatval($row['prix']),
        "categorie" => strtolower($row['categorie_nom']),
        "image_url" => $row['image_url']
    );
    array_push($menu, $menu_item);
}

http_response_code(200);
echo json_encode($menu);
?> 