import React, { useState } from 'react';
// import { BookContext } from '../contexts/BookContext';
import { db } from '../firebase';

const VoteForm = () => {
  // const { addBook } = useContext(BookContext);

  const [winner, setWinner] = useState({
    title: '',
    author: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    db.collection('winner').add(winner);
    setWinner({
      title: '',
      author: ''
    });
  };

  const handleChange = e => {
    setWinner({ ...winner, [e.target.name]: e.target.value });
  };

  return (
    <div className='section'>
      <div className='container'>
        <h6>New Book</h6>
        <form onSubmit={handleSubmit}>
          <div className='input-field'>
            <input
              type='text'
              id='title'
              name='title'
              value={winner.title}
              onChange={handleChange}
              placeholder='e.g. Just because is BUT'
              className='validate'
              required
            />
            <label className='active' htmlFor='title'>
              Why you vote this person
            </label>
          </div>
          <div className='input-field'>
            <input
              type='text'
              id='author'
              name='author'
              value={winner.author}
              onChange={handleChange}
              placeholder='e.g. Levi'
              className='validate'
              required
            />
            <label className='active' htmlFor='author'>
              Potential winner name
            </label>
          </div>
          <div className='input-field center'>
            <button
              type='submit'
              className='btn waves-effect waves-light amber darken-2'
            >
              <i className='material-icons right'>add_circle</i>Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteForm;
