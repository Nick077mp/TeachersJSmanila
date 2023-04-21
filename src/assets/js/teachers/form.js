// Encargado de la interaccion y configuracion del formulario
/**
 * Este objeto contiene las referencias a los elementos clave del formulario
 */
export const formElements = {
    form: document.getElementById('teacherForm'),
    fields: {
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        email: document.getElementById('txtEmail'),
        birthDate: document.getElementById('txtBirthDate'),

    }
};

export function getFormData() {
    const teacher = {
         id: new Date().getTime(),
         name: formElements.fields.name.value,
         description: formElements.fields.description.value,
         email: formElements.fields.email.value,
         birthDate: formElements.fields.birthDate.value,
    };
    return teacher;
}

export function resetForm() {
    formElements.form.reset();

}