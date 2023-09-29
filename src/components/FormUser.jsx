import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import './styles/FormUser.css'

const FormUser = ({ createUser, infoUpdate, updateUser, setInfoUpdate, closeForm, setCloseForm }) => {
    // Configura las reglas de validación para cada campo
const validationSchema = {
    first_name: { required: 'Este campo es obligatorio' },
    last_name: { required: 'Este campo es obligatorio' },
    email: { required: 'Este campo es obligatorio' },
    password: { required: 'Este campo es obligatorio' },
    birthday: { required: 'Este campo es obligatorio' },
    
    // Agrega reglas para otros campos según sea necesario
  };

const { handleSubmit, register, reset, formState: { errors }} = useForm()

useEffect(() => {
  reset(infoUpdate)
}, [infoUpdate])

 // Función de validación personalizada para el correo electrónico
 const validateEmail = (value) => {
    // Utiliza una expresión regular para validar que el correo tenga una extensión de dominio válida
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailPattern.test(value)) {
      return "Correo electrónico no válido";
    }
    return true;
  };


const submit = data => {

    
    if (infoUpdate) {
        //update
        updateUser('/users', infoUpdate.id, data)
        setInfoUpdate()
    } else {
        //Crear
        createUser('/users', data)
    }
    
    reset({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        birthday: ''
    })
}
//cerrar formulario modal
const handleCloseForm = () => {
    setCloseForm(true)
}

return (
   
    <div onClick={handleCloseForm} className={`formuser-container ${closeForm && 'close-form'}`}>
        <form onClick={e => e.stopPropagation()} className="form_user" onSubmit={handleSubmit(submit)}>
            <h2 className="formuser_title">{infoUpdate ? 'Actualizar Usuario' : 'Nuevo Usuario'}</h2>
            <div onClick={handleCloseForm} className="formuser_close">x</div>
            <div className="formuser_group">
                <label className="formuser_label" htmlFor="first_name">First Name</label>
                <input className="formuser_input" {...register('first_name', validationSchema.first_name)} type="text" id="first_name" />
                {errors.first_name && <p className="error-message">{errors.first_name.message}</p>}
            </div>      

            <div className="formuser_group">
                <label className="formuser_label" htmlFor="last_name">Last Name</label>
                <input className="formuser_input" {...register('last_name', validationSchema.last_name)} type="text" id="last_name" />
                {errors.last_name && <p className="error-message">{errors.last_name.message}</p>}
            </div>

            <div className="formuser_group">
                <label className="formuser_label" htmlFor="email">Email</label>
                <input
            className="formuser_input"
            {...register('email', {
              required: 'Este campo es obligatorio',
              validate: validateEmail, // Usa la función de validación personalizada
            })}
            type="email"
            id="email"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

            <div className="formuser_group">
                <label className="formuser_label" htmlFor="password">Password</label>
                <input className="formuser_input" {...register('password', validationSchema.password)} type="password" id="password" />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>       
            
            <div className="formuser_group">
                <label className="formuser_label" htmlFor="birthday">Birthday</label>
                <input className="formuser_input" {...register('birthday', validationSchema.birthday)} type="date" id="birthday" />
                {errors.birthday && <p className="error-message">{errors.birthday.message}</p>}
            </div>

            <button className="formuser_btn">{ infoUpdate ? 'Actualizar Usuario' : 'Agregar Nuevo Usuario' }</button>       
            

        </form>
    </div>
    
  )
}

export default FormUser