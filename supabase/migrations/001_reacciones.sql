-- "Esto me habló": reacciones anónimas a las charlas.
-- No se guarda nombre, correo ni IP: solo la charla y un identificador al azar del navegador.

create table if not exists public.reacciones (
  charla     text        not null check (char_length(charla) between 1 and 120),
  visitante  uuid        not null,
  creado     timestamptz not null default now(),
  primary key (charla, visitante)
);

alter table public.reacciones enable row level security;

-- Desde la web solo se puede insertar la propia marca. Nadie puede leer la tabla.
drop policy if exists "insertar reaccion" on public.reacciones;
create policy "insertar reaccion" on public.reacciones
  for insert to anon with check (true);

revoke select, update, delete on public.reacciones from anon, authenticated;
grant insert on public.reacciones to anon;

-- ¿Este navegador ya marcó esta charla?
create or replace function public.me_hablo(p_charla text, p_visitante uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (select 1 from public.reacciones where charla = p_charla and visitante = p_visitante);
$$;

-- Quitar la propia marca.
create or replace function public.quitar_reaccion(p_charla text, p_visitante uuid)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.reacciones where charla = p_charla and visitante = p_visitante;
$$;

grant execute on function public.me_hablo(text, uuid) to anon;
grant execute on function public.quitar_reaccion(text, uuid) to anon;

-- Conteo por charla: solo para quien administra (no se expone a la web).
create or replace view public.reacciones_por_charla as
  select charla, count(*) as personas, max(creado) as ultima
  from public.reacciones group by charla order by personas desc;

revoke all on public.reacciones_por_charla from anon, authenticated;
