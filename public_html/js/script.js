/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


const btnAgregar = document.getElementById("btnAgregar");
const contenedorCampos = document.getElementById("contenedorCampos");
const contenedorUni = document.getElementById("contenedorUni");
const contenedorMulti = document.getElementById("contenedorMulti");
const times = document.querySelector('#times');
const casos = document.querySelector('#tabla2 tbody');
const operation = document.querySelector('#operation');

//Matriz que contendrá los datos leídos en los input-text
let matrizDatos=[];

//Matriz que contendrá los datos de CPU Time
let cpuTime = [];

//Matriz que contendrá los datos de CPU Time
let timesOperation = [];


const idRow = document.createElement('th');

btnAgregar.addEventListener("click", function () {
  const divCampos = document.createElement("div");
  times.innerHTML = '';
  casos.innerHTML = '';
  operation.innerHTML = '';
  cpuTime.length = 0;
  timesOperation.length = 0;

  for (let i = 1; i <= 3; i++) {
    const inputCampo = document.createElement("input");
    inputCampo.type = "text";
    inputCampo.name = `campo${i}`;
    var m="";
    switch(i){
        
            case 1: m="Input Process ID";
                break;
                case 2: m="Input CPU Time";
                break;
                
                case 3: m="Input I/O Time";
                break;
    }
    
    inputCampo.placeholder=m;
    divCampos.appendChild(inputCampo);
  }

  contenedorCampos.appendChild(divCampos);
});

localStorage.removeItem("suma");


btnLeer.addEventListener("click", function () {
  const camposTexto = document.querySelectorAll("input[type=text]");
  var suma = 0;
  var suma2 = 0;
  let filas=camposTexto.length/3;
  let col=0;
  let j=0;
  for (let i=0;i<filas;i++)
  {
      matrizDatos[i]=[];
      matrizDatos[i][j]=camposTexto[col].value;
      matrizDatos[i][j+1]=camposTexto[col+1].value;
      matrizDatos[i][j+2]=camposTexto[col+2].value;
      col+=3;
      suma += Number(matrizDatos[i][j+1]);
      suma2 += Number(matrizDatos[i][j+1]) + Number(matrizDatos[i][j+2]);
  }
  suma += Number(matrizDatos[matrizDatos.length-1][2]);

  localStorage.setItem("suma",suma);
  localStorage.setItem("suma2", suma2);
  window.alert("The data read dynamically in the input-text is loaded into an array named matrizDatos of size nx3. \n You can use this array to solve your requirements. ");
  console.log(matrizDatos);
  console.log(suma);
  createTable(matrizDatos);

});

function createTable(matrix) {
 let table = '<table border="1" align="center"><thead><tr><th>ID </th><th>CPU Time</th><th>I/O Time</th></tr></thead><tbody>';
  for (let i = 0; i < matrix.length; i++) {
    table += '<tr><td>' + matrix[i][0] + '</td><td>' + matrix[i][1] + '</td><td>' + matrix[i][2] + '</td></tr>';
  }
  table += '</tbody></table><br><br>';
  document.getElementById('tabla').innerHTML = table;
}


//Función que ejecuta un simulador del enfoque uniprogramación
function uniprogramming(matriz) {
  times.innerHTML = '';
  casos.innerHTML = '';
  operation.innerHTML='';
  cpuTime.length = 0;
  timesOperation.length = 0;
  contenedorMulti.innerHTML='';
  //Variables de uso específico
  var a=0;
  var cont=0;
  var cpu = 0;
  var io = 0;
  var sumaCpu = 0;
  var cpuUtilizacion = 0;

  //Ajustes css a los componentes de la tabla
  idRow.style.width ='40px';
  idRow.style.textAlign = 'center';
  idRow.innerHTML = 'Id';
  times.appendChild(idRow);

  //Se usa un ciclo for para generar el encabezado de la tabla
  for(let i=0;i<localStorage.getItem("suma2");i++){
    const row = document.createElement('th');
    row.style.width = '40px';
    row.style.textAlign = 'center';
    row.innerHTML += ' '+(i+1)+'</th>';
    times.appendChild(row);
  }
  
  //Se usa un ciclo for para generar las filas y columnas requeridas
  for(let i=0; i < matriz.length; i++){

    const newRow = document.createElement('tr');
    newRow.style.width = '40px';
    newRow.style.textAlign = 'center';

    const idColumn = document.createElement('td');
    idColumn.style.width ='40px';
    idColumn.style.textAlign = 'center';

    //Se asigna el ID del número de los procesos a realizar
    idColumn.innerHTML += ''+Number(matriz[i][a]);
    newRow.appendChild(idColumn);
    
    //Validación de más de 1 proceso
    if(i>0){
      //Ciclo for que pinta los espacio donde el CPU está en ocio antes de iniciar el proceso
      for(let j = 1; j <= cont ; j++){
          const column3 = document.createElement('td');
          column3.style.backgroundColor = "gray";
          newRow.appendChild(column3);
      }
     }

    //Se usa ciclo for para pintar las celdas correspondientes al CPU time y i/o time
    for(cpu;cpu<Number(matriz[i][a+1]);cpu++){
      const column1 = document.createElement('td');
      column1.style.backgroundColor = "green";
      newRow.appendChild(column1);
      for(io;io < Number(matriz[i][a+2]);io++){
        const column2 = document.createElement('td');
        column2.style.backgroundColor = "khaki";
        newRow.appendChild(column2);
      }
    }
    //Agrega al arreglo los valores del cpu time
    cpuTime.push(Number(matriz[i][a+1]));
    
    //Se usa una variable que funciona como contador
    //Esto nos facilita la ubicación dentro de la tabla
    cont += Number(matriz[i][a+1]) + Number(matriz[i][a+2]);
    
    //Validación de finalización del proceso
    if(cpu==Number(matriz[i][a+1])){
      //Ciclo for que pinta los espacios donde el CPU se encuentra en ocio después de finalizar el proceso
      for(let b = cont;b<localStorage.getItem("suma2");b++){
        const column4 = document.createElement('td');
        column4.style.backgroundColor = "gray";
        newRow.appendChild(column4);
      }
    }

    //Agrega al arreglo los valores del i/o times
    timesOperation.push(matriz[i][a+2]);

    //Reinicio de variables generales
    cpu=0;
    io=0;
    casos.appendChild(newRow);
  }
  //Agrega al arreglo los valores del arreglo que contiene los cpu times
  timesOperation.push(cpuTime.join(' + '));

  //For que realiza la suma de los cpu times
  for(let c = 0;c<cpuTime.length;c++){
    sumaCpu += Number(cpuTime[c]); 
  }
  //Operation para hallar el porcentaje de utilización de cpu
  cpuUtilizacion = (sumaCpu / localStorage.getItem("suma2"))*100;  
  operation.style.textAlign = 'center';

  //Muestra la gráfica de CPU Utilización
  operation.innerHTML += 'CPU Utilization = '+cpuTime.join(' + ')+' / '+timesOperation.join(' + ')+' = '+sumaCpu+' / '+localStorage.getItem("suma2")+' = '+cpuUtilizacion+' %';
}


//Función que ejecuta un simulador del enfoque multiprogramación
function multiprogramming(matriz){
  times.innerHTML = '';
  casos.innerHTML = '';
  operation.innerHTML='';
  cpuTime.length = 0;
  timesOperation.length = 0;
  contenedorUni.innerHTML='';
  //Variables de uso específico
  var a=0;
  var cont2 = 0;
  var cpu = 0;
  var io = 0;
  var aux = 0;
  var sumaCpu = 0;
  var cpuUtilizacion = 0;

  //Ajustes css a los componentes de la tabla
  idRow.style.width ='40px';
  idRow.style.textAlign = 'center';
  idRow.innerHTML += 'Id';
  times.appendChild(idRow);

  //Se usa un ciclo for para generar el encabezado de la tabla
  for(let i=0;i<localStorage.getItem("suma");i++){
    const row = document.createElement('th');
    row.style.width = '40px';
    row.style.textAlign = 'center';
    row.innerHTML += ' '+(i+1)+'</th>';
    times.appendChild(row);
  }

  //Se usa un ciclo for para generar las filas y columnas requeridas
  for(let i=0; i < matriz.length; i++){
    
    const newRow = document.createElement('tr');
    newRow.style.width = '40px';
    newRow.style.textAlign = 'center';

    const idColumn = document.createElement('td');
    idColumn.style.width ='40px';
    idColumn.style.textAlign = 'center';

    //Se asigna el ID del número de los procesos a realizar
    idColumn.innerHTML += ''+Number(matriz[i][a]);
    newRow.appendChild(idColumn);
    
    
    //Validación de primer caso
    if(i==0){
      //Se usa ciclo for para pintar las celdas correspondientes al CPU time y i/o time
      for(cpu; cpu <Number(matriz[i][a+1]); cpu++){
        const column1 = document.createElement('td');
        column1.style.backgroundColor = "green";
        newRow.appendChild(column1);
        for(io; io < Number(matriz[i][a+2]); io++){
          const column2 = document.createElement('td');
          column2.style.backgroundColor = "khaki";
          newRow.appendChild(column2);
        }
        }
    }

    //Validación de más de 1 proceso
    if(i>0){
      //Ciclo for que pinta los espacio donde el CPU está en ocio antes de iniciar el proceso
      for(aux; aux < i ; aux++){
          const column3 = document.createElement('td');
          column3.style.backgroundColor = "gray";
          newRow.appendChild(column3);
          cont2=i;
      }

      for(cpu; cpu < Number(matriz[i][a+1]); cpu++){
        const column1 = document.createElement('td');
        column1.style.backgroundColor = "green";
        newRow.appendChild(column1);

        if(cont2+(Number(matriz[i][a+2])+i)+cpu < (Number(matriz[i-1][a+1])+Number(matriz[i-1][a+2]))){ 
          for(let e = 1; e < (Number(matriz[i][a+1]) + Number(matriz[i][a+2])-i); e++){
            const column3 = document.createElement('td');
            column3.style.backgroundColor = "gray";
            newRow.appendChild(column3);
            cont2++;
          }
          const column1 = document.createElement('td');
          column1.style.backgroundColor = "green";
          newRow.appendChild(column1);
          cpu++;
        }else {

          for( io ; io < Number(matriz[i][a+2]); io++){
            const column2 = document.createElement('td');
            column2.style.backgroundColor = "khaki";
            newRow.appendChild(column2);
          }
        }

        for( io ; io < Number(matriz[i][a+2]); io++){
          const column2 = document.createElement('td');
          column2.style.backgroundColor = "khaki";
          newRow.appendChild(column2);
        }
     }
    }
    console.log(cont2);

    //Agrega al arreglo los valores del cpu time
    cpuTime.push(Number(matriz[i][a+1]));
    
    //Validación de finalización del proceso
    if(cpu==Number(matriz[i][a+1])){
      //Ciclo for que pinta los espacios donde el CPU se encuentra en ocio después de finalizar el proceso
      for(let b = (Number(matriz[i][a+1]) + Number(matriz[i][a+2]))+cont2; b < localStorage.getItem("suma");b++){
        const column4 = document.createElement('td');
        column4.style.backgroundColor = "gray";
        newRow.appendChild(column4);
      }
    }

    //Agrega al arreglo los valores del i/o times
    timesOperation.push(matriz[i][a+2]);

    //Reinicio de variables generales4
    aux=0;
    cpu=0;
    cont2=0;
    io=0;
    casos.appendChild(newRow);
  }
  //Agrega al arreglo los valores del arreglo que contiene los cpu times
  timesOperation.push(cpuTime.join(' + '));

  //For que realiza la suma de los cpu times
  for(let c = 0;c<cpuTime.length;c++){
    sumaCpu += Number(cpuTime[c]); 
  }
  //Operation para hallar el porcentaje de utilización de cpu
  cpuUtilizacion = (sumaCpu / localStorage.getItem("suma"))*100;  
  operation.style.textAlign = 'center';

  //Muestra la gráfica de CPU Utilización
  operation.innerHTML += 'CPU Utilization = '+cpuTime.join(' + ')+' / '+timesOperation.join(' + ')+' = '+sumaCpu+' / '+localStorage.getItem("suma")+' = '+cpuUtilizacion+' %';

}




btnUni.addEventListener("click", function () {
     const nuevoParrafo = document.createElement("p");
     nuevoParrafo.style.textAlign = 'center';
    const textoParrafo = document.createTextNode("A table for Uniprogramming is printed below.");
    nuevoParrafo.appendChild(textoParrafo);
    contenedorUni.appendChild(nuevoParrafo);
    uniprogramming(matrizDatos);
});

btnMulti.addEventListener("click", function () {
     const nuevoParrafo = document.createElement("p");
     nuevoParrafo.style.textAlign ="center";
    const textoParrafo = document.createTextNode("A table for Multiprogramming is printed below.");
    nuevoParrafo.appendChild(textoParrafo);
    contenedorMulti.appendChild(nuevoParrafo);
    multiprogramming(matrizDatos);
});