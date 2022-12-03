

var tempDeptos = {};
var datosDeptos;
var url = 'http://localhost:8082/vui-api/departamentos';
var postForm = {
                'depto': ''
            };
            $.ajax({
                type: 'GET',
                url: url,
                data: postForm,
                dataType: 'json',
                success: function(data) {
					
					for (i = 0; i < data.length; i++) {
						tempDeptos[data[i]["nomDepartamento"]] = [{"nombreDepto":data[i]["nomDepartamento"],"descripcion":data[i]["descripcionPerfil"]+"","url":"ninguna","idDepartamento":data[i]["idDepartamento"]}];
					}
                   
				   
				   datosDeptos=tempDeptos;
				   
                }
            });
			

window.onload = function (argument) {
	//		Mensaje bienvenida que aparecera en el párrafo cuando carge todo
	//document.querySelector( ".infoDepto p" ).innerHTML = "Para ver una pequeña descripción de cada departamento de Guatemala bastara con que posiciones o te posisiones sobre cualquier departamento :).";
	//colorInfo ( document.querySelector( ".infoDepto" ), "#2980b9", "#3498db" );
	$(".infoDepto2").hide();
}

//		Función para hacer que cambie de color la información de cada departamento
function colorInfo ( etiquetaDescr, color1, color2 ) {
	if ( etiquetaDescr.length === null ) {
		// es porque no existe ese elemento
	}else{
		var bandera = true;
		elementoConEfecto = setInterval( function () {
			if ( bandera ) {
				bandera = false;
				etiquetaDescr.style.background = color1;
			}else{
				etiquetaDescr.style.background = color2;
				bandera = true;
			}
		}, 2000 );
	}
}

//		Función para mostrar la información de cada departamento cuando esten sobre el

function infoDepartamento ( data ) {
	$(".infoDepto2").show();
	var departamento = data.id;
	//	Cada vez que este sobre un depto lo dejo marcado pero antes pinto todo del mismo color
	/*colorInicial( document.querySelectorAll( ".deptoGuate svg path" ) );
	data.style.fill = "#06A0FF";*/
	//	Llamo a las funciones para limpiar el valor del texto y los enlaces
	limpiaValores( document.querySelector( ".infoDepto h2" ) );
	limpiaValores( document.querySelector( ".infoDepto p" ) );
	//limpiaValores( document.querySelector( ".infoDepto .enlace" ) );

	//	Colocando los datos donde corresponde
	//colocando el nombre del departamento
	
	buscarMunicipios(datosDeptos[departamento][0].idDepartamento); 
	buscarGraficaPoblacionAnio(datosDeptos[departamento][0].idDepartamento);
	buscarUniversidades(datosDeptos[departamento][0].idDepartamento); 
	buscarDeptoEmpresas(datosDeptos[departamento][0].idDepartamento);
	buscarIndicadores(datosDeptos[departamento][0].idDepartamento); 
	buscarDeptoIndicadores(datosDeptos[departamento][0].idDepartamento);
	
	
	
	var nombre = JSON.stringify( datosDeptos[departamento][0].nombreDepto ).toString().toUpperCase();
	var temp2="Perfil Departamento: "+nombre;
	document.querySelector( ".infoDepto h2" ).innerHTML = temp2
	//document.querySelector( ".nombreDep" ).innerHTML = nombre;
	
	
	//colocando la descripción del departamento
	var descripcion = JSON.stringify( datosDeptos[departamento][0].descripcion ).toString();
	document.querySelector( ".infoDepto p" ).innerHTML = descripcion;
	
	//colocando la url del departamento
	/*var enlace = JSON.stringify( datosDeptos[departamento][0].url ).toString();
	document.querySelector( ".infoDepto .enlace" ).innerHTML = "<a href='" + enlace.replace( /"/g, "" )
	+ "'>Esta información se extrajo de la Wiki</a>";*/

}

function buscarMunicipios(depto){
	
	var tempMunis = "";
	
	var url = 'http://localhost:8082/vui-api/municipios/?idDepartamento='+depto;
	var postForm = {
					'depto': ''
				};
				$.ajax({
					type: 'GET',
					url: url,
					data: postForm,
					dataType: 'json',
					success: function(data) {
						
						var cantidad=data.length;
						if(cantidad%2==0){
        
							cantidad=cantidad/2;
						
						}else{
							var temp=(cantidad/2);
							cantidad=Math.floor(temp)+1;
							
						}
						tempMunis='<div class="row">  <div class="col-lg-6 col-md-6 col-sm-12 mt-3" >'
						for (i = 0; i < data.length; i++) {
							
							if(i==cantidad){
								tempMunis+='</div><div class="col-lg-6 col-md-6 col-sm-12 mt-3" >';
							}
							tempMunis+=' <button class="btn btn-outline-degree btn-block btn-radius">'+(i+1)+') '+data[i]["nomMunicipio"]+'</button>'
							
						}
						tempMunis+='</div></div>';
						document.querySelector( ".tabla" ).innerHTML = tempMunis;
						
					}
				});
}
const formatoMiles = (number,tipoDato) => {
	const exp = /(\d)(?=(\d{3})+(?!\d))/g;
	const rep = '$1,';
	let arr = number.toString().split('.');
	arr[0] = arr[0].replace(exp,rep);
	let numeroConMiles=arr[1] ? arr.join('.'): arr[0];
	if(tipoDato=="quetzales"){
		numeroConMiles="Q. "+numeroConMiles;
	}else if(tipoDato=="dolares"){
		simbolo="US$";
		numeroConMiles="US$ "+numeroConMiles;
	}else if(tipoDato=="porcentaje"){
		numeroConMiles=numeroConMiles+"%";
	}else if(tipoDato=="dato"){
		numeroConMiles=numeroConMiles;
	}
	
	return numeroConMiles;
  }

 function buscarGraficaPoblacionAnio(depto){
	var url = 'http://localhost:8082/vui-api/indicadoresPoblacionAnio?idDepartamento='+depto;
	
	var postForm = {
					'depto': ''
				};
				$.ajax({
					type: 'GET',
					url: url,
					data: postForm,
					dataType: 'json',
					success: function(data1) {
						console.log(data1);
						console.log(this.data)
					}
					});
 }
  function buscarUniversidades(depto)  
  {
	
	var url = 'http://localhost:8082/vui-api/indicadoresUniversidad?idDepartamento='+depto;
	
	var postForm = {
					'depto': ''
				};
				$.ajax({
					type: 'GET',
					url: url,
					data: postForm,
					dataType: 'json',
					success: function(data) {
						
						let univp = data.find(x => x.idUniverdidad == 1);
						var universidades='<ul class="list-group list-group-flush">';
						universidades+='<li class = "list-group-item  justify-content-between align-items-center">';
						universidades+='<h3 class = "list-group-item-heading">PÚBLICA</h3>';
						universidades+='<p class = "list-group-item-text text-uppercase">'+univp.nomUniversidad+'</p>';						
						universidades+='</li>';
						universidades+='<li class = "list-group-item  justify-content-between align-items-center">';
						universidades+='<h3 class = "list-group-item-heading">PRIVADAS</h3>';
						for ( var i = 1; i < data.length; i++ ) {
							universidades+='<p class = "list-group-item-text text-uppercase">'+data[ i ]['nomUniversidad']+'</p>';
							}
						universidades+='</li>';
						universidades+='</ul>';

							
						
						
						document.querySelector( ".datoUniversidades" ).innerHTML = universidades;
					}
				});

  }
  function buscarDeptoEmpresas(depto)  
  {
	
	var url = 'http://localhost:8082/vui-api/indicadorDeptoEmpresa?idDepartamento='+depto;
	
	var postForm = {
					'depto': ''
				};
				$.ajax({
					type: 'GET',
					url: url,
					data: postForm,
					dataType: 'json',
					success: function(data) {
						
						let emp = data.find(x => x.idDepartamento == depto);
						var empresas='<div class="row d-flex justify-content-center ml-3">';
						empresas += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						empresas += '<div class="box">';
						empresas += '<div class="body">';
						empresas += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						empresas += '<h2 class="fs-3">MICRO</h2>';
						empresas += '</div>';
						empresas += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						empresas += '<div>';
						empresas += '<h2>'+formatoMiles(emp.porcMicro,"porcentaje");+'</h2>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						empresas += '<div class="box">';
						empresas += '<div class="body">';
						empresas += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						empresas += '<h2 class="fs-3">PEQUEÑA</h2>';
						empresas += '</div>';
						empresas += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						empresas += '<div>';
						empresas += '<h2>'+formatoMiles(emp.porcPequena,"porcentaje");+'</h2>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						empresas += '<div class="box">';
						empresas += '<div class="body">';
						empresas += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						empresas += '<h2 class="fs-3">MEDIANA</h2>';
						empresas += '</div>';
						empresas += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						empresas += '<div>';
						empresas += '<h2>'+formatoMiles(emp.porcMediana,"porcentaje");+'</h2>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';		
						empresas += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						empresas += '<div class="box">';
						empresas += '<div class="body">';
						empresas += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						empresas += '<h2 class="fs-3">GRANDE</h2>';
						empresas += '</div>';
						empresas += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						empresas += '<div>';
						empresas += '<h2>'+formatoMiles(emp.porcGrande,"porcentaje");+'</h2>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';
						empresas += '</div>';					
						empresas += '</div>';
						document.querySelector( ".datoEmpresas" ).innerHTML = empresas;
					}
				});

  }
function buscarIndicadores(depto){
	
	var tempMunis = "";
	
	var url = 'http://localhost:8082/vui-api/indicadores?idDepartamento='+depto;
	
	var postForm = {
					'depto': ''
				};
				$.ajax({
					type: 'GET',
					url: url,
					data: postForm,
					dataType: 'json',
					success: function(data) {
						
						var poblacionTotal =data[0]['cantidad']+data[1]['cantidad'];
						var porcentajeHombre = (data[0]['cantidad']*100) / (poblacionTotal);
						var porcentajeMujer = (data[1]['cantidad']*100) / (poblacionTotal);
						var estimacion='<div class="row d-flex justify-content-center ml-3">';
						estimacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						estimacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						estimacion+='<div class="row d-flex justify-content-center align-items-center">';
						estimacion+='<p style="text-align: center;">';
						estimacion+='<span class="text-light-blue">';
						estimacion+='<strong>Estimación población <br>'+data[0]['idAnio'];
						estimacion+='</strong>';
						estimacion+='</span>';
						estimacion+='</p>';
						estimacion+='<div class="col-md-12 d-flex justify-content-center">';
						estimacion+='<h1 class="blue-counter">';
						estimacion+=formatoMiles(poblacionTotal.toFixed(2),poblacionTotal.nomTipoFormato);
						estimacion+='</h1>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						estimacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						estimacion+='<div class="row d-flex justify-content-center align-items-center">';
						estimacion+='<p style="text-align: center;">';
						estimacion+='<span class="text-light-blue">';
						estimacion+='<strong>'+data[0]['nomGenero'];
						estimacion+='</strong>';
						estimacion+='</span>';
						estimacion+='</p>';
						estimacion+='<div class="col-md-12 d-flex justify-content-center">';
						estimacion+='<h1 class="blue-counter">';
						estimacion+=formatoMiles(data[0]['cantidad'].toFixed(2),"dato")+" <br> "+porcentajeHombre.toFixed(2)+"%";
						estimacion+='</h1>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						estimacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						estimacion+='<div class="row d-flex justify-content-center align-items-center">';
						estimacion+='<p style="text-align: center;">';
						estimacion+='<span class="text-light-blue">';
						estimacion+='<strong>'+data[1]['nomGenero'];
						estimacion+='</strong>';
						estimacion+='</span>';
						estimacion+='</p>';
						estimacion+='<div class="col-md-12 d-flex justify-content-center">';
						estimacion+='<h1 class="blue-counter">';
						estimacion+=formatoMiles(data[1]['cantidad'].toFixed(2),"dato") +" <br> "+porcentajeMujer.toFixed(2)+"%";
						estimacion+='</h1>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						estimacion+='</div>';
						document.querySelector( ".datoSocioPrimero" ).innerHTML = estimacion;
						
					}
				});
}

function buscarDeptoIndicadores(depto){
	
	var tempMunis = "";
	
	var url = 'http://localhost:8082/vui-api/indicadoresDepto?idDepartamento='+depto;
	
	var postForm = {
					'depto': ''
				};
				$.ajax({
					type: 'GET',
					url: url,
					data: postForm,
					dataType: 'json',
					success: function(data) {
						

					/*	let dChPromedio = data.find(x => x.idIndicador == 21);
						let dChPersonas = data.find(x => x.idIndicador == 22);
						let dChPoblacion = data.find(x => x.idIndicador == 23);
						var dCh='<div class="row d-flex justify-content-center ml-3">';
						dCh += '<div class="col-lg-4 col-md-4 col-sm-12">';
						dCh+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						dCh+='<div class="row d-flex justify-content-center align-items-center">';
						dCh+='<p style="text-align: center;">';
						dCh+='<span class="text-light-blue" justify-content-center>';
						dCh+='<strong>'+dChPromedio.nomIndicador;
						dCh+='</strong>';
						dCh+='</span>';
						dCh+='</p>';
						dCh+='<div class="col-md-12 d-flex justify-content-center">';
						dCh+='<h1 class="blue-counter">';
						dCh+=dChPromedio.valor+"%"
						dCh+='</h1>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
						dCh += '<div class="col-lg-4 col-md-4 col-sm-12">';
						dCh+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						dCh+='<div class="row d-flex justify-content-center align-items-center">';
						dCh+='<p style="text-align: center;">';
						dCh+='<span class="text-light-blue">';
						dCh+='<strong>'+dChPersonas.nomIndicador;
						dCh+='</strong>';
						dCh+='</span>';
						dCh+='</p>';
						dCh+='<div class="col-md-12 d-flex justify-content-center">';
						dCh+='<h1 class="blue-counter">';
						dCh+=dChPersonas.valor+"%";
						dCh+='</h1>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
						dCh += '<div class="col-lg-4 col-md-4 col-sm-12">';
						dCh+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						dCh+='<div class="row d-flex justify-content-center align-items-center">';
						dCh+='<p style="text-align: center;">';
						dCh+='<span class="text-light-blue">';
						dCh+='<strong>'+dChPoblacion.nomIndicador;;
						dCh+='</strong>';
						dCh+='</span>';
						dCh+='</p>';
						dCh+='<div class="col-md-12 d-flex justify-content-center">';
						dCh+='<h1 class="blue-counter">';
						dCh+=dChPoblacion.valor+"%";;
						dCh+='</h1>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
						dCh+='</div>';
						
						document.querySelector( ".datodCh" ).innerHTML = dCh;*/
						
						let primaria = data.find(x => x.idIndicador == 8);
						let secundaria = data.find(x => x.idIndicador == 9);
						let diversificado = data.find(x => x.idIndicador == 10);
						var educacion='<div class="row d-flex justify-content-center ml-3">';
						educacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						educacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						educacion+='<div class="row d-flex justify-content-center align-items-center">';
						educacion+='<p style="text-align: center;">';
						educacion+='<span class="text-light-blue" justify-content-center>';
						educacion+='<strong>'+primaria.nomIndicador;
						educacion+='</strong>';
						educacion+='</span>';
						educacion+='</p>';
						educacion+='<div class="col-md-12 d-flex justify-content-center">';
						educacion+='<h1 class="blue-counter">';
						educacion+=primaria.valor+"%"
						educacion+='</h1>';
						educacion+='</div>';
						educacion+='</div>';
						educacion+='</div>';
						educacion+='</div>';
						educacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						educacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						educacion+='<div class="row d-flex justify-content-center align-items-center">';
						educacion+='<p style="text-align: center;">';
						educacion+='<span class="text-light-blue">';
						educacion+='<strong>'+secundaria.nomIndicador;
						educacion+='</strong>';
						educacion+='</span>';
						educacion+='</p>';
						educacion+='<div class="col-md-12 d-flex justify-content-center">';
						educacion+='<h1 class="blue-counter">';
						educacion+=secundaria.valor+"%";
						educacion+='</h1>';
						educacion+='</div>';
						educacion+='</div>';
						educacion+='</div>';
						educacion+='</div>';
						educacion += '<div class="col-lg-4 col-md-4 col-sm-12">';
						educacion+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						educacion+='<div class="row d-flex justify-content-center align-items-center">';
						educacion+='<p style="text-align: center;">';
						educacion+='<span class="text-light-blue">';
						educacion+='<strong>'+diversificado.nomIndicador;;
						educacion+='</strong>';
						educacion+='</span>';
						educacion+='</p>';
						educacion+='<div class="col-md-12 d-flex justify-content-center">';
						educacion+='<h1 class="blue-counter">';
						educacion+=diversificado.valor+"%";;
						educacion+='</h1>';
						educacion+='</div>';
						educacion+='</div>';
						educacion+='</div>';
						educacion+='</div>';
						educacion+='</div>';
						
						document.querySelector( ".datoEducacion" ).innerHTML = educacion;

						let cantidadIgss = data.find(x => x.idIndicador == 13);
						let salarioMedio = data.find(x => x.idIndicador == 14);
						var igss='<div class="row d-flex justify-content-center ml-3">';
						igss += '<div class="col-lg-4 col-md-4 col-sm-12">';
						igss+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						igss+='<div class="row d-flex justify-content-center align-items-center">';
						igss+='<p style="text-align: center;">';
						igss+='<span class="text-light-blue" justify-content-center>';
						igss+='<strong>'+cantidadIgss.nomIndicador+" "+cantidadIgss.anio;
						igss+='</strong>';
						igss+='</span>';
						igss+='</p>';
						igss+='<div class="col-md-12 d-flex justify-content-center">';
						igss+='<h2 class="blue-counter">';
						igss+=formatoMiles(cantidadIgss.valor,cantidadIgss.nomTipoFormato);
						igss+='</h2>';
						igss+='</div>';
						igss+='</div>';
						igss+='</div>';
						igss+='</div>';
						igss += '<div class="col-lg-4 col-md-4 col-sm-12">';
						igss+='<div class="card  mr-4  d-flex justify-content-center align-items-center border shadow card-rounded">';
						igss+='<div class="row d-flex justify-content-center align-items-center text-wrap">';
						igss+='<div class="col-md-10 d-flex justify-content-center text-wrap ">';
						igss+='<span class="text-light-blue">';
						igss+='<strong>'+salarioMedio.nomIndicador+" "+salarioMedio.anio;
						igss+='</strong>';
						igss+='</span>';
						igss+='</div>';
						igss+='<div class="col-md-12 d-flex justify-content-center text-wrap ">';
						igss+='<h3 class="blue-counter">';
						igss+=formatoMiles(salarioMedio.valor,salarioMedio.nomTipoFormato);
						igss+='</h3>';
						igss+='</div>';
						igss+='</div>';
						igss+='</div>';
						igss+='</div>';
						document.querySelector( ".datoIgss" ).innerHTML = igss;
						let dina1 = data.find(x => x.idIndicador == 27);
						let dina2 = data.find(x => x.idIndicador == 6);
						let dina3 = data.find(x => x.idIndicador == 7);
						let dina4 = data.find(x => x.idIndicador == 11);
						let dina5 = data.find(x => x.idIndicador == 12);
						let dina6 = data.find(x => x.idIndicador == 15);
						let dina7 = data.find(x => x.idIndicador == 16);
						let dina8 = data.find(x => x.idIndicador == 17);
						var dinamismo2='<div class="row d-flex justify-content-center ml-3">';
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3">'+dina1.nomIndicador+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+formatoMiles(dina1.valor,dina1.nomTipoFormato);+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3">'+dina2.nomIndicador+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+formatoMiles(dina2.valor,dina2.nomTipoFormato);+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3">'+dina3.nomIndicador+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+formatoMiles(dina3.valor,dina3.nomTipoFormato);+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3">'+dina4.nomIndicador+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+formatoMiles(dina4.valor,dina4.nomTipoFormato);+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3">'+dina5.nomIndicador+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+formatoMiles(dina5.valor,dina5.nomTipoFormato);+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3">'+dina6.nomIndicador+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+formatoMiles(dina6.valor,dina6.nomTipoFormato);+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3">'+dina7.nomIndicador+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+formatoMiles(dina7.valor,dina7.nomTipoFormato);+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						dinamismo2 += '<div class="box">';
						dinamismo2 += '<div class="body">';
						dinamismo2 += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<h2 class="fs-3">'+dina8.nomIndicador+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						dinamismo2 += '<div>';
						dinamismo2 += '<h2>'+formatoMiles(dina8.valor,dina8.nomTipoFormato);+'</h2>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						dinamismo2 += '</div>';
						document.querySelector( ".datoDinamismo2" ).innerHTML = dinamismo2;

						let infra1 = data.find(x => x.idIndicador == 1);
						let infra2 = data.find(x => x.idIndicador == 2);
						let infra3 = data.find(x => x.idIndicador == 3);
						let infra4 = data.find(x => x.idIndicador == 4);
						let infra5 = data.find(x => x.idIndicador == 5);
						var infraestructura='<div class="row d-flex justify-content-center ml-3">';
						infraestructura += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						infraestructura += '<div class="box">';
						infraestructura += '<div class="body">';
						infraestructura += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<h2 class="fs-3">'+infra1.nomIndicador+'</h2>';
						infraestructura += '</div>';
						infraestructura += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<div>';
						infraestructura += '<h2>'+formatoMiles(infra1.valor,infra1.nomTipoFormato);+'</h2>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';						
						infraestructura += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						infraestructura += '<div class="box">';
						infraestructura += '<div class="body">';
						infraestructura += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<h2 class="fs-3">'+infra2.nomIndicador+'</h2>';
						infraestructura += '</div>';
						infraestructura += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<div>';
						infraestructura += '<h2>'+formatoMiles(infra2.valor,infra2.nomTipoFormato);+'</h2>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						infraestructura += '<div class="box">';
						infraestructura += '<div class="body">';
						infraestructura += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<h2 class="fs-3">'+infra3.nomIndicador+'</h2>';
						infraestructura += '</div>';
						infraestructura += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<div>';
						infraestructura += '<h2>'+formatoMiles(infra3.valor,infra3.nomTipoFormato);+'</h2>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						infraestructura += '<div class="box">';
						infraestructura += '<div class="body">';
						infraestructura += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<h2 class="fs-3">'+infra4.nomIndicador+'</h2>';
						infraestructura += '</div>';
						infraestructura += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<div>';
						infraestructura += '<h2>'+formatoMiles(infra4.valor,infra4.nomTipoFormato);+'</h2>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						infraestructura += '<div class="box">';
						infraestructura += '<div class="body">';
						infraestructura += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<h2 class="fs-3">'+infra5.nomIndicador+'</h2>';
						infraestructura += '</div>';
						infraestructura += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						infraestructura += '<div>';
						infraestructura += '<h2>'+formatoMiles(infra5.valor,infra5.nomTipoFormato);+'</h2>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						infraestructura += '</div>';
						document.querySelector( ".datoInfraestructura" ).innerHTML = infraestructura;

						let tic1 = data.find(x => x.idIndicador == 18);
						let tic2 = data.find(x => x.idIndicador == 19);
						let tic3 = data.find(x => x.idIndicador == 20);
						var tics='<div class="row d-flex justify-content-center ml-3">';
						tics += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						tics += '<div class="box">';
						tics += '<div class="body">';
						tics += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						tics += '<h2 class="fs-3">'+tic1.nomIndicador+'</h2>';
						tics += '</div>';
						tics += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						tics += '<div>';
						tics += '<h2>'+formatoMiles(tic1.valor,tic1.nomTipoFormato);+'</h2>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';						
						tics += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						tics += '<div class="box">';
						tics += '<div class="body">';
						tics += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						tics += '<h2 class="fs-3">'+tic2.nomIndicador+'</h2>';
						tics += '</div>';
						tics += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						tics += '<div>';
						tics += '<h2>'+formatoMiles(tic2.valor,tic2.nomTipoFormato);+'</h2>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';
						tics += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						tics += '<div class="box">';
						tics += '<div class="body">';
						tics += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						tics += '<h2 class="fs-3">'+tic3.nomIndicador+'</h2>';
						tics += '</div>';
						tics += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						tics += '<div>';
						tics += '<h2>'+formatoMiles(tic3.valor,tic3.nomTipoFormato);+'</h2>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';
						tics += '</div>';						
						tics += '</div>';
						document.querySelector( ".datoTics" ).innerHTML = tics;


					/*	let cost1 = data.find(x => x.idIndicador == 24);
						let cost2 = data.find(x => x.idIndicador == 25);
						let cost3 = data.find(x => x.idIndicador == 26);
						var costos='<div class="row d-flex justify-content-center ml-3">';
						costos += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						costos += '<div class="box">';
						costos += '<div class="body">';
						costos += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						costos += '<h2 class="fs-3">'+cost1.nomIndicador+'</h2>';
						costos += '</div>';
						costos += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						costos += '<div>';
						costos += '<h2>'+formatoMiles(cost1.valor,cost1.nomTipoFormato);+'</h2>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';						
						costos += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						costos += '<div class="box">';
						costos += '<div class="body">';
						costos += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						costos += '<h2 class="fs-3">'+cost2.nomIndicador+'</h2>';
						costos += '</div>';
						costos += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						costos += '<div>';
						costos += '<h2>'+formatoMiles(cost2.valor,cost2.nomTipoFormato);+'</h2>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '<div class="col-lg-4 col-md-4 col-sm-12 ">';
						costos += '<div class="box">';
						costos += '<div class="body">';
						costos += '<div class= " imgContainer text-uppercase bg-secondary text-white d-flex flex-column align-items-center justify-content-center">';
						costos += '<h2 class="fs-3">'+cost3.nomIndicador+'</h2>';
						costos += '</div>';
						costos += '<div class="content text-uppercase text-white d-flex flex-column align-items-center justify-content-center">';
						costos += '<div>';
						costos += '<h2>'+formatoMiles(cost3.valor,cost3.nomTipoFormato);+'</h2>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';
						costos += '</div>';						
						costos += '</div>';
						document.querySelector( ".datoCostos" ).innerHTML = costos;*/

					}
				});
}
//		Función para limpiar los valores de la descripción del departamento, etiquetaDescr = etiqueta descripción
function limpiaValores ( etiquetaDescr ) {
	if ( etiquetaDescr.length === null ) {
		// es porque no existe ese elemento
	}else{
		etiquetaDescr.innerHTML = "";
	}
}

//		Función para pintar todos los elementos del svg al color inicial
function colorInicial ( etiquetaDescr ) {
	for ( var i = 0; i < etiquetaDescr.length; i++ ) {
		etiquetaDescr[ i ].style.fill = "#263c82";
	}
}

