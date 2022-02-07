const lesserThanFive = (page, totalPage) => {
  let result = [];
  for (let index = 1; index <= totalPage; index += 1) {
    index === page ? result.push(`**${index}**`) : result.push(index.toString());
  }

  return result;
}

const greaterThanFive = (page, totalPage) => {
  let result = [];

  for (let index = 1; index <= totalPage; index += 1) {
    if (totalPage - page <= 2 && index === 1) {
      index = totalPage - 4;
    } else if (page > 3 && index === 1) {
      index = page - 2;
    }

    if (result.length === 5) {
      result.push('...');
      break;
    }

    index === page ? result.push(`**${index}**`) : result.push(index.toString());
  }

  if (page > 3) {
    result.unshift('...');
  }

  return result;
} 

const getPaginacaoService = (pageString, totalPageString) => {
  const pagesNumber = { page: parseInt(pageString), totalPage: parseInt(totalPageString) };
  const { page, totalPage } = pagesNumber;

  if (totalPage <= 5) return lesserThanFive(page, totalPage);
  
  return greaterThanFive(page, totalPage);
};

module.exports = {
  getPaginacaoService,
}
