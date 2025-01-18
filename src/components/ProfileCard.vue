<template>
  <div
    class="min-h-[95vh] w-2/5 hidden lg:flex flex-col items-start justify-center pb-44 bg-gray-100 shadow-md rounded-[20px] px-20 2xl:px-28"
  >
    <div class="mb-4">
      <!-- Avatar -->
      <img
        src="../assets/avatar.jpeg"
        alt="Your Avatar"
        class="w-32 h-32 rounded-full shadow-lg"
      />
    </div>
    <div>
      <!-- About Info -->
      <h2 class="text-xl font-bold text-gray-800">Manuchim Oliver</h2>
      <p class="text-gray-600 text-sm">Senior Frontend Engineer</p>
    </div>
    <div class="mt-6">
      <!-- Project Info -->
      <h3 class="text-lg font-semibold text-gray-700">About the Project</h3>
      <p class="text-gray-600 text-sm mt-2">
        This project is a Customer Entry Dashboard built with Vue.js,
        TailwindCSS, and Pinia. It includes features for managing customer data,
        performing CRUD operations, and ensuring responsiveness across multiple
        devices. It's not my best work, but it's work I guess.
      </p>
    </div>
    <div class="mt-6">
      <span class="text-gray-600 text-sm"
        >You could check out some more of my work on my...you guessed it!
        <a
          href="https://github.com/mxnuchim"
          target="_blank"
          class="text-blue-400 underline text-sm"
        >
          GitHub Profile
        </a></span
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProfileSidebar",
  props: {
    avatarSrc: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    name: {
      type: String,
      default: "Your Name",
    },
    role: {
      type: String,
      default: "Frontend Engineer",
    },
    projectInfo: {
      type: String,
      default:
        "This project is a Customer Entry Dashboard built with Vue.js, TailwindCSS, and Pinia. It includes features for managing customer data, performing CRUD operations, and ensuring responsiveness.",
    },
    githubLink: {
      type: String,
      default: "https://github.com/yourusername",
    },
  },
};
</script>

<style scoped>
/**** Tailwind-based styles ensure the layout is modern and clean ****/
</style>
