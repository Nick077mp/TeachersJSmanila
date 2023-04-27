// Encargado de ejecutar y mostrar validaciones

export function validateForm(fieldConfigurations) {
    let isValid = true;
    removeErrorMessageElements();

    fieldConfigurations.forEach((fieldConfig) => {

        fieldConfig.validations.forEach((validationConfig) => {

            const currentFieldIsValid = validateField(fieldConfig.input, validationConfig);
            isValid = isValid && currentFieldIsValid;
        });

    });

    return isValid;

}

export function validateField(input, validationConfig) {

    const { errorId, errorMessage, validationFunction } = validationConfig;
    const fieldIsValid = validationFunction(input.value);

    if (!fieldIsValid) {
        input.classList.add('is-invalid');
        const errorMessageElement = createErrorMessageElement(errorId, errorMessage);
        input.insertAdjacentElement('afterend', errorMessageElement);


    } else {
        input.classList.add('is-valid');
    }

    return fieldIsValid;


}

/** 
*Crean un elemento de mensaje de error para ser insertado después de que un campo no es valido
*@private
*@param {string} errorId - El ID del elemento del mensaje de error
*@param {string} errorMessage - El mensaje de error que muestra al usuario 
*@returns {HTMLDivElement} Retorna el elemento que contiene el mensaje de error

*/


function createErrorMessageElement(errorId, errorMessage) {

    const errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('invalid-feedback', 'text-start');
    errorMessageElement.setAttribute('id', errorId);
    errorMessageElement.textContent = errorMessage;
    return errorMessageElement;

}

export function removeErrorMessageElements() {
    const errorMessageElements = document.querySelectorAll('.invalid-feedback');
    errorMessageElements.forEach((element) => {
        element.remove();

    });
    removeErrorClassNameFields('is-invalid');

}

export function removeErrorClassNameFields(className) {
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach((input) => {
        input.classList.remove(className);
        
    });

}

export function removeInputErrorMessage(input) {

    let errorMessageElement = input.nextElementSibling;
    while(errorMessageElement && errorMessageElement.classList.contains('invalid-feedback')){
        errorMessageElement.remove();
        input.classList.remove('is-invalid');
        errorMessageElement = input.nextElementSibling;
    }

    

}