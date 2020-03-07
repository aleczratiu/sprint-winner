import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Firebase from '../firebase/firebase';

const VoteForm = () => {
    const [winner, setWinner] = useState({
        name: '',
        reason: '',
    });

    const firebase = new Firebase();

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.database.ref('winner').set(winner);
        setWinner({
            name: '',
            reason: '',
        });
    };

    const handleChange = (event) => {
        setWinner({ ...winner, [event.target.name]: event.target.value });
    };

    return (
      <div className="section">
          <div className="container">
              <h6>Vote your Sprint favourite person</h6>
              <form onSubmit={handleSubmit}>
                  <div className="input-field">
                      <input
                          type="text"
                          id="name"
                          name="name"
                          value={winner.name}
                          onChange={handleChange}
                          placeholder="e.g. Levi"
                          className="validate"
                          required
                        />
                      <label className="active" htmlFor="name">
                          Potential winner name
                        </label>
                    </div>

                  <div className="input-field">
                      <input
                          type="text"
                          id="reason"
                          name="reason"
                          value={winner.reason}
                          onChange={handleChange}
                          placeholder="e.g. Just because is BUT"
                          className="validate"
                          required
                        />
                      <label className="active" htmlFor="reason">
                          Why you vote this person
                        </label>
                    </div>
                  <div className="input-field center">
                      <button
                          type="submit"
                          className="btn waves-effect waves-light amber darken-2"
                        >
                          <i className="material-icons right">add_circle</i>
                          Vote
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withRouter(VoteForm);
