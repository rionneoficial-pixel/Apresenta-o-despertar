const WHATSAPP_PHONE = "5511982711458";

document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const greeting = name ? `Olá, André. Aqui é ${name}.` : "Olá, André.";
    const body = message || "Quero entender como proteger minha família e minha renda.";
    const text = `${greeting} ${body}`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
});
