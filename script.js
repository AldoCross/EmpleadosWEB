// script.js

// Función para agregar un nuevo empleado al array y al localStorage.
function agregarEmpleado(nombre, apellido, numero, puesto) {
    var empleados = JSON.parse(localStorage.getItem('empleados')) || []; 
  
    // Validación para evitar campos vacíos
    if (nombre === '' || apellido === '' || numero === '' || puesto === '') {
      alert('Error: Todos los campos son obligatorios.');
      return; 
    }
  
    // Validación para evitar números de empleado duplicados.
    var empleadoExistente = empleados.find(function(empleado) {
      return empleado.numero === numero;
    });
  
    if (empleadoExistente) {
      alert('Error: Ya existe un empleado con ese número.');
      return; // Detén la ejecución si el empleado ya existe
    }
  
    var nuevoEmpleado = {
      nombre: nombre,
      apellido: apellido,
      numero: numero,
      puesto: puesto
    };
  
    empleados.push(nuevoEmpleado);
    localStorage.setItem('empleados', JSON.stringify(empleados));
  }
  
  // Función para mostrar los empleados en la tabla.
  function mostrarEmpleados() {
    var empleados = JSON.parse(localStorage.getItem('empleados')) || []; 
    var table = $('#employeeTable').DataTable();
    table.clear().draw(); 
    empleados.forEach(function(empleado) {
      table.row.add([empleado.nombre, empleado.apellido, empleado.numero, empleado.puesto]).draw(false);
    });
  }
  
  // Exporta las funciones para que puedan ser usadas en las pruebas.
  module.exports = { agregarEmpleado, mostrarEmpleados };