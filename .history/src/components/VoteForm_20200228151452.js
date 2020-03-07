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
                console.log('value', value.val())
                firebase.database.ref(`sprints/${value.val().sprintId}/teams/${value.val().teamId}`).once('value', (value) => {
                    console.log('value jos', value.val())
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

    function renderTeamMembers() {
        const teams = [];

        for (const id in voters) {
            teams.push(<MenuItem value={id}>{voters[id].name}</MenuItem>)
        }

        return teams;
    }

    return (
        <div className="section">
            <div className="container">
                <h6>Vote your Sprint favourite person</h6>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedSprintTeam}
                            onChange={handleChangeSprintTeam}
                        >
                        </Select>
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
