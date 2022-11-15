(function () {
  function createStudentsAddForm(container) {
    const formTitle = document.createElement("h2");
    const form = document.createElement("form");
    const fullNameWrapper = document.createElement("div");
    const inputName = document.createElement("input");
    const inputSurname = document.createElement("input");
    const inputMiddlename = document.createElement("input");
    const inputBirthday = document.createElement("input");
    const inputYearOfStudy = document.createElement("input");
    const inputFaculty = document.createElement("input");
    const button = document.createElement("button");

    let fullDate = getFullDate(new Date());

    formTitle.classList.add("mb-3");
    form.classList.add("students-add-form", "mb-3");
    fullNameWrapper.classList.add("input-group", "mb-3");
    inputName.classList.add("form-control");
    inputSurname.classList.add("form-control");
    inputMiddlename.classList.add("form-control");
    inputBirthday.classList.add("form-control", "mb-3");
    inputYearOfStudy.classList.add("form-control", "mb-3");
    inputFaculty.classList.add("form-control", "mb-3");
    button.classList.add("btn", "btn-primary");

    inputName.placeholder = "Введите имя";
    inputName.required = true;

    inputSurname.placeholder = "Введите фамилию";
    inputSurname.required = true;

    inputMiddlename.placeholder = "Введите отчество";
    inputMiddlename.required = true;

    inputBirthday.type = "date";
    inputBirthday.required = true;
    inputBirthday.min = "1900-01-01";
    inputBirthday.max = `${fullDate.year}-${fullDate.month}-${fullDate.day}`;

    inputYearOfStudy.type = "number";
    inputYearOfStudy.placeholder = "Введите год начала обучения";
    inputYearOfStudy.required = true;
    inputYearOfStudy.min = "2000";
    inputYearOfStudy.max = `${fullDate.year}`;

    inputFaculty.placeholder = "Введите название Факультета";
    inputFaculty.required = true;

    formTitle.textContent = "Форма добавления студента";
    button.textContent = "Добавить студента";

    fullNameWrapper.append(inputName);
    fullNameWrapper.append(inputSurname);
    fullNameWrapper.append(inputMiddlename);
    form.append(formTitle);
    form.append(fullNameWrapper);
    form.append(inputBirthday);
    form.append(inputYearOfStudy);
    form.append(inputFaculty);
    form.append(button);
    container.append(form);

    let inputs = document.querySelectorAll("input");

    inputs.forEach((element) => {
      element.addEventListener("input", function () {
        if (element.value.trim() == "") {
          element.setCustomValidity("Ошибка ввода");
        } else {
          element.setCustomValidity("");
        }
      });
    });

    return {
      form,
      inputName,
      inputSurname,
      inputMiddlename,
      inputBirthday,
      inputYearOfStudy,
      inputFaculty,
      button,
    };
  }

  function createFiltersForm(container) {
    const wrapper = document.createElement("div");
    const filtersTitle = document.createElement("h2");
    const inputWrapper = document.createElement("div");
    const fullnameFilter = document.createElement("input");
    const facultyFilter = document.createElement("input");
    const startYearOfStudyFilter = document.createElement("input");
    const endYearOfStudyFilter = document.createElement("input");

    wrapper.classList.add("mb-3");
    filtersTitle.classList.add("mb-3");
    inputWrapper.classList.add("input-group", "mb-3");
    fullnameFilter.classList.add("form-control");
    facultyFilter.classList.add("form-control");
    startYearOfStudyFilter.classList.add("form-control");
    endYearOfStudyFilter.classList.add("form-control");

    filtersTitle.textContent = "Форма фильтрации студентов";
    fullnameFilter.placeholder = "Введите Фамилию, Имя или Отчество студента";
    facultyFilter.placeholder = "Введите назвние факультета";

    startYearOfStudyFilter.type = "number";
    startYearOfStudyFilter.placeholder = "Введите год начана обучения";

    endYearOfStudyFilter.type = "number";
    endYearOfStudyFilter.placeholder = "Введите год конца обучения";

    inputWrapper.append(fullnameFilter);
    inputWrapper.append(facultyFilter);
    inputWrapper.append(startYearOfStudyFilter);
    inputWrapper.append(endYearOfStudyFilter);
    wrapper.append(filtersTitle);
    wrapper.append(inputWrapper);
    container.append(wrapper);

    return {
      fullnameFilter,
      facultyFilter,
      startYearOfStudyFilter,
      endYearOfStudyFilter,
    };
  }

  function getFullDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month.toString().length === 1) {
      month = "0" + month;
    }

    if (day.toString().length === 1) {
      day = "0" + day;
    }

    return {
      year,
      month,
      day,
    };
  }

  function getAge(datestring) {
    const currentDate = new Date();
    const birthDate = new Date(datestring);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDay() - birthDate.getDay();

    if (
      months < 0 ||
      (months === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  function getCourse(startOfStudy) {
    const STUDYING_TIME = 4;
    const currentDate = new Date();
    let course = currentDate.getFullYear() - startOfStudy;
    const endOfStudy = startOfStudy + STUDYING_TIME;

    if (
      course > STUDYING_TIME ||
      (course === STUDYING_TIME && currentDate.getMonth() > 8)
    ) {
      return "закончил";
    }
    if (course === 0) return course + 1;

    return course;
  }

  const arrayStudents = [];

  const newArrStudents = [
    {
      fullname: "Иванов Иван Иванович",
      faculty: "Химический",
      birthday: "20.02.1987(35)",
      yearOfStudy: "2012-2016(закончил)",
    },
    {
      fullname: "Козлов Петр Александрович",
      faculty: "Математический",
      birthday: "11.07.1992(30)",
      yearOfStudy: "2016-2020(закончил)",
    },
    {
      fullname: "Гладкий Андрей Сергеевич",
      faculty: "Информатики",
      birthday: "01.01.1992(30)",
      yearOfStudy: "2020-2024(2)",
    },
  ];

  function modifyStudents(arr) {
    newArrStudents.length = 0;
    arr.forEach((item) => {
      let birthday = getFullDate(item.birthday);

      let student = {
        fullname: item.surname + " " + item.name + " " + item.middlename,
        faculty: item.faculty,
        birthday: `${birthday.day}.${birthday.month}.${birthday.year}(${getAge(
          item.birthday
        )})`,
        yearOfStudy: `${item.yearOfStudy}-${+item.yearOfStudy + 4}(${getCourse(
          item.yearOfStudy
        )})`,
      };
      newArrStudents.push(student);
    });
  }

  function createTable() {
    const tableTitle = document.createElement("h2");
    const table = document.createElement("table");
    const rowHeading = document.createElement("tr");
    const colFullname = document.createElement("th");
    const colBirthday = document.createElement("th");
    const colFaculty = document.createElement("th");
    const colYearOfStudy = document.createElement("th");

    tableTitle.classList.add("mb-3");
    tableTitle.textContent = "Таблица студентов";
    colFullname.textContent = "ФИО";
    colFaculty.textContent = "Факультет";
    colBirthday.textContent = "Дата рождения(возраст)";
    colYearOfStudy.textContent = "Годы обучения(курс)";

    rowHeading.append(colFullname);
    rowHeading.append(colFaculty);
    rowHeading.append(colBirthday);
    rowHeading.append(colYearOfStudy);
    table.append(tableTitle);
    table.append(rowHeading);

    return {
      table,
      colFullname,
      colFaculty,
      colBirthday,
      colYearOfStudy,
    };
  }

  function createRowTable() {
    const row = document.createElement("tr");
    return row;
  }

  function createColTable(text) {
    const col = document.createElement("td");
    col.textContent = text;
    return col;
  }

  function validateForm(form) {
    let inputs = form.querySelectorAll("input");

    inputs.forEach((element) => {
      element.value = element.value.trim();
    });
  }

  function createArrayStudents(container) {
    const studentsAddForm = createStudentsAddForm(container);
    const filtersForm = createFiltersForm(container);

    let filtersStudents;

    studentsAddForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      validateForm(studentsAddForm.form);

      const student = {
        name: studentsAddForm.inputName.value,
        surname: studentsAddForm.inputSurname.value,
        middlename: studentsAddForm.inputMiddlename.value,
        faculty: studentsAddForm.inputFaculty.value,
        birthday: new Date(studentsAddForm.inputBirthday.valueAsDate),
        yearOfStudy: studentsAddForm.inputYearOfStudy.value,
      };
      arrayStudents.push(student);
      this.reset();
      studentsAddForm.inputName.focus();
      modifyStudents(arrayStudents);
      renderingTable(newArrStudents);
    });

    for (item in filtersForm) {
      filtersForm[item].addEventListener("input", function () {
        filtersStudents = newArrStudents
          .filter(filterFullname)
          .filter(filterFaculty)
          .filter(filterStartOfStudy)
          .filter(filterEndOfStudy);
        renderingTable(filtersStudents);
      });
    }

    function filterFullname(el) {
      return el.fullname.toLowerCase().indexOf(filtersForm.fullnameFilter.value.toLowerCase()) !== -1;
    }

    function filterFaculty(el) {
      return el.faculty.toLowerCase().indexOf(filtersForm.facultyFilter.value.toLowerCase()) !== -1;
    }

    function filterStartOfStudy(el) {
      return el.yearOfStudy.slice(0, 4).includes(filtersForm.startYearOfStudyFilter.value);
    }

    function filterEndOfStudy(el) {
      return el.yearOfStudy.slice(5, 9).includes(filtersForm.endYearOfStudyFilter.value);
    }
  }


  function renderingTable(arr) {
    const table = createTable();
    const container = document.querySelector(".container");

    for (let i = 0; i < arr.length; i++) {
      const row = createRowTable();
      table.table.append(row);
      let obj = arr[i];

      for (item in obj) {
        const col = createColTable(obj[item]);
        row.append(col);
      }
    }

    if (container.children.length > 2) {
      container.children[2].remove();
    }

    container.append(table.table);

    document.body.addEventListener("click", function (e) {
      let target = e.target;

      if (target === table.colFullname) {
        newArrStudents.sort(function (a, b) {
          let fullnameA = a.fullname.toLowerCase();
          let fullnameB = b.fullname.toLowerCase();

          if (fullnameA < fullnameB) return -1;
          if (fullnameA > fullnameB) return 1;

          return 0;
        });
        renderingTable(newArrStudents);
      }

      if (target === table.colFaculty) {
        newArrStudents.sort(function (a, b) {
          let facultyA = a.faculty.toLowerCase();
          let facultyB = b.faculty.toLowerCase();

          if (facultyA < facultyB) return -1;
          if (facultyA > facultyB) return 1;

          return 0;
        });
        renderingTable(newArrStudents);
      }

      if (target === table.colBirthday) {
        newArrStudents.sort(function (a, b) {
          let birthdayA = new Date(
            a.birthday.slice(6, 10),
            a.birthday.slice(3, 5) - 1,
            a.birthday.slice(0, 2)
          );
          let birthdayB = new Date(
            b.birthday.slice(6, 10),
            b.birthday.slice(3, 5) - 1,
            b.birthday.slice(0, 2)
          );

          return birthdayB - birthdayA;
        });
        renderingTable(newArrStudents);
      }

      if (target === table.colYearOfStudy) {
        newArrStudents.sort(function (a, b) {
          let yearOfStudyA = a.yearOfStudy;
          let yearOfStudyB = b.yearOfStudy;

          if (yearOfStudyA < yearOfStudyB) return -1;
          if (yearOfStudyA > yearOfStudyB) return 1;

          return 0;
        });
        renderingTable(newArrStudents);
      }
    });
  }

  createArrayStudents(document.querySelector(".container"));
  renderingTable(newArrStudents);
})();
