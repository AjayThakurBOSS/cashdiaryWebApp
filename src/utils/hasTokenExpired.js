// Functions:
const hasTokenExpired = (expirationDate) => {
  return new Date(expirationDate) < new Date()
}


// Exports:
export default hasTokenExpired
