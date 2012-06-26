<?php 
  //this is a simple static script for returning JSON for the carousel
  $company = $_GET['company'];
  
  $portfolio = array();
  
  $portfolio['frogtrade'] = array('img' => array(
                                                array('href'=>'images/jobs/'.$company.'/fdp.jpg', 'title'=>'FDP Community Site','link'=>'http://fdp.frogcommunity.com','description'=>'Lorem Ipsum'),
                                                array('href'=>'images/jobs/'.$company.'/screencasts.png', 'title'=>'FDP Screencasts','link'=>'http://fdp.frogcommunity.com','description'=>'Lorem Ipsum'),
                                                array('href'=>'images/jobs/'.$company.'/screencasts.png', 'title'=>'FDdafsts','link'=>'http://fdp.frogcommunity.com','description'=>'Lorem Ipsum')
                                            ),
                                  'videos' => array( 
                                                array( 'href'=>'', 'title'=>'FDP Screencast')
                                            )
                                );
  $portfolio['ipeak'] = array('img' => array(
                                                array('href'=>'images/'.$company.'/fdp.jpg', 'title'=>'FDP Community Site'),
                                                array('href'=>'images/'.$company.'/screencasts.png', 'title'=>'FDP Screencasts')
                                            )
                                );
  $JSON = json_encode($portfolio[$company]);
  
  echo $JSON;
?>
