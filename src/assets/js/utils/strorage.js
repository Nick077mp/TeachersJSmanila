// Encargado de acceder al local storage del navegador

export function getDatabase() {
    return localStorage.getItem('teachers');
}

export function setDatabase(teachers) {
    localStorage.setItem('teachers', teachers);

}

