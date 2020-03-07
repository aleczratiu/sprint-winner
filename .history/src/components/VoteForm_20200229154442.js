import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Firebase from '../firebase/firebase';
import { withFirebase } from '../firebase';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const VoteForm = ({ firebase, history }) => {
    const classes = useStyles();
    const [winner, setWinner] = useState({
        name: '',
        reason: '',
    });
    const [voters, setVoters] = useState();
    const [selectedWinner, selectWinner] = useState();
    const [sprintId, setSprintId] = useState();
    const [teamId, setTeamId] = useState();
    const [reason, setReason] = useState('');
    const [totalVotes, setVotes] = useState(0);
    const [location, setLocation] = useState();

    useEffect(() => {
        console.log('history.location', history.location, location)
        if (!voters) {
            getActiveVoters();
        }

        if (!location) {
            setLocation(history.location);
        }
    }, [voters, teamId, sprintId, totalVotes, location]);

    function getActiveVoters () {
        firebase.database.ref('activeSprint').on('value', (value) => {
            if (value && value.val()) {
                setSprintId(value.val().sprintId);
                setTeamId(value.val().teamId);
                firebase.database.ref(`sprints/${value.val().sprintId}/teams/${value.val().teamId}`).on('value', (value) => {
                    setVoters(value.val());
                    getVotesNumber()
                });
            }
        })
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
        setReason(event.target.value);
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

    function getVotesNumber() {
        let votes = 0;
        if (sprintId &&teamId) {
            firebase.database.ref(`sprints/${sprintId}/teams/${teamId}/members`).on('value', (value) => {
                const members = value.val();
                for (const user in members) {
                    if (members[user].votes) {
                        console.log('members[user].vote', members[user].votes);
                        for (const vote in members[user].votes) {
                            console.log('aici');
                            votes++;
                        }
                    }
                }

            })
            setVotes(votes);
        }
    }

    function handleAddWinner() {
        firebase.database.ref(`sprints/${sprintId}/teams/${teamId}/members/${selectedWinner}/votes`).push().set({ reason });

        getVotesNumber();
    }

    return (
        <div className="section">
        <h6>Cati au votat {totalVotes}</h6>
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
        </div>
        <Fab color="primary" aria-label="add">
            <AddIcon onClick={handleAddWinner} />
        </Fab>
      </div>
    );
};

export default withRouter(withFirebase(VoteForm));
