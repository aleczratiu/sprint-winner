import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/index';
import { AuthUserContext } from '../session/index';
import levi from '../levi.png';
import { withAuthorization } from '../session';

const Winners = ({ firebase }) => {
    const [winners, setWinners] = useState([]);
    const [isAdmin, setAdmin] = useState(false);
    const [displayWinners, setShowWinners] = useState(false);

    const deleteWinners = (id) => {
        firebase.collection('winner')
            .doc(id)
            .delete();
    };

    function showWinners () {
        showWinners();
    }

    function checkIsAdmin(authUser) {
        firebase.database.ref('admin').once('value', (adminInfo) => {
            const adminEmail = adminInfo.val();
            console.log('adminEmail', adminEmail);
            if (adminEmail && authUser) {
                setAdmin(adminEmail.email === authUser.email);
            }
        });

        if (!authUser || !isAdmin) {
            return null;
        }

        if (isAdmin) {
            return <button onClick={showWinners}>Show winners</button>
        }
    }

    return (
      <div className="section section-winners">
            <div className="container">
                <h5>Votes</h5>
                <AuthUserContext.Consumer>
                    {authUser => (
                        checkIsAdmin(authUser)
                    )}
                </AuthUserContext.Consumer>
                {displayWinners ? <h1>Merge</h1> : null}
        </div>
        </div>
    );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Winners));
