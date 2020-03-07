import React, { useState, useEffect, useRef } from 'react';
import { withAuthorization } from '../../session/index';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';
import { withFirebase } from '../../firebase/index';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  list: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  details: {
    maxWidth: '300px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

function Admin({ firebase }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState('teams');
  const [result, setResult] = useState();
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState();
  const [selectedTeam, setSelectedTeam] = useState();
  const [memberName, setMemberName] = useState();
  const [memberPicture, setMemberPicture] = useState();
  const [sprintName, setSprintName] = useState();
  const [sprints, setSprints] = useState();
  const [selectedSprintTeam, setSelectedSprintTeam] = useState();
  const [activeSprint, setActiveSprint] = useState({ id: null, active: false });
  const [selectedSprintTeamForVotes, selectSprintTeamForVotes] = useState();

    function getActiveSprint() {
        firebase.database.ref('activeSprint').on('value', value => {
            const existentActiveSprint = value.val();
            if (value.val() && existentActiveSprint.status === true) {
                setActiveSprint({ id: existentActiveSprint.sprintId, active: existentActiveSprint.status });
                console.log('existentActiveSprint.teamId', existentActiveSprint.teamId)
                setSelectedSprintTeam(existentActiveSprint.teamId);
            }
        })
    }

    function getSprints() {
        firebase.database.ref('sprints').on('value', (value) => {
            if (value) {
                setSprints(value.val());
            }
        });
    }

    function getTeams() {
        firebase.database.ref(label).on('value', (value) => {
            if (value) {
                setResult(value.val());
            }
        });
    }

    function getTeamMembers(team) {
        console.log('selectedTeam', selectedTeam);
        if (team || selectedTeam) {
            console.log('teamMembers suys', teamMembers);
            firebase.database.ref(`teams/${team || selectedTeam}/members`).on('value', (value) => {
                if (value) {
                    setTeamMembers(value.val());
                }
            });
        }
    }

    useEffect(() => {
        if (!result) {
            getTeams()
        }

        if (selectedTeam && !teamMembers) {
            getTeamMembers();
        }

        if (!sprints) {
            getSprints();
            getActiveSprint();
        }
    }, [label, result, teamMembers, selectedTeam, sprints])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function LinkTab(props) {
        return (
            <Tab
                component="a"
                onClick={event => {
                    setLabel(props.label)
                    event.preventDefault();
                }}
                {...props}
            />
        );
    }

    function handleTeams() {
        const teams = [];

        for (const id in result) {
            teams.push(
                <ListItem key={id}>
                    <ListItemText
                        primary={result[id].name}
                        className={classes.details}
                    />
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => handleDelete(id)} />
                    </IconButton>
                </ListItem>
            )
        }

        return teams;
    }

    function handleTeamMembers() {
        const teams = [];

        console.log('teamMembers', teamMembers);

        for (const id in teamMembers) {
            teams.push(
                <ListItem key={id}>
                    <ListItemText
                        primary={teamMembers[id].name}
                        className={classes.details}
                    />
                    <ListItemText
                        primary={teamMembers[id].profilePicture}
                        className={classes.details}
                    />
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => handleDeleteMember(id)} />
                    </IconButton>
                </ListItem>
            )
        }

        return teams;
    }

    function getSprintTeams(teams) {
        const sprintTeams = [];
        for (const id in teams) {
            sprintTeams.push(<MenuItem value={id}>{teams[id].name}</MenuItem>);
        }

        return sprintTeams;
    }

    function handleChangeSprintTeam(event) {
        setSelectedSprintTeam(event.target.value)
        if (activeSprint) {
            handleActiveSprint(event);
        }
    }

    function handleActiveSprint(event) {
        if (!event.target.id) {
            setActiveSprint({ id: activeSprint.id, active: activeSprint.active });
        firebase.database.ref('activeSprint').set({sprintId: event.target.id || activeSprint.id, teamId: event.target.value, status: activeSprint.active, showWinner: false });
        } else {
            setActiveSprint({ id: event.target.id , active: event.target.checked });
        firebase.database.ref('activeSprint').set({sprintId: event.target.id || activeSprint.id, teamId: event.target.value, status: event.target.checked, showWinner: false });
        }
    }

    function handleSprints() {
        const sprintsList = [];

        for (const id in sprints) {
            sprintsList.push(
                <ListItem key={id}>
                    <ListItemText
                        primary={sprints[id].name}
                        className={classes.details}
                    />
                    <ListItemText
                        primary={sprints[id].createdOn}
                        className={classes.details}
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        id={id}
                        value={selectedSprintTeam}
                        onChange={handleChangeSprintTeam}
                    >
                        {getSprintTeams(sprints[id].teams)}
                    </Select>
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => handleDeleteSprint(id)} />
                    </IconButton>
                    <FormControlLabel
                        control={
                        <GreenCheckbox
                            key={id}
                            checked={activeSprint.id === id && activeSprint.active}
                            onChange={handleActiveSprint}
                            value={selectedSprintTeam}
                            id={id}
                        />
                        }
                    />
                </ListItem>
            )
        }

        return sprintsList;
    }

    function handleTeamName(event) {
        const name = event.target.value;
        if (name) {
            setTeamName(name);
        }
    }

    function handleAddTeam() {
        firebase.database.ref('teams').push().set({name: teamName});
        getTeams()
    }

    function handleDelete(id) {
        firebase.database.ref(`teams/${id}`).remove();
        getTeams()
    }

    function handleDeleteMember(id) {
        firebase.database.ref(`teams/${selectedTeam}/members/${id}`).remove();
        getTeamMembers()
    }

    function handleDeleteSprint(id) {
        firebase.database.ref(`sprints/${id}`).remove();
        getSprints()
    }

    function handleChangeTeam(event) {
        const team = event.target.value;
        console.log('team', team)
        setSelectedTeam(team)
        getTeamMembers(team);
    }

    function renderTeams() {
        if (!result && label === 'members') {
            getTeams()
        };

        const teams = [];

        for (const id in result) {
            teams.push(<MenuItem value={id}>{result[id].name}</MenuItem>)
        }

        return teams;
    }

    function handleTeamMember (event) {
        setMemberName(event.target.value)
    }

    function handleMemberPicture (event) {
        setMemberPicture(event.target.value)
    }

    function handleAddMember () {
        firebase.database.ref(`teams/${selectedTeam}/members`).push().set({name: memberName, profilePicture: memberPicture});
        getTeamMembers()
    }

    function handleAddSprint() {
        if (result) {
            firebase.database.ref('sprints').push().set({
                name: sprintName,
                createdOn: new String(new Date()),
                teams: result,
            });

            getSprints();
        }
    }

    function handleSprintName(event) {
        setSprintName(event.target.value);
    }

    function getMembersVotes() {
        selectedSprintTeamForVotes()
        const result = new Map();
        const reasons = [];
        if (teamId && sprintId) {
            firebase.database.ref(`sprints/${sprintId}/teams/${teamId}/members`).on('value', (value) => {
                const members = value.val();
                for (const user in members) {
                    if (members[user].votes) {
                        for (const vote in members[user].votes) {
                            if (!individualVote.has(members[user].name)) {
                                individualVote.set(members[user].name, 1);
                            } else {
                                let userVote = individualVote.get(members[user].name);
                                individualVote.set(members[user].name, userVote+1);
                            }
                            reasons.push(<ListItem className={classes.winnerSection} key={vote}>
                                <img src={members[user].profilePicture} style={{width: 50, height: 50, borderRadius: '50%'}} />
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

        console.log('reason', reason);
        return reasons;
    }

    function handleVotesSection() {
        const sprintsList = [];

        for (const id in sprints) {
            sprintsList.push(
                <ListItem key={id}>
                    <ListItemText
                        primary={sprints[id].name}
                        className={classes.details}
                    />
                    <ListItemText
                        primary={sprints[id].createdOn}
                        className={classes.details}
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        id={id}
                        value={selectedSprintTeamForVotes}
                        onChange={getMembersVotes}
                    >
                        {getSprintTeams(sprints[id].teams)}
                    </Select>
                </ListItem>
            )
        }

        return sprintsList;
    }

    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            >
                <LinkTab label="teams" href="/teams" {...a11yProps(0)} />
                <LinkTab label="members" href="/trash" {...a11yProps(1)} />
                <LinkTab label="sprints" href="/spam" {...a11yProps(2)} />
                <LinkTab label="votes" href="/members" {...a11yProps(3)} />
            </Tabs>
        </AppBar>
        <Container maxWidth="md">
        <TabPanel value={value} index={0}>
            <TextField id="standard-basic" label="Team name" onChange={handleTeamName} />
            <Fab color="primary" aria-label="add">
                <AddIcon onClick={handleAddTeam} />
            </Fab>
            <div className={classes.list}>
                <List dense={true}>
                    {handleTeams(result)}
                </List>
            </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Team</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTeam}
                    onChange={handleChangeTeam}
                >
                    {renderTeams()}
                </Select>
            </FormControl>
            <TextField id="standard-basic" label="Name" onChange={handleTeamMember} />
            <TextField id="standard-basic" label="Profile picture url" onChange={handleMemberPicture} />
            <Fab color="primary" aria-label="add">
                <AddIcon onClick={handleAddMember} />
            </Fab>
            <div className={classes.list}>
                {handleTeamMembers()}
            </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <FormControl className={classes.formControl}>
                <TextField id="standard-basic" label="Sprint name" onChange={handleSprintName} />
                <Fab color="primary" aria-label="add">
                    <AddIcon onClick={handleAddSprint} />
                </Fab>
                <div className={classes.list}>
                    <List dense={true}>
                        {handleSprints()}
                    </List>
                </div>
            </FormControl>
        </TabPanel>
        <TabPanel value={value} index={3}>
            {handleVotesSection()}
        </TabPanel>
        </Container>
        </div>
    );
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(withFirebase(Admin));
