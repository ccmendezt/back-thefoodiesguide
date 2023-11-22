// import { EntityManager } from 'typeorm';

// export async function seedData(entityManager: EntityManager): Promise<void> {
//   // // Inserción de valores iniciales en la base de datos

//   // Inicio Inserts de Perfiles

//   await saveIfNotExists(entityManager, 'perfil', { n_nombre: 'Administrador' });
//   await saveIfNotExists(entityManager, 'perfil', { n_nombre: 'Jurado' });
//   await saveIfNotExists(entityManager, 'perfil', { n_nombre: 'Creador' });
//   await saveIfNotExists(entityManager, 'perfil', { n_nombre: 'Votante' });

//   // Fin Inserts de Perfiles

//   // Inicio Inserts de Pais

//   await saveIfNotExists(entityManager, 'pais', {
//     n_nombre: 'Colombia',
//     q_codPaisConecto: 39,
//   });
//   await saveIfNotExists(entityManager, 'pais', {
//     n_nombre: 'Ecuador',
//     q_codPaisConecto: 40,
//   });
//   await saveIfNotExists(entityManager, 'pais', {
//     n_nombre: 'Planeta Esri',
//     q_codPaisConecto: 75,
//   });

//   // Fin Inserts de Pais

//   // Inicio Inserts de Categoría

//   await saveIfNotExists(entityManager, 'categoria', {
//     n_nombre: 'Interactivo',
//   });
//   await saveIfNotExists(entityManager, 'categoria', { n_nombre: 'Académico' });
//   await saveIfNotExists(entityManager, 'categoria', { n_nombre: 'Temático' });
//   await saveIfNotExists(entityManager, 'categoria', {
//     n_nombre: 'Sostenibilidad',
//   });

//   // Fin Inserts de Categoria
// }

// async function saveIfNotExists( // Función para verificar si existe un registro en la base de datos
//   entityManager: EntityManager,
//   tableName: string,
//   data: object,
// ): Promise<void> {
//   const existingData = await entityManager.findOne(tableName, { where: data });

//   if (!existingData) {
//     await entityManager.save(tableName, data);
//   }
// }
