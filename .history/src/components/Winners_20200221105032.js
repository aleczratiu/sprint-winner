import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import bookThumb from '../book.png';

const BookList = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    console.log('effect');
    const unsub = db.collection('winners').onSnapshot(snapshot => {
      const allBooks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWinners(allBooks);
    });
    return () => {
      console.log('cleanup');
      unsub();
    };
  }, []);

  const deleteBook = id => {
    db.collection('books')
      .doc(id)
      .delete();
  };

  return (
    <div className='section section-books'>
      <div className='container'>
        <h6>Votes</h6>
        <ul>
          {winners.map(winner => (
            <li key={winner.id}>
              <div className='card book'>
                <div className='book-image'>
                  <img src={bookThumb} alt='book thumb' />
                </div>
                <div className='book-details'>
                  <div className='book-title'>{winner.name}</div>
                  <div className='book-author'>{winner.reason}</div>
                </div>
                <div
                  onClick={() => deleteBook(winner.id)}
                  className='book-delete'
                  style={{ cursor: 'pointer' }}
                >
                  <i className='material-icons'>delete</i>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookList;
