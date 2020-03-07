import React, { useState, useEffect } from 'react';
import Firebase from '../firebase/firebase';
import { withFirebase } from '../firebase';

const VoteForm = ({ firebase }) => {
    const [winner, setWinner] = useState({
        name: '',
        reason: '',
    });
    const [voters, setVoters] = useState();

    useEffect(() => {
        if (!voters) {
            getActiveVoters();
        }
    }, [voters]);

    function getActiveVoters () {
        firebase.database.ref('activeSprint').once('value', (value) => {
            if (value && value.val().status && value.val().sprintId) {
                firebase.database.ref(`sprints/${value.val().sprintId}`).once('value', (value) => {
                    console.log(value, value.val())
                    setVoters(value.val());
                });
            }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.db.collection('winner').add(winner);
        setWinner({
            name: '',
            reason: '',
        });
    };

    const handleChange = (event) => {
        setWinner({ ...winner, [event.target.name]: event.target.value });
    };

    if (!voters) {
        return null;
    }

    return (
        <div className="section">
            <div className="container">
                <h6>Vote your Sprint favourite person</h6>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={winner.name}
                            onChange={handleChange}
                            placeholder="e.g. Levi"
                            className="validate"
                            required
                      />
                        <label className="active" htmlFor="name">
                        Potential winner name
                        </label>
                  </div>

                    <div className="input-field">
                        <input
                            type="text"
                            id="reason"
                            name="reason"
                            value={winner.reason}
                            onChange={handleChange}
                            placeholder="e.g. Just because is BUT"
                            className="validate"
                            required
                      />
                        <label className="active" htmlFor="reason">
                        Why you vote this person
                        </label>
                  </div>
                    <div className="input-field center">
                        <button
                            type="submit"
                            className="btn waves-effect waves-light amber darken-2"
                      >
                            <i className="material-icons right">add_circle</i>
                        Vote
                        </button>
                  </div>
              </form>
          </div>
      </div>
    );
};

export default withFirebase(VoteForm);
