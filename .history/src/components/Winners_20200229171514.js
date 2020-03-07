import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withFirebase } from '../firebase/index';
import { AuthUserContext } from '../session/index';
import List from '@material-ui/core/List';
import { withAuthorization } from '../session';
import Chart from './PieChart';

const useStyles = makeStyles(theme => ({
  details: {
    maxWidth: '300px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}));

const Winners = ({ firebase }) => {
    const classes = useStyles();
    const [winners, setWinners] = useState([]);
    const [isAdmin, setAdmin] = useState(false);
    const [displayWinners, setShowWinners] = useState(false);
    const [activeSprintObject, setActiveSprintObject] = useState();
    const [teamId, setTeamId] = useState();
    const [sprintId, setSprintId] = useState();
    const [individualVote, setIndividualVote] = useState();

    useEffect(() => {
        if (!displayWinners) {
            showWinners();
        }
    }, [displayWinners])

    const deleteWinners = (id) => {
        firebase.collection('winner')
            .doc(id)
            .delete();
    };

    function showWinners () {
        firebase.database.ref('activeSprint').on('value', value => {
            const result = value.val();
            if (result) {
                setActiveSprintObject(result);
                setShowWinners(result.showWinner)
                setTeamId(result.teamId);
                setSprintId(result.sprintId);
            }
        });
    }

    function handleShowWinners() {
        if (activeSprintObject) {
            firebase.database.ref('activeSprint').set({ ...activeSprintObject, showWinner: !activeSprintObject.showWinner })
        }
    }

    function checkIsAdmin(authUser) {
        firebase.database.ref('admin').on('value', (adminInfo) => {
            const adminEmail = adminInfo.val();
            if (adminEmail && authUser) {
                setAdmin(adminEmail.email === authUser.email);
            }
        });

        return <button style={{ display: !isAdmin ? 'none' : 'block' }} onClick={handleShowWinners}>Show winners</button>
    }

    function getWinners() {
        const result = new Map();
        const reasons = [];
        if (teamId && sprintId) {
            firebase.database.ref(`sprints/${sprintId}/teams/${teamId}/members`).on('value', (value) => {
                const members = value.val();
                for (const user in members) {
                    if (members[user].votes) {
                        for (const vote in members[user].votes) {
                            if (!result.has(members[user].name)) {
                                result.set(members[user].name, 1);
                            } else {
                                let userVote = result.get(members[user].name);
                                result.set(members[user].name, userVote+1);
                            }
                            reasons.push(<ListItem key={vote}>
                                <img src={members[user].profilePicture} style={{width: 50, height: 50}} />
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
            })

        }

        return {

        };
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
                        <div>
                            {individualVote ? <Chart data={individualVote} /> : null}
                            <List dense={true}>
                                {getWinners()}
                            </List>
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Winners));
