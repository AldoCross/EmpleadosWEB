// funciones.test.js
const { mostrarEmpleados, agregarEmpleado } = require('./script'); // Importa las funciones a probar

describe('Pruebas para la tabla de empleados', () => {
  beforeEach(() => {
    // Limpia el localStorage antes de cada prueba
    localStorage.clear();
  });

  it('debería agregar un nuevo empleado al array', () => {
    agregarEmpleado('Juan', 'Perez', '123', 'Desarrollador');
    const empleados = JSON.parse(localStorage.getItem('empleados'));
    expect(empleados.length).toBe(1);
  });

  it('debería mostrar los empleados en la tabla', () => {
    // Agrega algunos empleados de prueba
    agregarEmpleado('Juan', 'Perez', '123', 'Desarrollador');
    agregarEmpleado('Maria', 'Gomez', '456', 'Diseñadora');

    mostrarEmpleados(); // Llama a la función que llena la tabla

    // Verifica que la tabla tenga dos filas (empleados)
    // Necesitamos simular el DOM para esta prueba
    document.body.innerHTML = `
      <table id="employeeTable" class="display">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Número de Empleado</th>
            <th>Puesto</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `;
    
    // Inicializa DataTables (necesario para que funcione la prueba)
    $('#employeeTable').DataTable();

    mostrarEmpleados();

    const filasTabla = $('#employeeTable tbody tr').length;
    expect(filasTabla).toBe(2); 
  });

  it('no debería agregar un empleado con campos vacíos', () => {
    agregarEmpleado('', '', '', '');
    const empleados = JSON.parse(localStorage.getItem('empleados'));
    expect(empleados.length).toBe(0);
  });

  it('debería manejar correctamente números de empleado duplicados', () => {
    // Agrega un empleado
    agregarEmpleado('Juan', 'Perez', '123', 'Desarrollador');

    // Intenta agregar otro empleado con el mismo número
    agregarEmpleado('Pedro', 'Ramirez', '123', 'Contador');

    // Verifica que solo se haya agregado un empleado (el primero)
    const empleados = JSON.parse(localStorage.getItem('empleados'));
    expect(empleados.length).toBe(1);
  });

  it('debería mostrar un mensaje de error si el número de empleado ya existe', () => {
    // Para esta prueba, necesitamos simular la función alert
    global.alert = jest.fn(); 

    // Agrega un empleado
    agregarEmpleado('Juan', 'Perez', '123', 'Desarrollador');

    // Intenta agregar otro empleado con el mismo número
    agregarEmpleado('Pedro', 'Ramirez', '123', 'Contador');

    // Verifica que se haya llamado a la función alert
    expect(alert).toHaveBeenCalledWith('Error: Ya existe un empleado con ese número.'); 
  });
});