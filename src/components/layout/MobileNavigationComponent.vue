<template>
	<transition name="fade">
		<nav class="mobile" v-if="show">
			<div class="header">
				<router-link to="/" class="logo">
					<div class="icon"></div>
					<p><span>Orion</span></p>
				</router-link>
				<IconComponent name="times" @click="$emit('toggleMobileNavigation')" />
			</div>
			<div>
				<router-link to="/">Weapons</router-link>
				<router-link to="/camouflages">Camouflages</router-link>
				<router-link to="/mastery">Mastery</router-link>
				<router-link to="/requirements">Requirements</router-link>
				<router-link v-if="!signedIn" to="/signIn">Sign In</router-link>
				<router-link v-if="signedIn" to="#" @click="signOut()">Sign Out</router-link>
			</div>
			<div class="footer">
				<router-link to="/settings">Settings</router-link>
				<router-link to="/about">About</router-link>
			</div>
		</nav>
	</transition>
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
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			signedIn: false,
		}
	},
	methods: {
		signOut() {
			firebase.auth().signOut().then(() => {
				// Sign-out successful.
			}).catch((error) => {
				// An error happened.
			});
		}
	}
}
</script>
