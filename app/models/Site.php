<?php

class Site{
  public $siteId;
  public $clientId;
  public $siteName;
  public $siteDescription;
  public $primaryContact;
  public $capacity;
  public $commercialDate;
  public $addrLine1;
  public $addrLine2;
  public $addrCity;
  public $addrState;
  public $addrZip;
  public $addrCountry;

  public function __construct($data){
    $this->siteId = isset($data['siteId']) ? intval($data['siteId']):null;
    $this->clientId=$data['clientId'];
    $this->siteName=$data['siteName'];
    $this->siteDescription=$data['siteDescription'];
    $this->primaryContact=$data['primaryContact'];
    $this->capacity=$data['capacity'];
    $this->commercialDate=$data['commercialDate'];
    $this->addrLine1=$data['addrLine1'];
    $this->addrLine2=$data['addrLine2'];
    $this->addrCity=$data['addrCity'];
    $this->addrState=$data['addrState'];
    $this->addrZip=$data['addrZip'];
    $this->addrCountry=$data['addrCountry'];
  }
  public static function fetchAll(){
    $db= new PDO(DB_SERVER,DB_USER,DB_PW);
    $sql= 'SELECT * from site';
    $statement=$db->prepare($sql);
    $success=$statement->execute();
    $arr=[];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSite =  new Site($row);
      array_push($arr, $theSite);
    }
    return $arr;
  }

  /*public function insertDescription($clientId) {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT client(clientDescription)
            VALUES (?) where clientId =?';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->clientDescription,
      $this->clientId
    ]);
  }

*/
}
