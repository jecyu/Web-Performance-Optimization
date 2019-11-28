const { hotPotato } = PackDataStructuresAlogrithms;
const names = ['Jecyu', 'John', 'Jack', "Camlia", "Crazy", 'Carl'];
const result = hotPotato(names, 7);
result.elimitated.forEach(name => {
  console.log(`${name}在击鼓传花游戏中被淘汰。`)
})
console.log(`胜利者 : ${result.winner}`);