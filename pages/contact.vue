<template>
  <section class="wrap">
    <h1>Start a Project</h1>

    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/thank-you"
    >
      <!-- required for Netlify -->
      <input type="hidden" name="form-name" value="contact" />
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
        Message
        <textarea name="message" rows="6" required></textarea>
      </label>

      <button type="submit">Send</button>
    </form>
  </section>
</template>