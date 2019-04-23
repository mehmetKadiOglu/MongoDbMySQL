<?php
set_time_limit(0);

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
require_once '../vendor/autoload.php';

class Chat implements MessageComponentInterface {
	protected $clients;
	protected $users;

	public function __construct() {
		$this->clients = new \SplObjectStorage;
	}

	public function onOpen(ConnectionInterface $conn) {
		$this->clients->attach($conn);
		// $this->users[$conn->resourceId] = $conn;
	}

	public function onClose(ConnectionInterface $conn) {
		$this->clients->detach($conn);
		// unset($this->users[$conn->resourceId]);
	}

	public function onMessage(ConnectionInterface $from,  $data) {
		$data = json_decode($data);
		$sendData["type"] = $data->type;

		if(isset($data->anahtar)){
			$sendData["yazanKullanici"] = $data->kullanici;
			$sendData["metin"] = $data->metin;
			$sendData["tarih"] = $data->tarih;
			$sendData["anahtar"] = $data->anahtar;
		}

		// php.exe sockeim.php
		switch ($sendData["type"]) {
			case 'konu':
				$sendData["konu"] = $data->konu;
				break;
			case 'konuSil':
				$sendData["konuKey"] = $data->konuKey;
				break;
			case 'yorumSil':
				$sendData["konuKey"] = $data->konuKey;
				$sendData["yorumKey"] = $data->yorumKey;
				break;
		}

		$this->datayiGonder($sendData);

	}

	private function datayiGonder($sendData){
		foreach($this->clients as $client)
			$client->send(json_encode($sendData));
	}

	public function onError(ConnectionInterface $conn, \Exception $e) {
		$conn->close();
	}
}
$server = IoServer::factory(
	new HttpServer(new WsServer(new Chat())),
	8080
);
$server->run();
?>