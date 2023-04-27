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

/**
*Array de objetos que contiene informacion para las validaciones
* Cada objeto contiene una referencia a cada campo, un array de objetos
* de validaciones que tendrá, el ID del error, el mensaje y la función de validación
 */

export const fieldConfigurations = [
    {
        input: formElements.fields.name,
        validations: [
            {
                errorId: `${formElements.fields.name.id}Required`,
                errorMessage: 'El nombre es obligatorio.',
                //Las validaciones retornaran un falso cuando debe mostrar el mensaje de error 
                // y un false cunado no debe mostrarlo
                validationFunction: (value) => {
                    return value.trim() !== '';

                }
            }
        ]
    },
    {
        input: formElements.fields.description,
        validations: [
            {
                errorId: `${formElements.fields.description.id}Required`,
                errorMessage: 'El nombre es obligatorio.',
                //Las validaciones retornaran un falso cuando debe mostrar el mensaje de error 
                // y un false cunado no debe mostrarlo
                validationFunction: (value) => {
                    return value.trim() !== '';

                }
            }
        ]
    },

    {
        input: formElements.fields.email,
        validations: [
            {
                errorId: `${formElements.fields.email.id}Required`,
                errorMessage: 'El email es obligatorio.',
                //Las validaciones retornaran un falso cuando debe mostrar el mensaje de error 
                // y un false cunado no debe mostrarlo
                validationFunction: (value) => {
                    return value.trim() !== '';

                }
            },
            {
                errorId: `${formElements.fields.email.id}Pattern`,
                errorMessage:"El correo electronico no cumple con el formato correcto.",
                validationFunction: (value) => {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

                }
            }
        ]
    },

    {
        input:formElements.fields.birthDate,
        validations: [
            {
                errorId: `${ formElements.fields.birthDate.id }Required`,
                errorMessage: 'El birthDate es obligatorio.',
                //Las validaciones retornaran un falso cuando debe mostrar el mensaje de error 
                // y un false cunado no debe mostrarlo
                validationFunction: (value) => {
                    return value.trim() !== '';

                }
            }
        ]
    },
];







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

export function setFormData(teacher) {

        const { id, name, description, email, birthDate } = teacher;
        formElements.fields.name.value = name;
        formElements.fields.description.value = description;
        formElements.fields.email.value = email;
        formElements.fields.birthDate.value = birthDate;
}