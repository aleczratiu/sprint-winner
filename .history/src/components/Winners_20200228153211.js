import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/index';
import levi from '../levi.png';
import { withAuthorization } from '../session';

const Winners = ({ firebase }) => {
    const [winners, setWinners] = useState([]);

    // useEffect(() => {
    //     const unsub = firebase.db.collection('winner').onSnapshot((snapshot) => {
    //         const allUsers = snapshot.docs.map((doc) => {
    //             const docData = doc.data();
    //             return {
    //                 id: doc.id,
    //                 reason: docData.reason,
    //                 name: docData.name,
    //             };
    //         });
    //         setWinners(allUsers);
    //     });

    //     return () => {
    //         unsub();
    //     };
    // }, []);

    const deleteWinners = (id) => {
        firebase.collection('winner')
            .doc(id)
            .delete();
    };

    function showWinners(authUser) {
        return () => {
            if ()
        }
    }

    return (
      <div className="section section-winners">
            <div className="container">
                <h6>Votes</h6>
                <ul>
                    <AuthUserContext.Consumer>
                        {authUser => (
                            firebase.database.ref('admin').once('value', (adminInfo) => {
                                const adminEmail = adminInfo.val();
                                if (adminEmail && authUser) {
                                    setAdmin(adminEmail.email === authUser.email);
                                }
                            });

                            if (!authUser) {
                                return null;
                            }
                            <button onClick={showWinners(authUser)}>Show winners</button>
                        )}
                    </AuthUserContext.Consumer>
              </ul>
        </div>
        </div>
    );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Winners));
