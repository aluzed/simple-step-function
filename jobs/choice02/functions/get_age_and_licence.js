
exports.handler = () => {

  let age = Math.floor(Math.random() * 40) + 1;

  // 50% luck
  let canDrive = Math.floor(Math.random() * 100) + 1;

  return {
    age,
    driver_licence: (age >= 18 && canDrive >= 50)
  }
}