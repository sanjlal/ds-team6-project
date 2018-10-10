<?php
$serviceComments = new ServiceComments($_POST);
$serviceComments->insertServiceComments();
echo json_encode($serviceComments);
