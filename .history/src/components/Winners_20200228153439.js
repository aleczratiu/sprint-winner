import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/index';
import levi from '../levi.png';
import { withAuthorization } from '../session';

const Winners = ({ firebase }) => {
    const [winners, setWinners] = useState([]);
    const [isAdmin, setAdmin] = useState(false);

    const deleteWinners = (id) => {
        firebase.collection('winner')
            .doc(id)
            .delete();
    };

    function showWinners () {

    }

    function checkIsAdmin(authUser) {
        return () => {
            firebase.database.ref('admin').once('value', (adminInfo) => {
                const adminEmail = adminInfo.val();
                if (adminEmail && authUser) {
                    setAdmin(adminEmail.email === authUser.email);
                }
            });

            if (!authUser) {
                return null;
            }

            if (isAdmin) {
                return <button onClick={showWinners(authUser)}>Show winners</button>
            }
        }
    }

    return (
      <div className="section section-winners">
            <div className="container">
                <h6>Votes</h6>
                <ul>
                    <AuthUserContext.Consumer>
                        {authUser => (
                            checkIsAdmin(authUser)
                        )}
                    </AuthUserContext.Consumer>
              </ul>
        </div>
        </div>
    );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Winners));
