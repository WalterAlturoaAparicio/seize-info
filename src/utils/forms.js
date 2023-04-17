export const weapon_types = [
  "Pistola",
  "Revolver",
  "Fusil",
  "Ametralladora",
  "Escopeta",
  "Carabina",
  "Otro",
]
export const weapon_calibers = [
  "5.56mm",
  "5.7mm",
  "9mm",
  ".22",
  ".32",
  ".38",
  ".40",
  "Otro",
]
export const shape = [
  "Cilindrico",
  "ojival",
  "Aerodinámica",
  "Wadcutter",
  "Otro",
]
export const invest_form_cb = ["Arma", "Proyectil", "Vainilla", "Accesorio"]
export const ubication_emp_ef = ["Estudio", "Almacen transitorio"]
export const anima_types = ["Estriada", "Lisa", "Poligonal"]
export const sense_rotation = ["Izquierda", "Derecha"]
export const functioning = ["Automatica", "Semiautomatica", "Tiro a tiro"]
export const fabrication = ["original de industria", "legalmente patentada"]
export const finish = ["Pavonado", "Cromado", "Otro"]
export const material_types = ["Metalica", "Madera", "Pasta", "Otro"]
export const percution = ["central", "angular"]
export const almacenist_procedure = [
  "custodia",
  "aplicacion de pruebas",
  "comiso o destruccion",
]
export const almacenist_procedure_decreto = [
  "custodia",
  "comiso o destruccion",
  "devolucion",
]

export function zeroFill(number, width) {
  width -= number.toString().length
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number
  }
  return number + "" // siempre devuelve tipo cadena
}
export function searchField(field, data, name) {
  const res = data.find((f) => f[name] === field)
  return res ? res : { error: "No existe ese registro" }
}
export const validateForm = (data, otra) => {
  if (!data || data === "") return "Sin datos"
  if (otra && data === "Otro") return otra

  return data
}
