-- "Esto me habló": reacciones anónimas a las charlas (Cloudflare D1 / SQLite).
-- Solo se guarda la charla, un identificador al azar del navegador y la fecha.
CREATE TABLE IF NOT EXISTS reacciones (
  charla     TEXT NOT NULL,
  visitante  TEXT NOT NULL,
  creado     TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (charla, visitante)
) WITHOUT ROWID;

-- Para ver el conteo desde la consola de D1:
-- SELECT charla, COUNT(*) AS personas, MAX(creado) AS ultima FROM reacciones GROUP BY charla ORDER BY personas DESC;
