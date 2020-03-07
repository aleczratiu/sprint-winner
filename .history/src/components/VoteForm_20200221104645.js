import React, { useState } from 'react';
import { db } from '../firebase';

const VoteForm = () => {
  const [winner, setWinner] = useState({
    name: '',
    reason: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    db.collection('winner').add(winner);
    setWinner({
      name: '',
      reason: ''
    });
  };

  const handleChange = e => {
    setWinner({ ...winner, [e.target.name]: e.target.value });
  };

  return (
    <div className='section'>
      <div className='container'>
        <h6>Vote your Sprint favourite person</h6>
        <form onSubmit={handleSubmit}>
          <div className='input-field'>
            <input
              type='text'
              id='title'
              name='name'
              value={winner.name}
              onChange={handleChange}
              placeholder='e.g. Levi'
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
              value={winner.reason}
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
