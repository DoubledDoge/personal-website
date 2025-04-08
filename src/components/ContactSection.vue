<template>
    <section class="text-white mt-20" id="contact">
        <h2 class="text-4xl font-bold text-white text-left mb-4 px-4 xl:pl-16">
            Let's Connect
        </h2>
        <div
            class="grid md:grid-cols-2 gap-4 relative px-4 xl:px-16 mt-8"
            data-aos="zoom-in-up"
        >
            <div>
                <p class="text-[#adb7be]">You can contact me using one of these methods found below:</p>

                <div class="col-lg-4 col-md-4 mb-lg-0 mt-5">
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
                <form class="flex flex-col p-2" data-aos="zoom-in-up" @submit.prevent="handleSubmit">
                    <div class="mb-6">
                        <label
                            for="email"
                            class="text-white block mb-2 text-sm font-medium"
                            >Email</label
                        >

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

                    <div class="mb-6">
                        <label
                            for="subject"
                            class="text-white block mb-2 text-sm font-medium"
                            >Subject</label
                        >

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

                    <div class="mb-6">
                        <label
                            for="message"
                            class="text-white block mb-2 text-sm font-medium"
                            >Message</label
                        >

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

                    <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="z-1 w-[100%!important] px-6 md:px-7 py-3 rounded-full sm:w-max flex justify-center text-white bg-primary border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>

                    <div v-if="submitStatus" :class="['mt-4 text-center p-2 rounded',
                        submitStatus.type === 'success' ? 'bg-green-600' : 'bg-red-600']">
                        {{ submitStatus.message }}
                    </div>
                </form>
            </div>

            <div
                class="bg-linear-to-tr opacity-25 from-[#570cac] to-primary blur-2xl h-20 w-80 z-0 absolute -top-1/2 -left-4 transform -translate-x-2/3 -translate-1/2"
            ></div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import emailjs from '@emailjs/browser';

// Import environment variables for EmailJS
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;

interface FormData {
  email: string;
  subject: string;
  message: string;
}

interface SubmitStatus {
  type: 'success' | 'error';
  message: string;
}

const formData = ref<FormData>({
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitStatus = ref<SubmitStatus | null>(null);

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    submitStatus.value = null;

    const templateParams = {
      from_email: formData.value.email,
      subject: formData.value.subject,
      message: formData.value.message,
      to_email: 'dbritz22@proton.me'
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    submitStatus.value = {
      type: 'success',
      message: 'Message sent successfully!'
    };

    // Reset form
    formData.value = {
      email: '',
      subject: '',
      message: ''
    };

  } catch (error) {
    console.error('Failed to send email:', error);
    submitStatus.value = {
      type: 'error',
      message: 'Failed to send message. Please try again.'
    };
  } finally {
    isSubmitting.value = false;
  }
};
</script>
