<?php

$con=mysqli_connect("localhost:5432","kunalp-jain","db-kunalp-jain-12182","kunalp-jain");
if(!$con)
{
	echo "connection failed".mysqli_error();
}
echo "welcome";
?>
