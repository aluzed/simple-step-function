const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
}

exports.handler = async () => {
  await wait(6000);
  return {
    random: Math.floor(Math.random() * 100) + 1
  };
}