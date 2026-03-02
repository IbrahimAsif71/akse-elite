<template>
  <section class="contact">
    <h1>Start a Project</h1>
    <p>Tell us what you want to preserve. We’ll reply within 24 hours.</p>

    <form
      name="start-project"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/thank-you"
      class="form"
    >
      <!-- required hidden input -->
      <input type="hidden" name="form-name" value="start-project" />

      <!-- honeypot -->
      <p style="display:none">
        <label>Don’t fill this out: <input name="bot-field" /></label>
      </p>

      <label>
        Name
        <input name="name" type="text" required />
      </label>

      <label>
        Email
        <input name="email" type="email" required />
      </label>

      <label>
        Phone (optional)
        <input name="phone" type="tel" />
      </label>

      <label>
        Message
        <textarea name="message" rows="6" required></textarea>
      </label>

      <button type="submit" class="btn">Send</button>
    </form>
  </section>
</template>