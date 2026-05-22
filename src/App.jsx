import { useState, useMemo, useCallback, useRef } from "react";

/* ─── DESIGN TOKENS ──────────────────────────────────────────────────── */
const T = {
  bg0:"#0C0C0E", bg1:"#111114", bg2:"#17171C", bg3:"#1E1E25",
  border:"#2A2A35", gold:"#C9A96E", goldDim:"#8A6E42", goldBg:"#1E1A12",
  blue:"#4E9CFF", blueDim:"#1A3560", green:"#3ECF8E", greenDim:"#0F3D28",
  red:"#F05252", redDim:"#3D1515", amber:"#F0A952", amberDim:"#3D2A10",
  t1:"#F0EDE8", t2:"#8A8896", t3:"#4A4858",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body{height:100%;}
  body{background:${T.bg0};color:${T.t1};font-family:'DM Sans',sans-serif;}
  ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:${T.border};border-radius:4px;}
  input,select,textarea{background:${T.bg3};color:${T.t1};border:1px solid ${T.border};border-radius:8px;padding:9px 12px;font-size:13px;font-family:'DM Sans',sans-serif;width:100%;outline:none;transition:border-color .15s;}
  input:focus,select:focus,textarea:focus{border-color:${T.gold};}
  input::placeholder,textarea::placeholder{color:${T.t3};}
  select option{background:${T.bg3};}
  button{font-family:'DM Sans',sans-serif;cursor:pointer;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .fade{animation:fadeIn .2s ease;}
  @keyframes spin{to{transform:rotate(360deg)}}
  .spin{animation:spin 1s linear infinite;}
`;

/* ─── DADOS INICIAIS ─────────────────────────────────────────────────── */
const D_ATIVOS = [
  {id:1,nome:"Porsche 718 Boxster",tipo:"Veículo",   placa:"—",valor_diaria:1470,
   foto:"https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80"},
  {id:2,nome:"Lancha Coral 29 pés", tipo:"Embarcação",placa:"—",valor_diaria:3500,
   foto:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80"},
  {id:3,nome:"Helicóptero de Luxo", tipo:"Aeronave",  placa:"—",valor_diaria:8000,
   foto:"https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80"},
];

const D_CLIENTES = [
  {id:1, nome:"Ronie Marcovich",                    tel:"11 96351-7475",email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:2, nome:"Jonathan Vieira",                    tel:"11 97783-3635",email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:3, nome:"Vitor Alcaide",                      tel:"11 99887-4344",email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:4, nome:"Denise Pinhol",                      tel:"",             email:"",kyc:"Pendente", blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:5, nome:"Luis (Interno WBP)",                 tel:"",             email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:6, nome:"Gabriel Tavares",                    tel:"",             email:"",kyc:"Pendente", blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:7, nome:"Gabriel Giangola",                   tel:"",             email:"",kyc:"Pendente", blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:8, nome:"Daniel Ferreira",                    tel:"",             email:"",kyc:"Pendente", blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:9, nome:"John",                               tel:"",             email:"",kyc:"Pendente", blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:10,nome:"Roberto Colleti",                    tel:"",             email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  {id:11,nome:"Gabriel",                            tel:"11 93021-0562",email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""},
  // Novos — extraídos dos contratos
  {id:12,nome:"KRQU4TRO Soluções em Serviços Ltda", tel:"",             email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:"",cpf:"CNPJ 31.394.635/0001-44"},
  {id:13,nome:"Dyego Fernandes Ferrari de Souza",   tel:"",             email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:"",cpf:"303.819.428-05"},
  {id:14,nome:"Vitor Alcalde Llaguno Machado",      tel:"",             email:"",kyc:"Aprovado",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:"",cpf:"348.215.698-09"},
];

const D_RESERVAS = [
  {id:1, ativo_id:1,cliente_id:1, inicio:"2026-02-11",fim:"2026-02-11",valor:1470.00, status:"Concluída",  pagamento:"Paga",       forma_pag:"Pix",           analista:"",obs:""},
  {id:2, ativo_id:1,cliente_id:2, inicio:"2026-02-12",fim:"2026-02-12",valor:1393.20, status:"Concluída",  pagamento:"Paga",       forma_pag:"Cartão à vista", analista:"",obs:""},
  {id:3, ativo_id:1,cliente_id:1, inicio:"2026-02-13",fim:"2026-02-15",valor:2800.00, status:"Concluída",  pagamento:"Paga",       forma_pag:"Pix",           analista:"",obs:"3 diárias"},
  {id:4, ativo_id:1,cliente_id:3, inicio:"2026-02-20",fim:"2026-02-22",valor:3768.98, status:"Concluída",  pagamento:"Paga",       forma_pag:"Cartão 2x",     analista:"",obs:"3 diárias"},
  {id:5, ativo_id:1,cliente_id:4, inicio:"2026-02-27",fim:"2026-03-01",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:6, ativo_id:1,cliente_id:2, inicio:"2026-03-03",fim:"2026-03-03",valor:1548.00, status:"Concluída",  pagamento:"Paga",       forma_pag:"Cartão à vista", analista:"",obs:""},
  {id:7, ativo_id:1,cliente_id:1, inicio:"2026-03-04",fim:"2026-03-04",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:8, ativo_id:1,cliente_id:5, inicio:"2026-03-14",fim:"2026-03-14",valor:1500.00, status:"Concluída",  pagamento:"Paga",       forma_pag:"Interno WBP",   analista:"",obs:""},
  {id:9, ativo_id:1,cliente_id:6, inicio:"2026-03-18",fim:"2026-03-18",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:10,ativo_id:1,cliente_id:7, inicio:"2026-03-27",fim:"2026-03-29",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:11,ativo_id:1,cliente_id:8, inicio:"2026-04-03",fim:"2026-04-05",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:12,ativo_id:1,cliente_id:9, inicio:"2026-04-16",fim:"2026-04-17",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:13,ativo_id:1,cliente_id:9, inicio:"2026-04-20",fim:"2026-04-21",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:14,ativo_id:1,cliente_id:3, inicio:"2026-04-24",fim:"2026-04-26",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:15,ativo_id:1,cliente_id:9, inicio:"2026-04-30",fim:"2026-04-30",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:16,ativo_id:1,cliente_id:9, inicio:"2026-05-02",fim:"2026-05-03",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:17,ativo_id:1,cliente_id:9, inicio:"2026-05-08",fim:"2026-05-10",valor:0,       status:"Concluída",  pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:18,ativo_id:1,cliente_id:11,inicio:"2026-05-23",fim:"2026-05-23",valor:2349.90, status:"Concluída",  pagamento:"Paga",       forma_pag:"Pix",           analista:"",obs:"Retirada 10h → devolução 17h"},
  // ── Contratos novos ──────────────────────────────────────────────────────
  // Roberto — KRQU4TRO · contrato 09/05 11h → 10/05 10h · R$ 2.000
  {id:23,ativo_id:1,cliente_id:12,inicio:"2026-05-09",fim:"2026-05-10",valor:2000.00, status:"Concluída",  pagamento:"Paga",       forma_pag:"Pix",           analista:"",obs:"Retirada 11h → devolução 10h · caução R$ 12.000"},
  // Dyego · 14/05 13h → 15/05 13h · R$ 1.300
  {id:24,ativo_id:1,cliente_id:13,inicio:"2026-05-14",fim:"2026-05-15",valor:1300.00, status:"Concluída",  pagamento:"Paga",       forma_pag:"Pix",           analista:"",obs:"Retirada 13h → devolução 13h · condutor adicional: Regina Mayumi"},
  // Vitor Alcalde · 03/06 → 08/06 10h · R$ 7.800 · 5 diárias
  {id:25,ativo_id:1,cliente_id:14,inicio:"2026-06-03",fim:"2026-06-08",valor:7800.00, status:"Confirmada", pagamento:"Aguardando", forma_pag:"",              analista:"",obs:"5 diárias · retirada e entrega às 10h · caução R$ 12.000"},
  // Reservas futuras já agendadas (Roberto Colleti)
  {id:19,ativo_id:1,cliente_id:9, inicio:"2026-08-22",fim:"2026-08-23",valor:0,       status:"Confirmada", pagamento:"Aguardando", forma_pag:"",              analista:"",obs:""},
  {id:20,ativo_id:1,cliente_id:10,inicio:"2026-09-05",fim:"2026-09-07",valor:0,       status:"Confirmada", pagamento:"Aguardando", forma_pag:"",              analista:"",obs:"2 diárias"},
  {id:21,ativo_id:1,cliente_id:10,inicio:"2026-11-07",fim:"2026-11-09",valor:0,       status:"Confirmada", pagamento:"Aguardando", forma_pag:"",              analista:"",obs:"2 diárias"},
  {id:22,ativo_id:1,cliente_id:10,inicio:"2026-11-28",fim:"2026-11-29",valor:0,       status:"Confirmada", pagamento:"Aguardando", forma_pag:"",              analista:"",obs:"1 diária"},
];

// Contratos assinados — status "Assinado" para os que vieram com documento
const D_CONTRATOS = [
  {id:1, reserva_id:23,status:"Assinado",criado:"2026-05-09"},  // Roberto / KRQU4TRO
  {id:2, reserva_id:24,status:"Assinado",criado:"2026-05-14"},  // Dyego
  {id:3, reserva_id:25,status:"Assinado",criado:"2026-05-18"},  // Vitor Alcalde
];

const D_COMISSOES = [
  {id:1, reserva_id:1, analista:"WBP",valor:73.50,  status:"Gerada",data:"2026-02-11"},
  {id:2, reserva_id:2, analista:"WBP",valor:69.66,  status:"Gerada",data:"2026-02-12"},
  {id:3, reserva_id:3, analista:"WBP",valor:140.00, status:"Gerada",data:"2026-02-15"},
  {id:4, reserva_id:4, analista:"WBP",valor:188.45, status:"Gerada",data:"2026-02-22"},
  {id:5, reserva_id:6, analista:"WBP",valor:77.40,  status:"Gerada",data:"2026-03-03"},
  {id:6, reserva_id:8, analista:"WBP",valor:75.00,  status:"Gerada",data:"2026-03-14"},
  {id:7, reserva_id:18,analista:"WBP",valor:117.50, status:"Gerada",data:"2026-05-23"},
  {id:8, reserva_id:23,analista:"WBP",valor:100.00, status:"Gerada",data:"2026-05-09"},  // 5% de R$ 2.000
  {id:9, reserva_id:24,analista:"WBP",valor:65.00,  status:"Gerada",data:"2026-05-14"},  // 5% de R$ 1.300
];

const D_DESPESAS = [
  {id:1, data:"2026-05-19",cat:"IPVA",       desc:"IPVA Porsche 718 Boxster 2026 — Pix InfinitePay → Secretaria da Fazenda",valor:29282.57,ativo_id:1},
  {id:2, data:"2026-02-11",cat:"Entrada",    desc:"Reserva #1 — Ronie Marcovich · Pix",              valor:1470.00, ativo_id:1,reserva_id:1},
  {id:3, data:"2026-02-12",cat:"Entrada",    desc:"Reserva #2 — Jonathan Vieira · Cartão à vista",   valor:1393.20, ativo_id:1,reserva_id:2},
  {id:4, data:"2026-02-15",cat:"Entrada",    desc:"Reserva #3 — Ronie Marcovich · Pix 3 diárias",    valor:2800.00, ativo_id:1,reserva_id:3},
  {id:5, data:"2026-02-22",cat:"Entrada",    desc:"Reserva #4 — Vitor Alcaide · Cartão 2x",          valor:3768.98, ativo_id:1,reserva_id:4},
  {id:6, data:"2026-02-28",cat:"Seguro",     desc:"Seguro anual Porsche 718 Boxster",                 valor:9200.00, ativo_id:1},
  {id:7, data:"2026-03-03",cat:"Entrada",    desc:"Reserva #6 — Jonathan Vieira · Cartão",           valor:1548.00, ativo_id:1,reserva_id:6},
  {id:8, data:"2026-03-14",cat:"Entrada",    desc:"Reserva #8 — Luis Interno WBP",                   valor:1500.00, ativo_id:1,reserva_id:8},
  {id:9, data:"2026-03-20",cat:"Manutenção", desc:"Revisão 20.000 km — óleo e filtros",              valor:1850.00, ativo_id:1},
  {id:10,data:"2026-04-05",cat:"Combustível",desc:"Abastecimento — 60L gasolina aditivada",          valor:420.00,  ativo_id:1},
  {id:11,data:"2026-05-10",cat:"Limpeza",    desc:"Higienização interna e externa",                  valor:280.00,  ativo_id:1},
  {id:12,data:"2026-05-23",cat:"Entrada",    desc:"Reserva #18 — Gabriel · 1 diária Pix",           valor:2349.90, ativo_id:1,reserva_id:18},
  // Novas entradas dos contratos
  {id:13,data:"2026-05-09",cat:"Entrada",    desc:"Reserva #23 — KRQU4TRO (Roberto) · 09-10/05",    valor:2000.00, ativo_id:1,reserva_id:23},
  {id:14,data:"2026-05-14",cat:"Entrada",    desc:"Reserva #24 — Dyego Ferrari · 14-15/05",         valor:1300.00, ativo_id:1,reserva_id:24},
];

/* ─── UTILITÁRIOS ────────────────────────────────────────────────────── */
const today = () => new Date().toISOString().slice(0,10);
const fmtDate = iso => { if(!iso) return "—"; const [y,m,d]=iso.slice(0,10).split("-"); return `${d}/${m}/${y}`; };
const fmtPeriodo = (a,b) => {
  if(!a||!b) return "—";
  const [ay,am,ad]=a.slice(0,10).split("-"), [by,bm,bd]=b.slice(0,10).split("-");
  if(am===bm&&ay===by) return `${ad}/${am} → ${bd}/${bm}/${by}`;
  return `${ad}/${am} → ${bd}/${bm}/${by}`;
};
const fmt = v => `R$ ${Number(v).toLocaleString("pt-BR",{minimumFractionDigits:2})}`;
const initials = n => n.split(" ").slice(0,2).map(w=>w[0]||"").join("").toUpperCase();
const addMonths = (d,n) => { const x=new Date(d); x.setMonth(x.getMonth()+n); return x; };
const daysInMonth = (y,m) => new Date(y,m+1,0).getDate();
const isoDate = (y,m,d) => `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
const cnhVencida = cnh => cnh && new Date(cnh) < new Date();

function datesBetween(s,e) {
  const r=[], c=new Date(s), l=new Date(e);
  while(c<=l){r.push(c.toISOString().slice(0,10));c.setDate(c.getDate()+1);}
  return r;
}
function temConflito(reservas,ativo_id,inicio,fim,excluirId=null) {
  // Exclui o dia de devolução (disponível para nova retirada)
  const novas = datesBetween(inicio,fim).slice(0,-1);
  return reservas.find(r =>
    r.id !== excluirId &&
    r.ativo_id === Number(ativo_id) &&
    r.status !== "Cancelada" &&
    datesBetween(r.inicio,r.fim).slice(0,-1).some(d=>novas.includes(d))
  );
}
function statusAtivoDinamico(ativoId, reservas) {
  // Ativos estão sempre disponíveis para agendamento futuro.
  // O conflito de datas é tratado na criação da reserva.
  return "Disponível";
}
function scoreCliente(c, reservas) {
  let s=50;
  if(c.kyc==="Aprovado") s+=20;
  if(c.kyc==="Reprovado") s-=30;
  if(c.blacklist) s-=40;
  if(cnhVencida(c.cnh)) s-=15;
  s+=Math.min(reservas.filter(r=>r.cliente_id===c.id&&r.pagamento==="Paga").length*5,25);
  return Math.max(0,Math.min(100,s));
}

/* ─── PREÇOS HISTÓRICOS ──────────────────────────────────────────────── */
const HISTORICO = [
  {dias:1,ctx:"Dia útil",      forma:"Pix",           valor:1470.00,ref:"11/02"},
  {dias:1,ctx:"Dia útil",      forma:"Cartão à vista", valor:1393.20,ref:"12/02"},
  {dias:1,ctx:"Dia útil",      forma:"Cartão à vista", valor:1548.00,ref:"03/03"},
  {dias:1,ctx:"Dia útil",      forma:"Pix",            valor:2349.90,ref:"23/05"},
  {dias:1,ctx:"Fim de semana", forma:"Interno WBP",    valor:1500.00,ref:"14/03"},
  {dias:3,ctx:"Fim de semana", forma:"Pix",            valor:2800.00,ref:"13-15/02"},
  {dias:3,ctx:"Fim de semana", forma:"Cartão 2x",      valor:3768.98,ref:"20-22/02"},
];
const FORMAS_PAG = ["Pix","Cartão à vista","Cartão 2x","Cartão 3x","Cartão 4x","Cartão 5x","Cartão 6x","Interno WBP"];
const ACRESCIMO = {"Pix":0,"Cartão à vista":0,"Cartão 2x":0.05,"Cartão 3x":0.08,"Cartão 4x":0.10,"Cartão 5x":0.12,"Cartão 6x":0.15,"Interno WBP":0};
function isFDS(iso) { if(!iso) return false; const d=new Date(iso+"T12:00:00"); return [0,5,6].includes(d.getDay()); }
function sugerirValor(inicio,fim,forma) {
  if(!inicio||!fim) return null;
  const dias = Math.max(1,Math.round((new Date(fim)-new Date(inicio))/86400000)+1);
  const fds = isFDS(inicio);
  const ac = ACRESCIMO[forma]||0;
  const refs = HISTORICO.filter(h=>h.dias===dias&&(fds?h.ctx.includes("Fim"):h.ctx.includes("útil"))&&h.forma==="Pix");
  const base = refs.length?refs[0].valor:HISTORICO.filter(h=>h.dias===1&&h.forma==="Pix")[0].valor*dias;
  const ref = refs.length?refs[0].ref:"estimado";
  return {dias,fds,base,ref,ac,total:base*(1+ac)};
}

/* ─── VALIDAÇÃO CNH ──────────────────────────────────────────────────── */
function validarNumCNH(n) {
  const s=n.replace(/\D/g,"");
  if(s.length!==11) return {ok:false,msg:"Deve ter 11 dígitos"};
  if(/^(\d)\1{10}$/.test(s)) return {ok:false,msg:"Dígitos repetidos inválidos"};
  let sum=0; for(let i=0;i<9;i++) sum+=parseInt(s[i])*(9-i);
  let d1=sum%11; const carry=d1>=10?1:0; d1=d1>=10?0:d1;
  sum=0; for(let i=0;i<9;i++) sum+=parseInt(s[i])*(1+i);
  let d2=(sum%11)-carry; if(d2<0) d2+=11; d2=d2>=10?0:d2;
  if(parseInt(s[9])!==d1||parseInt(s[10])!==d2) return {ok:false,msg:"Dígitos verificadores inválidos"};
  return {ok:true,msg:"Número válido ✓"};
}
function validarVencCNH(val,nasc) {
  if(!val) return {ok:false,msg:"Validade obrigatória"};
  const hoje=new Date(), v=new Date(val);
  if(v<hoje) return {ok:false,nivel:"erro",msg:`Vencida em ${fmtDate(val)}`};
  const dias=Math.round((v-hoje)/86400000);
  if(dias<=30) return {ok:true,nivel:"alerta",msg:`Vence em ${dias} dias — renovar urgente`};
  if(dias<=90) return {ok:true,nivel:"alerta",msg:`Vence em ${dias} dias`};
  if(nasc) {
    const idade=Math.floor((hoje-new Date(nasc))/(365.25*86400000));
    const anos=dias/365;
    if(idade>=70&&anos>1) return {ok:true,nivel:"alerta",msg:"Prazo max +70 anos é 1 ano"};
    if(idade>=50&&idade<70&&anos>3) return {ok:true,nivel:"alerta",msg:"Prazo max 50-70 anos é 3 anos"};
  }
  return {ok:true,nivel:"ok",msg:`Válida — ${dias} dias restantes`};
}

/* ─── COMPONENTES BASE ───────────────────────────────────────────────── */
const BADGE_MAP = {
  Disponível:[T.green,T.greenDim], Aprovado:[T.green,T.greenDim], Confirmada:[T.green,T.greenDim],
  Paga:[T.green,T.greenDim], Concluída:[T.green,T.greenDim], Gerada:[T.green,T.greenDim], Assinado:[T.green,T.greenDim],
  Pendente:[T.amber,T.amberDim], Aguardando:[T.amber,T.amberDim], Rascunho:[T.amber,T.amberDim],
  "Em Andamento":[T.blue,T.blueDim], Reservado:[T.blue,T.blueDim],
  Reprovado:[T.red,T.redDim], Cancelada:[T.red,T.redDim], Manutenção:[T.amber,T.amberDim],
  "Validada localmente":[T.green,T.greenDim],
};
function Badge({s}){ const [c,b]=BADGE_MAP[s]||[T.t2,T.bg3]; return <span style={{color:c,background:b,border:`1px solid ${c}22`,borderRadius:6,padding:"2px 9px",fontSize:11,fontWeight:500,whiteSpace:"nowrap"}}>{s}</span>; }
function Card({children,style,glow}){ return <div style={{background:T.bg2,border:`1px solid ${glow?T.gold+"55":T.border}`,borderRadius:14,padding:"1.25rem 1.5rem",boxShadow:glow?`0 0 20px ${T.gold}15`:"none",...style}}>{children}</div>; }
function Metric({label,value,sub,accent,icon}){
  return <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"1.25rem 1.5rem",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:accent||T.gold,borderRadius:"14px 0 0 14px"}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <p style={{fontSize:11,color:T.t2,letterSpacing:"0.08em",textTransform:"uppercase",margin:"0 0 8px"}}>{label}</p>
        <p style={{fontSize:24,fontWeight:300,color:T.t1,margin:0,fontFamily:"'DM Serif Display',serif"}}>{value}</p>
        {sub&&<p style={{fontSize:11,color:T.t3,margin:"4px 0 0"}}>{sub}</p>}
      </div>
      {icon&&<i className={`ti ${icon}`} style={{fontSize:20,color:accent||T.gold,opacity:.7}} aria-hidden="true"/>}
    </div>
  </div>;
}
function SecTitle({children}){
  return <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
    <span style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:T.t1,fontWeight:400}}>{children}</span>
    <div style={{flex:1,height:1,background:`linear-gradient(to right,${T.border},transparent)`}}/>
  </div>;
}
function BtnP({children,onClick,disabled,style}){
  return <button onClick={onClick} disabled={disabled} style={{background:`linear-gradient(135deg,${T.gold},${T.goldDim})`,color:"#0C0C0E",border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:7,opacity:disabled?.5:1,letterSpacing:".01em",...style}}
    onMouseEnter={e=>!disabled&&(e.currentTarget.style.opacity=".85")} onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>{children}</button>;
}
function BtnG({children,onClick,style}){
  return <button onClick={onClick} style={{background:"transparent",color:T.t2,border:`1px solid ${T.border}`,borderRadius:7,padding:"5px 12px",fontSize:12,display:"inline-flex",alignItems:"center",gap:5,...style}}
    onMouseEnter={e=>{e.currentTarget.style.borderColor=T.gold;e.currentTarget.style.color=T.gold;}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.t2;}}>{children}</button>;
}
function Avatar({nome,size=36}){
  return <div style={{width:size,height:size,borderRadius:"50%",background:T.goldBg,border:`1px solid ${T.gold}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.34,fontWeight:500,color:T.gold,flexShrink:0}}>{initials(nome)}</div>;
}
function ScoreBar({score}){
  const c=score>=70?T.green:score>=40?T.amber:T.red;
  return <div style={{display:"flex",alignItems:"center",gap:10}}>
    <div style={{flex:1,height:4,background:T.bg3,borderRadius:4,overflow:"hidden"}}>
      <div style={{width:`${score}%`,height:"100%",background:c,borderRadius:4,transition:"width .5s"}}/>
    </div>
    <span style={{fontSize:12,fontWeight:500,color:c,minWidth:28,textAlign:"right"}}>{score}</span>
  </div>;
}
function Ciclo({status}){
  const steps=[
    {label:"Pendente",    color:T.amber, icon:"ti-clock"},
    {label:"Confirmada",  color:T.blue,  icon:"ti-circle-check"},
    {label:"Em Andamento",color:T.green, icon:"ti-car"},
    {label:"Concluída",   color:T.t3,    icon:"ti-flag"},
  ];
  const idx=steps.findIndex(s=>s.label===status);
  return <div style={{display:"flex",alignItems:"center",marginTop:12,gap:0}}>
    {steps.map((e,i)=>{
      const ativo=i<=idx, atual=i===idx;
      const cor=atual?e.color:ativo?T.t3:T.border;
      return <div key={e.label} style={{display:"flex",alignItems:"center",flex:i<steps.length-1?1:"none"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{
            width:atual?28:22, height:atual?28:22, borderRadius:"50%",
            background:atual?e.color:ativo?`${e.color}22`:"transparent",
            border:`1.5px solid ${atual?e.color:ativo?e.color:T.border}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:atual?`0 0 10px ${e.color}66`:"none",
            transition:"all .25s",flexShrink:0,
          }}>
            <i className={`ti ${e.icon}`} style={{fontSize:atual?13:11,color:atual?"#0C0C0E":ativo?e.color:T.border}} aria-hidden="true"/>
          </div>
          <span style={{fontSize:9,color:atual?e.color:ativo?T.t2:T.t3,marginTop:4,whiteSpace:"nowrap",letterSpacing:".04em",textTransform:"uppercase",fontWeight:atual?500:400}}>{e.label}</span>
        </div>
        {i<steps.length-1&&<div style={{flex:1,height:1.5,background:i<idx?steps[i].color:T.border,margin:"0 4px",marginBottom:16,transition:"background .25s"}}/>}
      </div>;
    })}
  </div>;
}
function Empty({icon,msg}){ return <div style={{textAlign:"center",padding:"3rem 1rem",color:T.t3}}><i className={`ti ${icon}`} style={{fontSize:36,display:"block",marginBottom:10}} aria-hidden="true"/><p style={{margin:0,fontSize:13}}>{msg}</p></div>; }

/* ─── MODAL BASE ─────────────────────────────────────────────────────── */
function Modal({title,onClose,onSave,children,saveLabel="Salvar"}){
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)"}}>
    <div className="fade" style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,padding:"1.75rem",width:460,maxWidth:"94vw",maxHeight:"88vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,fontWeight:400,color:T.t1}}>{title}</h3>
        <button onClick={onClose} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:6,width:28,height:28,color:T.t2,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
      </div>
      {children}
      <div style={{display:"flex",gap:8,marginTop:18}}>
        <button onClick={onClose} style={{flex:1,padding:"9px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",cursor:"pointer",color:T.t2,fontSize:13}}>Cancelar</button>
        <BtnP onClick={onSave} style={{flex:1,justifyContent:"center"}}>{saveLabel}</BtnP>
      </div>
    </div>
  </div>;
}

/* ─── INPUTS REUTILIZÁVEIS ───────────────────────────────────────────── */
const INP = {width:"100%",boxSizing:"border-box",marginBottom:10};
const LBL = {display:"block",fontSize:11,color:T.t3,letterSpacing:".06em",textTransform:"uppercase",marginBottom:5};
function F({label,children}){ return <div><label style={LBL}>{label}</label>{children}</div>; }
function FRow({children,cols="1fr 1fr",gap=10}){ return <div style={{display:"grid",gridTemplateColumns:cols,gap,marginBottom:2}}>{children}</div>; }

/* ─── CALENDÁRIO ─────────────────────────────────────────────────────── */
function Calendario({reservas,ativoFiltro,onDiaClick,diaSelecionado,onMesChange}){
  const hoje=new Date();
  const [mes,setMes]=useState(new Date(hoje.getFullYear(),hoje.getMonth(),1));
  const year=mes.getFullYear(),month=mes.getMonth();
  const total=daysInMonth(year,month),first=new Date(year,month,1).getDay();
  const ocupados=useMemo(()=>{
    const m={};
    reservas.forEach(r=>{
      if(ativoFiltro&&r.ativo_id!==ativoFiltro) return;
      if(r.status==="Cancelada") return;
      datesBetween(r.inicio,r.fim).forEach(d=>{if(!m[d])m[d]=[];m[d].push(r);});
    });
    return m;
  },[reservas,ativoFiltro]);
  const WD=["D","S","T","Q","Q","S","S"];
  const h0=hoje.toISOString().slice(0,10);
  const mesISO=`${year}-${String(month+1).padStart(2,"0")}`;

  function navMes(n){ const novo=addMonths(mes,n); setMes(novo); onMesChange&&onMesChange(`${novo.getFullYear()}-${String(novo.getMonth()+1).padStart(2,"0")}`); }

  return <div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
      <button onClick={()=>navMes(-1)} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:6,padding:"4px 10px",color:T.t2,fontSize:14}}>‹</button>
      <span style={{fontSize:13,color:T.t1,fontWeight:500,letterSpacing:".04em"}}>{mes.toLocaleDateString("pt-BR",{month:"long",year:"numeric"}).toUpperCase()}</span>
      <button onClick={()=>navMes(1)} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:6,padding:"4px 10px",color:T.t2,fontSize:14}}>›</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
      {WD.map((w,i)=><div key={i} style={{textAlign:"center",fontSize:10,color:T.t3,paddingBottom:4}}>{w}</div>)}
      {Array.from({length:first}).map((_,i)=><div key={`e${i}`}/>)}
      {Array.from({length:total}).map((_,i)=>{
        const d=i+1,iso=isoDate(year,month,d),res=ocupados[iso]||[],ehHoje=iso===h0,ocup=res.length>0;
        const sel=diaSelecionado===iso;
        return <div key={d}
          onClick={()=>ocup&&onDiaClick&&onDiaClick(iso,res)}
          title={ocup?`${res.length} reserva(s) — clique para ver`:"Livre"}
          style={{textAlign:"center",padding:"5px 2px",borderRadius:6,fontSize:12,
            cursor:ocup?"pointer":"default",
            background:sel?T.gold:ocup?T.goldBg:ehHoje?T.bg3:"transparent",
            color:sel?"#0C0C0E":ocup?T.gold:ehHoje?T.t1:T.t2,
            border:sel?`1px solid ${T.gold}`:ehHoje?`1px solid ${T.gold}55`:"1px solid transparent",
            fontWeight:sel||ehHoje?500:400, transition:"all .12s",
            transform:ocup&&!sel?"":"none"}}>
          {d}
          {ocup&&!sel&&<div style={{width:4,height:4,borderRadius:"50%",background:T.gold,margin:"2px auto 0"}}/>}
        </div>;
      })}
    </div>
    <div style={{display:"flex",gap:12,marginTop:10}}>
      <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:T.goldBg,border:`1px solid ${T.gold}`}}/><span style={{fontSize:10,color:T.t3}}>OCUPADO</span></div>
      <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:T.bg3,border:`1px solid ${T.border}`}}/><span style={{fontSize:10,color:T.t3}}>LIVRE</span></div>
      {diaSelecionado&&<div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:2,background:T.gold}}/><span style={{fontSize:10,color:T.t3}}>SELECIONADO</span></div>}
    </div>
  </div>;
}

/* ─── GRÁFICO RECEITA ────────────────────────────────────────────────── */
function GraficoReceita({reservas}){
  const meses=useMemo(()=>{
    const m={};
    reservas.filter(r=>r.pagamento==="Paga"&&r.valor>0).forEach(r=>{const k=r.inicio.slice(0,7);m[k]=(m[k]||0)+r.valor;});
    return Object.entries(m).sort(([a],[b])=>a.localeCompare(b)).slice(-6);
  },[reservas]);
  if(!meses.length) return <p style={{fontSize:13,color:T.t3,textAlign:"center",padding:"1.5rem"}}>Nenhuma receita registrada.</p>;
  const max=Math.max(...meses.map(([,v])=>v));
  return <div style={{display:"flex",alignItems:"flex-end",gap:8,height:90}}>
    {meses.map(([m,v])=>{
      const h=Math.max(4,Math.round((v/max)*72));
      const label=new Date(m+"-02").toLocaleDateString("pt-BR",{month:"short"});
      return <div key={m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}} title={fmt(v)}>
        <span style={{fontSize:9,color:T.t3}}>{(v/1000).toFixed(0)}k</span>
        <div style={{width:"100%",height:h,background:`linear-gradient(180deg,${T.gold},${T.goldDim})`,borderRadius:"4px 4px 0 0"}}/>
        <span style={{fontSize:9,color:T.t3,textTransform:"uppercase"}}>{label}</span>
      </div>;
    })}
  </div>;
}

/* ─── DOSSIÊ CLIENTE ─────────────────────────────────────────────────── */
function Dossie({c,reservas,vistorias,contratos,ativos,onClose}){
  const res=reservas.filter(r=>r.cliente_id===c.id);
  const score=scoreCliente(c,reservas);
  const totalPago=res.filter(r=>r.pagamento==="Paga").reduce((s,r)=>s+r.valor,0);

  const [serasaLoad,setSerasaLoad]=useState(false);
  const [serasaRes,setSerasaRes]=useState(null);

  async function consultarSerasa(){
    if(!c.cpf){ setSerasaRes({erro:"CPF não cadastrado para este cliente. Edite o cadastro e adicione o CPF."}); return; }
    setSerasaLoad(true); setSerasaRes(null);
    // Serasa Experian API — exige credenciamento em https://developer.serasaexperian.com.br
    // Endpoint: POST /consumers/v1/credit-report  |  Auth: OAuth2 Bearer
    // Mockando resposta pois requer token OAuth da Serasa
    await new Promise(r=>setTimeout(r,1400));
    setSerasaRes({
      mock:true,
      score:682,
      nivel:"Bom",
      probabilidade_inadimplencia:"12%",
      restricoes:0,
      pendencias:0,
      cheques_sem_fundo:0,
      protestos:0,
      nota:"Serasa Score retornado em ambiente de demonstração. Configure o token OAuth da Serasa Experian para consultas reais.",
    });
    setSerasaLoad(false);
  }

  const scoreColor=score>=70?T.green:score>=40?T.amber:T.red;

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.82)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,backdropFilter:"blur(6px)"}}>
    <div className="fade" style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,padding:"1.75rem",width:600,maxWidth:"96vw",maxHeight:"90vh",overflowY:"auto"}}>

      {/* header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          <Avatar nome={c.nome} size={52}/>
          <div>
            <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,fontWeight:400,color:T.t1,margin:0}}>{c.nome}</h3>
            <p style={{fontSize:13,color:T.t2,margin:"4px 0 0"}}>{c.tel||"—"}{c.email?` · ${c.email}`:""}</p>
            {c.cpf&&<p style={{fontSize:12,color:T.t3,margin:"2px 0 0"}}>CPF: {c.cpf}</p>}
          </div>
        </div>
        <button onClick={onClose} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:6,width:30,height:30,color:T.t2,fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>×</button>
      </div>

      {/* métricas — 3 colunas fixas, sem overflow */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:16}}>
        {[
          {label:"Reservas",value:res.length,accent:T.gold,icon:"ti-clipboard-list"},
          {label:"Total locado",value:`R$ ${(totalPago/1000).toFixed(1)}k`,accent:T.blue,icon:"ti-trending-up"},
          {label:"Score interno",value:`${score}/100`,accent:scoreColor,icon:"ti-shield"},
        ].map(m=><div key={m.label} style={{background:T.bg3,borderRadius:10,padding:"12px 14px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:m.accent,borderRadius:"10px 0 0 10px"}}/>
          <p style={{margin:"0 0 5px",fontSize:10,color:T.t2,letterSpacing:".08em",textTransform:"uppercase"}}>{m.label}</p>
          <p style={{margin:0,fontSize:20,fontWeight:300,color:m.accent,fontFamily:"'DM Serif Display',serif"}}>{m.value}</p>
          <i className={`ti ${m.icon}`} style={{position:"absolute",right:10,top:10,fontSize:18,color:m.accent,opacity:.25}} aria-hidden="true"/>
        </div>)}
      </div>

      {/* score bar interno */}
      <div style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <span style={{fontSize:11,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Score de risco interno</span>
          <span style={{fontSize:11,color:scoreColor,fontWeight:500}}>{score>=70?"Baixo risco":score>=40?"Risco médio":"Alto risco"}</span>
        </div>
        <ScoreBar score={score}/>
      </div>

      {/* status badges */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18}}>
        <Badge s={c.blacklist?"Reprovado":c.kyc}/>
        {cnhVencida(c.cnh)&&<Badge s="Cancelada"/>}
        {c.cnh&&<span style={{fontSize:11,color:T.t3,background:T.bg3,borderRadius:6,padding:"2px 9px"}}>CNH: {fmtDate(c.cnh)}{cnhVencida(c.cnh)?" ⚠":""}</span>}
        {c.cnh_status&&c.cnh_status!=="Pendente"&&<Badge s={c.cnh_status}/>}
      </div>

      {/* bloco Serasa */}
      <div style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px",marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:serasaRes?12:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:28,height:28,borderRadius:6,background:"#E01B24",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:11,fontWeight:700,color:"#fff",letterSpacing:-.5}}>Se</span>
            </div>
            <div>
              <p style={{margin:0,fontSize:13,fontWeight:500,color:T.t1}}>Serasa Experian</p>
              <p style={{margin:0,fontSize:11,color:T.t3}}>Consulta de score e restrições</p>
            </div>
          </div>
          <BtnG onClick={consultarSerasa} style={{flexShrink:0}}>
            {serasaLoad?<><i className="ti ti-loader-2 spin" aria-hidden="true"/>Consultando...</>:<><i className="ti ti-search" aria-hidden="true"/>Consultar</>}
          </BtnG>
        </div>

        {serasaRes&&!serasaRes.erro&&<div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            <div style={{background:T.bg2,borderRadius:8,padding:"10px 12px"}}>
              <p style={{margin:"0 0 3px",fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Score Serasa</p>
              <p style={{margin:0,fontSize:20,fontWeight:400,fontFamily:"'DM Serif Display',serif",color:serasaRes.score>=700?T.green:serasaRes.score>=500?T.amber:T.red}}>{serasaRes.score}</p>
              <p style={{margin:"2px 0 0",fontSize:11,color:T.t2}}>{serasaRes.nivel} · Inadimplência: {serasaRes.probabilidade_inadimplencia}</p>
            </div>
            <div style={{background:T.bg2,borderRadius:8,padding:"10px 12px"}}>
              <p style={{margin:"0 0 6px",fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Restrições</p>
              {[["Pendências",serasaRes.pendencias],["Protestos",serasaRes.protestos],["Cheques",serasaRes.cheques_sem_fundo]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.t2,marginBottom:2}}>
                <span>{k}</span><span style={{color:v>0?T.red:T.green,fontWeight:500}}>{v>0?v:"✓"}</span>
              </div>)}
            </div>
          </div>
          {serasaRes.mock&&<p style={{margin:0,fontSize:10,color:T.t3,fontStyle:"italic"}}><i className="ti ti-info-circle" style={{marginRight:4}} aria-hidden="true"/>{serasaRes.nota}</p>}
        </div>}
        {serasaRes?.erro&&<p style={{margin:"10px 0 0",fontSize:12,color:T.amber}}><i className="ti ti-alert-triangle" style={{marginRight:6}} aria-hidden="true"/>{serasaRes.erro}</p>}
        {!serasaRes&&!serasaLoad&&<p style={{margin:"8px 0 0",fontSize:11,color:T.t3}}>Configure o token OAuth em <a href="https://developer.serasaexperian.com.br" target="_blank" rel="noreferrer" style={{color:T.gold}}>developer.serasaexperian.com.br</a> para consultas reais.</p>}
      </div>

      {/* histórico */}
      <p style={{...LBL,marginBottom:10}}>Histórico de reservas</p>
      {res.length===0?<p style={{fontSize:13,color:T.t3,margin:0}}>Nenhuma reserva registrada.</p>:res.sort((a,b)=>b.inicio.localeCompare(a.inicio)).map(r=>{
        const a=ativos.find(x=>x.id===r.ativo_id);
        const ct=contratos.find(x=>x.reserva_id===r.id);
        const vs=vistorias.filter(x=>x.reserva_id===r.id);
        const barCor={Pendente:T.amber,Confirmada:T.blue,"Em Andamento":T.green,Concluída:T.t3,Cancelada:T.red}[r.status]||T.border;
        return <div key={r.id} style={{border:`1px solid ${T.border}`,borderRadius:10,padding:"12px 14px",marginBottom:8,background:T.bg3,display:"flex",gap:10,alignItems:"flex-start"}}>
          <div style={{width:3,borderRadius:2,background:barCor,alignSelf:"stretch",flexShrink:0}}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,marginBottom:4}}>
              <p style={{margin:0,fontSize:13,fontWeight:500,color:T.t1}}>{a?.nome} · #{r.id}</p>
              <div style={{display:"flex",gap:4}}><Badge s={r.status}/><Badge s={r.pagamento}/></div>
            </div>
            <p style={{margin:"0 0 4px",fontSize:12,color:T.t2}}>{fmtPeriodo(r.inicio,r.fim)}{r.valor>0?` · ${fmt(r.valor)}`:""}</p>
            <div style={{display:"flex",gap:10,fontSize:11,color:T.t3}}>
              {ct&&<span>Contrato: {ct.status}</span>}
              {vs.length>0&&<span>Vistorias: {vs.map(x=>x.tipo).join(", ")}</span>}
              {r.forma_pag&&<span>{r.forma_pag}</span>}
            </div>
          </div>
        </div>;
      })}
    </div>
  </div>;
}

/* ─── MODAL CLIENTE COM VALIDAÇÃO CNH ───────────────────────────────── */
function ModalCliente({fCl,setFCl,onClose,onSave}){
  const [aba,setAba]=useState("manual");
  const [numCNH,setNumCNH]=useState(fCl.cnh_numero||"");
  const [catCNH,setCatCNH]=useState(fCl.cnh_cat||"B");
  const [nasc,setNasc]=useState(fCl.nascimento||"");
  const [ocrLoad,setOcrLoad]=useState(false);
  const [ocrErr,setOcrErr]=useState("");

  const vNum=numCNH.replace(/\D/g,"").length===11?validarNumCNH(numCNH):null;
  const vVenc=fCl.cnh?validarVencCNH(fCl.cnh,nasc):null;
  const catOk=["A","B","C","D","E","AB","AC","AD","AE","ACC"].includes(catCNH.toUpperCase());
  const tudo=vNum?.ok&&vVenc?.ok&&catOk;

  function StatusLine({v}){
    if(!v) return null;
    const cor=v.ok?(v.nivel==="alerta"?T.amber:T.green):T.red;
    return <div style={{display:"flex",alignItems:"center",gap:5,marginTop:3}}>
      <i className={`ti ${v.ok?(v.nivel==="alerta"?"ti-alert-triangle":"ti-circle-check"):"ti-circle-x"}`} style={{fontSize:13,color:cor}} aria-hidden="true"/>
      <span style={{fontSize:11,color:cor}}>{v.msg}</span>
    </div>;
  }

  async function handleOCR(e){
    const file=e.target.files[0]; if(!file) return;
    setOcrLoad(true); setOcrErr("");
    try{
      const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file);});
      const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:500,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:file.type,data:b64}},{type:"text",text:'Extraia dados desta CNH brasileira. Retorne APENAS JSON sem markdown: {"nome":"","numero_cnh":"","categoria":"","validade":"YYYY-MM-DD","nascimento":"YYYY-MM-DD","cpf":""}. Use null se não visível.'}]}]})});
      const data=await resp.json();
      const text=data.content?.map(b=>b.text).join("")||"";
      const parsed=JSON.parse(text.replace(/```json|```/g,"").trim());
      if(parsed.nome) setFCl(f=>({...f,nome:parsed.nome}));
      if(parsed.numero_cnh) setNumCNH(parsed.numero_cnh);
      if(parsed.categoria) setCatCNH(parsed.categoria);
      if(parsed.validade) setFCl(f=>({...f,cnh:parsed.validade}));
      if(parsed.nascimento) setNasc(parsed.nascimento);
      if(parsed.cpf) setFCl(f=>({...f,cpf:parsed.cpf}));
      setAba("manual");
    }catch(err){setOcrErr("Não foi possível extrair. Tente foto mais nítida.");}
    setOcrLoad(false);
  }

  function salvar(){
    setFCl(f=>({...f,cnh_numero:numCNH.replace(/\D/g,""),cnh_cat:catCNH,nascimento:nasc,cnh_status:tudo?"Validada localmente":"Pendente"}));
    setTimeout(onSave,0);
  }

  const abas=[{id:"manual",label:"Manual",icon:"ti-forms"},{id:"ocr",label:"Foto CNH (IA)",icon:"ti-camera"}];
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)"}}>
    <div className="fade" style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,padding:"1.75rem",width:520,maxWidth:"94vw",maxHeight:"92vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,fontWeight:400,color:T.t1}}>Cadastrar cliente</h3>
        <button onClick={onClose} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:6,width:28,height:28,color:T.t2,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
      </div>
      {/* dados básicos */}
      <FRow><F label="Nome completo"><input style={INP} value={fCl.nome} onChange={e=>setFCl({...fCl,nome:e.target.value})} placeholder="Nome completo"/></F>
        <F label="Telefone / WhatsApp"><input style={INP} value={fCl.tel||""} onChange={e=>setFCl({...fCl,tel:e.target.value})} placeholder="11 99999-0000"/></F></FRow>
      <F label="E-mail"><input type="email" style={{...INP,marginBottom:14}} value={fCl.email} onChange={e=>setFCl({...fCl,email:e.target.value})} placeholder="cliente@email.com"/></F>
      <div style={{borderTop:`1px solid ${T.border}`,margin:"4px 0 14px"}}/>
      <p style={{...LBL,color:T.gold,marginBottom:12}}><i className="ti ti-id" style={{marginRight:6}} aria-hidden="true"/>Validação de CNH</p>
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {abas.map(a=><button key={a.id} onClick={()=>setAba(a.id)} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 12px",borderRadius:8,border:`1px solid ${aba===a.id?T.gold:T.border}`,background:aba===a.id?T.goldBg:"transparent",color:aba===a.id?T.gold:T.t2,fontSize:12,cursor:"pointer"}}>
          <i className={`ti ${a.icon}`} aria-hidden="true"/>{a.label}
        </button>)}
      </div>
      {aba==="manual"&&<>
        <FRow>
          <F label="Número CNH (11 dígitos)">
            <input style={{...INP,borderColor:vNum?(vNum.ok?T.green:T.red):T.border}} value={numCNH} onChange={e=>setNumCNH(e.target.value.replace(/\D/g,"").slice(0,11))} placeholder="00000000000" maxLength={11}/>
            <StatusLine v={vNum}/>
          </F>
          <F label="Categoria">
            <select style={{...INP,borderColor:catOk?T.green:T.border}} value={catCNH} onChange={e=>setCatCNH(e.target.value)}>
              {["A","B","C","D","E","AB","AC","AD","AE","ACC"].map(c=><option key={c}>{c}</option>)}
            </select>
          </F>
        </FRow>
        <FRow>
          <F label="Validade da CNH">
            <input type="date" style={{...INP,borderColor:vVenc?(vVenc.ok?(vVenc.nivel==="alerta"?T.amber:T.green):T.red):T.border}} value={fCl.cnh} onChange={e=>setFCl({...fCl,cnh:e.target.value})}/>
            <StatusLine v={vVenc}/>
          </F>
          <F label="Data de nascimento"><input type="date" style={INP} value={nasc} onChange={e=>setNasc(e.target.value)}/></F>
        </FRow>
        <F label="CPF (opcional)"><input style={INP} value={fCl.cpf||""} onChange={e=>setFCl({...fCl,cpf:e.target.value})} placeholder="000.000.000-00"/></F>
        {tudo&&<div style={{background:T.greenDim,border:`1px solid ${T.green}44`,borderRadius:8,padding:"8px 12px",marginTop:4,display:"flex",alignItems:"center",gap:8}}>
          <i className="ti ti-shield-check" style={{color:T.green,fontSize:16}} aria-hidden="true"/>
          <span style={{fontSize:12,color:T.green,fontWeight:500}}>CNH válida — pronto para aprovação de KYC</span>
        </div>}
      </>}
      {aba==="ocr"&&<>
        <div style={{background:T.bg3,border:`1px dashed ${T.gold}55`,borderRadius:10,padding:"1.5rem",textAlign:"center",marginBottom:12}}>
          <i className="ti ti-camera" style={{fontSize:32,color:T.gold,display:"block",marginBottom:8}} aria-hidden="true"/>
          <p style={{fontSize:13,color:T.t2,marginBottom:12}}>Foto da CNH → IA extrai nome, número, categoria e validade.</p>
          <label style={{display:"inline-flex",alignItems:"center",gap:8,padding:"9px 18px",background:`linear-gradient(135deg,${T.gold},${T.goldDim})`,color:"#0C0C0E",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:500}}>
            <i className="ti ti-upload" aria-hidden="true"/>{ocrLoad?"Processando...":"Selecionar foto"}
            <input type="file" accept="image/*" style={{display:"none"}} onChange={handleOCR} disabled={ocrLoad}/>
          </label>
        </div>
        {ocrErr&&<p style={{fontSize:12,color:T.red,marginBottom:8}}>{ocrErr}</p>}
        <p style={{fontSize:11,color:T.t3}}>Após extrair, confira os dados na aba Manual antes de salvar.</p>
      </>}
      <div style={{display:"flex",gap:8,marginTop:18}}>
        <button onClick={onClose} style={{flex:1,padding:"9px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",cursor:"pointer",color:T.t2,fontSize:13}}>Cancelar</button>
        <BtnP onClick={salvar} style={{flex:1,justifyContent:"center"}}>{fCl.nome?`Salvar — ${fCl.nome.split(" ")[0]}`:"Salvar cliente"}</BtnP>
      </div>
    </div>
  </div>;
}

/* ─── MODAL RESERVA COM CALCULADOR ──────────────────────────────────── */
function ModalReserva({fRe,setFRe,clientes,ativos,reservas,erroRe,onClose,onSave}){
  const [forma,setForma]=useState(fRe.forma_pag||"Pix");
  const [manual,setManual]=useState("");
  const [editado,setEditado]=useState(false);

  const dias=fRe.inicio&&fRe.fim?Math.max(1,Math.round((new Date(fRe.fim)-new Date(fRe.inicio))/86400000)+1):0;
  const sug=sugerirValor(fRe.inicio,fRe.fim,forma);
  const valorFinal=editado?parseFloat(manual)||0:sug?sug.total:0;

  function salvar(){
    setFRe(f=>({...f,valor:valorFinal,forma_pag:forma}));
    setTimeout(onSave,0);
  }

  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(4px)"}}>
    <div className="fade" style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,padding:"1.75rem",width:560,maxWidth:"95vw",maxHeight:"90vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <h3 style={{fontFamily:"'DM Serif Display',serif",fontSize:20,fontWeight:400,color:T.t1}}>Criar reserva</h3>
        <button onClick={onClose} style={{background:T.bg3,border:`1px solid ${T.border}`,borderRadius:6,width:28,height:28,color:T.t2,fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
      </div>
      {erroRe&&<div style={{background:T.redDim,color:T.red,border:`1px solid ${T.red}44`,borderRadius:8,padding:"9px 12px",fontSize:13,marginBottom:14}}>{erroRe}</div>}
      <FRow>
        <F label="Ativo">
          <select style={INP} value={fRe.ativo_id} onChange={e=>setFRe({...fRe,ativo_id:e.target.value})}>
            <option value="">Selecione...</option>
            {ativos.filter(a=>statusAtivoDinamico(a.id,reservas)==="Disponível").map(a=><option key={a.id} value={a.id}>{a.nome}</option>)}
          </select>
        </F>
        <F label="Cliente (KYC aprovado)">
          <select style={INP} value={fRe.cliente_id} onChange={e=>setFRe({...fRe,cliente_id:e.target.value})}>
            <option value="">Selecione...</option>
            {clientes.filter(c=>c.kyc==="Aprovado"&&!c.blacklist).map(c=><option key={c.id} value={c.id}>{c.nome}{cnhVencida(c.cnh)?" ⚠️":""}</option>)}
          </select>
        </F>
      </FRow>
      <FRow>
        <F label="Data de retirada"><input type="date" style={INP} value={fRe.inicio} onChange={e=>{setFRe({...fRe,inicio:e.target.value});setEditado(false);}}/></F>
        <F label="Data de devolução"><input type="date" style={INP} value={fRe.fim} onChange={e=>{setFRe({...fRe,fim:e.target.value});setEditado(false);}}/></F>
      </FRow>
      <F label="Forma de pagamento">
        <select style={INP} value={forma} onChange={e=>{setForma(e.target.value);setEditado(false);}}>
          {FORMAS_PAG.map(f=><option key={f}>{f}</option>)}
        </select>
      </F>
      <F label="Analista responsável"><input style={{...INP,marginBottom:14}} value={fRe.analista} onChange={e=>setFRe({...fRe,analista:e.target.value})} placeholder="Nome do analista"/></F>
      <F label="Observação (opcional)"><input style={{...INP,marginBottom:14}} value={fRe.obs||""} onChange={e=>setFRe({...fRe,obs:e.target.value})} placeholder="Ex.: cliente retira às 10h"/></F>

      {sug&&fRe.inicio&&fRe.fim&&<div style={{background:T.bg3,border:`1px solid ${T.gold}33`,borderRadius:12,padding:"1rem 1.25rem",marginBottom:14}}>
        <p style={{fontSize:11,color:T.gold,letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}><i className="ti ti-calculator" style={{marginRight:6}} aria-hidden="true"/>Calculador</p>
        <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:6,background:T.bg2,color:T.t2,border:`1px solid ${T.border}`}}>{dias} diária{dias>1?"s":""}</span>
          <span style={{fontSize:11,padding:"3px 10px",borderRadius:6,background:sug.fds?T.goldBg:T.bg2,color:sug.fds?T.gold:T.t2,border:`1px solid ${sug.fds?T.gold+"44":T.border}`}}>{sug.fds?"Fim de semana":"Dia útil"}</span>
        </div>
        <div style={{borderBottom:`1px solid ${T.border}`,paddingBottom:8,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.t2,marginBottom:4}}>
            <span>Valor base (ref: {sug.ref})</span><span style={{color:T.t1}}>{fmt(sug.base)}</span>
          </div>
          {sug.ac>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.t2}}>
            <span>Acréscimo {forma} (+{(sug.ac*100).toFixed(0)}%)</span><span style={{color:T.amber}}>+ {fmt(sug.base*sug.ac)}</span>
          </div>}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:T.bg2,border:`1px solid ${T.gold}44`,borderRadius:8,padding:"8px 12px",marginBottom:10}}>
          <span style={{fontSize:12,color:T.t2}}>Valor sugerido</span>
          <span style={{fontSize:18,color:T.gold,fontFamily:"'DM Serif Display',serif"}}>{fmt(sug.total)}</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <input type="number" step="0.01" style={{...INP,marginBottom:0,borderColor:editado?T.gold:T.border}} value={editado?manual:sug.total.toFixed(2)} onChange={e=>{setManual(e.target.value);setEditado(true);}} placeholder="Ajustar valor"/>
          {editado&&<BtnG onClick={()=>{setEditado(false);setManual("");}}>Usar sugestão</BtnG>}
        </div>
        <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${T.border}`}}>
          <p style={{fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase",marginBottom:6}}>Preços históricos reais</p>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
            {HISTORICO.map((h,i)=><button key={i} onClick={()=>{setManual(h.valor.toFixed(2));setEditado(true);}} style={{fontSize:11,padding:"3px 9px",borderRadius:5,border:`1px solid ${T.border}`,background:T.bg2,color:T.t2,cursor:"pointer"}} title={`${h.ctx} · ${h.forma}`}>
              {h.dias}d {h.forma.split(" ")[0]} → R$ {h.valor.toLocaleString("pt-BR")}
            </button>)}
          </div>
        </div>
      </div>}

      {valorFinal>0&&<div style={{background:T.goldBg,border:`1px solid ${T.gold}55`,borderRadius:10,padding:"12px 16px",marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <p style={{margin:0,fontSize:11,color:T.gold,letterSpacing:".06em",textTransform:"uppercase"}}>Total a cobrar</p>
          <p style={{margin:0,fontSize:11,color:T.goldDim,marginTop:2}}>{forma} · {dias} diária{dias>1?"s":""}</p>
        </div>
        <p style={{margin:0,fontSize:24,color:T.gold,fontFamily:"'DM Serif Display',serif"}}>{fmt(valorFinal)}</p>
      </div>}

      <div style={{display:"flex",gap:8}}>
        <button onClick={onClose} style={{flex:1,padding:"9px",borderRadius:8,border:`1px solid ${T.border}`,background:"transparent",cursor:"pointer",color:T.t2,fontSize:13}}>Cancelar</button>
        <BtnP onClick={salvar} style={{flex:1,justifyContent:"center"}}>Confirmar reserva</BtnP>
      </div>
    </div>
  </div>;
}

/* ─── APP PRINCIPAL ──────────────────────────────────────────────────── */
const ADMIN_TOKEN="wbp@2026";

/* ─── TAB CALENDÁRIO (componente próprio para usar hooks corretamente) ── */
function TabCalendario({reservas,ativos,clientes,fAtivo,setFAtivo,avancarStatus,marcarPaga}){
  const hoje=new Date();
  const mesInicial=`${hoje.getFullYear()}-${String(hoje.getMonth()+1).padStart(2,"0")}`;
  const [mesCal,setMesCal]=useState(mesInicial);
  const [diaClicado,setDiaClicado]=useState(null);
  const [resDodia,setResDodia]=useState([]);

  function handleDiaClick(iso,res){
    if(diaClicado===iso){setDiaClicado(null);setResDodia([]);}
    else{setDiaClicado(iso);setResDodia(res);}
  }

  const resMes=reservas.filter(r=>{
    if(fAtivo&&r.ativo_id!==Number(fAtivo)) return false;
    if(r.status==="Cancelada") return false;
    return r.inicio.slice(0,7)===mesCal||r.fim.slice(0,7)===mesCal||(r.inicio.slice(0,7)<mesCal&&r.fim.slice(0,7)>mesCal);
  });

  return <>
    <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
      <select style={{...INP,width:"auto",marginBottom:0}} value={fAtivo} onChange={e=>{setFAtivo(e.target.value);setDiaClicado(null);setResDodia([]);}}>
        <option value="">Todos os ativos</option>{ativos.map(a=><option key={a.id} value={a.id}>{a.nome}</option>)}
      </select>
      {diaClicado&&<button onClick={()=>{setDiaClicado(null);setResDodia([]);}} style={{fontSize:12,padding:"5px 12px",borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",color:T.t2,cursor:"pointer"}}>
        <i className="ti ti-x" style={{marginRight:4}} aria-hidden="true"/>Limpar seleção
      </button>}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      <Card>
        <Calendario
          reservas={reservas}
          ativoFiltro={fAtivo?Number(fAtivo):null}
          onDiaClick={handleDiaClick}
          diaSelecionado={diaClicado}
          onMesChange={m=>{setMesCal(m);setDiaClicado(null);setResDodia([]);}}
        />
      </Card>
      <Card>
        {diaClicado?<>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div>
              <p style={{margin:0,fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase"}}>Data selecionada</p>
              <p style={{margin:"4px 0 0",fontSize:18,fontWeight:400,color:T.gold,fontFamily:"'DM Serif Display',serif"}}>{fmtDate(diaClicado)}</p>
            </div>
            <span style={{fontSize:12,color:T.t2,background:T.bg3,borderRadius:7,padding:"4px 10px"}}>{resDodia.length} reserva{resDodia.length!==1?"s":""}</span>
          </div>
          {resDodia.map(r=>{
            const a=ativos.find(x=>x.id===r.ativo_id),c=clientes.find(x=>x.id===r.cliente_id);
            const dias=Math.max(1,Math.round((new Date(r.fim)-new Date(r.inicio))/86400000)+1);
            return <div key={r.id} style={{border:`1px solid ${T.gold}33`,borderRadius:10,padding:"14px",marginBottom:10,background:T.goldBg}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                <div>
                  <p style={{margin:0,fontWeight:500,fontSize:14,color:T.t1}}>Reserva #{r.id}</p>
                  <p style={{margin:"3px 0 0",fontSize:13,color:T.gold,fontFamily:"'DM Serif Display',serif"}}>{a?.nome}</p>
                </div>
                <Badge s={r.status}/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                <div style={{background:T.bg2,borderRadius:7,padding:"8px 10px"}}>
                  <p style={{margin:0,fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Cliente</p>
                  <p style={{margin:"3px 0 0",fontSize:13,color:T.t1,fontWeight:500}}>{c?.nome||"—"}</p>
                  {c?.tel&&<p style={{margin:"2px 0 0",fontSize:11,color:T.t2}}>{c.tel}</p>}
                </div>
                <div style={{background:T.bg2,borderRadius:7,padding:"8px 10px"}}>
                  <p style={{margin:0,fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Período</p>
                  <p style={{margin:"3px 0 0",fontSize:12,color:T.t1}}>{fmtPeriodo(r.inicio,r.fim)}</p>
                  <p style={{margin:"2px 0 0",fontSize:11,color:T.t2}}>{dias} diária{dias!==1?"s":""}</p>
                </div>
                {r.valor>0&&<div style={{background:T.bg2,borderRadius:7,padding:"8px 10px"}}>
                  <p style={{margin:0,fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Valor</p>
                  <p style={{margin:"3px 0 0",fontSize:14,fontWeight:500,color:T.gold,fontFamily:"'DM Serif Display',serif"}}>{fmt(r.valor)}</p>
                </div>}
                <div style={{background:T.bg2,borderRadius:7,padding:"8px 10px"}}>
                  <p style={{margin:0,fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Pagamento</p>
                  <div style={{marginTop:4}}><Badge s={r.pagamento}/></div>
                </div>
              </div>
              {r.obs&&<p style={{margin:0,fontSize:12,color:T.t2,fontStyle:"italic",borderTop:`1px solid ${T.border}`,paddingTop:8}}>"{r.obs}"</p>}
              <div style={{display:"flex",gap:6,marginTop:10,flexWrap:"wrap"}}>
                {r.status!=="Concluída"&&r.status!=="Cancelada"&&<BtnG onClick={()=>avancarStatus(r.id)}>Avançar status</BtnG>}
                {r.pagamento!=="Paga"&&<BtnG onClick={()=>marcarPaga(r.id)}>Marcar paga</BtnG>}
              </div>
            </div>;
          })}
        </>:<>
          <p style={{fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>
            Reservas de {new Date(mesCal+"-02").toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}
          </p>
          {resMes.length===0
            ?<Empty icon="ti-calendar-off" msg="Nenhuma reserva neste mês. Navegue pelo calendário."/>
            :resMes.sort((a,b)=>a.inicio.localeCompare(b.inicio)).map(r=>{
              const a=ativos.find(x=>x.id===r.ativo_id),c=clientes.find(x=>x.id===r.cliente_id);
              return <div key={r.id}
                onClick={()=>{
                  const res=reservas.filter(rv=>datesBetween(rv.inicio,rv.fim).includes(r.inicio)&&(!fAtivo||rv.ativo_id===Number(fAtivo))&&rv.status!=="Cancelada");
                  setDiaClicado(r.inicio);setResDodia(res.length?res:[r]);
                }}
                style={{padding:"10px 0",borderBottom:`1px solid ${T.border}`,cursor:"pointer"}}
                onMouseEnter={e=>e.currentTarget.style.opacity=".7"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:3,height:36,borderRadius:2,background:T.gold,flexShrink:0}}/>
                    <div>
                      <p style={{margin:0,fontSize:13,fontWeight:500,color:T.t1}}>{a?.nome}</p>
                      <p style={{margin:"2px 0 0",fontSize:11,color:T.t2}}>{c?.nome} · {fmtPeriodo(r.inicio,r.fim)}</p>
                    </div>
                  </div>
                  <Badge s={r.status}/>
                </div>
              </div>;
            })}
          <p style={{fontSize:11,color:T.t3,marginTop:12,textAlign:"center"}}>
            <i className="ti ti-hand-click" style={{marginRight:5}} aria-hidden="true"/>
            Clique em um dia ocupado para ver os detalhes
          </p>
        </>}
      </Card>
    </div>
  </>;
}

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [ativos,setAtivos]=useState(D_ATIVOS);
  const [clientes,setClientes]=useState(D_CLIENTES);
  const [reservas,setReservas]=useState(D_RESERVAS);
  const [vistorias,setVistorias]=useState([]);
  const [contratos,setContratos]=useState(D_CONTRATOS);
  const [comissoes,setComissoes]=useState(D_COMISSOES);
  const [despesas,setDespesas]=useState(D_DESPESAS);

  // modais
  const [showAt,setShowAt]=useState(false);
  const [showCl,setShowCl]=useState(false);
  const [showRe,setShowRe]=useState(false);
  const [showVi,setShowVi]=useState(false);
  const [showDesp,setShowDesp]=useState(false);
  const [dossieId,setDossieId]=useState(null);
  const [erroRe,setErroRe]=useState("");

  // admin
  const [adminAuth,setAdminAuth]=useState(false);
  const [adminInput,setAdminInput]=useState("");

  // IA
  const [iaTab,setIaTab]=useState("contrato");
  const [iaLoad,setIaLoad]=useState(false);
  const [iaRes,setIaRes]=useState("");
  const [iaRe,setIaRe]=useState("");
  const [iaVtxt,setIaVtxt]=useState("");
  const [iaCl,setIaCl]=useState("");

  // filtros
  const [fBusca,setFBusca]=useState("");
  const [fStatus,setFStatus]=useState("Ativas");
  const [fAtivo,setFAtivo]=useState("");

  // forms
  const [fAt,setFAt]=useState({nome:"",tipo:"Veículo",placa:"",foto:""});
  const [fCl,setFCl]=useState({nome:"",tel:"",email:"",kyc:"Pendente",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""});
  const [fRe,setFRe]=useState({ativo_id:"",cliente_id:"",inicio:"",fim:"",valor:"",analista:"",forma_pag:"Pix",obs:""});
  const [fVi,setFVi]=useState({reserva_id:"",tipo:"Entrada",responsavel:"",anotacao:"",checklist:{chave:false,cabo:false,carregador:false,manual:false,portatralas:false}});
  const [fDesp,setFDesp]=useState({data:today(),cat:"Manutenção",desc:"",valor:"",ativo_id:"1"});

  // métricas
  const totalReceita=useMemo(()=>reservas.filter(r=>r.pagamento==="Paga").reduce((s,r)=>s+r.valor,0),[reservas]);
  const resAtivas=reservas.filter(r=>r.status==="Confirmada"||r.status==="Em Andamento").length;
  const ativosDisp=ativos.filter(a=>statusAtivoDinamico(a.id,reservas)==="Disponível").length;
  const clOk=clientes.filter(c=>c.kyc==="Aprovado"&&!c.blacklist).length;

  // fluxo financeiro
  const fluxo=useMemo(()=>{
    const map={};
    despesas.forEach(d=>{
      const m=d.data.slice(0,7);
      if(!map[m]) map[m]={mes:m,entradas:0,saidas:0,itens:[]};
      if(d.cat==="Entrada") map[m].entradas+=d.valor; else map[m].saidas+=d.valor;
      map[m].itens.push(d);
    });
    // reservas pagas não lançadas manualmente
    const lancados=new Set(despesas.filter(d=>d.reserva_id).map(d=>d.reserva_id));
    reservas.filter(r=>r.pagamento==="Paga"&&r.valor>0&&!lancados.has(r.id)).forEach(r=>{
      const m=r.inicio.slice(0,7);
      if(!map[m]) map[m]={mes:m,entradas:0,saidas:0,itens:[]};
      const cli=clientes.find(c=>c.id===r.cliente_id);
      map[m].entradas+=r.valor;
      map[m].itens.push({id:`r${r.id}`,data:r.inicio,cat:"Entrada",desc:`Reserva #${r.id} — ${cli?.nome||"—"}`,valor:r.valor,ativo_id:r.ativo_id,reserva_id:r.id});
    });
    return Object.values(map).sort((a,b)=>a.mes.localeCompare(b.mes)).map((m,i,arr)=>({
      ...m,saldo:m.entradas-m.saidas,acum:arr.slice(0,i+1).reduce((s,x)=>s+(x.entradas-x.saidas),0)
    }));
  },[despesas,reservas,clientes]);

  // reservas filtradas
  const resFilt=useMemo(()=>reservas.filter(r=>{
    const a=ativos.find(x=>x.id===r.ativo_id),c=clientes.find(x=>x.id===r.cliente_id);
    const b=!fBusca||[a?.nome,c?.nome,`#${r.id}`,r.analista,r.obs].some(s=>s?.toLowerCase().includes(fBusca.toLowerCase()));
    const s=fStatus==="Todos"||r.status===fStatus;
    const at=!fAtivo||r.ativo_id===Number(fAtivo);
    return b&&s&&at;
  }),[reservas,ativos,clientes,fBusca,fStatus,fAtivo]);

  // ações
  function addAtivo(){ if(!fAt.nome) return; setAtivos([...ativos,{...fAt,id:Date.now(),valor_diaria:0}]); setFAt({nome:"",tipo:"Veículo",placa:"",foto:""}); setShowAt(false); }
  function addCliente(){ if(!fCl.nome) return; setClientes([...clientes,{...fCl,id:Date.now()}]); setFCl({nome:"",tel:"",email:"",kyc:"Pendente",blacklist:false,cnh:"",cnh_numero:"",cnh_cat:"B",nascimento:""}); setShowCl(false); }
  function addReserva(){
    setErroRe("");
    if(!fRe.ativo_id||!fRe.cliente_id||!fRe.inicio||!fRe.fim){setErroRe("Preencha ativo, cliente e datas.");return;}
    if(new Date(fRe.fim)<new Date(fRe.inicio)){setErroRe("Data de devolução anterior à retirada.");return;}
    const c=clientes.find(x=>x.id===Number(fRe.cliente_id));
    if(!c||c.kyc!=="Aprovado"){setErroRe("Cliente precisa ter KYC aprovado.");return;}
    if(c.blacklist){setErroRe("Cliente está na blacklist.");return;}
    if(cnhVencida(c.cnh)){setErroRe(`CNH vencida em ${fmtDate(c.cnh)}.`);return;}
    const conf=temConflito(reservas,fRe.ativo_id,fRe.inicio,fRe.fim);
    if(conf){setErroRe(`Conflito com Reserva #${conf.id} (${fmtPeriodo(conf.inicio,conf.fim)}).`);return;}
    const dias=Math.max(1,Math.round((new Date(fRe.fim)-new Date(fRe.inicio))/86400000)+1);
    const obs=`${fRe.forma_pag}${dias>1?` · ${dias} diárias`:" · 1 diária"}${fRe.obs?` · ${fRe.obs}`:""}`;
    setReservas([...reservas,{...fRe,id:Date.now(),status:"Pendente",pagamento:"Aguardando",ativo_id:Number(fRe.ativo_id),cliente_id:Number(fRe.cliente_id),valor:Number(fRe.valor)||0,obs}]);
    setFRe({ativo_id:"",cliente_id:"",inicio:"",fim:"",valor:"",analista:"",forma_pag:"Pix",obs:""});
    setShowRe(false);
  }
  function addVistoria(){ if(!fVi.reserva_id||!fVi.responsavel) return; setVistorias([...vistorias,{...fVi,id:Date.now(),data:today(),status:"Concluída",reserva_id:Number(fVi.reserva_id)}]); setFVi({reserva_id:"",tipo:"Entrada",responsavel:"",anotacao:"",checklist:{chave:false,cabo:false,carregador:false,manual:false,portatralas:false}}); setShowVi(false); }
  function gerarContrato(rid){ if(contratos.find(c=>c.reserva_id===rid)) return; setContratos([...contratos,{id:Date.now(),reserva_id:rid,status:"Rascunho",criado:today()}]); }
  function aprovarKYC(id){ setClientes(clientes.map(c=>c.id===id?{...c,kyc:"Aprovado"}:c)); }
  function marcarPaga(id){
    setReservas(reservas.map(r=>r.id===id?{...r,pagamento:"Paga"}:r));
    const r=reservas.find(r=>r.id===id);
    if(r&&r.valor>0&&!comissoes.find(c=>c.reserva_id===id)){
      setComissoes([...comissoes,{id:Date.now(),reserva_id:id,analista:r.analista||"WBP",valor:Math.round(r.valor*0.05*100)/100,status:"Gerada",data:today()}]);
    }
  }
  function avancarStatus(id){
    const ciclo=["Pendente","Confirmada","Em Andamento","Concluída"];
    setReservas(reservas.map(r=>{if(r.id!==id) return r; const i=ciclo.indexOf(r.status); return i<ciclo.length-1?{...r,status:ciclo[i+1]}:r;}));
  }
  function addDespesa(){ if(!fDesp.data||!fDesp.desc||!fDesp.valor) return; setDespesas([...despesas,{...fDesp,id:Date.now(),valor:Number(fDesp.valor),ativo_id:Number(fDesp.ativo_id)}]); setFDesp({data:today(),cat:"Manutenção",desc:"",valor:"",ativo_id:"1"}); setShowDesp(false); }

  // IA
  async function chamarIA(prompt){
    setIaLoad(true);setIaRes("");
    try{
      const d=await(await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})})).json();
      setIaRes(d.content?.map(b=>b.text).join("\n")||"Sem resposta.");
    }catch{setIaRes("Erro ao conectar com a IA.");}
    setIaLoad(false);
  }
  function iaContrato(){ const r=reservas.find(x=>x.id===Number(iaRe));if(!r) return; const a=ativos.find(x=>x.id===r.ativo_id),c=clientes.find(x=>x.id===r.cliente_id); chamarIA(`Você é assistente jurídico especializado em locação de ativos premium no Brasil. Gere contrato de locação profissional em português:\n\nAtivo: ${a?.nome} (${a?.tipo})\nCliente: ${c?.nome}${c?.tel?` (${c.tel})`:""}\nPeríodo: ${fmtPeriodo(r.inicio,r.fim)}\nValor: ${fmt(r.valor)}\nForma: ${r.forma_pag||"—"}\nAnalista: ${r.analista||"—"}\n\nInclua: objeto, prazo, valor, forma de pagamento, responsabilidades, uso do bem, devolução, multas por danos ou atraso, foro. Formal e completo.`); }
  function iaVistoria(){ if(!iaVtxt.trim()) return; chamarIA(`Você é analista de operações de locação premium. Estruture estas anotações de vistoria em laudo formal:\n\n"${iaVtxt}"\n\nSeções: 1) Estado geral, 2) Avarias identificadas, 3) Itens verificados, 4) Pendências, 5) Decisão (liberar/reter). Objetivo e formal.`); }
  function iaRisco(){ const c=clientes.find(x=>x.id===Number(iaCl));if(!c) return; const res=reservas.filter(r=>r.cliente_id===c.id),score=scoreCliente(c,reservas); chamarIA(`Analise o risco deste cliente de locação premium:\n\nNome: ${c.nome}\nKYC: ${c.kyc}\nBlacklist: ${c.blacklist?"Sim":"Não"}\nCNH: ${c.cnh||"—"}${cnhVencida(c.cnh)?" (VENCIDA)":""}\nScore calculado: ${score}/100\nReservas: ${res.length} (${res.filter(r=>r.pagamento==="Paga").length} pagas)\n\nForneça: nível de risco, pontos positivos, pontos de atenção, recomendação.`); }

  const nav=[
    {id:"dashboard",label:"Dashboard",    icon:"ti-layout-dashboard"},
    {id:"calendario",label:"Calendário",  icon:"ti-calendar-month"},
    {id:"reservas",  label:"Reservas",    icon:"ti-clipboard-list"},
    {id:"ativos",    label:"Ativos",      icon:"ti-car"},
    {id:"clientes",  label:"Clientes",    icon:"ti-users"},
    {id:"vistorias", label:"Vistorias",   icon:"ti-clipboard-check"},
    {id:"contratos", label:"Contratos",   icon:"ti-file-certificate"},
    {id:"comissoes", label:"Comissões",   icon:"ti-coin"},
    {id:"ia",        label:"IA Assistant",icon:"ti-sparkles"},
  ];

  const CATS_DESP=["Entrada","IPVA","Seguro","Manutenção","Combustível","Limpeza","Multa","Documentação","Outros"];
  const CAT_COR={Entrada:[T.green,T.greenDim],IPVA:[T.red,T.redDim],Seguro:[T.amber,T.amberDim],Manutenção:[T.amber,T.amberDim],Combustível:[T.blue,T.blueDim],Limpeza:[T.blue,T.blueDim]};
  const CHECKLIST=[{key:"chave",label:"Chave"},{key:"cabo",label:"Cabo"},{key:"carregador",label:"Carregador"},{key:"manual",label:"Manual"},{key:"portatralas",label:"Porta-malas"}];

  const dossieCli=dossieId?clientes.find(c=>c.id===dossieId):null;

  return <>
    <style>{css}</style>
    <div style={{display:"flex",minHeight:"100vh"}}>

      {/* ── SIDEBAR ── */}
      <aside style={{width:214,background:T.bg1,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",position:"sticky",top:0,height:"100vh",overflowY:"auto",flexShrink:0}}>
        {/* logo */}
        <div style={{padding:"1.5rem 1.25rem 1.25rem",borderBottom:`1px solid ${T.border}`}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2}}>
            <div style={{display:"flex",alignItems:"center",letterSpacing:".18em"}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:13,color:T.t1,letterSpacing:".2em",textTransform:"uppercase"}}>EXP</span>
              <span style={{display:"inline-flex",flexDirection:"column",gap:2,margin:"0 2px",justifyContent:"center",height:13}}>
                <span style={{display:"block",width:8,height:1.5,background:"#3ECF8E"}}/>
                <span style={{display:"block",width:8,height:1.5,background:"#3ECF8E"}}/>
              </span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:13,color:T.t1,letterSpacing:".2em",textTransform:"uppercase"}}>RIENCE</span>
            </div>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:9,color:"#3ECF8E",letterSpacing:".06em",marginLeft:1}}>by wbp.group</span>
          </div>
        </div>
        {/* nav */}
        <nav style={{flex:1,padding:".75rem 0"}}>
          {nav.map(n=><button key={n.id} onClick={()=>setTab(n.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 1.25rem",border:"none",cursor:"pointer",textAlign:"left",fontSize:13,fontWeight:tab===n.id?500:400,background:tab===n.id?T.bg3:"transparent",color:tab===n.id?T.t1:T.t2,borderLeft:`2px solid ${tab===n.id?T.gold:"transparent"}`,transition:"all .12s"}}
            onMouseEnter={e=>{if(tab!==n.id){e.currentTarget.style.background=T.bg3;e.currentTarget.style.color=T.t1;}}}
            onMouseLeave={e=>{if(tab!==n.id){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.t2;}}}>
            <i className={`ti ${n.icon}`} style={{fontSize:16,flexShrink:0}} aria-hidden="true"/>{n.label}
          </button>)}
          <div style={{margin:"8px 1.25rem",height:1,background:T.border}}/>
          <button onClick={()=>setTab("admin")} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 1.25rem",border:"none",cursor:"pointer",textAlign:"left",fontSize:13,fontWeight:tab==="admin"?500:400,background:tab==="admin"?T.goldBg:"transparent",color:tab==="admin"?T.gold:T.t3,borderLeft:`2px solid ${tab==="admin"?T.gold:"transparent"}`,transition:"all .12s"}}
            onMouseEnter={e=>{if(tab!=="admin"){e.currentTarget.style.background=T.goldBg;e.currentTarget.style.color=T.gold;}}}
            onMouseLeave={e=>{if(tab!=="admin"){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.t3;}}}>
            <i className={`ti ${adminAuth?"ti-chart-line":"ti-lock"}`} style={{fontSize:16,flexShrink:0}} aria-hidden="true"/>Financeiro
            {!adminAuth&&<i className="ti ti-lock" style={{fontSize:10,marginLeft:"auto",opacity:.5}} aria-hidden="true"/>}
          </button>
        </nav>
        <div style={{padding:"1rem 1.25rem",borderTop:`1px solid ${T.border}`}}>
          <p style={{margin:0,fontSize:10,color:T.t3,letterSpacing:".04em"}}>v3.0 · Claude-powered</p>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{flex:1,padding:"2rem",minWidth:0,background:T.bg0,overflowX:"hidden"}}>

        {/* DASHBOARD */}
        {tab==="dashboard"&&<div className="fade">
          <SecTitle>Dashboard</SecTitle>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:20}}>
            <Metric label="Receita paga" value={`R$ ${(totalReceita/1000).toFixed(1)}k`} sub={`${reservas.filter(r=>r.pagamento==="Paga").length} reservas`} icon="ti-trending-up" accent={T.gold}/>
            <Metric label="Reservas ativas" value={resAtivas} sub="confirmadas · andamento" icon="ti-calendar-event" accent={T.blue}/>
            <Metric label="Ativos livres" value={ativosDisp} sub={`de ${ativos.length} total`} icon="ti-car" accent={T.green}/>
            <Metric label="Clientes OK" value={clOk} sub="KYC aprovado" icon="ti-shield-check" accent={T.green}/>
            <Metric label="Comissões" value={`R$ ${(comissoes.reduce((s,c)=>s+c.valor,0)/1000).toFixed(1)}k`} sub={`${comissoes.length} geradas`} icon="ti-coin" accent={T.amber}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <Card><p style={{fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>Receita mensal</p><GraficoReceita reservas={reservas}/></Card>
            <Card><p style={{fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>Calendário</p><Calendario reservas={reservas} ativoFiltro={null} onDiaClick={null} diaSelecionado={null} onMesChange={null}/></Card>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <Card>
              <p style={{fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>Próximas reservas</p>
              {reservas.filter(r=>r.inicio>=today()).slice(0,4).map(r=>{const a=ativos.find(x=>x.id===r.ativo_id),c=clientes.find(x=>x.id===r.cliente_id);return <div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{width:3,height:32,borderRadius:2,background:T.gold,flexShrink:0}}/><div><p style={{margin:0,fontSize:13,fontWeight:500,color:T.t1}}>{a?.nome}</p><p style={{margin:0,fontSize:11,color:T.t2}}>{c?.nome} · {fmtDate(r.inicio)}</p></div></div>
                <Badge s={r.status}/>
              </div>;})}
            </Card>
            <Card>
              <p style={{fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>Clientes com pendências</p>
              {clientes.filter(c=>c.kyc!=="Aprovado"||c.blacklist||cnhVencida(c.cnh)).length===0?<Empty icon="ti-shield-check" msg="Nenhum alerta"/>
              :clientes.filter(c=>c.kyc!=="Aprovado"||c.blacklist||cnhVencida(c.cnh)).map(c=><div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${T.border}`}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}><Avatar nome={c.nome} size={28}/><p style={{margin:0,fontSize:13,color:T.t1}}>{c.nome}</p></div>
                <div style={{display:"flex",gap:4}}>
                  {c.blacklist&&<Badge s="Bloqueado"/>}
                  {!c.blacklist&&c.kyc!=="Aprovado"&&<span style={{fontSize:11,color:T.amber,background:T.amberDim,border:`1px solid ${T.amber}22`,borderRadius:6,padding:"2px 9px"}}>Verificação pendente</span>}
                  {cnhVencida(c.cnh)&&<Badge s="Cancelada"/>}
                </div>
              </div>)}
            </Card>
          </div>
        </div>}

        {/* CALENDÁRIO */}
        {tab==="calendario"&&<div className="fade">
          <SecTitle>Calendário de disponibilidade</SecTitle>
          <TabCalendario
            reservas={reservas}
            ativos={ativos}
            clientes={clientes}
            fAtivo={fAtivo}
            setFAtivo={setFAtivo}
            avancarStatus={avancarStatus}
            marcarPaga={marcarPaga}
          />
        </div>}

        {/* RESERVAS */}
        {tab==="reservas"&&<div className="fade">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <SecTitle>Reservas</SecTitle>
            <BtnP onClick={()=>setShowRe(true)}><i className="ti ti-plus" aria-hidden="true"/>Criar reserva</BtnP>
          </div>

          {/* filtros — Concluídas ficam separadas */}
          <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
            <input style={{...INP,width:220,marginBottom:0}} placeholder="Buscar cliente, ativo..." value={fBusca} onChange={e=>setFBusca(e.target.value)}/>
            <div style={{display:"flex",gap:4}}>
              {["Ativas","Pendente","Confirmada","Em Andamento","Concluídas","Cancelada"].map(s=>{
                const ativo=fStatus===s;
                return <button key={s} onClick={()=>setFStatus(s)} style={{
                  padding:"5px 12px",borderRadius:7,fontSize:12,fontWeight:ativo?500:400,
                  border:`1px solid ${ativo?T.gold:T.border}`,cursor:"pointer",
                  background:ativo?T.goldBg:"transparent",
                  color:ativo?T.gold:T.t2,transition:"all .12s",whiteSpace:"nowrap",
                }}>{s}</button>;
              })}
            </div>
            <select style={{...INP,width:"auto",marginBottom:0}} value={fAtivo} onChange={e=>setFAtivo(e.target.value)}>
              <option value="">Todos os ativos</option>{ativos.map(a=><option key={a.id} value={a.id}>{a.nome}</option>)}
            </select>
          </div>

          {(()=>{
            const h=today();
            // "Ativas" = pendente + confirmada + em andamento, ordenadas por data (mais próximas primeiro)
            // "Concluídas" = só concluídas
            // Default na tela: ativas, sem concluídas anteriores
            const filtradas = resFilt.filter(r=>{
              if(fStatus==="Ativas") return r.status!=="Concluída"&&r.status!=="Cancelada"&&r.fim>=h;
              if(fStatus==="Concluídas") return r.status==="Concluída";
              if(fStatus==="Todos") return r.status!=="Concluída"&&r.fim>=h; // default = ativas
              return r.status===fStatus;
            }).sort((a,b)=>a.inicio.localeCompare(b.inicio));

            if(filtradas.length===0) return <Card><Empty icon="ti-calendar-off" msg={fStatus==="Concluídas"?"Nenhuma reserva concluída.":"Nenhuma reserva ativa. Clique em 'Criar reserva' para começar."}/></Card>;

            return filtradas.map(r=>{
              const a=ativos.find(x=>x.id===r.ativo_id);
              const c=clientes.find(x=>x.id===r.cliente_id);
              const dias=Math.max(1,Math.round((new Date(r.fim)-new Date(r.inicio))/86400000)+1);
              const contrato=contratos.find(ct=>ct.reserva_id===r.id);

              // cor da barra lateral por fase
              const barCor={Pendente:T.amber,Confirmada:T.blue,"Em Andamento":T.green,Concluída:T.t3,Cancelada:T.red}[r.status]||T.border;

              // botão contrato contextual
              function BtnContrato(){
                if(!contrato) return <BtnG onClick={()=>gerarContrato(r.id)}><i className="ti ti-file-plus" aria-hidden="true"/>Gerar contrato</BtnG>;
                if(r.status==="Concluída"||r.status==="Confirmada"||r.pagamento==="Paga")
                  return <BtnG onClick={()=>{setTab("ia");setIaTab("contrato");setIaRe(String(r.id));}} style={{borderColor:T.green,color:T.green}}><i className="ti ti-file-check" aria-hidden="true"/>Ver contrato</BtnG>;
                return <BtnG onClick={()=>{setTab("ia");setIaTab("contrato");setIaRe(String(r.id));}}><i className="ti ti-file-text" aria-hidden="true"/>Contrato</BtnG>;
              }

              return <Card key={r.id} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                  <div style={{flex:1,minWidth:220}}>
                    <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                      {/* barra lateral colorida por fase */}
                      <div style={{width:3,borderRadius:2,background:barCor,alignSelf:"stretch",flexShrink:0,minHeight:40}}/>
                      <div style={{flex:1}}>
                        {/* título: cliente em destaque */}
                        <p style={{margin:"0 0 1px",fontWeight:500,fontSize:15,color:T.t1}}>{c?.nome||"—"}</p>
                        {/* ativo abaixo */}
                        <p style={{margin:"0 0 3px",fontSize:12,color:T.gold}}>{a?.nome}</p>
                        {/* período e obs */}
                        <p style={{margin:0,fontSize:12,color:T.t2}}>
                          {fmtPeriodo(r.inicio,r.fim)} · {dias} diária{dias!==1?"s":""}
                          {r.analista?` · ${r.analista}`:""}
                          {r.obs?` · ${r.obs}`:""}
                        </p>
                        {/* linha do tempo com cores */}
                        {r.status!=="Cancelada"&&<Ciclo status={r.status}/>}
                      </div>
                    </div>
                  </div>

                  {/* ações */}
                  <div style={{display:"flex",gap:6,alignItems:"flex-start",flexWrap:"wrap"}}>
                    <Badge s={r.pagamento}/>
                    {r.valor>0&&<span style={{fontSize:14,fontWeight:500,color:T.gold,fontFamily:"'DM Serif Display',serif"}}>{fmt(r.valor)}</span>}
                    {r.status!=="Concluída"&&r.status!=="Cancelada"&&<BtnG onClick={()=>avancarStatus(r.id)}><i className="ti ti-chevron-right" aria-hidden="true"/>Avançar</BtnG>}
                    {r.pagamento!=="Paga"&&r.status!=="Cancelada"&&<BtnG onClick={()=>marcarPaga(r.id)}><i className="ti ti-coin" aria-hidden="true"/>Marcar paga</BtnG>}
                    <BtnContrato/>
                  </div>
                </div>
              </Card>;
            });
          })()}
        </div>}

        {/* ATIVOS */}
        {tab==="ativos"&&<div className="fade">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <SecTitle>Ativos</SecTitle>
            <BtnP onClick={()=>setShowAt(true)}><i className="ti ti-plus" aria-hidden="true"/>Cadastrar</BtnP>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
            {ativos.map(a=>{
              const rec=reservas.filter(r=>r.ativo_id===a.id&&r.pagamento==="Paga").reduce((s,r)=>s+r.valor,0);
              const nRes=reservas.filter(r=>r.ativo_id===a.id&&r.status!=="Cancelada").length;
              const proxima=reservas.filter(r=>r.ativo_id===a.id&&r.status!=="Cancelada"&&r.status!=="Concluída"&&r.inicio>=today()).sort((a,b)=>a.inicio.localeCompare(b.inicio))[0];
              const cli=proxima?clientes.find(c=>c.id===proxima.cliente_id):null;
              return <div key={a.id} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,overflow:"hidden",boxShadow:`0 0 20px ${T.gold}12`}}>
                {/* foto */}
                <div style={{position:"relative",height:180,overflow:"hidden",background:T.bg3}}>
                  {a.foto
                    ?<img src={a.foto} alt={a.nome} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";}}/>
                    :<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <i className={`ti ${a.tipo==="Embarcação"?"ti-sailboat":a.tipo==="Aeronave"?"ti-plane":"ti-car"}`} style={{fontSize:48,color:T.t3}} aria-hidden="true"/>
                    </div>}
                  {/* overlay gradiente */}
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(12,12,14,.85) 0%, transparent 60%)"}}/>
                  {/* tipo badge */}
                  <span style={{position:"absolute",top:12,left:12,fontSize:11,color:T.t2,background:"rgba(12,12,14,.7)",borderRadius:6,padding:"3px 10px",backdropFilter:"blur(4px)",letterSpacing:".04em"}}>{a.tipo}</span>
                  {/* badge disponível */}
                  <span style={{position:"absolute",top:12,right:12,fontSize:11,color:T.green,background:T.greenDim,border:`1px solid ${T.green}44`,borderRadius:6,padding:"3px 10px",fontWeight:500}}>Disponível</span>
                  {/* nome sobre a foto */}
                  <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"0 16px 14px"}}>
                    <p style={{margin:0,fontSize:18,fontWeight:400,color:T.t1,fontFamily:"'DM Serif Display',serif"}}>{a.nome}</p>
                  </div>
                </div>
                {/* corpo */}
                <div style={{padding:"14px 16px"}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                    <div style={{background:T.bg3,borderRadius:8,padding:"8px 12px"}}>
                      <p style={{margin:0,fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Receita total</p>
                      <p style={{margin:"4px 0 0",fontSize:15,fontWeight:500,color:T.gold,fontFamily:"'DM Serif Display',serif"}}>{fmt(rec)}</p>
                    </div>
                    <div style={{background:T.bg3,borderRadius:8,padding:"8px 12px"}}>
                      <p style={{margin:0,fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Reservas</p>
                      <p style={{margin:"4px 0 0",fontSize:15,fontWeight:500,color:T.t1}}>{nRes}</p>
                    </div>
                  </div>
                  {proxima
                    ?<div style={{borderTop:`1px solid ${T.border}`,paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <p style={{margin:0,fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Próxima reserva</p>
                        <p style={{margin:"3px 0 0",fontSize:12,color:T.t1}}>{fmtDate(proxima.inicio)} · {cli?.nome||"—"}</p>
                      </div>
                      <Badge s={proxima.status}/>
                    </div>
                    :<p style={{margin:0,fontSize:12,color:T.t3,borderTop:`1px solid ${T.border}`,paddingTop:10}}>Nenhuma reserva futura agendada</p>}
                </div>
              </div>;
            })}
            {ativos.length===0&&<Card><Empty icon="ti-car-off" msg="Nenhum ativo cadastrado"/></Card>}
          </div>
        </div>}

        {/* CLIENTES */}
        {tab==="clientes"&&<div className="fade">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <SecTitle>Clientes</SecTitle>
            <BtnP onClick={()=>setShowCl(true)}><i className="ti ti-plus" aria-hidden="true"/>Cadastrar</BtnP>
          </div>
          {[...clientes].sort((a,b)=>a.nome.localeCompare(b.nome,"pt-BR")).map(c=>{
            const score=scoreCliente(c,reservas);
            const nRes=reservas.filter(r=>r.cliente_id===c.id).length;
            // status legível — sem jargão KYC
            const statusLabel=c.blacklist?"Bloqueado":c.kyc==="Aprovado"?"Verificado":c.kyc==="Reprovado"?"Reprovado":"Pendente de verificação";
            const statusCor=c.blacklist||c.kyc==="Reprovado"?T.red:c.kyc==="Aprovado"?T.green:T.amber;
            const statusBg=c.blacklist||c.kyc==="Reprovado"?T.redDim:c.kyc==="Aprovado"?T.greenDim:T.amberDim;
            return <Card key={c.id} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,alignItems:"center"}}>
                <div style={{display:"flex",gap:12,alignItems:"center",flex:1,minWidth:200}}>
                  <Avatar nome={c.nome}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                      <p style={{margin:0,fontWeight:500,fontSize:14,color:T.t1}}>{c.nome}</p>
                      {cnhVencida(c.cnh)&&<span style={{fontSize:10,color:T.red,background:T.redDim,borderRadius:4,padding:"1px 6px",flexShrink:0}}>CNH VENCIDA</span>}
                    </div>
                    <p style={{margin:0,fontSize:12,color:T.t2}}>
                      {c.tel||c.email||"Sem contato"}
                      {nRes>0?` · ${nRes} reserva${nRes!==1?"s":""}` : " · Sem reservas"}
                    </p>
                    <div style={{marginTop:8}}><ScoreBar score={score}/></div>
                  </div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",flexShrink:0}}>
                  <span style={{fontSize:11,fontWeight:500,color:statusCor,background:statusBg,border:`1px solid ${statusCor}22`,borderRadius:6,padding:"2px 9px",whiteSpace:"nowrap"}}>{statusLabel}</span>
                  {c.kyc==="Pendente"&&!c.blacklist&&<BtnG onClick={()=>aprovarKYC(c.id)}><i className="ti ti-check" aria-hidden="true"/>Verificar</BtnG>}
                  <BtnG onClick={()=>setDossieId(c.id)}><i className="ti ti-user" aria-hidden="true"/>Ver perfil</BtnG>
                </div>
              </div>
            </Card>;
          })}
          {clientes.length===0&&<Card><Empty icon="ti-user-off" msg="Nenhum cliente cadastrado"/></Card>}
        </div>}

        {/* VISTORIAS */}
        {tab==="vistorias"&&<div className="fade">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <SecTitle>Vistorias</SecTitle>
            <BtnP onClick={()=>setShowVi(true)}><i className="ti ti-plus" aria-hidden="true"/>Registrar</BtnP>
          </div>
          {vistorias.length===0?<Card><Empty icon="ti-clipboard-off" msg="Nenhuma vistoria registrada. Crie uma reserva e registre a vistoria de entrada."/></Card>
          :vistorias.map(v=>{const r=reservas.find(x=>x.id===v.reserva_id),a=r?ativos.find(x=>x.id===r.ativo_id):null,cl=r?clientes.find(x=>x.id===r.cliente_id):null;const ok=v.checklist?Object.values(v.checklist).filter(Boolean).length:0;
            return <Card key={v.id} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:10}}>
                <div><p style={{margin:"0 0 3px",fontWeight:500,fontSize:14,color:T.t1}}>Vistoria de {v.tipo} · Reserva #{v.reserva_id}</p><p style={{margin:0,fontSize:12,color:T.t2}}>{a?.nome} · {cl?.nome} · {fmtDate(v.data)} · {v.responsavel}</p></div>
                <Badge s={v.status}/>
              </div>
              {v.checklist&&<div style={{marginBottom:8}}><p style={{margin:"0 0 5px",fontSize:10,color:T.t3,letterSpacing:".06em",textTransform:"uppercase"}}>Checklist {ok}/{CHECKLIST.length}</p>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {CHECKLIST.map(item=><span key={item.key} style={{fontSize:11,padding:"2px 8px",borderRadius:5,background:v.checklist[item.key]?T.greenDim:T.redDim,color:v.checklist[item.key]?T.green:T.red,border:`1px solid ${v.checklist[item.key]?T.green+"44":T.red+"44"}`}}>{v.checklist[item.key]?"✓":"✗"} {item.label}</span>)}
                </div>
              </div>}
              {v.anotacao&&<p style={{margin:0,fontSize:12,color:T.t2,fontStyle:"italic",borderTop:`1px solid ${T.border}`,paddingTop:8}}>"{v.anotacao}"</p>}
            </Card>;
          })}
        </div>}

        {/* CONTRATOS */}
        {tab==="contratos"&&<div className="fade">
          <SecTitle>Contratos</SecTitle>
          <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.amber}`,borderRadius:10,padding:"10px 14px",marginBottom:14}}>
            <p style={{margin:0,fontSize:12,color:T.t2}}><i className="ti ti-info-circle" style={{marginRight:6,color:T.amber}} aria-hidden="true"/>Clicksign não configurada. Use o <strong style={{color:T.t1}}>IA Assistant</strong> para gerar o texto do contrato.</p>
          </div>
          {contratos.map(ct=>{const r=reservas.find(x=>x.id===ct.reserva_id),a=r?ativos.find(x=>x.id===r.ativo_id):null,cl=r?clientes.find(x=>x.id===r.cliente_id):null;
            return <Card key={ct.id} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                <div><p style={{margin:"0 0 3px",fontWeight:500,fontSize:14,color:T.t1}}>Contrato · Reserva #{ct.reserva_id}</p><p style={{margin:0,fontSize:12,color:T.t2}}>{a?.nome} · {cl?.nome} · Criado: {fmtDate(ct.criado)}</p></div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}><Badge s={ct.status}/><BtnG onClick={()=>{setTab("ia");setIaTab("contrato");setIaRe(String(ct.reserva_id));}}>Gerar texto IA</BtnG></div>
              </div>
            </Card>;
          })}
          {contratos.length===0&&<Card style={{marginBottom:14}}><Empty icon="ti-file-off" msg="Nenhum contrato. Gere a partir de uma reserva."/></Card>}
          <div>
            <p style={{...LBL,marginBottom:8}}>Reservas sem contrato</p>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {reservas.filter(r=>!contratos.find(ct=>ct.reserva_id===r.id)).map(r=>{const a=ativos.find(x=>x.id===r.ativo_id);return <BtnG key={r.id} onClick={()=>gerarContrato(r.id)}>Reserva #{r.id} · {a?.nome}</BtnG>;})}
              {reservas.every(r=>contratos.find(ct=>ct.reserva_id===r.id))&&<p style={{fontSize:13,color:T.t3}}>Todas têm contrato.</p>}
            </div>
          </div>
        </div>}

        {/* COMISSÕES */}
        {tab==="comissoes"&&<div className="fade">
          <SecTitle>Comissões</SecTitle>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:20}}>
            <Metric label="Total gerado" value={`R$ ${(comissoes.reduce((s,c)=>s+c.valor,0)/1000).toFixed(1)}k`} accent={T.gold} icon="ti-trending-up"/>
            <Metric label="Quantidade" value={comissoes.length} icon="ti-receipt"/>
            <Metric label="Ticket médio" value={comissoes.length?`R$ ${Math.round(comissoes.reduce((s,c)=>s+c.valor,0)/comissoes.length).toLocaleString("pt-BR")}`:"—"} icon="ti-calculator"/>
          </div>
          <Card style={{marginBottom:12,background:T.bg3,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.amber}`}}>
            <p style={{margin:0,fontSize:12,color:T.t2}}><i className="ti ti-info-circle" style={{marginRight:6,color:T.amber}} aria-hidden="true"/>Comissões geradas automaticamente ao marcar reservas como pagas (5% do valor).</p>
          </Card>
          {comissoes.length===0?<Card><Empty icon="ti-coin-off" msg="Nenhuma comissão. Marque reservas como pagas."/></Card>
          :comissoes.map(c=>{const r=reservas.find(x=>x.id===c.reserva_id),a=r?ativos.find(x=>x.id===r.ativo_id):null;
            return <Card key={c.id} style={{marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,alignItems:"center"}}>
                <div><p style={{margin:"0 0 3px",fontWeight:500,fontSize:14,color:T.t1}}>Comissão · Reserva #{c.reserva_id}</p><p style={{margin:0,fontSize:12,color:T.t2}}>Analista: {c.analista} · {a?.nome} · {fmtDate(c.data)}</p></div>
                <div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:18,fontWeight:400,color:T.gold,fontFamily:"'DM Serif Display',serif"}}>{fmt(c.valor)}</span><Badge s={c.status}/></div>
              </div>
            </Card>;
          })}
        </div>}

        {/* IA ASSISTANT */}
        {tab==="ia"&&<div className="fade">
          <SecTitle>IA Assistant</SecTitle>
          <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
            {[{id:"contrato",label:"Gerar contrato",icon:"ti-file-certificate"},{id:"vistoria",label:"Estruturar vistoria",icon:"ti-clipboard-check"},{id:"risco",label:"Analisar risco",icon:"ti-shield-search"}].map(t=><button key={t.id} onClick={()=>{setIaTab(t.id);setIaRes("");}} style={{display:"flex",alignItems:"center",gap:7,padding:"9px 16px",borderRadius:8,border:`1px solid ${iaTab===t.id?T.gold:T.border}`,cursor:"pointer",fontSize:13,fontWeight:iaTab===t.id?500:400,background:iaTab===t.id?T.goldBg:"transparent",color:iaTab===t.id?T.gold:T.t2}}>
              <i className={`ti ${t.icon}`} aria-hidden="true"/>{t.label}
            </button>)}
          </div>
          {iaTab==="contrato"&&<Card>
            <p style={{fontSize:13,color:T.t2,marginBottom:14}}>Selecione uma reserva para gerar o contrato de locação completo.</p>
            <F label="Reserva">
              <select style={INP} value={iaRe} onChange={e=>setIaRe(e.target.value)}>
                <option value="">Selecione...</option>
                {reservas.map(r=>{const a=ativos.find(x=>x.id===r.ativo_id),c=clientes.find(x=>x.id===r.cliente_id);return <option key={r.id} value={r.id}>#{r.id} · {a?.nome} · {c?.nome}</option>;})}
              </select>
            </F>
            <BtnP onClick={iaContrato} disabled={!iaRe||iaLoad}><i className="ti ti-sparkles" aria-hidden="true"/>{iaLoad?"Gerando...":"Gerar contrato com IA"}</BtnP>
          </Card>}
          {iaTab==="vistoria"&&<Card>
            <p style={{fontSize:13,color:T.t2,marginBottom:14}}>Digite as anotações livres e a IA estrutura o laudo formal.</p>
            <F label="Anotações da vistoria">
              <textarea style={{...INP,minHeight:100,resize:"vertical"}} value={iaVtxt} onChange={e=>setIaVtxt(e.target.value)} placeholder="Ex.: carro com risco na roda dianteira, tapete sujo, chave entregue..."/>
            </F>
            <BtnP onClick={iaVistoria} disabled={!iaVtxt.trim()||iaLoad}><i className="ti ti-sparkles" aria-hidden="true"/>{iaLoad?"Estruturando...":"Estruturar laudo com IA"}</BtnP>
          </Card>}
          {iaTab==="risco"&&<Card>
            <p style={{fontSize:13,color:T.t2,marginBottom:14}}>Análise de risco completa com recomendação de aprovação ou reprovação.</p>
            <F label="Cliente">
              <select style={INP} value={iaCl} onChange={e=>setIaCl(e.target.value)}>
                <option value="">Selecione...</option>
                {clientes.map(c=><option key={c.id} value={c.id}>{c.nome} · KYC: {c.kyc}</option>)}
              </select>
            </F>
            {iaCl&&<div style={{marginBottom:14}}><p style={{...LBL,marginBottom:6}}>Score atual</p><ScoreBar score={scoreCliente(clientes.find(c=>c.id===Number(iaCl)),reservas)}/></div>}
            <BtnP onClick={iaRisco} disabled={!iaCl||iaLoad}><i className="ti ti-sparkles" aria-hidden="true"/>{iaLoad?"Analisando...":"Analisar risco com IA"}</BtnP>
          </Card>}
          {iaLoad&&<Card style={{marginTop:14,textAlign:"center",padding:"2.5rem"}}><i className="ti ti-loader-2 spin" style={{fontSize:32,color:T.gold,display:"block",marginBottom:10}} aria-hidden="true"/><p style={{margin:0,color:T.t2,fontSize:13}}>Consultando Claude...</p></Card>}
          {iaRes&&!iaLoad&&<Card style={{marginTop:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <p style={{margin:0,fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase"}}>Resultado</p>
              <BtnG onClick={()=>navigator.clipboard?.writeText(iaRes)}><i className="ti ti-copy" aria-hidden="true"/>Copiar</BtnG>
            </div>
            <pre style={{margin:0,fontSize:13,whiteSpace:"pre-wrap",fontFamily:"'DM Sans',sans-serif",color:T.t1,lineHeight:1.7,borderTop:`1px solid ${T.border}`,paddingTop:12}}>{iaRes}</pre>
          </Card>}
        </div>}

        {/* FINANCEIRO / ADMIN */}
        {tab==="admin"&&<div className="fade">
          {!adminAuth?<div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}>
            <div style={{width:360,textAlign:"center"}}>
              <div style={{width:56,height:56,borderRadius:14,background:T.goldBg,border:`1px solid ${T.gold}55`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}><i className="ti ti-lock" style={{fontSize:24,color:T.gold}} aria-hidden="true"/></div>
              <h2 style={{fontFamily:"'DM Serif Display',serif",fontSize:22,fontWeight:400,color:T.t1,marginBottom:6}}>Área administrativa</h2>
              <p style={{fontSize:13,color:T.t2,marginBottom:20}}>Digite o token para acessar o painel financeiro.</p>
              <input type="password" placeholder="Token de acesso..." value={adminInput} onChange={e=>setAdminInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){if(adminInput===ADMIN_TOKEN){setAdminAuth(true);setAdminInput("");}else{setAdminInput("");}}} } style={{...INP,textAlign:"center",letterSpacing:".1em",marginBottom:10}}/>
              <BtnP onClick={()=>{if(adminInput===ADMIN_TOKEN){setAdminAuth(true);setAdminInput("");}else{setAdminInput("");}}} style={{width:"100%",justifyContent:"center"}}>Entrar</BtnP>
              <p style={{fontSize:11,color:T.t3,marginTop:12}}>Token padrão: <code style={{color:T.gold}}>wbp@2026</code></p>
            </div>
          </div>:<div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <SecTitle>Financeiro & Fluxo de Caixa</SecTitle>
              <div style={{display:"flex",gap:8}}><BtnP onClick={()=>setShowDesp(true)}><i className="ti ti-plus" aria-hidden="true"/>Lançar</BtnP><BtnG onClick={()=>setAdminAuth(false)}><i className="ti ti-logout" aria-hidden="true"/>Sair</BtnG></div>
            </div>
            {(()=>{const te=fluxo.reduce((s,m)=>s+m.entradas,0),ts=fluxo.reduce((s,m)=>s+m.saidas,0),sl=te-ts,mm=fluxo[fluxo.length-1];return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:12,marginBottom:20}}>
              <Metric label="Total entradas" value={`R$ ${(te/1000).toFixed(1)}k`} accent={T.green} icon="ti-trending-up"/>
              <Metric label="Total saídas" value={`R$ ${(ts/1000).toFixed(1)}k`} accent={T.red} icon="ti-trending-down"/>
              <Metric label="Saldo líquido" value={`R$ ${(sl/1000).toFixed(1)}k`} accent={sl>=0?T.green:T.red} icon="ti-scale"/>
              <Metric label="Mês atual" value={mm?`R$ ${((mm.entradas-mm.saidas)/1000).toFixed(1)}k`:"—"} accent={T.gold} icon="ti-calendar"/>
              <Metric label="Margem" value={te>0?`${((sl/te)*100).toFixed(0)}%`:"—"} accent={T.blue} icon="ti-percentage"/>
            </div>;})()}
            <Card style={{marginBottom:12}}>
              <p style={{fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>Fluxo mensal — entradas vs saídas</p>
              {fluxo.length===0?<Empty icon="ti-chart-bar" msg="Nenhum lançamento"/>:<>
                <div style={{display:"flex",alignItems:"flex-end",gap:6,height:130}}>
                  {fluxo.map(m=>{const maxV=Math.max(...fluxo.flatMap(x=>[x.entradas,x.saidas]),1);const hE=Math.max(4,Math.round((m.entradas/maxV)*100)),hS=Math.max(4,Math.round((m.saidas/maxV)*100));const label=new Date(m.mes+"-02").toLocaleDateString("pt-BR",{month:"short"});const sl=m.entradas-m.saidas;
                    return <div key={m.mes} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}} title={`${m.mes}: ent ${fmt(m.entradas)} · saí ${fmt(m.saidas)}`}>
                      <span style={{fontSize:9,color:sl>=0?T.green:T.red,fontWeight:500}}>{sl>=0?"+":""}{(sl/1000).toFixed(1)}k</span>
                      <div style={{width:"100%",display:"flex",gap:2,alignItems:"flex-end",height:100}}>
                        <div style={{flex:1,height:hE,background:T.green,borderRadius:"3px 3px 0 0",opacity:.85}}/>
                        <div style={{flex:1,height:hS,background:T.red,borderRadius:"3px 3px 0 0",opacity:.85}}/>
                      </div>
                      <span style={{fontSize:9,color:T.t3,textTransform:"uppercase"}}>{label}</span>
                    </div>;
                  })}
                </div>
                <div style={{display:"flex",gap:14,marginTop:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:9,height:9,borderRadius:2,background:T.green}}/><span style={{fontSize:10,color:T.t3}}>Entradas</span></div>
                  <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:9,height:9,borderRadius:2,background:T.red}}/><span style={{fontSize:10,color:T.t3}}>Saídas</span></div>
                </div>
              </>}
            </Card>
            {fluxo.map(m=>{const sl=m.entradas-m.saidas,label=new Date(m.mes+"-02").toLocaleDateString("pt-BR",{month:"long",year:"numeric"});
              return <Card key={m.mes} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <p style={{fontFamily:"'DM Serif Display',serif",fontSize:16,fontWeight:400,color:T.t1,textTransform:"capitalize"}}>{label}</p>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <span style={{fontSize:12,color:T.green}}>↑ {fmt(m.entradas)}</span>
                    <span style={{fontSize:12,color:T.red}}>↓ {fmt(m.saidas)}</span>
                    <span style={{fontSize:14,fontWeight:500,color:sl>=0?T.green:T.red,fontFamily:"'DM Serif Display',serif"}}>{sl>=0?"+":""}{fmt(sl)}</span>
                  </div>
                </div>
                {m.itens.sort((a,b)=>a.data.localeCompare(b.data)).map(d=>{const[cor,bg]=CAT_COR[d.cat]||[T.t2,T.bg3];const ent=d.cat==="Entrada";
                  return <div key={d.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${T.border}`}}>
                    <div style={{display:"flex",gap:10,alignItems:"center",flex:1,minWidth:0}}>
                      <span style={{fontSize:10,color:cor,background:bg,border:`1px solid ${cor}33`,borderRadius:5,padding:"2px 7px",whiteSpace:"nowrap"}}>{d.cat}</span>
                      <div style={{minWidth:0}}><p style={{margin:0,fontSize:12,color:T.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.desc}</p><p style={{margin:0,fontSize:10,color:T.t3}}>{fmtDate(d.data)}</p></div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                      <span style={{fontSize:13,fontWeight:500,color:ent?T.green:T.red}}>{ent?"+":"−"}{fmt(d.valor)}</span>
                      {!d.reserva_id&&<button onClick={()=>setDespesas(despesas.filter(x=>x.id!==d.id))} style={{background:"none",border:"none",cursor:"pointer",color:T.t3,fontSize:16,padding:"0 4px"}}>×</button>}
                    </div>
                  </div>;
                })}
              </Card>;
            })}
            <Card>
              <p style={{fontSize:11,color:T.t3,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>Resumo por categoria</p>
              {(()=>{const cats={};despesas.forEach(d=>{cats[d.cat]=(cats[d.cat]||0)+d.valor;});const total=Object.values(cats).reduce((s,v)=>s+v,1);
                return Object.entries(cats).sort(([,a],[,b])=>b-a).map(([cat,val])=><div key={cat} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12,color:T.t2}}>{cat}</span><span style={{fontSize:12,color:T.t1}}>{fmt(val)} <span style={{color:T.t3,fontSize:10}}>({((val/total)*100).toFixed(0)}%)</span></span></div>
                  <div style={{height:4,background:T.bg3,borderRadius:4,overflow:"hidden"}}><div style={{width:`${(val/total)*100}%`,height:"100%",background:cat==="Entrada"?T.green:[T.red,T.redDim].includes(CAT_COR[cat]?.[0])?T.red:T.amber,borderRadius:4}}/></div>
                </div>);
              })()}
            </Card>
          </div>}
        </div>}

      </main>
    </div>

    {/* ── MODAIS ── */}
    {showAt&&<Modal title="Cadastrar ativo" onClose={()=>setShowAt(false)} onSave={addAtivo}>
      <F label="Nome do ativo"><input style={INP} value={fAt.nome} onChange={e=>setFAt({...fAt,nome:e.target.value})} placeholder="Ex.: Porsche 718 Boxster"/></F>
      <FRow>
        <F label="Tipo"><select style={INP} value={fAt.tipo} onChange={e=>setFAt({...fAt,tipo:e.target.value})}><option>Veículo</option><option>Embarcação</option><option>Aeronave</option><option>Imóvel</option><option>Outro</option></select></F>
        <F label="Placa / ID"><input style={INP} value={fAt.placa} onChange={e=>setFAt({...fAt,placa:e.target.value})} placeholder="ABC-1234"/></F>
      </FRow>
      <F label="URL da foto (opcional)"><input style={INP} value={fAt.foto||""} onChange={e=>setFAt({...fAt,foto:e.target.value})} placeholder="https://..."/></F>
      {fAt.foto&&<div style={{borderRadius:8,overflow:"hidden",marginBottom:10,height:120}}><img src={fAt.foto} alt="preview" style={{width:"100%",height:"100%",objectFit:"cover"}}/></div>}
    </Modal>}

    {showCl&&<ModalCliente fCl={fCl} setFCl={setFCl} onClose={()=>setShowCl(false)} onSave={addCliente}/>}

    {showRe&&<ModalReserva fRe={fRe} setFRe={setFRe} clientes={clientes} ativos={ativos} reservas={reservas} erroRe={erroRe} onClose={()=>{setShowRe(false);setErroRe("");}} onSave={addReserva}/>}

    {showVi&&<Modal title="Registrar vistoria" onClose={()=>setShowVi(false)} onSave={addVistoria}>
      <FRow>
        <F label="Reserva"><select style={INP} value={fVi.reserva_id} onChange={e=>setFVi({...fVi,reserva_id:e.target.value})}><option value="">Selecione...</option>{reservas.map(r=>{const a=ativos.find(x=>x.id===r.ativo_id);return <option key={r.id} value={r.id}>#{r.id} · {a?.nome}</option>;})}</select></F>
        <F label="Tipo"><select style={INP} value={fVi.tipo} onChange={e=>setFVi({...fVi,tipo:e.target.value})}><option>Entrada</option><option>Saída</option></select></F>
      </FRow>
      <F label="Responsável"><input style={INP} value={fVi.responsavel} onChange={e=>setFVi({...fVi,responsavel:e.target.value})} placeholder="Nome do analista"/></F>
      <div style={{marginBottom:10}}>
        <label style={LBL}>Checklist de itens</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {CHECKLIST.map(item=><label key={item.key} style={{display:"flex",alignItems:"center",gap:5,fontSize:13,color:T.t2,cursor:"pointer"}}>
            <input type="checkbox" checked={fVi.checklist[item.key]} onChange={e=>setFVi({...fVi,checklist:{...fVi.checklist,[item.key]:e.target.checked}})} style={{width:"auto",marginBottom:0}}/>{item.label}
          </label>)}
        </div>
      </div>
      <F label="Anotações"><textarea style={{...INP,minHeight:80,resize:"vertical"}} value={fVi.anotacao} onChange={e=>setFVi({...fVi,anotacao:e.target.value})} placeholder="Avarias, pendências, observações..."/></F>
    </Modal>}

    {showDesp&&<Modal title="Lançar movimento" onClose={()=>setShowDesp(false)} onSave={addDespesa}>
      <FRow>
        <F label="Data"><input type="date" style={INP} value={fDesp.data} onChange={e=>setFDesp({...fDesp,data:e.target.value})}/></F>
        <F label="Categoria"><select style={INP} value={fDesp.cat} onChange={e=>setFDesp({...fDesp,cat:e.target.value})}>{CATS_DESP.map(c=><option key={c}>{c}</option>)}</select></F>
      </FRow>
      <F label="Descrição"><input style={INP} value={fDesp.desc} onChange={e=>setFDesp({...fDesp,desc:e.target.value})} placeholder="Ex.: Revisão 25.000 km"/></F>
      <FRow>
        <F label="Valor (R$)"><input type="number" step="0.01" style={INP} value={fDesp.valor} onChange={e=>setFDesp({...fDesp,valor:e.target.value})} placeholder="0,00"/></F>
        <F label="Ativo"><select style={INP} value={fDesp.ativo_id} onChange={e=>setFDesp({...fDesp,ativo_id:e.target.value})}>{ativos.map(a=><option key={a.id} value={a.id}>{a.nome}</option>)}</select></F>
      </FRow>
      {fDesp.valor&&<div style={{background:T.bg3,borderRadius:8,padding:"10px 14px",border:`1px solid ${fDesp.cat==="Entrada"?T.green+"44":T.red+"44"}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:12,color:T.t2}}>{fDesp.cat==="Entrada"?"Entrada":"Saída"}</span>
          <span style={{fontSize:16,fontWeight:500,fontFamily:"'DM Serif Display',serif",color:fDesp.cat==="Entrada"?T.green:T.red}}>{fDesp.cat==="Entrada"?"+":"−"}{fmt(Number(fDesp.valor))}</span>
        </div>
      </div>}
    </Modal>}

    {dossieCli&&<Dossie c={dossieCli} reservas={reservas} vistorias={vistorias} contratos={contratos} ativos={ativos} onClose={()=>setDossieId(null)}/>}
  </>;
}
