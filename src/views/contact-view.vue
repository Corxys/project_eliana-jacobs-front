<script setup>
// General
import {ref} from "vue";
import emailjs from "@emailjs/browser";

// Components
import IconSocialComponent from "@/components/shared-components/icon-social-component.vue";
import CustomButtonComponent from "@/components/shared-components/button-custom-component.vue";

import shapeRight from "../assets/images/shapes/contact-01.png";

// Refs
const form = ref(null);
const isHighlight = ref(false);
const formObject = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});
const errorMessage = ref("");

// Regex
const mailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Methods
const sendEmail = () => {
  if (!formObject.value.name || !formObject.value.email || !formObject.value.subject || !formObject.value.message) {
    errorMessage.value = "All inputs are required!";
    isHighlight.value = true;
  } else if (!mailRegex.test(formObject.value.email)) {
    errorMessage.value = "Please enter a valid email address.";
    isHighlight.value = true;
  } else {
    errorMessage.value = "";
    isHighlight.value = false;
    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.value, import.meta.env.VITE_EMAILJS_USER_ID)
      .then(() => {
        console.debug("Email sent successfully.");
        errorMessage.value = "Email sent successfully.";
        formObject.value.name = "";
        formObject.value.email = "";
        formObject.value.subject = "";
        formObject.value.message = "";
      })
      .catch((error) => {
        console.error(error);
        errorMessage.value = "An error occurred while sending the email." + "\n" + "\n" + "Don't hesitate to contact me directly by mail: elianajacobs0@gmail.com.";
      });
  }
};
</script>

<template>
  <section class="contact">
		<img class="contact__shape" :src="shapeRight" alt="Shape in the right of the site." />
		<div class="contact__container">
			<h1 class="contact__title">
				Contact
			</h1>
			<div class="contact__content">
				<form ref="form" class="contact__form" @submit.prevent="sendEmail">
					<div class="contact__input-group">
						<label for="name" class="contact__label">
							Name
						</label>
						<input
							id="name"
							v-model="formObject.name"
							class="contact__input"
							:class="{'error': !formObject.name && isHighlight}"
							type="text"
							name="name"
						>
					</div>
					<div class="contact__input-group">
						<label for="email" class="contact__label">
							Email address
						</label>
						<input
							id="email"
							v-model="formObject.email"
							class="contact__input"
							:class="{'error': !!((!formObject.email && isHighlight) || (!mailRegex.test(formObject.email) && isHighlight))}"
							type="text"
							name="email"
						>
					</div>
					<div class="contact__input-group">
						<label for="subject" class="contact__label">
							Subject
						</label>
						<input
							id="subject"
							v-model="formObject.subject"
							class="contact__input"
							:class="{'error': !formObject.subject && isHighlight}"
							type="text"
							name="subject"
						>
					</div>
					<div class="contact__input-group contact__input-group--textarea">
						<label for="message" class="contact__label">
							Message
						</label>
						<textarea
							id="message"
							v-model="formObject.message"
							class="contact__input contact__input--textarea"
							:class="{'error': !formObject.message && isHighlight}"
							name="message"
						/>
					</div>
					<div class="contact__footer">
						<div class="contact__icons">
							<icon-social-component :icon="['fab', 'instagram']" link="https://www.instagram.com/__e_l_i_a_n_a__/" />
							<icon-social-component :icon="['fab', 'youtube']" link="https://www.youtube.com/channel/UC7Og5-qT_0Oucnraj2f51VQ" />
						</div>
						<custom-button-component text="Submit" />
					</div>
					<div class="contact__error-message">
						{{errorMessage}}
					</div>
				</form>
			</div>

		</div>
  </section>
</template>

<style scoped lang="scss">
.contact {
	display: flex;
	padding: var(--container-padding);
	background: radial-gradient(circle at 27.28% 77.78%, #110F10, transparent 61%),radial-gradient(circle at 42.94% 50.05%, #110F10, transparent 100%),radial-gradient(circle at 45.89% 30.01%, #110F10, transparent 100%),radial-gradient(circle at 99.17% 46.73%, #205251, transparent 100%),radial-gradient(circle at 66.28% 54.41%, #110F10, transparent 100%),radial-gradient(circle at 50% 50%, #110f10, #110f10 100%);
	min-height: 100vh;
	&__container {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}
	&__title {
    margin-bottom: 30px;
  }
  &__content {
    flex-grow: 1;
    display: flex;
  }
  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__input-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    &--textarea {
      flex-grow:1;
    }
  }
  &__label {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__input {
    border: 1px solid var(--epj-c-white);
    background-color: var(--color-input-background);
    height: 40px;
    padding: 0 15px;
    &--textarea {
      resize: vertical;
      height: 100%;
      padding: 15px;
    }
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__icons {
    display: flex;
    :deep(.icon-social:nth-child(1)) {
      margin-right: var(--spacing-between-buttons);
    }
  }
  &__error-message {
    margin-top: 30px;
    white-space: pre;
  }
  .error {
    border: 1px solid var(--epj-c-main);
  }
	&__shape {
		position: absolute;
		width: 70%;
		max-width: 40%;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}
}

@media (min-width: 768px) {
	.contact {
		&__content {
			width: 60%;
		}
	}
}
</style>
