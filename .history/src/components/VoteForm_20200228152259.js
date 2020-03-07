import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Firebase from '../firebase/firebase';
import { withFirebase } from '../firebase';

const VoteForm = ({ firebase }) => {
    const [winner, setWinner] = useState({
        name: '',
        reason: '',
    });
    const [voters, setVoters] = useState();
    const [selectedWinner, selectWinner] = useState();

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

        for (const id in voters.members) {
            teams.push(<MenuItem value={id}>{voters.members[id].name}</MenuItem>)
        }

        return teams;
    }

    function handleWinnerName(event) {
        selectWinner(event.target.value);
    }

    function setWinner() {
        firebase.database.ref('teams').push().set({name: teamName});
        getTeams()
    }

    return (
        <div className="section">
            <div className="container">
                <h2>Echipa {voters.name}</h2>
                <h6>Voteaza-ti preferatul sprintului.</h6>
                <FormControl className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedWinner}
                        onChange={handleWinnerName}
                    >
                        {renderTeamMembers()}
                    </Select>
                    <TextField id="standard-basic" label="Motiv" onChange={handleChange} />
                </FormControl>
                <Fab color="primary" aria-label="add">
                    <AddIcon onClick={setWinner} />
                </Fab>
              </form>
          </div>
      </div>
    );
};

export default withFirebase(VoteForm);
