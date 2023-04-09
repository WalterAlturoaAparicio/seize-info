export const weapon_types = [
  "Pistola",
  "Revolver",
  "Fusil",
  "Ametralladora",
  "Escopeta",
  "Carabina",
  "Otra",
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
export const invest_form_cb = ["Arma", "Proyectil", "Vainilla", "Accesorio"]
export const ubication_emp_ef = ["Estudio", "Almacen transitorio"]

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
