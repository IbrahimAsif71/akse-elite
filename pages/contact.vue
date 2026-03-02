<template>
  <section class="wrap">
    <!-- Netlify detection form (MUST exist in HTML at build time) -->
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      style="display:none"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p>
        <label>Don’t fill this out: <input name="bot-field" /></label>
      </p>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
    </form>

    <!-- Visible form -->
    <h1>Start a Project</h1>

    <form
      name="contact"
      method="POST"
      action="/thank-you"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />

      <p class="hidden">
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

<style scoped>
.wrap { color:#fff; margin:0 auto; max-width:820px; padding:120px 18px; }
label { display:block; margin:14px 0 6px; opacity:.9; }
input, textarea {
  background:#00000040;
  border:1px solid rgba(255,255,255,.14);
  border-radius:12px;
  color:#fff;
  padding:12px 14px;
  width:100%;
}
button {
  background:var(--rust);
  border:0;
  border-radius:999px;
  color:#fff;
  cursor:pointer;
  margin-top:16px;
  padding:12px 18px;
}
.hidden { display:none; }
</style>