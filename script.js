/* ============ EDIT THIS SECTION ============ */
const SITE_CONFIG = {
  academyName: "Shri Chidambar Gurukul Sports Academy",
  shortName: "Shri Chidambar Gurukul",
  schoolName: "Sports Sainik Patan School (Sainik Patan Niwasi Shala)",
  phone: "+919623721515",            // used for tel: link
  phoneDisplay: "+91 96237 21515",
  phone2: "+919578435151", phone2Display: "+91 95784 35151",
  contactPerson: "Shri Appasaheb Tambe Sir",
  whatsapp: "919623721515",          // country code + number, no + or spaces
  address: "Shri Chidambar Gurukul Sports Academy, Sainik Patan Niwasi Shala, Bhose, at MD Jadhav College, Maharashtra, India",
  googleMaps: "GOOGLE_MAPS_LINK",    // paste exact Google Maps link; until then a search-by-address link is used
  instagram: "", facebook: "", youtube: "",
  formEndpoint: "",                  // e.g. "https://formspree.io/f/xxxxxxx". Empty = enquiry is sent via WhatsApp
  waMessage: "Hello, I would like to enquire about Shri Chidambar Gurukul Sports Academy and Sports Sainik Patan School."
};
/* Add/edit achievements. file = path inside /images. Leave year/student empty to hide them. */
const ACHIEVEMENTS = [
  { file:"achievements/district-award-ceremony.webp", title:"District Sports Award Ceremony", event:"Padmabhushan Dr. Vasantdada Patil District Sports Award", year:"", student:"" },
  { file:"achievements/press-district-award.webp", title:"Academy Athletes Honoured", event:"District sports award – press coverage", year:"", student:"" },
  { file:"achievements/award-highlights.webp", title:"District Sports Award Highlights", event:"Zilla Parishad Sangli award function", year:"", student:"" },
  { file:"achievements/press-wushu-18-medals.webp", title:"Medals at District Wushu Championship", event:"Sangli District Wushu – press coverage", year:"", student:"" },
  { file:"achievements/press-state-wushu.webp", title:"State Wushu Championship Medals", event:"State level – press coverage", year:"", student:"" },
  { file:"achievements/press-khelo-india-kickboxing.webp", title:"Khelo India Women's Kickboxing League", event:"Press coverage", year:"", student:"" },
  { file:"achievements/press-khelo-india-wushu.webp", title:"Khelo India Women's Wushu League", event:"Press coverage", year:"", student:"" },
  { file:"achievements/silver-medal-poster.webp", title:"Silver Medal – Sub Junior State Championship", event:"Village felicitation poster", year:"", student:"" }
];
/* Gallery. cat must match one of the categories shown on the filter bar. */
const GALLERY = [
  { file:"gallery/team-medals.webp", cat:"Students", alt:"Academy students holding their medals" },
  { file:"gallery/student-medal.webp", cat:"Medals", alt:"Student showing a championship medal" },
  { file:"sports/wushu-training.webp", cat:"Wushu", alt:"Young Wushu athlete with medal" },
  { file:"sports/boxing-training.webp", cat:"Boxing", alt:"Athlete with a medal on a blue backdrop" },
  { file:"sports/kickboxing-training.webp", cat:"Kickboxing", alt:"Kickboxing student with medal" },
  { file:"hero/hero-training.webp", cat:"Training", alt:"Students practising punching stances" },
  { file:"school/school-building.webp", cat:"School", alt:"Students at the school entrance" },
  { file:"training/academy-students.webp", cat:"Academy", alt:"Academy team in uniform" },
  { file:"achievements/award-collage-family.webp", cat:"Competitions", alt:"Award ceremony photographs" },
  { file:"achievements/press-felicitation.webp", cat:"Competitions", alt:"Felicitation of national players and coaches" }
];
const CATEGORIES = ["All","Training","Wushu","Boxing","Kickboxing","Competitions","Medals","Students","Academy","School"];
/* ============ END OF EDITABLE SECTION ============ */

(function () {
  const C = SITE_CONFIG, $ = (s, p = document) => p.querySelector(s), $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const enc = encodeURIComponent, img = f => "images/" + f;

  // Fill text values
  $$("[data-cfg]").forEach(el => { if (C[el.dataset.cfg]) el.textContent = C[el.dataset.cfg]; });

  // Action links
  const mapsOk = C.googleMaps && C.googleMaps.startsWith("http");
  const links = {
    call: "tel:" + C.phone, call2: "tel:" + C.phone2,
    wa: "https://wa.me/" + C.whatsapp + "?text=" + enc(C.waMessage),
    dir: mapsOk ? C.googleMaps : "https://www.google.com/maps/dir/?api=1&destination=" + enc(C.address)
  };
  $$("[data-link]").forEach(a => a.href = links[a.dataset.link]);
  $$("[data-social]").forEach(a => {
    const u = C[a.dataset.social];
    if (u) a.href = u; else { a.removeAttribute("target"); a.href = "#contact"; a.title = "Link coming soon"; }
  });

  // Mobile menu
  const burger = $("#burger"), menu = $("#menu");
  const setMenu = o => { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") { setMenu(false); closeLb(); } });

  // Achievements
  $("#achGrid").innerHTML = ACHIEVEMENTS.map((a, i) => `
    <article class="ach reveal"><button data-src="${img(a.file)}" data-alt="${a.title}" aria-label="View ${a.title}"><img src="${img(a.file)}" alt="${a.title}" loading="lazy"></button>
    <div><h3>${a.title}</h3><p>${[a.event, a.year, a.student].filter(Boolean).join(" • ")}</p></div></article>`).join("");

  // Gallery + filters
  const gal = $("#galGrid"), fil = $("#filters");
  function drawGallery(cat) {
    gal.innerHTML = GALLERY.filter(g => cat === "All" || g.cat === cat).map(g =>
      `<button data-src="${img(g.file)}" data-alt="${g.alt}" aria-label="Enlarge: ${g.alt}"><img src="${img(g.file)}" alt="${g.alt}" loading="lazy"></button>`).join("")
      || "<p>No photos in this category yet.</p>";
  }
  fil.innerHTML = CATEGORIES.map((c, i) => `<button class="${i ? "" : "on"}" aria-pressed="${!i}">${c}</button>`).join("");
  fil.addEventListener("click", e => {
    if (e.target.tagName !== "BUTTON") return;
    $$("button", fil).forEach(b => { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); });
    e.target.classList.add("on"); e.target.setAttribute("aria-pressed", "true");
    drawGallery(e.target.textContent);
  });
  drawGallery("All");

  // Lightbox
  const lb = $("#lb"), lbImg = $("#lbImg");
  function closeLb() { lb.hidden = true; lbImg.src = ""; }
  document.addEventListener("click", e => {
    const b = e.target.closest("#galGrid button, #achGrid button");
    if (b) { lbImg.src = b.dataset.src; lbImg.alt = b.dataset.alt; lb.hidden = false; $("#lbClose").focus(); }
    else if (e.target === lb || e.target.id === "lbClose") closeLb();
  });

  // Preselect sport from card buttons
  $$("[data-sport]").forEach(a => a.addEventListener("click", () => { $("[name=sport]").value = a.dataset.sport; }));

  // Form
  const form = $("#form"), msg = $("#formMsg");
  form.addEventListener("submit", async e => {
    e.preventDefault(); msg.className = "full fmsg";
    let ok = true;
    $$("input[required],select[required]", form).forEach(f => {
      let v = f.value.trim(), good = !!v;
      if (f.name === "phone") good = /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, ""));
      f.classList.toggle("invalid", !good); if (!good) ok = false;
    });
    if (!ok) { msg.textContent = "Please complete the highlighted fields (use a valid 10-digit phone number)."; msg.classList.add("err"); return; }
    const d = Object.fromEntries(new FormData(form));
    if (C.formEndpoint) {
      try {
        const r = await fetch(C.formEndpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(d) });
        if (!r.ok) throw 0;
        msg.textContent = "Thank you! Your inquiry has been received."; form.reset();
      } catch (_) { msg.textContent = "Could not send right now. Please call or WhatsApp us."; msg.classList.add("err"); }
    } else {
      const t = `New enquiry\nStudent: ${d.student}\nParent/Guardian: ${d.parent}\nPhone: ${d.phone}\nAge: ${d.age}\nLocation: ${d.city}\nSport: ${d.sport}\nMessage: ${d.message || "-"}`;
      window.open("https://wa.me/" + C.whatsapp + "?text=" + enc(t), "_blank", "noopener");
      msg.textContent = "Thank you! Please tap Send in WhatsApp to deliver your inquiry.";
    }
  });

  // Scroll reveal
  const els = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
    els.forEach(el => io.observe(el));
  } else els.forEach(el => el.classList.add("in"));
})();
