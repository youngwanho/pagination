// 출처: youngwanho(mavin) 개인 작업물
// 업데이트: 2023.10.17
// 페이지네이션 자바스크립트 자료입니다.


const paginationNumbers = document.getElementById("page_nums");
const paginatedList = document.getElementById("page_list");
const listItems = paginatedList.querySelectorAll("li");
const btnNext = document.getElementById("btn_next");
const btnPrev = document.getElementById("btn_prev");

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(btnPrev);
  } else {
    enableButton(btnPrev);
  }

  if (pageCount === currentPage) {
    disableButton(btnNext);
  } else {
    enableButton(btnNext);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".page-num").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "page-num";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((리스트, index) => {
    리스트.classList.add("hide");
    if (index >= prevRange && index < currRange) {
      리스트.classList.remove("hide");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  btnPrev.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  btnNext.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".page-num").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
