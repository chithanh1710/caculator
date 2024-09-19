// ******************* VIEW FUNCTIONS ******************* //
function switchThemeTo(theme) {
  let toggle = document.getElementById("theme-toggle");
  if (toggle.classList.contains("t-" + theme)) return;
  toggle.classList.remove("t-1");
  toggle.classList.remove("t-2");
  toggle.classList.remove("t-3");
  toggle.classList.add("t-" + theme);
  document.body.classList.remove("theme-1");
  document.body.classList.remove("theme-2");
  document.body.classList.remove("theme-3");
  document.body.classList.add("theme-" + theme);
}

// ******************* CALCULATOR FUNCTIONS ******************* //
let currentInput = ""; // Biến lưu trữ giá trị hiện tại
let previousInput = ""; // Biến lưu trữ giá trị trước đó
let operation = null; // Lưu phép toán hiện tại

// Hiển thị giá trị lên màn hình
const display = document.querySelector(".screen");
const historyEl = document.querySelector("#history");

// Cập nhật giá trị hiển thị trên màn hình
function updateDisplay(value) {
  display.textContent = value;
}

const lishSu = [];
function lichSuTinhToan(prev, cur, operation, result) {
  lishSu.push({ prev, cur, operation, result });
  const html = lishSu
    .map(
      (item) =>
        `
        <p>
            ${item.prev} ${item.operation} ${item.cur} = ${item.result}
        </p>
      `
    )
    .join("\n");
  historyEl.innerHTML = html;
}

// Thêm số hoặc dấu vào chuỗi nhập hiện tại
function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return; // Không cho phép nhập nhiều dấu '.'
  currentInput += number;
  updateDisplay(currentInput);
}

// Xóa một số/công thức nhập gần nhất
function deleteLast() {
  currentInput = currentInput.toString().slice(0, -1);
  updateDisplay(currentInput || "0");
}

// Chọn phép toán: +, -, *, /
function chooseOperation(selectedOperation) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate(); // Nếu đã có giá trị trước đó, thực hiện phép tính trước đó
  }
  operation = selectedOperation;
  previousInput = currentInput;
  currentInput = "";
}

// Tính toán kết quả dựa trên phép toán đã chọn
function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  lichSuTinhToan(prev, current, operation, result);
  currentInput = result.toString();
  operation = undefined;
  previousInput = "";
  updateDisplay(currentInput);
}

// Reset lại toàn bộ máy tính
function resetCalculator() {
  currentInput = "";
  previousInput = "";
  operation = null;
  updateDisplay("0");
}

// Lấy tất cả các phím số, toán tử và nút đặc biệt (reset, del, =)
const keys = document.querySelectorAll(".key");

// Lặp qua các phím để gán sự kiện click
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.getAttribute("data-key-value");

    if (!isNaN(value) || value === ".") {
      appendNumber(value); // Nếu là số hoặc dấu '.', thêm vào input hiện tại
    } else if (value === "del") {
      deleteLast(); // Xóa ký tự cuối
    } else if (value === "reset") {
      resetCalculator(); // Reset lại toàn bộ
    } else if (value === "=") {
      calculate(); // Tính toán kết quả
    } else {
      chooseOperation(value); // Chọn phép toán
    }
  });
});
