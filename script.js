const WHATSAPP_PHONE = "5511982711458";
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const formatCurrency = (value) => currencyFormatter.format(value || 0);

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

document.querySelectorAll("[data-risk-calculator]").forEach((form) => {
  const result = document.querySelector("[data-risk-result]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("riskName") || "").trim();
    const income = Number(formData.get("income") || 0);
    const hasChildren = formData.get("hasChildren") === "yes";
    const childrenCount = Number(formData.get("childrenCount") || 0);
    const monthlyExpenses = Number(formData.get("monthlyExpenses") || 0);
    const netWorth = Number(formData.get("netWorth") || 0);
    const workType = String(formData.get("workType") || "");

    if (!income || !monthlyExpenses || !workType || !formData.get("hasChildren")) {
      result.innerHTML = `
        <p class="eyebrow">Resultado</p>
        <h3>Preencha os campos obrigatórios.</h3>
        <p>Renda, filhos, despesas mensais e modelo de trabalho são necessários para calcular a estimativa.</p>
      `;
      return;
    }

    const criticalIllness = income * 24;
    const lifeMultiplier = hasChildren ? 300 : 150;
    const lifeAndDisability = monthlyExpenses * lifeMultiplier;
    const totalProtection = criticalIllness + lifeAndDisability;

    const childrenText = hasChildren
      ? `${childrenCount || "com"} ${childrenCount === 1 ? "filho" : "filhos"}`
      : "sem filhos";

    result.innerHTML = `
      <p class="eyebrow">Resultado</p>
      <h3>${name ? `${name}, sua` : "Sua"} estimativa de proteção</h3>
      <div class="result-list">
        <div class="result-item">
          <span>Doenças graves | 24x renda</span>
          <strong>${formatCurrency(criticalIllness)}</strong>
        </div>
        <div class="result-item">
          <span>Seguro de vida e invalidez | ${lifeMultiplier}x despesas</span>
          <strong>${formatCurrency(lifeAndDisability)}</strong>
        </div>
        <div class="result-item">
          <span>Proteção total estimada</span>
          <strong>${formatCurrency(totalProtection)}</strong>
        </div>
      </div>
      <p class="result-note">
        Perfil: ${workType}, ${childrenText}, despesas de ${formatCurrency(monthlyExpenses)}
        e patrimônio informado de ${formatCurrency(netWorth)}. Esta é uma referência inicial,
        não uma proposta de contratação.
      </p>
      <a class="button primary full" href="https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
        `Olá, André. Fiz a calculadora de risco. Nome: ${name || "não informado"}. Renda base: ${formatCurrency(income)}. Despesas: ${formatCurrency(monthlyExpenses)}. Perfil: ${workType}, ${childrenText}. Patrimônio: ${formatCurrency(netWorth)}. Estimativa: doenças graves ${formatCurrency(criticalIllness)}, vida e invalidez ${formatCurrency(lifeAndDisability)}, total ${formatCurrency(totalProtection)}.`
      )}" target="_blank" rel="noopener">Enviar resultado para André</a>
    `;
  });
});
