import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../../firebase/index';
import { AuthUserContext, withAuthorization } from '../../session/index';

import Chart from './PieChart';

const useStyles = makeStyles((theme) => ({
    btns: {
        margin: theme.spacing(1),
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        padding: '10px',
        border: '1px solid #e0e0e0',
        marginTop: '20px',
    },
    details: {
        maxWidth: '300px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        justifyContent: 'center',
    },
    winnerSection: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
}));

const Winners = ({ firebase }) => {
    const classes = useStyles();
    const [isAdmin, setAdmin] = useState(false);
    const [displayWinners, setShowWinners] = useState(false);
    const [activeSprintObject, setActiveSprintObject] = useState();
    const [teamId, setTeamId] = useState();
    const [sprintId, setSprintId] = useState();
    const individualVote = new Map();

    useEffect(() => {
        firebase.database.ref('activeSprint').on('value', (value) => {
            const result = value.val();
            if (result) {
                setActiveSprintObject(result);
                setShowWinners(result.showWinner);
                setTeamId(result.teamId);
                setSprintId(result.sprintId);
            }
        });
    }, []);

    const deleteWinners = () => {
        // DE testat daca merge logout la toti
        firebase.database.ref(`sprints/${activeSprintObject.sprintId}/teams/${teamId}/members`).once('value')
            .then((snapshot) => {
                const result = snapshot.val();

                for (const id in result) {
                    if (Object.hasOwnProperty.call(result, id)) {
                        if (result[id].votes) {
                            firebase.database.ref(
                                `sprints/${activeSprintObject.sprintId}/teams/${teamId}/members/${id}/votes`,
                            ).remove();
                        }
                    }
                }
            });
    };

    function handleShowWinners() {
        if (activeSprintObject) {
            firebase.database.ref('activeSprint').set({
                ...activeSprintObject, showWinner: !activeSprintObject.showWinner,
            });
        }
    }

    function checkIsAdmin(authUser) {
        firebase.database.ref('admin').on('value', (adminInfo) => {
            const adminEmail = adminInfo.val();
            if (adminEmail && authUser) {
                setAdmin(adminEmail.email === authUser.email);
            }
        });

        return (
            <div style={{ display: !isAdmin ? 'none' : 'flex' }} className={classes.btns}>
                <Button variant="contained" color="primary" style={{ display: !isAdmin ? 'none' : 'block' }} onClick={handleShowWinners}>Show winners</Button>
                <Button variant="contained" color="secondary" style={{ display: !isAdmin ? 'none' : 'block' }} onClick={deleteWinners}>Delete votes</Button>
                <Button variant="contained" color="secondary" style={{ display: !isAdmin ? 'none' : 'block' }} onClick={() => firebase.killAllSessions()}>KILL ALL SESSIONS</Button>
            </div>
        );
    }

    function getWinners() {
        const reasons = [];
        if (teamId && sprintId) {
            firebase.database.ref(`sprints/${sprintId}/teams/${teamId}/members`).on('value', (value) => {
                const members = value.val();
                for (const user in members) {
                    if (Object.hasOwnProperty.call(members, user)) {
                        if (members[user].votes) {
                            for (const vote in members[user].votes) {
                                if (Object.hasOwnProperty.call(members[user].votes, vote)) {
                                    if (!individualVote.has(members[user].name)) {
                                        individualVote.set(members[user].name, 1);
                                    } else {
                                        const userVote = individualVote.get(members[user].name);
                                        individualVote.set(members[user].name, userVote + 1);
                                    }
                                    reasons.push(<ListItem className={classes.winnerSection} key={vote}>
                                        <Avatar alt={members[user].name} src={members[user].profilePicture} />
                                        <ListItemText
                                            primary={members[user].name}
                                            className={classes.details}
                                        />
                                        <ListItemText
                                            primary={members[user].votes[vote].reason}
                                            className={classes.details}
                                        />
                                    </ListItem>);
                                }
                            }
                        }
                    }
                }
            });
        }


        return reasons;
    }

    return (
        <div className="section section-winners">
            <AuthUserContext.Consumer>
                {(authUser) => (
                    checkIsAdmin(authUser)
                )}
            </AuthUserContext.Consumer>
            <div className="container">
                <h5>Votes</h5>
                {displayWinners ?
                    (
                        <div>
                            {individualVote ? <Chart data={individualVote} /> : null}
                            <List dense>
                                <ListItem className={classes.winnerSection}>
                                    Member
                                    <ListItemText
                                        primary="Name"
                                        className={classes.details}
                                    />
                                    <ListItemText
                                        primary="Reason"
                                        className={classes.details}
                                    />
                                </ListItem>
                                {getWinners()}
                            </List>
                        </div>
                    ) : null}
            </div>
        </div>
    );
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Winners));
