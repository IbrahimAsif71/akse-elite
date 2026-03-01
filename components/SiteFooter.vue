<template>
  <footer class="footer">
    <div class="inner">
      <div class="top">
        <div class="brand">
          <h3>akse</h3>
          <p>Building digital immortality for cultural spaces worldwide.</p>
        </div>

        <div class="cols">
          <div class="col">
            <div class="hd">Company</div>
            <NuxtLink to="/about">About</NuxtLink>
            <NuxtLink to="/blog">Blog</NuxtLink>
            <NuxtLink to="/tours">Tours</NuxtLink>
            <NuxtLink to="/contact">Contact</NuxtLink>
          </div>

          <div class="col">
            <div class="hd">Legal</div>
            <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
            <NuxtLink to="/terms">Terms</NuxtLink>
            <NuxtLink to="/cookies">Cookies</NuxtLink>
          </div>

          <div class="col">
            <div class="hd">Contact</div>
            <a href="mailto:hello@akse.com">hello@akse.com</a>
            <a href="#">Islamabad / Rawalpindi</a>
            <a href="#">Pakistan</a>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="copy">© {{ new Date().getFullYear() }} akse. All rights reserved.</div>
        <div class="mini">
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer{
  padding: 70px 18px 30px;
  background:#08141A;
  color:white;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.inner{ max-width:1100px; margin:0 auto; }
.top{ display:flex; justify-content:space-between; gap: 22px; flex-wrap:wrap; }
.brand{ max-width: 360px; }
.brand h3{ margin:0; font-size: 22px; }
.brand p{ margin: 10px 0 0; opacity:.85; line-height:1.7; }

.cols{ display:flex; gap: 40px; flex-wrap:wrap; }
.col{ display:flex; flex-direction:column; gap: 10px; min-width: 160px; }
.hd{ opacity:.7; font-size: 12px; letter-spacing:1px; text-transform:uppercase; margin-bottom: 4px; }
a{ color:white; text-decoration:none; opacity:.85; }
a:hover{ opacity:1; color:var(--rust); }

.bottom{
  margin-top: 36px;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,0.06);
  display:flex; justify-content:space-between; gap: 12px; flex-wrap:wrap;
}
.copy{ opacity:.75; }
.mini{ display:flex; gap: 14px; }
</style>