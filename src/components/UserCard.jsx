

const UserCard = ({ user, deleteUser, setInfoUpdate, handleOpenForm }) => {

    const handleDelete = () => {
        deleteUser('/users', user.id)
    }

    const handleEdit = () => {
      setInfoUpdate(user)
      handleOpenForm()
    }
    
  return (
    <article className="principal">        
        {/*<h3>#{`${user.id} ${user.first_name} ${user.last_name}`}</h3>}*/}
        <h3>{`${user.first_name} ${user.last_name}`}</h3>
        <hr />
        <ul>
            <li><i className='bx bx-envelope'></i><span>{user.email}</span></li>
            <li><i className='bx bx-gift'></i><span>{user.birthday}</span></li>
        </ul>
        <hr />
        <footer className="bottones-footer">
        <button onClick={handleDelete} className="delete"><i className='bx bx-trash'></i></button>
        <button onClick={handleEdit} className="edit"><i className='bx bx-pencil'></i></button>
        </footer>
        
    </article>
  )
}

export default UserCard