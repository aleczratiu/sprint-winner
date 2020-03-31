/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { withFirebase } from '../../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    voteBtn: {
        backgroundColor: '#009603',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#00ba04',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
    },
}));

const VoteForm = ({ firebase }) => {
    const classes = useStyles();
    const [voters, setVoters] = useState();
    const [selectedWinner, selectWinner] = useState('');
    const [sprintId, setSprintId] = useState();
    const [teamId, setTeamId] = useState();
    const [reason, setReason] = useState('');
    const [totalVotes, setVotes] = useState(0);
    const [voteStatus, setVoteStatus] = useState(false);

    useEffect(() => {
        if (!voters) {
            getActiveVoters();
        }

        if (!totalVotes) {
            getVotesNumber();
        }

        firebase.database.ref('activeSprint/status').on('value', (value) => {
            setVoteStatus(value.val());
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [voters, teamId, sprintId, totalVotes, voteStatus]);

    function getActiveVoters() {
        firebase.database.ref('activeSprint').on('value', (value) => {
            if (value && value.val()) {
                setSprintId(value.val().sprintId);
                setTeamId(value.val().teamId);
                firebase.database.ref(`sprints/${value.val().sprintId}/teams/${value.val().teamId}`).on('value', (value) => {
                    setVoters(value.val());
                    getVotesNumber();
                });
            }
        });
    }

    const handleChange = (event) => {
        setReason(event.target.value);
    };

    if (!voters) {
        return null;
    }

    function renderTeamMembers() {
        const teams = [];

        for (const id in voters.members) {
            teams.push(<MenuItem value={id}>{voters.members[id].name}</MenuItem>);
        }

        return teams;
    }

    function handleWinnerName(event) {
        selectWinner(event.target.value);
    }

    function getVotesNumber() {
        let votes = 0;
        if (sprintId && teamId) {
            firebase.database.ref(`sprints/${sprintId}/teams/${teamId}/members`).on('value', (value) => {
                const members = value.val();
                for (const user in members) {
                    if (members[user].votes) {
                        console.log('members[user].vote', members[user].votes);
                        // eslint-disable-next-line guard-for-in
                        for (const vote in members[user].votes) {
                            votes += 1;
                        }
                    }
                }
            });
            setVotes(votes);
        }
    }

    function handleAddWinner() {
        firebase.database.ref(`sprints/${sprintId}/teams/${teamId}/members/${selectedWinner}/votes`).push().set({ reason });
        getVotesNumber();
        selectWinner('');
        setReason('');
    }

    if (!voteStatus) {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Vote session closed</h1>
                <img className={classes.levi} alt="bs" src={require('../../images/closed.png')} />
            </div>
        );
    }

    return (
        <Container className={classes.root} maxWidth="sm">
            <h5>
                Team:
                {' '}
                {voters.name}
            </h5>
            <h5>
                Total votes:
                {' '}
                {totalVotes}
                /
                {voters.members ? Object.keys(voters.members).length : '?'}
            </h5>
            <h5>Vote your favorite.</h5>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Team members</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedWinner}
                  onChange={handleWinnerName}
                >
                    {renderTeamMembers()}
                </Select>
                <TextField id="standard-basic" value={reason} label="Reason" onChange={handleChange} />
            </FormControl>
            <Button
                disabled={!selectedWinner || !reason}
                onClick={handleAddWinner}
              variant="contained"
                className={classes.voteBtn}
            >
                Vote
            </Button>
        </Container>
    );
};

export default withFirebase(VoteForm);
