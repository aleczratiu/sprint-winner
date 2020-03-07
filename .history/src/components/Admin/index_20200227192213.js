import React, { useState, useEffect } from 'react';
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
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Admin({ firebase }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [label, setLabel] = useState('teams');
  const [result, setResult] = useState([]);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
        const result = [];

        firebase.database.ref(label).once('value', (value) => {
            if (value) {
                setResult(value.val());
            }
            console.log({
                value: value.val()
            })
        })

        console.log('result', result);
  }, [label])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('label', label);

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
        console.log('result', result);
        for (const item in result) {
            console.log(item, result);
            teams.push(
                <List>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <ListItemText
                            primary={item}
                            />
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </List>
            )
        }

      return teams;
    }

    function handleAddTeam(event) {
        const name = event.target.value;
        if (name) {
            setTeamName(name);
        }
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
            <LinkTab label="sprints" href="/trash" {...a11yProps(1)} />
            <LinkTab label="votes" href="/spam" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            <TextField id="standard-basic" label="Standard" onChange={handleAddTeam} />
            {handleTeams(result)}
        </TabPanel>
        <TabPanel value={value} index={1}>
            Page Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Page Three
        </TabPanel>
        </div>
    );
}

export default withFirebase(Admin);
