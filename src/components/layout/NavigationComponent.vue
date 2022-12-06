<template>
	<nav class="container">
		<router-link to="/" class="logo">
			<div class="icon"></div>
			<p><span>Orion</span></p>
		</router-link>
		<div>
			<router-link to="/">Weapons</router-link>
			<router-link to="/camouflages">Camouflages</router-link>
			<router-link to="/mastery">Mastery</router-link>
			<router-link v-if="!signedIn" to="/signIn">Sign In</router-link>
			<a v-if="signedIn" @click="signOut()" class="icon settings" style="cursor: pointer;" content="Sign Out" v-tippy="{ placement: 'bottom' }">
				Sign Out
			</a>
			<router-link to="/settings" class="icon settings" content="Settings" v-tippy="{ placement: 'bottom' }">
				<IconComponent name="cog" />
			</router-link>
		</div>
		<IconComponent name="bars" class="mobile-nav-toggle" @click="$emit('toggleMobileNavigation')" />
	</nav>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
	created() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				// user is authenticated
				// console.log('signed in user', user)
				this.signedIn = true
			} else {
				// user is not authenticated
				this.signedIn = false
			}
		});
	},
	data() {
		return {
			signedIn: false,
		}
	},
	methods: {
		signOut() {
			console.log('attempt to sign out user')
			firebase.auth().signOut().then(() => {
				// Sign-out successful.
			}).catch((error) => {
				// An error happened.
			});
		}
	}
}
</script>