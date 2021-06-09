
exports.handler = () => {
  let age = Math.floor(Math.random() * 30) + 1;
  return {
    age
  }
}