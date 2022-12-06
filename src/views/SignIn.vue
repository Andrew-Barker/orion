<template>
    <div class="sign-in">
        <h1>{{ isCreatingAccount ? 'Create Account' : 'Sign In' }}</h1>
        <form @submit.prevent="submitForm">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" />
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" />
            <label v-if="isCreatingAccount" for="signUpCode">Sign Up code:</label>
            <input v-if="isCreatingAccount" type="text" id="signUpCode" v-model="signUpCode" />
            <button type="submit">{{ isCreatingAccount ? 'Create' : 'Sign In' }}</button>
            <div class="spacer" />
            <button @click="(isCreatingAccount = !isCreatingAccount)">{{ isCreatingAccount ? 'Sign In' : 'Create Account'}}</button>
        </form>
    </div>
</template>
  
<script>
import firebase from 'firebase'

export default {
    data() {
        return {
            email: '',
            password: '',
            signUpCode: '',
            isCreatingAccount: false
        }
    },
    methods: {
        submitForm(){
            if(this.isCreatingAccount){
                this.createAccount()
            } else {
                this.signIn()
            }
        },
        signIn() {
            // code to send the user's credentials to your authentication system goes here
            const { email, password } = this;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    // code to handle successful sign in goes here
                    this.$router.push('/');
                })
                .catch(error => {
                    // code to handle sign in errors goes here
                });
        },
        createAccount() {
            const { email, password, signUpCode } = this;

            const verifiedCode = this.$CryptoJS.AES.decrypt('U2FsdGVkX1+Wz0H4xoKcRQxnV2OalAg9/JvbHsrJuOg=', 'SG29DRuc1819').toString(this.$CryptoJS.enc.Utf8)

            // compare the encrypted user-entered sign up code to the encrypted hardcoded value
            if (signUpCode === verifiedCode) {
                // code to create a new user account goes here
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log('user', user)
                        this.$router.push('/');
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                    });
            } else {
                // code to handle an invalid sign up code goes here
            }
        }
    }
}
</script>
  
<style lang="scss" scoped>
.sign-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.sign-in form {
    display: flex;
    flex-direction: column;
}

.sign-in label {
    margin-bottom: 0.5rem;
}

.sign-in input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    width: 20rem;
}

.sign-in button {
    padding: 0.5rem 1rem;
    border: none;
    background: $orion-gradient-alt;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.sign-in .spacer {
    margin: 1rem 0;
}
</style>
  