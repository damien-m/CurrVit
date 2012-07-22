<?php 
  //this is a simple static script for returning JSON for the carousel
  $company = $_GET['company'];
  
  $portfolio = array();
  
  $portfolio['company1'] = array(
    'img' => array(
      array(
        'href'=>'path/to/your/image.jpg',
        'title'=>'Title of yor work',
        'link'=>'http://example.com/',
        'description'=>'lorem dolor sit amet.'
      ),
      array(
        'href'=>'path/to/your/image.jpg',
        'title'=>'Title of yor work',
        'link'=>'http://example.com/',
        'description'=>'lorem dolor sit amet.'
      ),
    )
  );
  
  $JSON = json_encode($portfolio[$company]);
  
  echo $JSON;
?>
