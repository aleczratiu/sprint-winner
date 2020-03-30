import React from 'react';
import uuidv4 from 'uuid/v4';
import Container from '@material-ui/core/Container';
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { HOME } from '../../../constants';
import { withFirebase } from '../../../firebase/index';

const useStyles = makeStyles(() => ({
    incognito: {
        fontSize: '18px',
        width: '98%',
        marginLeft: '4px',
        background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,17,1) 43%, rgba(255,255,255,1) 100%)',
        color: '#fff',
        '&:hover': {
            opacity: '0.7',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'black',
            borderColor: 'black',
        },
    },
    levi: {
        width: '23px',
    },
}));

function SignIn({ firebase, history }) {
    const classes = useStyles();

    const handleLoginWithGoogle = () => {
        firebase
            .doSignWithGoogle()
            .then((result) => {
                firebase.database.ref(`users/${result.user.uid}`).once('value')
                    .then((snapshot) => {
                        if (!snapshot.val()) {
                            firebase.database.ref(`users/${result.user.uid}`).set({
                                displayName: result.user.displayName,
                                email: result.user.email,
                                phoneNumber: result.user.phoneNumber,
                                photoURL: result.user.photoURL,
                            });
                        }
                    }).catch((error) => console.log(error));
                history.push(HOME);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const handleLoginWithFacebook = () => {
        firebase
            .doSignWithFacebook()
            .then((result) => {
                firebase.database.ref(`users/${result.user.uid}`).once('value')
                    .then((snapshot) => {
                        if (!snapshot.val()) {
                            firebase.database.ref(`users/${result.user.uid}`).set({
                                displayName: result.user.displayName,
                                email: result.user.email,
                                phoneNumber: result.user.phoneNumber,
                                photoURL: result.user.photoURL,
                            });
                        }
                    }).catch((error) => console.log(error));
                history.push(HOME);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const loginIncognito = () => {
        const hashSplitted = uuidv4().split('-');
        const email = `anonymous${hashSplitted[0] + hashSplitted[1] + hashSplitted[4]}@anonymus${hashSplitted[2]}.com`;
        firebase.doCreateUserWithEmailAndPassword(email, email).then(() => {
            firebase.doSignInWithEmailAndPassword(email, email);
            history.push(HOME);
        });
    };

    return (
        <Container maxWidth="xs">
            <h1>Login</h1>
            <GoogleLoginButton onClick={handleLoginWithGoogle} />
            <FacebookLoginButton onClick={handleLoginWithFacebook} />
            <Button
              onClick={loginIncognito}
              variant="contained"
              className={classes.incognito}
            >
                Inc
                <img className={classes.levi} alt="bs" src={require('../../../images/levi.png')} />
                gnito
            </Button>
        </Container>
    );
}

export default withFirebase(withRouter(SignIn));
