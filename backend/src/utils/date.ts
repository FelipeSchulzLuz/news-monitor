/**
 * Converte string BR ("dd/MM/yyyy") em Date.
 * Exemplo: "Publicação: 14/04/2024" → Date(2024‑04‑14T00:00:00)
 */
export function parseDateBR(dataTexto: string): Date {
  const match = dataTexto.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (match) {
    const [, dia, mes, ano] = match;
    return new Date(`${ano}-${mes}-${dia}T00:00:00`);
  }
  return new Date();
}

/**
 * Formata Date em string "dd/MM/yyyy".
 */
export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    return date;
  }
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}   