<script setup lang="ts">
import { Button } from "~/components/ui/button";

const form = reactive({
  name: "",
  email: "",
  company: "",
  spaceType: "",
  message: "",
});

const submitted = ref(false);
const errors = reactive<Record<string, string>>({});

const spaceTypes = [
  "Retail / Showroom",
  "Restaurant / F&B",
  "Hotel / Hospitality",
  "Museum / Gallery",
  "Office / Corporate",
  "Event Venue",
  "Other",
];

function validate() {
  const e: Record<string, string> = {};
  if (!form.name.trim()) e.name = "Name is required.";
  if (!form.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "Enter a valid email.";
  if (!form.message.trim()) e.message = "Tell us about your project.";
  Object.assign(errors, e);
  return Object.keys(e).length === 0;
}

function handleSubmit() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (!validate()) return;

  const subject = `Commercial Inquiry — ${form.company || form.name}`;
  const body = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    form.company ? `Company: ${form.company}` : null,
    form.spaceType ? `Space Type: ${form.spaceType}` : null,
    "",
    form.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  window.location.href = `mailto:Akse360@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  submitted.value = true;
}

const inputBase =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15";
const inputError =
  "w-full rounded-xl border border-destructive bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15";
</script>

<template>
  <section id="contact" class="mx-auto max-w-3xl px-6 py-24">
    <!-- Section heading -->
    <div class="mb-12 text-center">
      <p
        class="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
      >
        Get in Touch
      </p>
      <h2
        class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
      >
        Request a custom quote
      </h2>
      <p class="mx-auto mt-3 max-w-md text-muted-foreground">
        Tell us about your project and we'll respond within one business day
        with a tailored proposal.
      </p>
    </div>

    <!-- Success state -->
    <div
      v-if="submitted"
      class="flex flex-col items-center rounded-3xl bg-card py-20 text-center ring-1 ring-border/60"
    >
      <div
        class="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
      >
        <svg
          class="h-6 w-6 text-primary"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 8.5l3 3 7-7"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <h3 class="mt-5 text-xl font-semibold text-foreground">
        Inquiry sent
      </h3>
      <p class="mt-2 max-w-sm text-sm text-muted-foreground">
        Your email client should have opened with a pre-filled message. If it
        didn't, email us directly at
        <a
          href="mailto:Akse360@gmail.com"
          class="font-medium text-primary underline underline-offset-2"
        >Akse360@gmail.com</a>.
      </p>
    </div>

    <!-- Form -->
    <form
      v-else
      class="space-y-5 rounded-3xl bg-card p-8 ring-1 ring-border/60 md:p-10"
      @submit.prevent="handleSubmit"
    >
      <!-- Row: Name + Email -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            class="mb-1.5 block text-sm font-medium text-foreground"
            for="c-name"
          >
            Full Name <span class="text-primary">*</span>
          </label>
          <input
            id="c-name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            placeholder="Aisha Khan"
            :class="errors.name ? inputError : inputBase"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-destructive">
            {{ errors.name }}
          </p>
        </div>
        <div>
          <label
            class="mb-1.5 block text-sm font-medium text-foreground"
            for="c-email"
          >
            Email <span class="text-primary">*</span>
          </label>
          <input
            id="c-email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="aisha@brand.com"
            :class="errors.email ? inputError : inputBase"
          />
          <p v-if="errors.email" class="mt-1 text-xs text-destructive">
            {{ errors.email }}
          </p>
        </div>
      </div>

      <!-- Row: Company + Space type -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            class="mb-1.5 block text-sm font-medium text-foreground"
            for="c-company"
          >
            Company / Brand
          </label>
          <input
            id="c-company"
            v-model="form.company"
            type="text"
            autocomplete="organization"
            placeholder="Crescent Studio"
            :class="inputBase"
          />
        </div>
        <div>
          <label
            class="mb-1.5 block text-sm font-medium text-foreground"
            for="c-space"
          >
            Space Type
          </label>
          <select
            id="c-space"
            v-model="form.spaceType"
            :class="[inputBase, 'appearance-none']"
          >
            <option value="" disabled>Select a type…</option>
            <option v-for="t in spaceTypes" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label
          class="mb-1.5 block text-sm font-medium text-foreground"
          for="c-message"
        >
          Tell us about your project <span class="text-primary">*</span>
        </label>
        <textarea
          id="c-message"
          v-model="form.message"
          rows="5"
          placeholder="Describe your space, goals, timeline, or anything else we should know…"
          :class="[errors.message ? inputError : inputBase, 'resize-none']"
        />
        <p v-if="errors.message" class="mt-1 text-xs text-destructive">
          {{ errors.message }}
        </p>
      </div>

      <!-- Submit -->
      <Button
        type="submit"
        size="lg"
        class="w-full rounded-full bg-foreground text-background shadow-md transition-all hover:bg-foreground/90 hover:shadow-lg"
      >
        Send Inquiry
      </Button>
    </form>

    <!-- Direct contact note -->
    <p class="mt-6 text-center text-sm text-muted-foreground">
      Prefer email?
      <a
        href="mailto:Akse360@gmail.com"
        class="font-medium text-foreground underline underline-offset-2 transition-colors hover:text-primary"
      >Akse360@gmail.com</a>
    </p>
  </section>
</template>
