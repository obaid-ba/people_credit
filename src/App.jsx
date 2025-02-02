import './App.css'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


export default function App () {
  const api = "http://localhost:3001";
  const [users, setUsers] = useState( [] );
  const [formData, setFormData] = useState( {
    name: '',
    price: '',
    tel: '',
    active: true
  } );
  useEffect( () => {
    Axios.get( `${ api }/users` )
      .then( res => setUsers( res.data ) )
  }, [] )

  const deleteUser = ( idUser ) => {
    // const idUser = event.target.id
    setUsers( prevUsers => prevUsers.filter( user => user._id !== idUser ) );
    toast.warn( "user removed" )
    Axios.post( `${ api }/deleteUser`, { _id: idUser } )
      .then( res => res.data )
  }

  const createUser = () => {
    console.log( formData );
    console.log( users )
    console.log( users.filter( ele => ele.tel == formData.tel ) )
    if ( users.filter( ele => ele.tel == formData.tel ).length ) {
      setUsers( users.map( ele => {
        if ( ele.tel == formData.tel ) {
          return {
            ...ele,
            price: Number( ele.price ) + Number( formData.price )
          }
        }
        return ele;
      } ) );
      Axios.post( `${ api }/updateUser`, formData )
        .then( res => res.data )
    } else if ( formData.name && formData.price && formData.tel ) {
      setUsers( prevUsers => [...prevUsers, formData] );
      Axios.post( `${ api }/createUser`, formData )
        .then( res => res.data )
      toast.success( "you have create New User" )
    }
  }


  return (
    <div className='container'>
      <div className='inputs'>
        <input type="text" placeholder='Name' onChange={ e => setFormData( { ...formData, name: e.target.value } ) } />
        <input type="number" placeholder='Price' onChange={ e => setFormData( { ...formData, price: e.target.value } ) } />
        <input type="number" placeholder='Phone Number' onChange={ e => setFormData( { ...formData, tel: e.target.value } ) } />
        <button onClick={ createUser }>Create New User</button>
      </div>
      <ToastContainer position="bottom-left" richColors />
      <div className='boxs'>
        { users.map( ( { _id, name, price, tel }, index ) => {
          return (
            <div className='card' key={ _id }>
              <ul id={ index }>
                <li><b>Name: </b>{ name }</li>
                <li><b>Price:</b>{ price } DT</li>
                <li><b>Phone Number:</b>{ tel }</li>
              </ul>
              <button className='btn' onClick={ () => deleteUser( _id ) }>Delete</button>
            </div>
          )
        } ) }
      </div>
    </div>
  )
}

