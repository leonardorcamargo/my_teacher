module.exports = {
  age: function (timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
    }

    return age;
  },

  date: function (timestamp) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${year}-${month}-${day}`,
      format: `${day}/${month}/${year}`,
    };
  },

  graduation: function (degree) {
    if (degree == "medio") {
      return "Ensino Médio Completo";
    }
    if (degree == "superior") {
      return "Ensino Superior Completo";
    }
    if (degree == "mestrado") {
      return "Mestrado";
    }
    if (degree == "doutorado") {
      return "Doutorado";
    }
  },
  convertGrade: function (grade) {
    if (grade == "5EF") {
      return "5º Ano do Ensino Fundamental";
    }
    if (grade == "6EF") {
      return "6º Ano do Ensino Fundamental";
    }
    if (grade == "7EF") {
      return "7º Ano do Ensino Fundamental";
    }
    if (grade == "8EF") {
      return "8º Ano do Ensino Fundamental";
    }
    if (grade == "1EM") {
      return "1º Ano do Ensino Médio";
    }
    if (grade == "2EM") {
      return "2º Ano do Ensino Médio";
    }
    if (grade == "3EM") {
      return "3º Ano do Ensino Médio";
    }
  },
};
