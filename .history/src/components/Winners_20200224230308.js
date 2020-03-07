import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase';
import levi from '../levi.png';

const Winners = () => {
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        const unsub = firebase.collection('winner').onSnapshot((snapshot) => {
            const allUsers = snapshot.docs.map((doc) => {
                const docData = doc.data();
                return {
                    id: doc.id,
                    reason: docData.reason,
                    name: docData.name,
                };
            });
            setWinners(allUsers);
        });

        return () => {
            unsub();
        };
    }, []);

    const deleteWinners = (id) => {
        db.collection('winner')
            .doc(id)
            .delete();
    };

    return (
        <div className="section section-winners">
        <div className="container">
              <h6>Votes</h6>
              <ul>
                  {winners.map((winner: any) => (
                      <li key={winner.id}>
                          <div className="card winner">
                              <div className="winner-image">
                                  <img src={levi} alt="winner thumb" />
                                </div>
                              <div className="winner-details">
                                  <div className="winner-title">{winner.name}</div>
                                  <div className="winner-author">{winner.reason}</div>
                                </div>
                              <div
                                  onClick={() => deleteWinners(winner.id)}
                                  className="winner-delete"
                                  style={{ cursor: 'pointer' }}
                                >
                                  <i className="material-icons">delete</i>
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
