<template>
    <!-- Contact section with contact info and contact form -->
    <section class="text-white mt-20" id="contact">
        <h2 class="text-4xl font-bold text-white text-left mb-4 px-4 xl:pl-16">
            Let's Connect
        </h2>

        <!-- Main content grid with contact methods and form -->
        <div
            class="grid md:grid-cols-2 gap-4 relative px-4 xl:px-16 mt-8"
            data-aos="zoom-in-up"
        >
            <!-- Contact information column -->
            <div>
                <p class="text-[#adb7be]">
                    You can contact me using one of these methods found below:
                </p>

                <div class="col-lg-4 col-md-4 mb-lg-0 mt-5">
                    <!-- Primary Email contact method -->
                    <div class="flex mb-10 items-center">
                        <div
                            class="p-2"
                            style="
                                background: #111a3e;
                                width: 50px;
                                height: 46px;
                                display: flex;
                                justify-content: center;
                                border-radius: 50%;
                                overflow: hidden;
                                border: 1px solid#111a3e;
                                backdrop-filter: blur(9px);
                                -webkit-backdrop-filter: blur(9px);
                            "
                        >
                            <img
                                src="https://img.icons8.com/metro/50/ffffff/new-post.png"
                                alt="Primary Email"
                                class="w-6"
                            />
                        </div>

                        <div class="ml-5 text-white">
                            <h4>Primary Email</h4>
                            <p>dbritz22@proton.me</p>
                        </div>
                    </div>

                    <!-- Secondary Email contact method -->
                    <div class="flex mb-10 items-center">
                        <div
                            class="p-2"
                            style="
                                background: #111a3e;
                                width: 50px;
                                height: 46px;
                                display: flex;
                                justify-content: center;
                                border-radius: 50%;
                                overflow: hidden;
                                border: 1px solid#111a3e;
                                backdrop-filter: blur(9px);
                                -webkit-backdrop-filter: blur(9px);
                            "
                        >
                            <img
                                src="https://img.icons8.com/metro/50/ffffff/new-post.png"
                                alt="Secondary Email"
                                class="w-6"
                            />
                        </div>

                        <div class="ml-5 text-white">
                            <h4>Secondary Email</h4>
                            <p>dihanbritz05@gmail.com</p>
                        </div>
                    </div>

                    <!-- Phone contact method -->
                    <div class="flex mb-10 items-center">
                        <div
                            class="p-2"
                            style="
                                background: #111a3e;
                                width: 50px;
                                height: 46px;
                                display: flex;
                                justify-content: center;
                                border-radius: 50%;
                                overflow: hidden;
                                border: 1px solid#111a3e;
                                backdrop-filter: blur(9px);
                                -webkit-backdrop-filter: blur(9px);
                            "
                        >
                            <img
                                src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
                                alt="Phone"
                                class="w-6"
                            />
                        </div>

                        <div class="ml-5 text-white">
                            <h4>Phone</h4>
                            <p>+27663370662 / 066 337 0662</p>
                        </div>
                    </div>

                    <!-- LinkedIn profile -->
                    <div class="flex mb-10 items-center">
                        <div
                            class="p-2"
                            style="
                                background: #111a3e;
                                width: 50px;
                                height: 46px;
                                display: flex;
                                justify-content: center;
                                border-radius: 50%;
                                overflow: hidden;
                                border: 1px solid#111a3e;
                                backdrop-filter: blur(9px);
                                -webkit-backdrop-filter: blur(9px);
                            "
                        >
                            <img
                                src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png"
                                alt="LinkedIn"
                                class="w-6"
                            />
                        </div>

                        <div class="ml-5 text-white">
                            <h4>LinkedIn</h4>
                            <a
                                href="https://www.linkedin.com/in/dihan-britz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="hover:text-primary transition-colors"
                            >
                                linkedin.com/in/dihan-britz
                            </a>
                        </div>
                    </div>

                    <!-- GitHub profile -->
                    <div class="flex mb-10 items-center">
                        <div
                            class="p-2"
                            style="
                                background: #111a3e;
                                width: 50px;
                                height: 46px;
                                display: flex;
                                justify-content: center;
                                border-radius: 50%;
                                overflow: hidden;
                                border: 1px solid#111a3e;
                                backdrop-filter: blur(9px);
                                -webkit-backdrop-filter: blur(9px);
                            "
                        >
                            <img
                                src="https://img.icons8.com/ios-filled/50/ffffff/github.png"
                                alt="GitHub"
                                class="w-6"
                            />
                        </div>

                        <div class="ml-5 text-white">
                            <h4>GitHub</h4>
                            <a
                                href="https://github.com/DoubledDoge"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="hover:text-primary transition-colors"
                            >
                                github.com/DoubledDoge
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact form container -->
            <div
                style="
                    background: #111a3e;
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid #111a3e;
                    backdrop-filter: blur(9px);
                    -webkit-backdrop-filter: blur(9px);
                "
            >
                <!-- Contact form with email submission -->
                <form
                    class="flex flex-col p-2"
                    data-aos="zoom-in-up"
                    @submit.prevent="handleSubmit"
                >
                    <!-- Email input field -->
                    <div class="mb-6">
                        <label
                            for="email"
                            class="text-white block mb-2 text-sm font-medium"
                        >Email</label>

                        <input
                            v-model="formData.email"
                            type="email"
                            id="email"
                            required
                            class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Please enter your email"
                            name="Email"
                            autocomplete="email"
                        />
                    </div>

                    <!-- Subject input field -->
                    <div class="mb-6">
                        <label
                            for="subject"
                            class="text-white block mb-2 text-sm font-medium"
                        >Subject</label>

                        <input
                            v-model="formData.subject"
                            type="subject"
                            id="subject"
                            required
                            class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Please enter your subject"
                            name="Subject"
                        />
                    </div>

                    <!-- Message input field -->
                    <div class="mb-6">
                        <label
                            for="message"
                            class="text-white block mb-2 text-sm font-medium"
                        >Message</label>

                        <textarea
                            v-model="formData.message"
                            id="message"
                            required
                            class="bg-[#111827] placeholder:[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                            placeholder="Let's talk about ..."
                            name="Message"
                            rows="4"
                        ></textarea>
                    </div>

                    <!-- Submit button with loading state -->
                    <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="z-1 w-[100%!important] px-6 md:px-7 py-3 rounded-full sm:w-max flex justify-center text-white bg-primary border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {{ isSubmitting ? "Sending..." : "Send Message" }}
                    </button>

                    <!-- Form submission status message -->
                    <div
                        v-if="submitStatus"
                        :class="[
                            'mt-4 text-center p-2 rounded',
                            submitStatus.type === 'success'
                                ? 'bg-green-600'
                                : 'bg-red-600',
                        ]"
                    >
                        {{ submitStatus.message }}
                    </div>
                </form>
            </div>

            <!-- Background decoration element -->
            <div
                class="bg-linear-to-tr opacity-25 from-[#570cac] to-primary blur-2xl h-20 w-80 z-0 absolute -top-1/2 -left-4 transform -translate-x-2/3 -translate-1/2"
            ></div>
        </div>
    </section>
</template>

<script setup lang="ts">
/**
 * Contact Section Component
 *
 * This component provides multiple contact methods and a contact form.
 * It handles form submission via EmailJS to send messages directly from the website.
 *
 * Features:
 * - Multiple contact methods (email, phone, social links)
 * - Interactive contact form with validation
 * - EmailJS integration for sending messages
 * - Loading and success/error states
 */

import { ref } from "vue";
import emailjs from "@emailjs/browser";

// -----------------------------------------------------
// Environment Variables
// -----------------------------------------------------

// Load EmailJS configuration from environment variables
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;

// -----------------------------------------------------
// Type Definitions
// -----------------------------------------------------

// Contact form data structure
interface FormData {
    email: string;
    subject: string;
    message: string;
}

// Form submission status structure
interface SubmitStatus {
    type: "success" | "error";
    message: string;
}

// -----------------------------------------------------
// Reactive State
// -----------------------------------------------------

// Form data state
const formData = ref<FormData>({
    email: "",
    subject: "",
    message: "",
});

// Form submission state
const isSubmitting = ref(false);
const submitStatus = ref<SubmitStatus | null>(null);

// -----------------------------------------------------
// Methods
// -----------------------------------------------------

/**
 * Handles the form submission
 * Sends the email via EmailJS and manages submission states
 */
const handleSubmit = async () => {
    try {
        // Set loading state
        isSubmitting.value = true;
        submitStatus.value = null;
        console.info("Form submission started.");

        // Prepare email parameters
        const templateParams = {
            from_email: formData.value.email,
            subject: formData.value.subject,
            message: formData.value.message,
            to_email: "dbritz22@proton.me",
        };

        // Send email using EmailJS
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY,
        );

        console.info("Email sent successfully.");

        // Set success status
        submitStatus.value = {
            type: "success",
            message: "Message sent successfully!",
        };

        // Reset form after successful submission
        formData.value = {
            email: "",
            subject: "",
            message: "",
        };
    } catch (error) {
        // Handle errors
        console.error("Failed to send email:", error);

        // Set error status
        submitStatus.value = {
            type: "error",
            message: "Failed to send message. Please try again.",
        };
    } finally {
        // Reset loading state
        isSubmitting.value = false;
        console.info("Form submission process completed.");
    }
};
</script>
