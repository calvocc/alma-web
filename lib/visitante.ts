/** Identificador anónimo de este navegador (no dice quién es la persona). */
export function visitanteId() {
  const KEY = 'alma-visitante';
  try {
    let id = window.localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}
