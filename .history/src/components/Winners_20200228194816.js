import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withFirebase } from '../firebase/index';
import { AuthUserContext } from '../session/index';
import List from '@material-ui/core/List';
import { withAuthorization } from '../session';

const Winners = ({ firebase }) => {
    const classes = useStyles();
    const [winners, setWinners] = useState([]);
    const [isAdmin, setAdmin] = useState(false);
    const [displayWinners, setShowWinners] = useState(false);
    const [teamId, setTeamId] = useState();
    const [sprintId, setSprintId] = useState();

    const deleteWinners = (id) => {
        firebase.collection('winner')
            .doc(id)
            .delete();
    };

    function showWinners () {
        let result = {};
        firebase.database.ref('activeSprint').on('value', value => {
            result = value.val();
            setShowWinners(!result.showWinner)
            setTeamId(result.teamId);
            setSprintId(result.sprintId);
        });

        firebase.database.ref('activeSprint').set({ ...result, showWinner: !result.showWinner });
    }

    function checkIsAdmin(authUser) {
        firebase.database.ref('admin').on('value', (adminInfo) => {
            const adminEmail = adminInfo.val();
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

    function getWinners() {
        const result = [];
        if (teamId && sprintId) {
            firebase.database.ref(`sprints/${sprintId}/teams/${teamId}/members`).on('value', (value) => {
                const members = value.val();
                for (const user in members) {
                    if (members[user].votes) {
                        for (const vote in members[user]) {
                            let votes = 0;
                            for (const vote in members[user].votes) {
                                console.log('aici');
                                votes++;
                            }
                            result.push(
                                <ListItem key={vote}>
                                    <ListItemText
                                        primary={members[user][vote].name}
                                        className={classes.details}
                                    />
                                    <ListItemText
                                        primary={members[user][vote].reason}
                                        className={classes.details}
                                    />
                                    <ListItemText
                                        primary={members[user][vote].name}
                                        className={classes.details}
                                    />
                                    <ListItemText
                                        primary={votes}
                                        className={classes.details}
                                    />
                                </ListItem>
                            )
                        }
                    }
                }
            })
        }

        return result;
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
                {displayWinners ?
                    (
                        <List dense={true}>
                            {getWinners()}
                        </List>
                    ) : null
                }
            </div>
        </div>
    );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Winners));
