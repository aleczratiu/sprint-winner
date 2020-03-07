import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase';
import levi from '../levi.png';

const Winners = ({ firebase }) => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const unsub = firebase.collection('winner').onSnapshot(snapshot => {
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
      unsub();
    };
  }, [firebase]);

  const deleteWinners = id => {
    firebase.collection('winner')
      .doc(id)
      .delete();
  };

  return (
    <div className='section section-winners'>
      <div className='container'>
        <h6>Votes</h6>
        <ul>
          {winners.map(winner => (
            <li key={winner.id}>
              <div className='card winner'>
                <div className='winner-image'>
                  <img src={levi} alt='winner thumb' />
                </div>
                <div className='winner-details'>
                  <div className='winner-title'>{winner.name}</div>
                  <div className='winner-author'>{winner.reason}</div>
                </div>
                <div
                  onClick={() => deleteWinners(winner.id)}
                  className='winner-delete'
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

export default withFirebase(Winners);
