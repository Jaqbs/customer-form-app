<script setup>
import { ref, reactive } from "vue"
import { useVuelidate } from "@vuelidate/core"
import { required, email, minLength, maxLength } from "@vuelidate/validators"
import { postData } from "../services/dataAPI"

const isLoading = ref(false)
const formError = ref("")
const formSent = ref(false)

const formData = reactive({
	nameField: "",
	emailField: "",
	subjectField: "",
	messageField: ""
})

const formRules = {
	nameField: {
		required,
		minLength: minLength(5),
		maxLength: maxLength(50)
	},
	emailField: { required, email },
	subjectField: { maxLength: maxLength(100) },
	messageField: { required, maxLength: maxLength(500) }
}

function clearForm() {
	formData.nameField = ""
	formData.emailField = ""
	formData.subjectField = ""
	formData.messageField = ""
}

function hideFormStatus() {
	if (formSent.value) {
		formSent.value = false
	}

	if (formError.value) {
		formError.value = ""
	}
}

function focusAnyOfFields() {
	hideFormStatus()
}

const sendFormData = async () => {
	isLoading.value = true

	try {
		const response = await postData({
			name: formData.nameField,
			email: formData.emailField,
			subject: formData.subjectField,
			message: formData.messageField
		})
		isLoading.value = false
		console.log("RES data", response.data)
		formSent.value = true
		v$.value.$reset()
		clearForm()
	} catch (err) {
		isLoading.value = false
		console.log("ERR", err)
		formError.value = `${err.message} . ${err.response.data}`
	}
}

const v$ = useVuelidate(formRules, formData)

async function submitForm() {
	hideFormStatus()
	const isFormCorrect = await v$.value.$validate()

	if (!isFormCorrect) return

	sendFormData()
}
</script>

<template>
	<form @submit.prevent="submitForm" data-test="form">
		<label for="name">Name</label>
		<input
			type="text"
			v-model.trim="formData.nameField"
			id="name"
			name="name"
			placeholder="Name"
			@focus="focusAnyOfFields"
			minlength="5"
			maxlength="50"
			tabindex="10"
			data-test="name"
			:class="{ errorInput: v$.nameField.$error }"
		/>
		<p class="errorMsg" v-if="v$.nameField.$error" data-test="name-error">
			{{ v$.nameField.$errors[0].$message }}
		</p>

		<label for="email">Email address</label>
		<input
			type="email"
			v-model.trim="formData.emailField"
			id="email"
			name="email"
			placeholder="Email address"
			@focus="focusAnyOfFields"
			tabindex="20"
			data-test="email"
			:class="{ errorInput: v$.emailField.$error }"
		/>

		<p class="errorMsg" v-if="v$.emailField.$error" data-test="email-error">
			{{ v$.emailField.$errors[0].$message }}
		</p>

		<label for="subject">Subject</label>
		<input
			type="text"
			v-model.trim="formData.subjectField"
			id="subject"
			name="subject"
			placeholder="Subject"
			@focus="focusAnyOfFields"
			maxlength="100"
			tabindex="30"
			data-test="subject"
			:class="{ errorInput: v$.subjectField.$error }"
		/>

		<p
			class="errorMsg"
			v-if="v$.subjectField.$error"
			data-test="subject-error"
		>
			{{ v$.subjectField.$errors[0].$message }}
		</p>

		<label for="message">Message</label>
		<textarea
			id="message"
			v-model.trim="formData.messageField"
			name="message"
			cols="50"
			rows="5"
			placeholder="Subject"
			@focus="focusAnyOfFields"
			maxlength="500"
			tabindex="40"
			data-test="message"
			:class="{ errorInput: v$.messageField.$error }"
		></textarea>

		<p
			class="errorMsg"
			v-if="v$.messageField.$error"
			data-test="message-error"
		>
			{{ v$.messageField.$errors[0].$message }}
		</p>

		<div>
			<p v-if="formError" class="formError" data-test="form-error">
				Something went wrong, please try later.<br />
				{{ formError }}
			</p>
			<p v-if="formSent" class="formSuccess" data-test="form-success">
				Form sent successfully.
			</p>
			<p v-if="isLoading" class="formLoading" data-test="form-loading">
				Sending data, please wait...
			</p>
		</div>

		<button type="submit" class="submitBtn" data-test="form-button">
			SEND
		</button>
	</form>
</template>

<style scoped>
.submitBtn {
	margin-top: 30px;
}

.errorMsg {
	color: #c60000;
	font-size: 0.8rem;
}

.errorInput {
	border-color: #c60000;
}

.formError {
	text-align: center;
	border: 1px solid #c60000;
	color: #c60000;
	padding: 3px 15px;
	font-size: 0.9rem;
}

.formSuccess {
	border: 1px solid green;
	color: green;
	padding: 3px 15px;
	font-size: 0.9rem;
}

.formLoading {
	text-align: center;
	color: darkorange;
	font-size: 0.9rem;
}
</style>
