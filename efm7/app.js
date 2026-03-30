const tableros = [
    {
        id: 1,
        nombre: 'Proyecto Web',
        listas: [
            {
                nombre: 'Por Hacer',
                tarjetas: [
                    { titulo: 'Diseñar homepage' },
                    { titulo: 'Configurar dominio' },
                ],
            },
            {
                nombre: 'En Progreso',
                tarjetas: [
                    { titulo: 'Integrar formulario de contacto' },
                ],
            },
            {
                nombre: 'Terminado',
                tarjetas: [
                    { titulo: 'Subir prototipo a Vercel' },
                ],
            },
        ],
    },
];

tableros.forEach(tablero => {
    console.log(`\n=== Tablero: ${tablero.nombre} ===`);
    tablero.listas.forEach(lista => {
        console.log(`\n  [ ${lista.nombre} ]`);
        lista.tarjetas.forEach(t => console.log(`    - ${t.titulo}`));
    });
});

console.log('\nKanbanPro Sprint 1 — datos simulados cargados.');
console.log('Para usar la base de datos, ejecuta: node seed.js && node test-crud.js');
