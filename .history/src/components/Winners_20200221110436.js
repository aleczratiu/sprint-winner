import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import bookThumb from '../book.png';

const Winners = () => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const unsub = db.collection('winner').onSnapshot(snapshot => {
      const allWinners = snapshot.docs.map(doc => {
        console.log('doc', doc)
        return  {
            id: doc.id,
            ...doc.data()
        }
      });
      setWinners(allWinners);
    });
    return () => {
      console.log('cleanup');
      unsub();
    };
  }, []);

  const deleteWinners = id => {
    db.collection('winner')
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
                  <img src="https://cdn.bannersnack.com/files/b1d8afd11d486b449efc90df82395650" alt='levi thumb' />
                </div>
                <div className='book-details'>
                  <div className='book-title'>{winner.name}</div>
                  <div className='book-author'>{winner.reason}</div>
                </div>
                <div
                  onClick={() => deleteWinners(winner.id)}
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

export default Winners;
