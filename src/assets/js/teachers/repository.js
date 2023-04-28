//Encargado de guardar,actualizar, leer o eliminar  los datos en el storage 
import { getDatabase, setDatabase } from './../utils/strorage';

const dbName = 'db_teachers';

export function createTeacher(teacher) {
    const arrayTeachers = getDatabase(dbName);
    arrayTeachers.push(teacher);
    setDatabase(dbName, arrayTeachers);
}

export function readTeachers() {
    return getDatabase(dbName);
}

export function updateTeacher(teacherUpdate) {

    const database = readTeacher().map((teacher) =>
        (teacher.id === teacherUpdate.id) ? { ...teacher, ...teacherUpdate } : teacher);
    setDatabase(dbName, database);
}

export function deleteTeacher(idTeacher) {
    const teacherIndex = database.findIndex(({ id }) => id === idTeacher);
    if (teacherIndex !== -1) {
        database.splice(teacherIndex, 1);
        setDatabase(dbName, database);
    }
}

export function findTeacherById(idTeacher) {

    return readTeachers().find(({ id }) => id === parseInt(idTeacher));
}