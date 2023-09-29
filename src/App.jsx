
import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import FormUser from './components/FormUser'
import UserCard from './components/UserCard'

function App() {
  //Este estado se crea para poder editar un registro en el form
  const [infoUpdate, setInfoUpdate] = useState()

  //estado del modal, tiene que estar en true para que inicie con el modal cerrado
  const [closeForm, setCloseForm] = useState(true)

  const baseUrl = 'https://users-crud.academlo.tech'
  const [ users,
      getUsers,
      createUser,
      deleteUser,
      updateUser ] = useFetch(baseUrl, setCloseForm)
  
  useEffect(() => {
    getUsers('/users')
  }, [])
  
  console.log(users)

  const handleOpenForm = () => {
    setCloseForm(false)
  }

  return (
    <div className='contenedor-principal'>
      <section className='section-group'>
      <h1 className='titulo-principal'>Usuarios</h1>
      <button onClick={handleOpenForm} className='formuser_btn'>+ Nuevo Usuario</button>
      </section>
     
      <FormUser 
        createUser={createUser}
        infoUpdate={infoUpdate}
        updateUser={updateUser}
        setInfoUpdate={setInfoUpdate}
        closeForm={closeForm}
        setCloseForm={setCloseForm}
      />
      <div className='contenedor-card'>
        {
          users?.map(user => (
            <UserCard 
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              setInfoUpdate={setInfoUpdate}
              handleOpenForm={handleOpenForm}//abrimos el formulario pra edicion
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
