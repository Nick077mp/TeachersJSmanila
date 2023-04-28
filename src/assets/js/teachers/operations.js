// Encargado de la interacción de javascript con  html
// Third Libraries
import alertify from 'alertifyjs';
import Swal from 'sweetalert2'

import { formElements, fieldConfigurations, getFormData, resetForm, setFormData } from './form';
import { createTeacher, readTeachers, findTeacherById, updateTeacher, deleteTeacher } from './repository';

// Own Libraries
import { validateForm, validateField, removeInputErrorMessage, removeErrorClassNameFields, removeErrorMessageElements } from './../utils/validations';

// Module Libraries
export function listeners() {

    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
        listenFormFieldsChangeEvent();
        listenFormResetEvent();
        listenTableClickEvent();


    });
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        alertify.dismissAll();

        if (validateForm(fieldConfigurations)) {

            const teacher = getFormData();
            const idTeacher = formElements.fields.id.value.trim();



            if (idTeacher) {

                updateTeacher(teacher);

            } else {
                createTeacher(teacher);

            }

            resetForm();
            removeErrorClassNameFields('is-valid');
            alertify.success('Profesor guardado correctamente');
            listTeachers();
            listenFormFieldsChangeEvent();
        } else {
            alertify.error('Verificar los datos del formulario');
        }


    });
}

function listTeachers() {
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody')
    tbody.innerHTML = '';

    if (arrayTeachers.length > 0) {
        arrayTeachers.forEach((teacher) => {

        });

    } else {
        const rowEmpty = document.createElement('tr');
        const colEmpty = document.createElement('td');
        colEmpty.setAttribute('colspan', '6');
        colEmpty.textContent = "No se encuentran registros disponibles";
        colEmpty.classList.add('text-center');
        rowEmpty.appendChild(colEmpty);

        tbody.appendChild(rowEmpty);

    }

    arrayTeachers.forEach((teacher, index) => {

        const { id, name, description, email, BirthDate } = teacher;
        console.log(name);

        //Creo la fila
        const row = document.createElement('tr');
        row.classList.add('align-middle')

        //Creo las columnas
        const colId = document.createElement('td');
        colId.textContent = id;
        colId.classList.add('text-center');

        const colName = document.createElement('td');
        colName.textContent = name;

        const colDescription = document.createElement('td');
        colDescription.textContent = description;

        const colEmail = document.createElement('td');
        colEmail.textContent = email;

        const colBirthDate = document.createElement('td');
        colBirthDate.textContent = BirthDate;

        const colButtons = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'm-1');
        editButton.dataset.id = id;
        editButton.setAttribute('title', 'Editar');

        const editIcon = document.createElement('em');
        editIcon.classList.add('fa', 'fa-pencil');
        editIcon.dataset.id = id;
        editButton.appendChild(editIcon);

        colButtons.appendChild(editButton);





        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-delete', 'm-1');
        deleteButton.dataset.id = id;
        deleteButton.setAttribute('title', 'Eliminar');

        const deleteIcon = document.createElement('em');
        deleteIcon.classList.add('fa', 'fa-trash');
        deleteIcon.dataset.id = id;
        deleteButton.appendChild(deleteIcon);

        colButtons.appendChild(deleteButton);












        //Agrego las columnas a la fila 
        row.appendChild(colId);
        row.appendChild(colName);
        row.appendChild(colDescription);
        row.appendChild(colEmail);
        row.appendChild(colBirthDate);
        row.appendChild(colButtons);

        //Agrego la fila al tbody
        tbody.appendChild(row);
    });
}

function listenFormFieldsChangeEvent() {
    fieldConfigurations.forEach(({ input, validations }) => {

        input.addEventListener('change', () => {
            removeInputErrorMessage(input);

            validations.forEach(() => {
                validateField(input, validationConfig);

            })

        })
    });


}

function listenFormResetEvent() {
    formElements.form.addEventListener('reset', () => {
        removeErrorMessageElements();
        removeErrorClassNameFields('is-valid');
        resetForm();
        alertify.dismissAll();
    });
}

function listenTableClickEvent() {
    const table = document.getElementById('tblTeachers');
    table.addEventListener('click', ({ target }) => {

        const idTeacher = target.getAttribute('data-id');


        if (target.classList.contains('btn-edit') || target.classList.contains('fa-pencil')) {
            editTeacher(idTeacher);


        } else if (target.classList.contains('btn-delete') || target.classList.contains('fa-trash')) {
            confirmDelete(idTeacher);

        }

    });


}
function editTeacher(idTeacher) {

    const teacher = findTeacherById(parseInt(idTeacher));

    if (teacher) {
        setFormData(teacher);
        window.scrollTo({ top: 0, behavior: 'smooth' })

    } else {
        alertify.warning('El profesor que seleccionaste no existe, verifique la información')
    }



}

function confirmDelete(idTeacher) {

    const teacher = findTeacherById(parseInt(idTeacher));

    if (teacher) {

        Swal.fire({
            title: `¿Estas seguro de que quieres eliminar el profesor: ${teacher.name} ?`,
            text: 'No podras deshacer esta accion',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#b2b2b2',
            confirmButtonText: 'Si,Eliminar',
            cancelButtonText: 'Cerrar'
        }).then((resultConfirm) => {
            if (resultConfirm.isConfirmed) {

                deleteTeacher(parseInt(idTeacher));
                listTeachers();
                alertify.success('El registro ha sido eliminado')

            } else {
                alertify.dismissAll();
                alertify.message('Accion cancelada');
            }

        });
    } else {
        alertify.error('El profesor que seleccionaste no existe, verique la informacion')
    }



}

