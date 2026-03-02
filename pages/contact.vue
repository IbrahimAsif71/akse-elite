<template>
  <section class="wrap">
    <h1>Start a Project</h1>

    <form
      name="contact"
      method="POST"
      action="/thank-you"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <!-- Required for Netlify -->
      <input type="hidden" name="form-name" value="contact" />
      <p style="display:none">
        <label>Don’t fill this out: <input name="bot-field" /></label>
      </p>

      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required></textarea>

      <button type="submit">Send</button>
    </form>
  </section>
</template>