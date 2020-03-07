import React from 'react';

function SignIn() {
    if (!user) {
        return (
          <GoogleLoginButton onClick={handleLoginWithGoogle} />
        );
    }
}

export default SignIn;
