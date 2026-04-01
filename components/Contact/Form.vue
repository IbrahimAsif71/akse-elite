<script setup lang="ts">
const formRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) return;

  const { $gsap } = useNuxtApp();
  $gsap.from(formRef.value, {
    scrollTrigger: {
      trigger: formRef.value,
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const handleSubmit = (e: Event) => {
  e.preventDefault();
  isSubmitting.value = true;
  
  // Simulate API call since no actual API integration is required yet
  setTimeout(() => {
    isSubmitting.value = false;
    showSuccess.value = true;
    
    // Reset form success message after a few seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  }, 1000);
};
</script>

<template>
  <section class="border-t border-border/20 py-24">
    <div
      ref="formRef"
      class="mx-auto max-w-4xl px-6 lg:px-8"
    >
      <div class="grid gap-16 lg:grid-cols-2">
        <div>
          <h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get in Touch
          </h2>
          <p class="mt-4 text-lg text-muted-foreground">
            We'd love to hear from you. Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div class="relative rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
          <form @submit="handleSubmit" class="space-y-6">
            <div class="grid gap-6 sm:grid-cols-2">
              <div class="space-y-2">
                <label for="firstName" class="text-sm font-medium text-foreground">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  placeholder="John"
                />
              </div>
              <div class="space-y-2">
                <label for="lastName" class="text-sm font-medium text-foreground">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label for="email" class="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div class="space-y-2">
              <label for="message" class="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                required
                rows="4"
                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <span v-if="isSubmitting" class="flex items-center gap-2">
                <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
              <span v-else>Send Message</span>
            </button>
            
            <p v-if="showSuccess" class="text-sm text-green-600 dark:text-green-400 mt-2 text-center animate-fade-in">
              Thanks for reaching out! We'll be in touch soon.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
