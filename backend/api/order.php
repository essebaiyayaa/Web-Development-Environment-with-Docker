<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->items) && !empty($data->client)) {
    try {
        $db->beginTransaction();

        // Enregistrer le client
        $client = $data->client;
        $query = "INSERT INTO clients (nom, email, adresse, telephone) VALUES (:nom, :email, :adresse, :telephone)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":nom", $client->nom);
        $stmt->bindParam(":email", $client->email);
        $stmt->bindParam(":adresse", $client->adresse);
        $stmt->bindParam(":telephone", $client->telephone);
        $stmt->execute();
        $client_id = $db->lastInsertId();

        // Calcul du total
        $total = 0;
        foreach ($data->items as $item) {
            $total += $item->prix * $item->quantity;
        }

        // Création de la commande
        $query = "INSERT INTO commandes (total, client_id) VALUES (:total, :client_id)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":total", $total);
        $stmt->bindParam(":client_id", $client_id);
        $stmt->execute();
        $commande_id = $db->lastInsertId();

        // Ajout des détails de la commande
        $query = "INSERT INTO details_commande (commande_id, plat_id, quantite, prix_unitaire) 
                 VALUES (:commande_id, :plat_id, :quantite, :prix_unitaire)";
        $stmt = $db->prepare($query);

        foreach ($data->items as $item) {
            $stmt->bindParam(":commande_id", $commande_id);
            $stmt->bindParam(":plat_id", $item->id);
            $stmt->bindParam(":quantite", $item->quantity);
            $stmt->bindParam(":prix_unitaire", $item->prix);
            $stmt->execute();
        }

        $db->commit();

        http_response_code(201);
        echo json_encode(array(
            "success" => true,
            "message" => "Commande créée avec succès",
            "commande_id" => $commande_id
        ));

    } catch (Exception $e) {
        $db->rollBack();
        http_response_code(503);
        echo json_encode(array(
            "success" => false,
            "message" => "Impossible de créer la commande: " . $e->getMessage()
        ));
    }
} else {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Impossible de créer la commande. Données incomplètes."
    ));
}
?> 