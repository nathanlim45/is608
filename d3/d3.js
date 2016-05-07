<!doctype html>
<html>

<head>
	<title>D3 tutorial</title>
	<script src="http://d3js.org/d3.v3.min.js"></script>
</head>

<body>
	<script>
	d3.csv("/users/nathanlim/desktop/cities.csv", function(data) {
  	console.log(data[0]);
	});
	</script>
</body>

</html>

