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
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import { FixedSizeList } from 'react-window';

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
    width: '100%',
    height: 400,
    maxWidth: 300,
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

    function handleTeams({ result, style}) {
        const teams = [];
        console.log('result', result);
        for (const id in result) {
            teams.push(
                <ListItem button style={style} key={id}>
                    <ListItemText primary={`Item ${id + 1}`}>
                        {result[id].name}
                    </ListItemText>
                    <DeleteIcon onClick={() => handleDelete(id)} />
                </ListItem>
            )
        }

      return teams;
    }

    function handleTeamName(event) {
        const name = event.target.value;
        if (name) {
            setTeamName(name);
        }
    }

    function handleAddTeam() {
        firebase.database.ref('teams').push().set({name: label});
    }

    function handleDelete(id) {
        firebase.database.ref(`teams/${id}`).delete();
    }

    return (
        <div>
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
            <TextField id="standard-basic" label="Standard" onChange={handleTeamName} />
            <Fab color="primary" aria-label="add">
                <AddIcon onClick={handleAddTeam} />
            </Fab>
            <div className={classes.root}>
                <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
                    {handleTeams(result)}
                </FixedSizeList>
            </div>
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
