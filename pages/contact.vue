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
>
  <input type="hidden" name="form-name" value="start-project" />

  <p hidden>
    <input name="bot-field" />
  </p>

  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>

  <button type="submit">Send</button>
</form>
  </section>
</template>